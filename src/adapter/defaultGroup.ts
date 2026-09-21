import { h, mergeProps } from 'vue'
import type { UIGroupState } from './types'

export function renderDefaultGroup(state: UIGroupState) {
  const content = () => h('div', state.contentAttrs, [state.content()])
  if (state.component)
    return h(
      state.component,
      {},
      {
        ...state.slots,
        title: state.title,
        actions: state.extra,
        default: content,
      }
    )
  const bottom = state.extraPlacement === 'bottom'
  return h('div', mergeProps(state.attrs || {}, { class: 'sup-group' }), [
    (state.title || (!bottom && state.extra)) &&
      h(
        'div',
        {
          class: 'sup-titlebar',
          style: { display: 'flex', alignItems: 'center' },
        },
        [
          state.title && h('div', { class: 'sup-title' }, [state.title()]),
          !bottom &&
            state.extra &&
            h(
              'div',
              {
                class: 'sup-title-buttons',
                style: { flex: 1, textAlign: state.extraAlign },
              },
              [state.extra()]
            ),
        ]
      ),
    content(),
    bottom &&
      state.extra &&
      h(
        'div',
        {
          class: 'sup-bottom-buttons',
          style: { textAlign: state.extraAlign },
        },
        [state.extra()]
      ),
  ])
}
