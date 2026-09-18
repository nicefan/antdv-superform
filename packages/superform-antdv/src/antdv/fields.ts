import {
  combineFieldHandlers,
  createFieldPropsAdapter,
  defineFieldAdapters,
  type UIAdapter,
} from 'superform/sdk'

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
    DatePicker: { defaults: { placeholder: undefined } },
    DateRangePicker: { defaults: { placeholder: undefined } },
    DateMonthPicker: { defaults: { placeholder: undefined } },
    DateQuarterPicker: { defaults: { placeholder: undefined } },
    DateWeekPicker: { defaults: { placeholder: undefined } },
    DateYearPicker: { defaults: { placeholder: undefined } },
    TimePicker: { defaults: { placeholder: undefined } },
    TimeRangePicker: { defaults: { placeholder: undefined } },
    TreeSelect: {
      processors: ['tree'],
      defaults: { allowClear: true },
      adaptProps: (attrs, { state, binding }) => ({
        ...attrs,
        ...(state.treeData !== undefined && { treeData: state.treeData }),
        ...(binding['onUpdate:labelValue'] && {
          onChange: combineFieldHandlers(
            (value, labels) =>
              binding['onUpdate:labelValue'](Array.isArray(value) ? labels : Array.isArray(labels) ? labels[0] : labels),
            attrs.onChange
          ),
        }),
      }),
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

export const antdvDefaults: NonNullable<UIAdapter['defaults']> = {
  FormItem: { validateFirst: true },
  Table: { size: 'small' },
  TimePicker: { valueFormat: 'HH:mm:ss' },
  TimeRangePicker: { valueFormat: 'HH:mm:ss' },
  DatePicker: { valueFormat: 'YYYY-MM-DD' },
  DateRangePicker: { valueFormat: 'YYYY-MM-DD' },
}
