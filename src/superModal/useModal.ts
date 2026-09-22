import { ref, reactive, h, nextTick, getCurrentInstance, createVNode, render, onUnmounted } from 'vue'
import type { VNode, VNodeTypes } from 'vue'
import { ButtonGroup } from '../components/buttons'
import { globalProps } from '../plugin'
import { getUIAdapter, getUIRender } from '../adapter'

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
    if (confirmLoading.value || cancelling) return
    confirmLoading.value = true
    return Promise.resolve().then(() => config.onOk?.())
      .then((result) => {
        if (result !== false) visible.value = false
      })
      .catch((err) => console.error(err))
      .finally(() => (confirmLoading.value = false))
  }

  const titleSlot = () => (config.icon ? [config.icon(), toNode(config.title)] : toNode(config.title))

  let cancelling: Promise<unknown> | undefined
  const onCancel = (...args) => {
    if (confirmLoading.value) return Promise.resolve(false)
    // 原生取消事件与可见状态事件可能同时到达，只执行一次业务拦截。
    return cancelling ||= Promise.resolve().then(() => config.onCancel?.(...args))
      .then((result) => {
        if (result !== false) visible.value = false
        return result
      })
      .catch((error) => { console.error(error); return false })
      .finally(() => { cancelling = undefined })
  }
  const updateVisible = (val) => {
    if (val) visible.value = true
    else if (visible.value) return onCancel()
  }
  const modalSlot = (props, ctx) =>
    getUIRender('modal')(
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
        onCancel,
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
  // Element Plus Dialog 依赖 Teleport 挂载到 document.body，DocumentFragment 未连接到文档时不会显示弹窗。
  const wrap = document.createElement('div')
  document.body.appendChild(wrap)
  let vm
  const contextAdapter = getUIAdapter().modal
  const configContext = contextAdapter?.useContext?.()
  const Wrapper = (props) => {
    return (
      contextAdapter?.wrapContext?.(
        (contextProps = {}) => modalSlot({ ...props, ...contextProps }, {}),
        configContext,
        props
      ) ?? modalSlot(props, {})
    )
  }

  const destroy = () => {
    render(null, wrap)
    wrap.remove()
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
