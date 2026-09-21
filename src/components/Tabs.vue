<script lang="tsx">
import { defineComponent, h, onMounted, reactive, ref, toRef, unref, watchEffect, type PropType } from 'vue'
import { DetailLayout } from './Detail'
import type { ExtTabItem } from '../exaTypes'
import { useControl, getEffectData, toNode } from '../utils'
import Collections from './Collections'
import { ButtonGroup } from './buttons'
import { getUIRender } from '../adapter'

export default defineComponent({
  name: 'ExTabs',
  inheritAttrs: false,
  props: {
    option: { type: Object as PropType<GetOption<'Tabs'>>, required: true },
    model: {
      type: Object as PropType<ModelDataGroup<ExtTabItem>>,
      required: true,
    },
    effectData: { type: Object as PropType<Obj>, required: true },
    isView: Boolean,
  },
  setup(props, { attrs: rootAttrs, slots }) {
    const activeKey = ref(props.option.activeKey as any)
    const paneKeys: Array<string | undefined> = []
    const updatePaneVisibility = (idx: number, key: string, invalid: boolean) => {
      paneKeys[idx] = invalid ? undefined : key
      if (invalid && activeKey.value === key) activeKey.value = paneKeys.find(Boolean)
    }

    const panes = [...props.model.children].map(([option, model], idx) => {
      const { key, field, label, icon } = option
      const effectData = getEffectData({
        parent: props.effectData,
        current: toRef(model, 'parent'),
        field: model.refName,
        value: model.refData,
      })
      const { hidden, attrs } = useControl({ option, effectData })
      const tabKey = key || field || String(idx)
      const tabLabel = () => [icon?.(), toNode(label, effectData)]
      watchEffect(() => updatePaneVisibility(idx, tabKey, unref(hidden) || unref(attrs.disabled)))
      return {
        attrs: reactive(attrs),
        key: tabKey,
        title: tabLabel,
        hidden,
        option,
        model,
        effectData,
      }
    })

    onMounted(() => {
      activeKey.value ??= paneKeys.find(Boolean)
    })

    return () =>
      getUIRender('tabs')({
        attrs: rootAttrs,
        slots,
        content: slots.default,
        activeKeys: activeKey.value,
        onActiveChange: (value) => {
          activeKey.value = value
        },
        extra:
          slots.extra ||
          (!props.isView && props.option.buttons
            ? () => h(ButtonGroup, { option: props.option.buttons!, effectData: props.effectData })
            : undefined),
        // 显隐和禁用属于 Schema 语义，两个 Adapter 消费相同的有效子项。
        items: panes
          .filter(({ hidden }) => !hidden.value)
          .map(({ attrs, key, title, option, model, effectData }) => ({
            key,
            attrs,
            title,
            disabled: unref(attrs.disabled),
            content: () =>
              props.isView
                ? h(DetailLayout, { option, modelsMap: model.children, effectData })
                : h(Collections, { option, model, effectData }),
          })),
      })
  },
})
</script>
