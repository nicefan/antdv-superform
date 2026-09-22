import { Tabs } from 'antdv-next'
import { h, mergeProps } from 'vue'
import type { UIRenderers } from 'superform/sdk'

const renderTabs: UIRenderers['tabs'] = (state) => {
  // 数字与保留前缀字符串使用稳定编码；增删其它行不会改变现有面板的 key。
  const nativeKey = (key: string | number) => {
    if (state.content) return String(key)
    if (typeof key === 'number') return 'number:' + key
    return /^(number:|string:)/.test(key) ? 'string:' + key : key
  }
  const itemsByKey = new Map(state.items.map((item) => [nativeKey(item.key), item]))
  const items = state.content
    ? undefined
    : state.items.map((item) => {
        const { closeIcon, ...attrs } = item.attrs || {}
        return {
          ...attrs,
          key: nativeKey(item.key),
          label: item.title,
          content: item.content,
          disabled: item.disabled,
          closeIcon: typeof closeIcon === 'function' ? closeIcon() : closeIcon,
        }
      })
  const { tabPosition, ...tabAttrs } = state.attrs || {}
  return h(
    Tabs,
    mergeProps(tabPosition === undefined ? tabAttrs : { ...tabAttrs, tabPlacement: tabPosition }, {
      items,
      activeKey: state.activeKeys === undefined ? undefined : nativeKey(state.activeKeys),
      'onUpdate:activeKey': (key: string) => {
        const item = itemsByKey.get(key)
        if (state.content) state.onActiveChange?.(key)
        else if (item) state.onActiveChange?.(item.key)
      },
    }),
    {
      ...state.slots,
      rightExtra: state.extra || state.slots?.rightExtra,
      default: state.content,
    }
  )
}
export default renderTabs
