import { Collapse } from 'antdv-next'
import { h, mergeProps } from 'vue'
import type { UIRenderers } from 'superform/sdk'
const renderCollapse: UIRenderers['collapse'] = (state) => {
  const items = state.content
    ? undefined
    : state.items.map((item) => ({
        ...item.attrs,
        key: item.key,
        // Collapse 的 items 接收节点而非插槽函数；用函数组件延迟求值，保留依赖追踪与面板懒挂载。
        label: item.title && h(item.title),
        extra: item.extra && h(item.extra),
        content: h(item.content),
        collapsible: item.disabled ? 'disabled' : item.attrs?.collapsible,
      }))
  return [
    state.title && h('div', { class: ['sup-titlebar', 'sup-title'] }, [state.title()]),
    h(
      Collapse,
      mergeProps(state.attrs || {}, {
        items,
        activeKey: state.activeKeys,
        onChange: state.onActiveChange,
      }),
      {
        ...state.slots,
        default: state.content,
      }
    ),
  ]
}
export default renderCollapse
