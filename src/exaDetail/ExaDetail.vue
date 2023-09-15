<script lang="ts">
import { defineComponent, PropType, ref, watch, h, provide, reactive, shallowReactive, readonly } from 'vue'
import { buildModelsMap } from '../utils/buildModel'
import { DetailLayout } from '../components/Detail'

export default defineComponent({
  name: 'ExaTable',
  inheritAttrs: false,
  props: {
    dataSource: Object,
    option: Object as PropType<ExFormOption>,
  },
  emits: ['register'],
  setup(props, ctx) {
    const dataRef = ref(props.dataSource || {})
    const option: Obj = shallowReactive(props.option || {})

    const exposed = {
      setOption: (_option: ExFormOption) => {
        Object.assign(option, _option)
      },
      setData: (data) => {
        dataRef.value = data
      },
    }
    watch(() => props.dataSource, exposed.setData)

    const modelsMap = ref()
    watch(
      option,
      (opt) => {
        if (!opt?.subItems) return
        const data = buildModelsMap(opt.subItems, dataRef)
        modelsMap.value = data.modelsMap
      },
      { immediate: true }
    )
    ctx.expose(exposed)

    ctx.emit('register', exposed)
    provide('exaProvider', readonly({ data: dataRef }))

    provide('rootSlots', ctx.slots)

    return () =>
      modelsMap.value &&
      h(
        'div',
        { class: ['exa-form exa-detail', option.isContainer && 'exa-container'] },
        h(DetailLayout, { option: option as any, modelsMap: modelsMap.value })
      )
  },
})
</script>
