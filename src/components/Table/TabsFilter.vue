<script lang="ts">
import baseComps from '../base'

import { useOptions } from '../../utils/useOptions'
import { h, computed, defineComponent, ref, toRef } from 'vue'
import { toNode, useInnerSlots } from '../../utils'

export default defineComponent({
  props: {
    effectData: Object,
    options: null as any,
    bordered: Boolean,
    /** 字典名称 */
    dictName: String,
    /** 选项中的value使用label */
    valueToLabel: Boolean,
    activeKey: [String, Number, Object],
    defaultActiveKey: [String, Number],
    customTab: Function,
    slots: Object,
  },
  emits: ['update:activeKey'],
  setup(props, { attrs, slots, emit }) {
    const { Card, Tabs, TabPane } = baseComps
    const { optionsRef } = useOptions(props, props.options, props.effectData)
    const activeKey = ref(props.activeKey ?? props.defaultActiveKey) as Ref<string | number | undefined>
    const updateActiveKey = (key) => {
      activeKey.value = key
      emit('update:activeKey', key)
    }
    const {
      default: innerContent,
      extra,
      rightExtra,
      tabBarExtraContent,
      tabBarExtra,
      title,
      titleBar,
      ..._slots
    } = slots
    const innerSlots = useInnerSlots(props.slots)
    const tabBarExtraSlot = tabBarExtra || rightExtra || tabBarExtraContent
    const tabList = computed(() => {
      const list = optionsRef.value.map(({ value, label, ...item }) => ({
        ...item,
        key: item.key ?? value,
        tab: item.tab ?? label,
      }))
      if (activeKey.value === undefined) {
        updateActiveKey(list[0]?.key)
      }
      return list
    })
    const customTab = (item) =>
      toNode(innerSlots.customTab || props.customTab || item.tab, { ...props.effectData, item })
    if (props.bordered) {
      return () =>
        h(
          Card,
          {
            tabList: tabList.value,
            activeTabKey: activeKey.value as string,
            onTabChange: updateActiveKey,
          },
          {
            ..._slots,
            default: innerContent,
            customTab,
            title,
            tabBarExtraContent: tabBarExtraSlot || (!title ? extra : undefined),
            extra: tabBarExtraSlot || title ? extra : undefined,
            ...innerSlots,
          }
        )
    } else {
      return () => [
        title ? titleBar?.() : null,
        h(
          Tabs,
          {
            ...attrs,
            activeKey: activeKey.value,
            'onUpdate:activeKey': updateActiveKey,
          },
          {
            ..._slots,
            default: () => tabList.value.map((item) => h(TabPane, { ...item, tab: () => customTab(item) })),
            rightExtra: tabBarExtraSlot || (!title ? extra : undefined),
            ...innerSlots,
          }
        ),
        innerContent?.(),
      ]
    }
  },
})
</script>
