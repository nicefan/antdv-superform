import { ref, reactive, h, nextTick, getCurrentInstance, createVNode, onMounted, render } from 'vue'
import { ButtonGroup, ModalFuncProps } from 'ant-design-vue'
import type { VueNode } from 'ant-design-vue/es/_util/type'
import base from '../controls/override'

export function createModal(content: (() => VueNode) | VueNode, { buttons, ...config }: Obj = {}) {
  const visible = ref(false)
  const _config = reactive(config)
  const refM = ref()
  const slots: Obj = {
    default: content,
  }
  if (buttons) {
    const _buttons = Array.isArray(buttons) ? { actions: buttons } : buttons
    slots.footer = () => h(ButtonGroup, { config: _buttons, param: { modalRef: refM } })
  }
  const onOk = () =>
    Promise.resolve(_config.onOk?.()).then(() => {
      visible.value = false
    })
  const updateVisible = (val) => (visible.value = val)
  const modalSlot = () =>
    h(base.Modal, { ref: refM, visible: visible.value, 'onUpdate:visible': updateVisible, ..._config, onOk }, slots)

  const openModal = async (option?: ModalFuncProps) => {
    Object.assign(_config, option)
    visible.value = true
    return nextTick()
  }
  return {
    modalSlot,
    openModal,
  }
}

export function useModal(
  content: () => VueNode,
  config: ModalFuncProps & { buttons?: ButtonItem[] | ExButtonGroup } = {}
) {
  const { modalSlot, openModal } = createModal(content, config)
  const wrap = document.createElement('div')
  const ins: any = getCurrentInstance() // || currentInstance
  // currentInstance = currentInstance || ins
  const vm = createVNode(modalSlot)
  vm.appContext = ins?.appContext // 这句很关键，关联起了数据
  onMounted(() => render(vm, wrap))

  return {
    openModal,
  }
}
