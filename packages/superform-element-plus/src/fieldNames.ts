/** 纯名称目录：供初始化与自动导入共用，不引入 UI 组件。 */
export const elementPlusFieldImports = {
  Input: 'ElInput',
  TextArea: 'ElInput',
  InputPassword: 'ElInput',
  InputSearch: 'ElInput',
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

/** 同一导出名只选择一个注册入口；该关系由目录推导，不再手写别名。 */
const registrations = new Map<string, ElementPlusFieldName>()
export const elementPlusFieldSources = Object.fromEntries(
  elementPlusFieldNames.map((name) => {
    const exported = elementPlusFieldImports[name]
    const source = registrations.get(exported) ?? name
    registrations.set(exported, source)
    return [name, source]
  })
) as Record<ElementPlusFieldName, ElementPlusFieldName>
