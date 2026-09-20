import { defineComponent, ref, render, getCurrentInstance, createVNode, provide, onMounted } from 'vue'
import type { ExtModalProps } from '../exaTypes'
import { getUIRender } from '../adapter'

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
        Object.assign(config.value, _config, { onOk: porxyOk(_config.onOk) })
        visible.value = true
      },
    })
    return () =>
      getUIRender('modal')(
        {
          ...config.value,
          visible: visible.value,
          'onUpdate:visible': (value) => (visible.value = value),
        },
        slots
      )
  },
})

export function useModal2(content?: ExtModalProps['content'], config: ExtModalProps = {}) {
  const wrap = document.createElement('div')
  const ins: any = getCurrentInstance() // || currentInstance
  // currentInstance = currentInstance || ins
  const vm = createVNode(comp, { provides: ins.provides }, { default: content })
  vm.appContext = ins?.appContext // 这句很关键，关联起了数据
  onMounted(() => render(vm, wrap))

  const openModal = (option?: Partial<ExtModalProps>) => {
    // console.log(refM.value)
    // refM.value.open({..._config, ...option})
    vm.component?.exposed?.open({ ...config, ...option })
    // visible.value = true
  }
  return {
    openModal,
  }
}
