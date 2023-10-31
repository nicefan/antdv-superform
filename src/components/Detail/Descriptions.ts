import { type PropType, defineComponent, h, inject } from 'vue'
import base from '../base'
import { globalProps } from '../../plugin'
import { toNode } from '../../utils';

export default defineComponent({
  props: {
    option: Object as PropType<MixWrapper>,
    items: {
      type: Array as PropType<{ label: string; span: number; content: Fn }[]>,
      required: true,
    },
    effectData: Object,
  },
  setup(props) {
    const { type, subSpan, title, label, descriptionsProps } = props.option || {}

    let presetSpan = subSpan ?? inject('subSpan', 12)
    const cols = Math.floor(24 / presetSpan)
    if (typeof descriptionsProps?.column === 'number') {
      presetSpan = Math.floor(24 / descriptionsProps.column)
    }
    const __title = type !== 'Group' ? '' : title || label
    return () =>
      h(
        base.Descriptions,
        {
          bordered: type !== 'Card',
          size: 'middle',
          ...globalProps.Descriptions,
          title: toNode(__title, props.effectData),
          column: cols,
          ...descriptionsProps,
        },
        () =>
          props.items.map((item, idx) =>
            h(
              base.DescriptionsItem,
              {
                ...globalProps.DescriptionsItem,
                label: toNode(item.label, props.effectData),
                span: Math.floor(item.span / presetSpan),
                key: idx,
              },
              item.content
            )
          )
      )
  },
})
