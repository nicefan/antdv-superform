import { defineComponent, ref, reactive, render, getCurrentInstance, createVNode, provide, onMounted, h, nextTick } from 'vue'
import { ModalFuncProps } from 'ant-design-vue/es'
import { VueNode } from 'ant-design-vue/es/_util/type'
import base from './controls/override'
import { ButtonGroup } from './controls/buttons'

const comp = defineComponent({
  props: {
    provides: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { expose, slots }) {
    Object.entries(props.provides).forEach(([key, value]) => provide(key, value))
    const visible = ref(false)
    const porxyOk = (orgOk) => () =>
      Promise.resolve(orgOk?.()).then(() => {
        visible.value = false
      })
    const config = ref<Obj>({})
    expose({
      open(_config) {
        Object.assign(config, _config, { onOk: porxyOk(_config.onOk) })
        visible.value = true
      },
    })
    return () => <base.Modal v-model={[visible.value, 'visible']} {...config} v-slots={slots}></base.Modal>
  },
})

export function useModal2(content?: ModalFuncProps['content'], config: Obj = {}) {
  const wrap = document.createElement('div')
  const ins: any = getCurrentInstance() // || currentInstance
  // currentInstance = currentInstance || ins
  const vm = createVNode(comp, { provides: ins.provides }, { default: content })
  vm.appContext = ins?.appContext // 这句很关键，关联起了数据
  onMounted(() => render(vm, wrap))

  const openModal = (option?: ModalFuncProps) => {
    // console.log(refM.value)
    // refM.value.open({..._config, ...option})
    vm.component?.exposed?.open({ ...config, ...option })
    // visible.value = true
  }
  return {
    openModal,
  }
}

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
  const modalSlot = () => (
    <base.Modal ref={refM} v-model={[visible.value, 'visible']} {...{ ..._config, onOk }} v-slots={slots}></base.Modal>
  )

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
