import { ref, reactive, h, nextTick, getCurrentInstance, createVNode, render, onUnmounted } from 'vue'
import type { VNode, VNodeTypes } from 'vue'
import base from '../components/base'
import { ButtonGroup } from '../components'
import { globalProps } from '../plugin'
import type { ModalProps, ModalFuncProps } from 'ant-design-vue/es'
import type { ExtButtons, ExtFormOption } from '../exaTypes'
import { useForm } from '../superForm'

export function createModal(content: (() => VNodeTypes) | VNode, { buttons, ...__config }: Obj = {}) {
  const visible = ref(false)
  const config = reactive({ ...__config, ...globalProps.Modal })
  const modalRef = ref()

  if (buttons) {
    __config.footer = () => h(ButtonGroup, { config: buttons, param: { modalRef } })
  }
  const onOk = () =>
    Promise.resolve(config.onOk?.())
      .then(() => {
        visible.value = false
      })
      .catch((err) => console.error(err))

  const isUnmounted = ref(false)
  onUnmounted(() => {
    isUnmounted.value = true
  })

  const updateVisible = (val) => (visible.value = val)
  const modalSlot = (props, ctx) =>
    !isUnmounted.value &&
    h(
      base.Modal,
      { ref: modalRef, visible: visible.value, 'onUpdate:visible': updateVisible, ...config, ...props, onOk },
      { ...ctx?.slots, default: content }
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

export function useModal(content: () => VNodeTypes, config: (ModalProps & { buttons?: ExtButtons }) | Obj = {}) {
  const { modalSlot, openModal, modalRef, closeModal, setModal } = createModal(content, config)
  const ins: any = getCurrentInstance() // || currentInstance

  const open = (option?: ModalFuncProps | Obj) => {
    if (modalRef.value) {
      return openModal(option)
    } else {
      const wrap = document.createElement('div')
      // currentInstance = currentInstance || ins
      const vm = createVNode(modalSlot, { appContext: ins?.appContext })
      vm.appContext = ins?.appContext // 这句很关键，关联起了数据

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

export function useModalForm(
  { title, ...option }: ExtFormOption,
  config: (ModalProps & { buttons?: ExtButtons }) | Obj = {}
) {
  const [register, form] = useForm(option)
  const modal = useModal(register(), { maskClosable: false, title, ...config })
  const openModal = ({ data, onOk = config.onOk, ...__config }: ModalFuncProps & { data?: Obj } = {}) => {
    const __onOk = () => {
      return form.submit().then((data) => (onOk ? onOk(data) : data))
    }
    form.resetFields(data)
    return modal.openModal({ ...__config, onOk: __onOk })
  }
  return { openModal, closeModal: modal.closeModal, formActions: form }
}
