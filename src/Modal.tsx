import { defineComponent, ref, reactive, render, getCurrentInstance, createVNode, inject, provide, h, onMounted } from 'vue';
import { ModalFuncProps } from 'ant-design-vue/es/modal'

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
    return () => <a-modal v-model={[visible.value, 'visible']} {...config} v-slots={slots}></a-modal>
  },
})
let currentInstance
export function useModal2(content?: ModalFuncProps['content'], config: Obj = {}) {

  const wrap = document.createElement('div')
  const ins:any = getCurrentInstance() // || currentInstance
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
export function useModal(content, config: Obj = {}) {
  const visible = ref(false)
  const _config = reactive({ ...config })

  const onOk = () =>
    Promise.resolve(_config.onOk?.()).then(() => {
      visible.value = false
    })
  const refM = ref()
  const slot = () => (
    <a-modal
      ref={refM}
      v-model={[visible.value, 'visible']}
      {...{ ..._config, onOk }}
      v-slots={{ default: () => h(content) }}
    ></a-modal>
  )

  const wrap = document.createElement('div')
  const ins: any = getCurrentInstance() // || currentInstance
  // currentInstance = currentInstance || ins
  const vm = createVNode(slot)
  vm.appContext = ins?.appContext // 这句很关键，关联起了数据
  onMounted(() => render(vm, wrap))

  const openModal = (option?: ModalFuncProps) => {
    Object.assign(_config, option)
    visible.value = true
  }
  return {
    openModal,
  }
}
