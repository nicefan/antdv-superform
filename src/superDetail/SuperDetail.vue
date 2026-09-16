<script lang="ts">
import { defineComponent, type PropType, ref, watch, h, provide, shallowRef, readonly, unref } from 'vue'
import { buildModelsMap } from '../utils/buildModel'
import { DetailLayout } from '../components/Detail'
import type { ExtDescriptionsOption, ExtFormOption } from '../exaTypes'
import { reportSchemaDiagnostics } from '../utils/diagnoseSchema'
import { globalConfig } from '../plugin'

export default defineComponent({
  props: {
    dataSource: Object,
    schema: Object as PropType<ExtDescriptionsOption>,
  },
  emits: ['register'],
  setup(props, ctx) {
    const option: Obj = shallowRef(props.schema || {})
    const dataRef = ref<Obj>({})
    watch(
      () => props.schema,
      (schema) => {
        if (globalConfig.schemaDiagnostics && schema) reportSchemaDiagnostics(schema, 'detail', 'SuperDetail')
        option.value = schema || {}
      },
      { immediate: true }
    )
    // Schema 替换时仍优先采用显式数据源；无新数据源时保留 setData 设置的数据。
    watch(
      () => unref(props.dataSource ?? option.value.dataSource),
      (data) => {
        if (data != null) dataRef.value = data
      },
      { immediate: true }
    )

    const exposed = {
      setOption: (_option: ExtFormOption) => {
        if (globalConfig.schemaDiagnostics) reportSchemaDiagnostics(_option, 'detail', 'SuperDetail')
        option.value = _option
      },
      setData: (data) => {
        dataRef.value = data
      },
    }

    const modelsMap = ref()
    watch(
      option,
      (opt) => {
        if (!opt?.subItems) {
          modelsMap.value = undefined
          return
        }
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
        { class: ['sup-detail', option.value.isContainer && 'sup-container'] },
        h(DetailLayout, {
          option: {
            type: 'Descriptions',
            ...option.value,
          } as any,
          ...option.value.attrs,
          ...option.value.descriptionsProps,
          modelsMap: modelsMap.value,
          isRoot: true,
        })
      )
  },
})
</script>
