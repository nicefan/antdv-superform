<script lang="ts">
import { useOptions } from '../../utils/useOptions'
import { computed, defineComponent, ref } from 'vue'
import { toNode, useInnerSlots } from '../../utils'
import { renderUITableFilter } from '../../adapter'

export default defineComponent({
  props: {
    effectData: Object,
    options: null as any,
    bordered: Boolean,
    /** 字典名称 */
    dictName: String,
    /** 使用选项 label 作为字段值 */
    labelAsValue: Boolean,
    /** @deprecated 使用 `labelAsValue` */
    valueToLabel: Boolean,
    activeKey: [String, Number, Object],
    defaultActiveKey: [String, Number],
    customTab: Function,
    slots: Object,
  },
  emits: ['update:activeKey'],
  setup(props, { attrs, slots, emit }) {
    const { optionsRef } = useOptions(
      { ...props, labelAsValue: props.labelAsValue || props.valueToLabel },
      [],
      props.effectData
    )
    const activeKey = ref(props.activeKey ?? props.defaultActiveKey) as Ref<
      string | number | undefined
    >
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
    const innerSlots = useInnerSlots(props.slots, props.effectData)
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
      toNode(innerSlots.customTab || props.customTab || item.tab, {
        ...props.effectData,
        item,
      })
    return () => [
      !props.bordered && title ? titleBar?.() : null,
      renderUITableFilter(
        {
          bordered: props.bordered,
          items: tabList.value.map((item) => ({
            ...item,
            tab: customTab(item),
          })),
          value: activeKey.value,
          onValueChange: updateActiveKey,
          attrs,
        },
        {
          ..._slots,
          ...innerSlots,
          default: innerContent,
          title,
          tabExtra: tabBarExtraSlot || (!title ? extra : undefined),
          cardExtra: tabBarExtraSlot || title ? extra : undefined,
        }
      ),
    ]
  },
})
</script>
