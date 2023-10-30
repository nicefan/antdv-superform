import { ref, reactive, h, nextTick, getCurrentInstance, createVNode, render, type VNode, type VNodeTypes } from 'vue'
import base from '../components/base'
import { ButtonGroup } from '../components'
import { globalProps } from '../plugin'
import type { ModalProps, ModalFuncProps } from 'ant-design-vue/es'
import type { ExtButtons } from '../exaTypes'


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
  const updateVisible = (val) => (visible.value = val)
  const modalSlot = (props, ctx) =>
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
      const vm = createVNode(modalSlot, { appContext: ins.appContext })
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
