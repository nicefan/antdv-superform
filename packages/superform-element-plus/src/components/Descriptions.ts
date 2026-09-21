import { defineComponent, h, type PropType } from 'vue'
import { ElDescriptions, ElDescriptionsItem } from 'element-plus'
import type { UIDescriptionsProps } from 'superform/sdk'

/** 将 Core 已整理的详情状态转换为 Element Plus 原生属性与节点。 */
export default defineComponent({
  props: { state: { type: Object as PropType<UIDescriptionsProps>, required: true } },
  setup(props) {
    return () => {
      const state = props.state
      return h(
        ElDescriptions,
        {
          ...state.attrs,
          column: state.column,
          border: state.mode === 'table' ? true : state.attrs.border,
          direction: state.layout || state.attrs.direction,
          size: state.size === 'small' || state.size === 'large' || state.size === 'default' ? state.size : undefined,
        },
        {
          default: () =>
            state.rows.flatMap((row) =>
              row.map((item) =>
                h(
                  ElDescriptionsItem,
                  {
                    ...item.attrs,
                    key: item.key,
                    span: item.colspan,
                  },
                  { label: item.label, default: item.content }
                )
              )
            ),
        }
      )
    }
  },
})
