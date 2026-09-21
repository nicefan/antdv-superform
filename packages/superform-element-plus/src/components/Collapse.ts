import { ElCollapse, ElCollapseItem } from 'element-plus'
import { h, mergeProps } from 'vue'
import type { UIRenderers } from 'superform/sdk'
const renderCollapse: UIRenderers['collapse'] = (state) => {
  return [
    state.title && h('div', { class: ['sup-titlebar', 'sup-title'] }, [state.title()]),
    h(
      ElCollapse,
      mergeProps(state.attrs || {}, {
        modelValue: state.activeKeys,
        'onUpdate:modelValue': state.onActiveChange,
      }),
      {
        ...state.slots,
        default:
          state.content ||
          (() =>
            state.items.map((item) =>
              h(
                ElCollapseItem,
                {
                  ...item.attrs,
                  key: item.key,
                  name: item.key,
                  disabled: item.disabled,
                },
                {
                  title: () => [
                    item.title?.(),
                    item.extra &&
                      h(
                        'span',
                        {
                          style: { marginLeft: 'auto' },
                          onClick: (event: Event) => event.stopPropagation(),
                        },
                        [item.extra()]
                      ),
                  ],
                  default: item.content,
                }
              )
            )),
      }
    ),
  ]
}
export default renderCollapse
