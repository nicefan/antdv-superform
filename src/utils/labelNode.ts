import { isPlainObject } from 'lodash-es'
import { h } from 'vue'
import { toNode } from './toNode'
import { getIconNode, getSemanticIconNode } from './useIcon'
import { resolveUIActionComponent } from '../adapter'

export const createLabelNode = (option, effectData) => {
  const { title, label, labelSlot, tooltip } = option
  const tipProps = tooltip && (isPlainObject(tooltip) ? tooltip : { title: tooltip })
  const _label = title || labelSlot || label
  const Tooltip = tooltip && resolveUIActionComponent('tooltip')
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
                {
                  class: 'ant-typography ant-typography-secondary',
                  style: { marginLeft: '4px' },
                },
                (tooltip.icon ? getIconNode(tooltip.icon) : getSemanticIconNode('info')) as any
              ),
          }),
      ]
}
