<script lang="ts">
import { defineComponent, type PropType, ref, watch, h, provide, shallowRef, readonly, toRef } from 'vue'
import { buildModelsMap } from '../utils/buildModel'
import { DetailLayout } from '../components/Detail'
import type { ExtDescriptionsOption, ExtFormOption } from '../exaTypes'
import { reportSchemaDiagnostics } from '../utils'
import { globalConfig } from '../plugin'

export default defineComponent({
  props: {
    dataSource: Object,
    schema: Object as PropType<ExtDescriptionsOption>,
  },
  emits: ['register'],
  setup(props, ctx) {
    const option: Obj = shallowRef(props.schema || {})
    const dataRef = ref(props.schema?.dataSource || {})
    watch(
      () => props.schema,
      (schema) => {
        if (globalConfig.schemaDiagnostics && schema) reportSchemaDiagnostics(schema, 'detail', 'SuperDetail')
        option.value = schema || {}
        if (schema?.dataSource) dataRef.value = schema.dataSource
      },
      { immediate: true }
    )
    watch(
      () => props.dataSource,
      (data) => {
        data && (dataRef.value = data)
      },
      { immediate: true }
    )

    const exposed = {
      setOption: (_option: ExtFormOption) => {
        if (globalConfig.schemaDiagnostics) reportSchemaDiagnostics(_option, 'detail', 'SuperDetail')
        option.value = _option
        _option.dataSource && (dataRef.value = _option.dataSource)
      },
      setData: (data) => {
        dataRef.value = data
      },
    }
    // watch(() => props.dataSource, exposed.setData)

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
