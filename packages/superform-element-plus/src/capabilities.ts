import { defineComponent, h, toRaw, unref } from 'vue'
import {
  ElButton,
  ElCard,
  ElCheckTag,
  ElCol,
  ElForm,
  ElFormItem,
  ElRow,
  ElSpace,
  ElTabPane,
  ElTabs,
  ElTag,
  ElTooltip,
} from 'element-plus'
import { toNode, type UIAdapter } from 'superform/sdk'

const AddIcon = defineComponent({
  name: 'SuperFormElementPlusAddIcon',
  setup: () => () => h('span', { 'aria-hidden': 'true' }, '+'),
})

function renderButton(button: Obj, effectData: Obj) {
  const attrs = { ...button.attrs, disabled: unref(button.attrs?.disabled) }
  if (button.render) return button.render({ props: attrs, ...effectData })
  return h(
    ElTooltip,
    { content: unref(button.tooltipTitle), disabled: !unref(button.tooltipTitle) },
    {
      default: () =>
        h(ElButton, { ...attrs, onClick: (event) => button.onClick?.(event) }, () => toNode(button.label, effectData)),
    }
  )
}

export const elementPlusCapabilities: Pick<
  UIAdapter,
  'components' | 'form' | 'layout' | 'containers' | 'icons' | 'actions' | 'presentation'
> = {
  components: {
    Form: ElForm,
    FormItem: ElFormItem,
    Row: ElRow,
    Col: ElCol,
    Space: ElSpace,
    Card: ElCard,
    Tabs: ElTabs,
    TabPane: ElTabPane,
  },
  form: {
    component: 'Form',
    item: 'FormItem',
    validate: (instance) => instance.validate(),
    clearValidate: (instance) => instance.clearValidate(),
  },
  layout: {
    row: 'Row',
    col: 'Col',
    space: 'Space',
  },
  containers: {
    card: { component: 'Card' },
    tabs: {
      component: 'Tabs',
      model: { prop: 'modelValue', event: 'update:modelValue' },
    },
    tab: {
      component: 'TabPane',
      render(component, props, slots) {
        const { label, ...rest } = props
        return h(component, rest, { ...slots, label })
      },
    },
  },
  icons: {
    semantic: { add: AddIcon },
    render(icon) {
      return typeof icon === 'string' ? h('span', icon) : icon ? h(toRaw(icon) as any) : undefined
    },
  },
  actions: {
    render(type, props, slots) {
      if (type === 'tooltip') {
        const { title, ...rest } = props
        return h(ElTooltip, { ...rest, content: title }, slots)
      }
      const { buttons, moreButtons, groupProps, effectData } = props
      return h(ElSpace, groupProps, () =>
        [...buttons, ...moreButtons].map((button) => renderButton(button, effectData))
      )
    },
  },
  presentation: {
    render(type, props, slots) {
      if (type === 'checkableTag') {
        const { selected, onSelectedChange, ...rest } = props
        return h(ElCheckTag, { ...rest, checked: selected, onChange: onSelectedChange }, slots)
      }
      const { removable, onRemove, ...rest } = props
      return h(ElTag, { ...rest, closable: removable, onClose: onRemove }, slots)
    },
  },
}
