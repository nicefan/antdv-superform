/** Core 固定解析的容器、复合字段和特殊渲染类型。 */
export const coreTypes = [
  'Form',
  'Group',
  'Card',
  'List',
  'ListGroup',
  'Tabs',
  'Table',
  'Collapse',
  'Descriptions',
  'Fragment',
  'Buttons',
  'Hidden',
  'InputSlot',
  'InfoSlot',
  'Text',
  'HTML',
  'Upload',
  'InputGroup',
  'InputList',
  'TagInput',
  'TagSelect',
] as const

/** 内置 AntDV Adapter 已绑定 Core 处理器的真实组件名。 */
export const enhancedTypes = [
  'Input',
  'AutoComplete',
  'Select',
  'RadioGroup',
  'CheckboxGroup',
  'DatePicker',
  'DateRangePicker',
  'TimePicker',
  'TimeRangePicker',
  'TreeSelect',
  'Switch',
] as const

export const reservedSchemaTypes = new Set<string>([...coreTypes, ...enhancedTypes])
