/** 纯名称目录：供初始化与自动导入共用，不引入 UI 组件。 */
export const elementPlusFieldImports = {
  Input: 'ElInput',
  InputNumber: 'ElInputNumber',
  InputOtp: 'ElInputOtp',
  InputTag: 'ElInputTag',
  Autocomplete: 'ElAutocomplete',
  Mention: 'ElMention',
  Select: 'ElSelect',
  SelectV2: 'ElSelectV2',
  Cascader: 'ElCascader',
  TreeSelect: 'ElTreeSelect',
  Radio: 'ElRadio',
  RadioGroup: 'ElRadioGroup',
  Checkbox: 'ElCheckbox',
  CheckboxGroup: 'ElCheckboxGroup',
  Switch: 'ElSwitch',
  DatePicker: 'ElDatePicker',
  DateRangePicker: 'ElDatePicker',
  TimePicker: 'ElTimePicker',
  TimeRangePicker: 'ElTimePicker',
  TimeSelect: 'ElTimeSelect',
  ColorPicker: 'ElColorPicker',
  Rate: 'ElRate',
  Slider: 'ElSlider',
  Segmented: 'ElSegmented',
  Transfer: 'ElTransfer',
} as const

export type ElementPlusFieldName = keyof typeof elementPlusFieldImports
export const elementPlusFieldNames = Object.keys(elementPlusFieldImports) as ElementPlusFieldName[]

/** 别名注册到原始名称，同一原始组件只需动态导入一次。 */
export const elementPlusFieldAliases = {
  DateRangePicker: 'DatePicker',
  TimeRangePicker: 'TimePicker',
} as const satisfies Partial<Record<ElementPlusFieldName, ElementPlusFieldName>>
