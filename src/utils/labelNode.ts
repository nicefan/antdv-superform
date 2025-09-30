import { InfoCircleOutlined } from '@ant-design/icons-vue'
import { Tooltip } from 'ant-design-vue'
import { isPlainObject } from 'lodash-es'
import { h } from 'vue'
import { toNode } from './toNode'
import { getIconNode } from './useIcon'

export const createLabelNode = (option, effectData) => {
  const { label, labelSlot, tooltip } = option
  const tipProps = tooltip && (isPlainObject(tooltip) ? tooltip : { title: tooltip })
  const _label = labelSlot || label
  return _label === undefined
    ? undefined
    : () => [
        toNode(_label, effectData),
        tooltip &&
          h(Tooltip, tipProps, {
            title: () => toNode(tooltip.title, effectData),
            default: () =>
              h(
                'a',
                { class: 'ant-typography ant-typography-secondary', style: { marginLeft: '4px' } },
                getIconNode(tooltip.icon || InfoCircleOutlined)
              ),
          }),
      ]
}
