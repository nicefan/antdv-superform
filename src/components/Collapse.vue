<script lang="tsx">
import { defineComponent, h, reactive, ref, toRef, unref, type PropType } from 'vue'
import { useControl, getEffectData, toNode } from '../utils'
import { ButtonGroup } from './buttons'
import Collections from './Collections'
import { DetailLayout } from './Detail'
import { renderUIContainer } from '../adapter'

export default defineComponent({
  name: 'ExCollapse',
  inheritAttrs: false,
  props: {
    option: { type: Object as PropType<GetOption<'Collapse'>>, required: true },
    model: { type: Object as PropType<ModelDataGroup>, required: true },
    effectData: { type: Object as PropType<Obj>, required: true },
    isView: Boolean,
  },
  setup(props, { attrs: rootAttrs }) {
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
        option: { ...option, type: 'CollapsePanel' },
        effectData,
        model,
        header: () => toNode(option.label),
        key: key || field || String(idx),
        hidden,
        disabled,
      }
    })
    const activeKey = ref(props.option.activeKey || panels[0]?.key)

    return () => [
      title && h('div', { class: ['sup-titlebar', 'sup-title'] }, toNode(title, props.effectData)),
      renderUIContainer(
        'collapse',
        {
          ...rootAttrs,
          value: activeKey.value,
          'onUpdate:value': (value) => (activeKey.value = value),
        },
        {
          default: () =>
            panels.map(
              ({ attrs, hidden, option, disabled, model, header, effectData, key }) =>
                !hidden.value &&
                renderUIContainer(
                  'collapsePanel',
                  { ...attrs, key, disabled: unref(disabled) },
                  {
                    header,
                    extra: () =>
                      !props.isView && option.buttons
                        ? h(ButtonGroup, { option: option.buttons, effectData })
                        : undefined,
                    default: () =>
                      props.isView
                        ? h(DetailLayout, {
                            option,
                            modelsMap: model.children,
                            effectData,
                          })
                        : h(Collections, { option, model, effectData }),
                  }
                )
            ),
        }
      ),
    ]
  },
})
</script>
