import { PropType, defineComponent, h, inject } from 'vue'
import base from '../base'
import { globalProps } from '../../plugin'

export default defineComponent({
  props: {
    option: Object as PropType<MixWrapper>,
    items: {
      type: Array as PropType<{ label: string; span: number; content: Fn }[]>,
      required: true,
    },
  },
  setup(props) {
    const { type, subSpan, title, label, descriptionsProps } = props.option || {}

    const presetSpan = subSpan ?? inject('subSpan', 12)
    const cols = Math.floor(24 / presetSpan)
    const __title = type && ['Table', 'List', 'Collapse', 'Tabs'].includes(type) ? '' : title || label
    return () =>
      h(
        base.Descriptions,
        {
          bordered: true,
          size: 'middle',
          ...globalProps.Descriptions,
          title: __title,
          column: cols,
          ...descriptionsProps,
        },
        () =>
          props.items.map((item, idx) =>
            h(
              base.DescriptionsItem,
              {
                ...globalProps.DescriptionsItem,
                label: item.label,
                span: Math.floor(item.span / presetSpan),
                key: idx,
              },
              item.content
            )
          )
      )
  },
})
