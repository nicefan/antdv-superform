import { h } from 'vue'
import { ElButton, ElOption } from 'element-plus'
import type { FieldAdapter, UIAdapter } from 'superform/sdk'

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
        (() => h(ElButton, { loading: searchLoading, onClick: () => props.onSearch?.(props.modelValue) }, () => '搜索')),
    })
  },
}

/** 字段名使用 Schema 公开的无 UI 前缀名称，实际组件由 resolver 或 uiComponents 提供。 */
export const elementPlusFields: NonNullable<UIAdapter['fields']> = {
  Input: inputField,
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
  Rate: {
    component: 'Rate',
    model: { prop: 'modelValue', event: 'update:modelValue' },
  },
}

export const elementPlusDefaults: NonNullable<UIAdapter['defaults']> = {
  FormItem: { validateEvent: true },
}
