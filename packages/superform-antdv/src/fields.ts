import { h } from 'vue'
import { createFieldPropsAdapter, defineFieldAdapters, type UIAdapter } from 'superform/sdk'
import TreeSelectField from './components/TreeSelectField'

export const adaptAntdvFieldProps = createFieldPropsAdapter()

export function createAntdvFields(): NonNullable<UIAdapter['fields']> {
  return defineFieldAdapters({
    TextArea: {
      defaults: { allowClear: true, style: { width: '100%' } },
    },
    InputNumber: {
      defaults: { type: 'number', style: { width: '100%' } },
    },
    AutoComplete: {
      processors: ['options'],
      defaults: { filterOption: true },
    },
    Select: {
      processors: ['options'],
      defaults: { optionFilterProp: 'label' },
    },
    Radio: { model: { prop: 'checked', event: 'update:checked' } },
    Checkbox: { model: { prop: 'checked', event: 'update:checked' } },
    RadioGroup: { processors: ['options'] },
    CheckboxGroup: { processors: ['options'] },
    // 清除 Core 通用提示兜底，使用组件库默认文案；用户 attrs.placeholder 仍优先。
    DatePicker: { defaults: { placeholder: undefined, valueFormat: 'YYYY-MM-DD' } },
    DateRangePicker: { defaults: { placeholder: undefined, valueFormat: 'YYYY-MM-DD' } },
    DateMonthPicker: { defaults: { placeholder: undefined } },
    DateQuarterPicker: { defaults: { placeholder: undefined } },
    DateWeekPicker: { defaults: { placeholder: undefined } },
    DateYearPicker: { defaults: { placeholder: undefined } },
    TimePicker: { defaults: { placeholder: undefined, valueFormat: 'HH:mm:ss' } },
    TimeRangePicker: { defaults: { placeholder: undefined, valueFormat: 'HH:mm:ss' } },
    TreeSelect: {
      processors: ['tree'],
      defaults: { allowClear: true },
      render: ({ slots, ...context }) => h(TreeSelectField, context, slots),
    },
    Switch: {
      processors: ['switch'],
      model: { prop: 'checked', event: 'update:checked' },
      adaptProps(attrs, { state }) {
        const config = state.switch
        return config
          ? {
              ...attrs,
              checkedValue: config.checked.value,
              unCheckedValue: config.unchecked.value,
              checkedChildren: config.checked.label,
              unCheckedChildren: config.unchecked.label,
            }
          : attrs
      },
    },
    Transfer: { model: { prop: 'targetKeys', event: 'update:targetKeys' } },
  })
}

export const antdvFields = createAntdvFields()
