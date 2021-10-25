import { defineComponent, h, inject, PropType, readonly } from 'vue';
import { buildModel, useShow } from '../util'
import * as Controls from './index'

export default defineComponent({
  name: 'Collections',
  props: {
    option: {
      required: true,
      type: Object as PropType<{
        gutter?: number
        columns: UniOption[]
      }>,
    },
    modelData: {
      required: true,
      type: Object as PropType<ParentModel>,
    },
  },
  setup({ option, modelData }) {
    const { columns, gutter = 16 } = option || {}
    if (!columns?.length) return
    // 排序
    const cols = columns.sort(({ sort = 1 }, { sort: b_sort = 1 }) => sort - b_sort)
    const formData = inject('formData')
    const children = cols.map((col: any) => {
      const span = col.span ?? (col.columns || col.subItems ? 24 : 8)
      const subModel = !col.prop ? modelData : buildModel(col, modelData)
      // 元素隐藏控制
      const show = useShow(col.hide, { formData, current: readonly(subModel.parent) })
      const slot = () => h(Controls[col.type], { option: col, modelData: subModel })
      return () => show.value && <a-col span={span} v-slots={{ default: slot }} />
    })
    const slots = {
      default() {
        return children.map((node) => node())
      },
    }
    return () => <a-row gutter={gutter} v-slots={slots}></a-row>
  },
})
