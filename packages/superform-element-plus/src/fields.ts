import { h } from 'vue'
import { ElButton, ElOption } from 'element-plus'
import type { FieldAdapter, UIAdapter } from 'superform/sdk'

const modelValue = { prop: 'modelValue', event: 'update:modelValue' }

function mapChangeEvent(props: Obj) {
  const { onValueChange, onChange, ...rest } = props
  return {
    ...rest,
    onChange: (value: unknown) => {
      onValueChange?.(value)
      onChange?.(value)
    },
  }
}

const inputField: FieldAdapter = {
  component: 'Input',
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

/** 字段名使用 Schema 公开的无 UI 前缀名称，实际组件由 resolver 或 uiComponents 提供。 */
export const elementPlusFields: NonNullable<UIAdapter['fields']> = {
  Input: inputField,
  InputNumber: { component: 'InputNumber', model: modelValue },
  InputOtp: { component: 'InputOtp', model: modelValue },
  InputTag: { component: 'InputTag', model: modelValue },
  Autocomplete: { component: 'Autocomplete', model: modelValue },
  Mention: { component: 'Mention', model: modelValue },
  Switch: {
    component: 'Switch',
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
  Select: {
    component: 'Select',
    processors: ['select'],
    model: { prop: 'modelValue', event: 'update:modelValue' },
    transformProps(props, { option }) {
      const { options, onValueChange, onChange, ...rest } = props
      return {
        placeholder: `请选择${option.label ?? ''}`,
        ...rest,
        options,
        onChange: (value: unknown) => {
          onValueChange?.(value)
          onChange?.(value)
        },
      }
    },
    render(component, props, _context, slots) {
      const { options = [], ...rest } = props
      return h(component, rest, {
        ...slots,
        default: () => options.map((item: Obj) => h(ElOption as any, item)),
      })
    },
  },
  SelectV2: {
    component: 'SelectV2',
    processors: ['select'],
    model: modelValue,
    transformProps(props, { option }) {
      return mapChangeEvent({ placeholder: `请选择${option.label ?? ''}`, ...props })
    },
  },
  Cascader: { component: 'Cascader', model: modelValue },
  TreeSelect: { component: 'TreeSelect', model: modelValue },
  Radio: { component: 'Radio', model: modelValue },
  RadioGroup: {
    component: 'RadioGroup',
    processors: ['radioGroup'],
    model: modelValue,
    transformProps: mapChangeEvent,
  },
  Checkbox: { component: 'Checkbox', model: modelValue },
  CheckboxGroup: {
    component: 'CheckboxGroup',
    processors: ['checkboxGroup'],
    model: modelValue,
    transformProps: mapChangeEvent,
  },
  DatePicker: {
    component: 'DatePicker',
    processors: ['picker'],
    model: modelValue,
  },
  TimePicker: {
    component: 'TimePicker',
    processors: ['picker'],
    model: modelValue,
  },
  TimeSelect: { component: 'TimeSelect', model: modelValue },
  ColorPicker: { component: 'ColorPicker', model: modelValue },
  Rate: {
    component: 'Rate',
    model: modelValue,
  },
  Slider: { component: 'Slider', model: modelValue },
  Segmented: { component: 'Segmented', model: modelValue },
  Transfer: { component: 'Transfer', model: modelValue },
}

export const elementPlusDefaults: NonNullable<UIAdapter['defaults']> = {
  FormItem: { validateEvent: true },
}
