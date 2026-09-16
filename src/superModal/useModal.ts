import { ref, reactive, h, nextTick, getCurrentInstance, createVNode, render, onUnmounted } from 'vue'
import type { VNode, VNodeTypes } from 'vue'
import { ButtonGroup } from '../components'
import { globalProps } from '../plugin'
import { renderUIModal, useUIModalContext, wrapUIModalContext } from '../adapter'

import type { ExtFormOption, ExtModalProps, ModalOpenOptions } from '../exaTypes'
import { useForm } from '../superForm'
import { toNode } from '../utils'

export function createModal(content?: (() => VNodeTypes) | VNode, { buttons, ...__config }: ExtModalProps = {}) {
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

  const titleSlot = () => (config.icon ? [config.icon(), toNode(config.title)] : toNode(config.title))

  const updateVisible = (val) => (visible.value = val)
  const modalSlot = (props, ctx) =>
    renderUIModal(
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

  const openModal = async (option?: Partial<ExtModalProps>) => {
    Object.assign(config, option)
    visible.value = true
    return nextTick()
  }
  const closeModal = () => {
    visible.value = false
    return nextTick()
  }
  const setModal = (option?: Partial<ExtModalProps>) => {
    Object.assign(config, option)
  }
  return {
    config,
    modalRef,
    modalSlot,
    setModal,
    closeModal,
    openModal,
  }
}

export function useModal(content?: () => VNodeTypes, config?: ExtModalProps) {
  const { modalSlot, openModal, modalRef, closeModal, setModal, config: modalConfig } = createModal(content, config)
  const ins: any = getCurrentInstance() // || currentInstance
  const wrap: any = document.createDocumentFragment()
  let vm
  const configContext = useUIModalContext()
  const Wrapper = (props) => {
    return wrapUIModalContext(
      (contextProps = {}) => modalSlot({ ...props, ...contextProps }, {}),
      configContext,
      props
    )
  }

  const destroy = () => {
    render(null, wrap)
    vm = null
  }
  onUnmounted(() => {
    vm && destroy()
  })

  const open = (option?: Partial<ExtModalProps>) => {
    if (modalRef.value) {
      return openModal(option)
    } else {
      vm = createVNode(Wrapper)
      vm.appContext = ins?.appContext // 这句很关键，关联起了数据

      render(vm, wrap)
      if (modalConfig.destroyOnClose) {
        const afterClose = modalConfig.afterClose
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
  const openModal = ({ data, onOk = config.onOk, ...__config }: ModalOpenOptions = {}) => {
    const __onOk = () => {
      return form.submit().then((data) => (onOk ? onOk(data) : data))
    }
    form.resetFields(data)
    return modal.openModal({ ...__config, onOk: __onOk })
  }
  return { ...modal, openModal, formActions: form }
}
