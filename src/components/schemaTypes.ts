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

/** 官方和第三方 Adapter 的字段由各自包声明，Core 不预设 UI 字段名。 */
export const enhancedTypes = [] as const

export const reservedSchemaTypes = new Set<string>(coreTypes)
