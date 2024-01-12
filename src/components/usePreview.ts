import { createVNode, getCurrentInstance, h, nextTick, onUnmounted, reactive, ref, render } from 'vue'
import PreviewVue from './Preview.vue'

export default function (config?: Obj) {
  const visible = ref<boolean>(false)
  const __config = reactive({
    visible,
    images: [] as string[],
    'onUpdate:value': (val) => (visible.value = val),
    ...config,
  })
  const isUnmounted = ref(false)
  const slot = () => !isUnmounted.value && h(PreviewVue, __config)
  const ins: any = getCurrentInstance() // || currentInstance
  onUnmounted(() => {
    isUnmounted.value = true
  })
  let vm
  const open = (option: any) => {
    if (typeof option === 'string') {
      __config.images = [option]
    } else if (Array.isArray(option)) {
      __config.images = [...option]
    } else {
      const { src, ...other } = option || {}
      if (src) __config.images = [src]
      Object.assign(__config, other)
    }
    if (!vm) {
      const wrap: any = document.createElement('div')
      // currentInstance = currentInstance || ins
      vm = createVNode(slot, { appContext: ins?.appContext })
      vm.appContext = ins?.appContext // 这句很关键，关联起了数据

      render(vm, wrap)
    }
    nextTick(() => (visible.value = true))
  }
  return { open }
}
