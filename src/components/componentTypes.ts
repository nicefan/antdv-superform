export const containers = [
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
]

/** 不包裹外层 FormItem，但不一定默认独占一行的组件。 */
export const independentTypes = [...containers, 'InputGroup', 'InputList']

export const formItemTypes = [
  'Textarea',
  'Input',
  'InputNumber',
  'InputGroup',
  'InputList',
  'AutoComplete',
  'Select',
  'Switch',
  'DateRange',
  'TimeRange',
  'DatePicker',
  'TimePicker',
  'Radio',
  'Checkbox',
  'TreeSelect',
  'Upload',
  'TagInput',
  'TagSelect',
]
