import { defineComponent, h, toRaw, unref } from 'vue'
import {
  ElButton,
  ElCard,
  ElCheckTag,
  ElCol,
  ElForm,
  ElFormItem,
  ElInput,
  ElOption,
  ElRow,
  ElSelect,
  ElSpace,
  ElSwitch,
  ElTabPane,
  ElTabs,
  ElTag,
  ElTooltip,
} from 'element-plus'
import type { FieldAdapter, UIAdapter } from './types'
import { toNode } from '../utils/toNode'
import './element-plus/schemaTypes'

const AddIcon = defineComponent({
  name: 'ElementPlusAddIcon',
  setup: () => () => h('span', { 'aria-hidden': 'true' }, '+'),
})

const inputField: FieldAdapter = {
  component: 'ElInput',
  model: { prop: 'modelValue', event: 'update:modelValue' },
  processors: ['input'],
  transformProps(props, { option }) {
    return { placeholder: `请输入${option.label ?? ''}`, ...props }
  },
  render(component, props, _context, slots) {
    const { search, searchLoading, ...rest } = props
    if (!search) return h(component, rest, slots)
    return h(component, rest, {
      ...slots,
      append:
        slots.append ||
        (() =>
          h(ElButton, { loading: searchLoading, onClick: () => props.onSearch?.(props.modelValue) }, () => '搜索')),
    })
  },
}

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

/** P005 的真实第二 Adapter，只覆盖本阶段要求的表单、容器和复合字段能力。 */
export const elementPlusAdapter: UIAdapter = {
  name: 'element-plus-p005',
  components: {
    Input: ElInput,
    ElInput,
    ElSwitch,
    ElSelect,
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
  fields: {
    // Input 是 TagInput 使用的内部语义原语；外部 Schema 使用真实名称 ElInput。
    Input: { ...inputField, component: 'Input' },
    ElInput: inputField,
    ElSwitch: {
      component: 'ElSwitch',
      processors: ['switch'],
      model: { prop: 'modelValue', event: 'update:modelValue' },
      transformProps(props) {
        const { trueValue, falseValue, trueLabel, falseLabel, ...rest } = props
        return {
          ...rest,
          activeValue: trueValue,
          inactiveValue: falseValue,
          activeText: trueLabel,
          inactiveText: falseLabel,
        }
      },
    },
    ElSelect: {
      component: 'ElSelect',
      processors: ['select'],
      model: { prop: 'modelValue', event: 'update:modelValue' },
      transformProps(props, { option }) {
        const { options, onValueChange, onChange, ...rest } = props
        return {
          placeholder: `请选择${option.label ?? ''}`,
          ...rest,
          options,
          onChange: (value) => {
            onValueChange?.(value)
            onChange?.(value)
          },
        }
      },
      render(component, props, _context, slots) {
        const { options, ...rest } = props
        return h(component, rest, {
          ...slots,
          default: () => options.map((item) => h(ElOption, item)),
        })
      },
    },
  },
  defaults: {
    FormItem: { validateEvent: true },
  },
}

export default elementPlusAdapter
