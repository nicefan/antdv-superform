import { ref, reactive, h, nextTick, getCurrentInstance, createVNode, render, onUnmounted } from 'vue'
import type { VNode, VNodeTypes } from 'vue'
import { ButtonGroup } from '../components/buttons'
import { globalProps } from '../plugin'
import { getUIAdapter, getUIRender } from '../adapter'

import type { ExtFormOption, ExtModalProps, ExtModalFormProps, ModalOpenOptions } from '../exaTypes'
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

  const titleSlot = () => (config.icon ? [toNode(config.icon), toNode(config.title)] : toNode(config.title))

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
  const ins = getCurrentInstance()
  // Element Plus Dialog 默认在宿主内渲染，每次挂载都需连接到文档。
  const wrap = document.createElement('div')
  let vm
  const contextAdapter = getUIAdapter().modal
  const configContext = contextAdapter?.useContext?.()
  const afterClose = () => {
    // 不改写持久配置，避免重复打开时叠加回调；清理后允许业务回调重新打开。
    const callback = modalConfig.afterClose
    if (modalConfig.destroyOnClose) destroy()
    callback?.()
  }
  const Wrapper = (props) => {
    return (
      contextAdapter?.wrapContext?.(
        (contextProps = {}) => modalSlot({ ...props, ...contextProps, afterClose }, {}),
        configContext,
        props
      ) ?? modalSlot({ ...props, afterClose }, {})
    )
  }

  const destroy = () => {
    render(null, wrap)
    wrap.remove()
    vm = null
  }
  onUnmounted(destroy)

  const open = (option?: Partial<ExtModalProps>) => {
    if (vm) {
      return openModal(option)
    } else {
      vm = createVNode(Wrapper)
      vm.appContext = ins?.appContext
      document.body.appendChild(wrap)
      render(vm, wrap)
      return nextTick(() => openModal(option))
    }
  }
  return {
    modalRef,
    openModal: open,
    modalSlot,
    closeModal,
    setModal,
  }
}

export function useModalForm(formOption: ExtFormOption, config: ExtModalFormProps = {}) {
  const { title, ...option } = formOption as any
  const { onSubmitError, ...modalConfig } = config
  const [register, form] = useForm(option)
  const modal = useModal(register(), { maskClosable: false, title, ...modalConfig })
  const openModal = ({ data, onOk = config.onOk, onSubmitError: notifyError = onSubmitError, ...__config }: ModalOpenOptions = {}) => {
    const __onOk = async () => {
      try {
        const data = await form.submit()
        return onOk ? await onOk(data) : data
      } catch (error) {
        // 仅在表单确认链路通知一次；通知失败也不能替换原始提交错误。
        try {
          await notifyError?.(error)
        } catch (notificationError) {
          console.error(notificationError)
        }
        throw error
      }
    }
    form.resetFields(data)
    return modal.openModal({ ...__config, onOk: __onOk })
  }
  return { ...modal, openModal, formActions: form }
}
