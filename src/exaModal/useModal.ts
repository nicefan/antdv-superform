import { ref, reactive, h, nextTick, getCurrentInstance, createVNode, onMounted, render } from 'vue'
import { ModalFuncProps } from 'ant-design-vue'
import type { VueNode } from 'ant-design-vue/es/_util/type'
import base from '../controls/override'
import { ButtonGroup } from '../controls'

export function createModal(content: (() => VueNode) | VueNode, { buttons, ...config }: Obj = {}) {
  const visible = ref(false)
  const _config = reactive(config)
  const modalRef = ref()
  const slots: Obj = {
    default: content,
  }
  if (buttons) {
    const _buttons = Array.isArray(buttons) ? { actions: buttons } : buttons
    slots.footer = () => h(ButtonGroup, { config: _buttons, param: { modalRef } })
  }
  const onOk = () =>
    Promise.resolve(_config.onOk?.()).then(() => {
      visible.value = false
    })
  const updateVisible = (val) => (visible.value = val)
  const modalSlot = (props, ctx) =>
    h(
      base.Modal,
      { ref: modalRef, visible: visible.value, 'onUpdate:visible': updateVisible, ..._config, ...props, onOk },
      { ...ctx?.slots, ...slots }
    )

  const openModal = async (option?: ModalFuncProps) => {
    Object.assign(_config, option)
    visible.value = true
    return nextTick()
  }
  const closeModal = () => {
    visible.value = false
    return nextTick()
  }
  const setModal = (option?: ModalFuncProps) => {
    Object.assign(_config, option)
  }
  return {
    modalRef,
    modalSlot,
    setModal,
    closeModal,
    openModal,
  }
}

export function useModal(
  content: () => VueNode,
  config: ModalFuncProps & { buttons?: ButtonItem[] | ExButtonGroup } = {}
) {
  const { modalSlot, openModal, modalRef, closeModal, setModal } = createModal(content, config)
  const ins: any = getCurrentInstance() // || currentInstance

  const open = (option?: ModalFuncProps) => {
    if (modalRef.value) {
      return openModal(option)
    } else {
      const wrap = document.createElement('div')
      // currentInstance = currentInstance || ins
      const vm = createVNode(modalSlot)
      vm.appContext = ins?.appContext // 这句很关键，关联起了数据

      render(vm, wrap)
      return nextTick(() => openModal(option))
    }
  }

  return {
    openModal: open,
    modalSlot,
    closeModal,
    setModal,
  }
}
