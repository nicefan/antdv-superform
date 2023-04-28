import {
  defineComponent,
  ref,
  reactive,
  render,
  getCurrentInstance,
  createVNode,
  inject,
  provide,
  h,
  onMounted,
} from 'vue'
import { ModalFuncProps } from 'ant-design-vue/es/modal'
import { VueNode } from 'ant-design-vue/es/_util/type'
import { innerComps } from './components'

const { Modal } = innerComps

const comp = defineComponent({
  props: {
    provides: {
      type: Object,
      default: () => {},
    },
  },
  setup(props, { expose, slots }) {
    Object.entries(props.provides).forEach(([key, value]) =>
      provide(key, value)
    )
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
    return () => (
      <Modal
        v-model={[visible.value, 'visible']}
        {...config}
        v-slots={slots}
      ></Modal>
    )
  },
})

export function useModal2(
  content?: ModalFuncProps['content'],
  config: Obj = {}
) {
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

export function createModal(
  content: (() => VueNode) | VueNode,
  config: Obj = {}
) {
  const visible = ref(false)
  const _config = reactive({ ...config })

  const onOk = () =>
    Promise.resolve(_config.onOk?.()).then(() => {
      visible.value = false
    })
  const refM = ref()
  const modalSlot = () => (
    <Modal
      ref={refM}
      v-model={[visible.value, 'visible']}
      {...{ ..._config, onOk }}
      v-slots={{ default: content }}
    ></Modal>
  )

  const openModal = (option?: ModalFuncProps) => {
    Object.assign(_config, option)
    visible.value = true
  }
  return {
    modalSlot,
    openModal,
  }
}

export function useModal(content: () => VueNode, config: Obj = {}) {
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
