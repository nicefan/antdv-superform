<script lang="ts">
import { h, type PropType, defineComponent, toRef } from 'vue'
import base from '../base'
import type { TableApis } from '../../exaTypes'
import { useColumns } from './buildColumns'
import { toNode } from '../../utils'

export default defineComponent({
  name: 'SuperTable',
  inheritAttrs: false,
  props: {
    option: {
      required: true,
      type: Object as PropType<GetOption<'Table'>>,
    },
    model: {
      required: true,
      type: Object as PropType<ModelDataGroup>,
    },
    effectData: Object,
    apis: Object as PropType<TableApis>,
  },
  emits: ['register'],
  setup({ option, model, apis = {} as TableApis, effectData }, ctx) {
    const attrs: Obj = ctx.attrs
    const rowKey = attrs.rowKey || 'id'
    const orgList = toRef(model, 'refData')
    const listData = model.listData

    const columns = useColumns({ childrenMap: listData.modelsMap })

    const title = option.descriptionsProps?.title || option.title || option.label
    const titleSlot = () => title && h('div', { class: 'exa-title ant-descriptions-header' }, toNode(title))

    return () => [
      titleSlot(),
      h(base.Table, {
        dataSource: orgList.value,
        columns,
        tableLayout: 'fixed',
        bordered: true,
        pagination: false,
        ...attrs,
        rowKey,
      }),
    ]
  },
})
</script>
