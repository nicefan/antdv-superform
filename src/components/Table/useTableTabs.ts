import { computed, ref, watchEffect } from 'vue'
import type { RootTableOption } from '../../exaTypes'
import { useOptions } from '../../utils/useOptions'
import { toNode, useInnerSlots } from '../../utils'

/** Core 解析选项与业务上下文，Tabs、Card 及操作区的摆放交给 UI。 */
export function useTableTabs(config: RootTableOption['tabs'], effectData: Obj) {
  if (!config) return { state: undefined, slots: {} }
  const {
    field: _field, initialValue: _initialValue, options, activeKey: configuredKey, defaultActiveKey,
    bordered, customTab, slots: configuredSlots, ...attrs
  } = config
  const activeKey = ref(configuredKey ?? defaultActiveKey)
  const { optionsRef } = useOptions(options, effectData)
  const slots = useInnerSlots(configuredSlots, effectData)
  const updateKey = (key) => {
    activeKey.value = key
    attrs['onUpdate:activeKey']?.(key)
  }
  const items = computed(() => optionsRef.value.map(({ value, label, ...item }) => {
    const tab = { ...item, key: item.key ?? value, tab: item.tab ?? label }
    return { ...tab, tab: toNode(slots.customTab || customTab || tab.tab, { ...effectData, item: tab }) }
  }))
  watchEffect(() => {
    if (activeKey.value === undefined && items.value.length) updateKey(items.value[0].key)
  })
  return {
    state: computed(() => ({ bordered, attrs, items: items.value, value: activeKey.value, onValueChange: updateKey })),
    slots,
  }
}
