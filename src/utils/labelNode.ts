import { isPlainObject } from 'lodash-es'
import { h } from 'vue'
import { toNode } from './toNode'
import { getSemanticIconNode } from './useIcon'
import { renderUIAction } from '../adapter'

export const createLabelNode = (option, effectData) => {
  const { title, label, labelSlot, tooltip } = option
  const tipProps = tooltip && (isPlainObject(tooltip) ? tooltip : { title: tooltip })
  const _label = title || labelSlot || label
  return _label === undefined
    ? undefined
    : () => [
        toNode(_label, effectData),
        tooltip &&
          renderUIAction('tooltip', tipProps, {
            title: () => toNode(tooltip.title, effectData),
            default: () =>
              h(
                'span',
                {
                  class: 'sup-label-tooltip',
                },
                (tooltip.icon ? tooltip.icon() : getSemanticIconNode('info')) as any
              ),
          }),
      ]
}
