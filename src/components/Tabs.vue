<script lang="tsx">
import { defineComponent, h, onMounted, reactive, ref, toRef, unref, watchEffect, type PropType } from 'vue'
import { DetailLayout } from './Detail'
import type { ExtTabItem } from '../exaTypes'
import { getIconNode, useControl, getEffectData, toNode } from '../utils'
import Collections from './Collections'
import { ButtonGroup } from './buttons'
import { renderUIContainer } from '../adapter'

export default defineComponent({
  name: 'ExTabs',
  props: {
    option: { type: Object as PropType<GetOption<'Tabs'>>, required: true },
    model: {
      type: Object as PropType<ModelDataGroup<ExtTabItem>>,
      required: true,
    },
    effectData: { type: Object as PropType<Obj>, required: true },
    isView: Boolean,
  },
  setup(props) {
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
      const tabLabel = () => [getIconNode(icon), toNode(label, effectData)]
      watchEffect(() => updatePaneVisibility(idx, tabKey, unref(hidden) || unref(attrs.disabled)))
      return {
        attrs: reactive({ ...attrs, key: tabKey, label: tabLabel }),
        hidden,
        option: { ...option, type: 'TabPane' },
        model,
        effectData,
      }
    })

    onMounted(() => {
      activeKey.value ??= paneKeys.find(Boolean)
    })

    return () =>
      renderUIContainer(
        'tabs',
        {
          value: activeKey.value,
          'onUpdate:value': (value) => (activeKey.value = value),
        },
        {
          extra: () =>
            !props.isView && props.option.buttons ? h(ButtonGroup, { option: props.option.buttons }) : undefined,
          default: () =>
            panes.map(
              ({ attrs, hidden, option, model, effectData }) =>
                !hidden.value &&
                renderUIContainer('tab', attrs, {
                  default: () =>
                    props.isView
                      ? h(DetailLayout, {
                          option,
                          modelsMap: model.children,
                          effectData,
                        })
                      : h(Collections, { option, model, effectData }),
                })
            ),
        }
      )
  },
})
</script>
