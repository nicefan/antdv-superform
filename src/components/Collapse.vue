<script lang="tsx">
import { defineComponent, h, reactive, ref, toRef, unref, type PropType, type Ref } from 'vue'
import { useControl, getEffectData, toNode } from '../utils'
import { ButtonGroup } from './buttons'
import Collections from './Collections'
import { DetailLayout } from './Detail'
import { getUIRender } from '../adapter'

export default defineComponent({
  name: 'ExCollapse',
  inheritAttrs: false,
  props: {
    option: { type: Object as PropType<GetOption<'Collapse'>>, required: true },
    model: { type: Object as PropType<ModelDataGroup<GetOption<'Collapse'>['subItems'][number]>>, required: true },
    effectData: { type: Object as PropType<Obj>, required: true },
    isView: Boolean,
  },
  setup(props, { attrs: rootAttrs, slots }) {
    const title = props.option.title || props.option.label
    const panels = [...props.model.children].map(([option, model], idx) => {
      const effectData = getEffectData({
        parent: props.effectData,
        current: toRef(props.model, 'parent'),
        field: model.refName,
        value: model.refData,
      })
      const {
        hidden,
        attrs: { disabled, ...attrs },
      } = useControl({ option, effectData })
      const { key, field } = option as typeof option & { key?: string }
      return {
        attrs: reactive(attrs),
        option,
        effectData,
        model,
        header: () => [option.icon?.(), toNode(option.label, effectData)],
        key: key || field || String(idx),
        hidden,
        disabled,
      }
    })
    const activeKey: Ref<string | number | (string | number)[] | undefined> = ref(
      props.option.activeKey || panels[0]?.key
    )

    return () =>
      getUIRender('collapse')({
        attrs: rootAttrs,
        slots,
        content: slots.default,
        title: slots.title || (title ? () => toNode(title, props.effectData) : undefined),
        activeKeys: activeKey.value,
        onActiveChange: (value) => {
          activeKey.value = value
        },
        items: panels
          .filter(({ hidden }) => !hidden.value)
          .map(({ attrs, option, disabled, model, header, effectData, key }) => ({
            key,
            attrs,
            title: header,
            disabled: unref(disabled),
            extra:
              !props.isView && option.buttons
                ? () => h(ButtonGroup, { option: option.buttons!, effectData })
                : undefined,
            content: () =>
              props.isView
                ? h(DetailLayout, { option, modelsMap: model.children, effectData })
                : h(Collections, { option, model, effectData }),
          })),
      })
  },
})
</script>
