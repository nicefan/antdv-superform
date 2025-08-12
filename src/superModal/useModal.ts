import { ref, reactive, h, nextTick, getCurrentInstance, createVNode, render, onUnmounted, inject } from 'vue'
import type { VNode, VNodeTypes } from 'vue'
import base from '../components/base'
import { ButtonGroup } from '../components'
import { globalProps } from '../plugin'
import type { ModalProps, ModalFuncProps } from 'ant-design-vue'
import { ConfigProvider } from 'ant-design-vue'

import type { ExtButtons, ExtFormOption } from '../exaTypes'
import { useForm } from '../superForm'
import { toNode, getIconNode } from '../utils'

export function createModal(content?: (() => VNodeTypes) | VNode, { buttons, ...__config }: Obj = {}) {
  const visible = ref(false)
  const config = reactive({ ...__config, ...globalProps.Modal })
  const modalRef = ref()

  const footer = buttons && (() => h(ButtonGroup, { option: buttons, effectData: { modalRef } }))
  const confirmLoading = ref<boolean>(false)
  const onOk = () => {
    confirmLoading.value = true
    return Promise.resolve(config.onOk?.())
      .then(() => {
        visible.value = false
      })
      .catch((err) => console.error(err))
      .finally(() => (confirmLoading.value = false))
  }

  const titleSlot = () => (config.icon ? [getIconNode(config.icon), toNode(config.title)] : toNode(config.title))

  const updateVisible = (val) => (visible.value = val)
  const modalSlot = (props, ctx) =>
    h(
      base.Modal,
      {
        ref: modalRef,
        visible: visible.value,
        class: 'sup-modal',
        'onUpdate:visible': updateVisible,
        confirmLoading: confirmLoading.value,
        ...config,
        title: undefined,
        ...props,
        onOk,
      },
      { footer, title: titleSlot, ...ctx?.slots, ...(content && { default: content }) }
    )

  const openModal = async (option?: ModalFuncProps | Obj) => {
    Object.assign(config, option)
    visible.value = true
    return nextTick()
  }
  const closeModal = () => {
    visible.value = false
    return nextTick()
  }
  const setModal = (option?: ModalFuncProps | Obj) => {
    Object.assign(config, option)
  }
  return {
    modalRef,
    modalSlot,
    setModal,
    closeModal,
    openModal,
  }
}

type ExtModalProps = (ModalFuncProps & ModalProps) | (ModalFuncProps & { buttons?: ExtButtons; [k: string]: any })
export function useModal(content?: () => VNodeTypes, config?: ExtModalProps) {
  const { modalSlot, openModal, modalRef, closeModal, setModal } = createModal(content, config)
  const ins: any = getCurrentInstance() // || currentInstance
  const wrap: any = document.createDocumentFragment()
  let vm
  const global = inject('configProvider') as any
  const Wrapper = (props) => {
    const rootPrefixCls = global?.getPrefixCls?.()
    const prefixCls = props.prefixCls || ''.concat(rootPrefixCls, '-modal')
    return h(ConfigProvider, { ...global, 'notUpdateGlobalConfig': true, 'prefixCls': rootPrefixCls }, () =>
      modalSlot({ ...props, rootPrefixCls, prefixCls }, {})
    )
  }

  const destroy = () => {
    render(null, wrap)
    vm = null
  }
  if (global) {
    onUnmounted(() => {
      vm && destroy()
    })
  }

  const open = (option?: ModalFuncProps | Obj) => {
    if (modalRef.value) {
      return openModal(option)
    } else {
      vm = createVNode(Wrapper, option as any)
      vm.appContext = ins?.appContext // 这句很关键，关联起了数据

      render(vm, wrap)
      if (modalRef.value?.destroyOnClose) {
        const afterClose = modalRef.value?.afterClose
        setModal({
          afterClose() {
            afterClose?.()
            destroy()
          },
        })
      }
      return nextTick(() => openModal(option))
    }
  }
  // const close = () => {
  //   if (config.)
  // }

  return {
    modalRef,
    openModal: open,
    modalSlot,
    closeModal,
    setModal,
  }
}

export function useModalForm(formOption: ExtFormOption, config: ExtModalProps = {}) {
  const { title, ...option } = formOption as any
  const [register, form] = useForm(option)
  const modal = useModal(register(), { maskClosable: false, title, ...config })
  const openModal = ({ data, onOk = config.onOk, ...__config }: ModalFuncProps & { data?: Obj } = {}) => {
    const __onOk = () => {
      return form.submit().then((data) => (onOk ? onOk(data) : data))
    }
    form.resetFields(data)
    return modal.openModal({ ...__config, onOk: __onOk })
  }
  return { ...modal, openModal, formActions: form }
}
