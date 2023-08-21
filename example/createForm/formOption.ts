import { defineTable } from '../../src'
export const myTableOption = defineTable({
  attrs: { bordered: true },
  // editMode: 'inline',
  addMode: 'modal',
  buttons: {
    actions: ['add', 'edit', 'del'],
  },
  rowButtons: {
    buttonType: 'link',
    actions: ['edit', 'del'],
  },
  formSechma: {
    attrs: {
      layout: 'vertical',
    },
    subSpan: 24,
  },
  searchSechma: {
    attrs: {
      labelCol: { span: 6 },
    },
    buttons: ['submit', 'reset', { label: '新增', onClick: ({ table }) => table.add() }],
    subSpan: 8,
    subItems: ['fieldName', 'title', 'tip', { type: 'Input', label: '其它', field: 'other' }],
  },
  columns: [
    {
      type: 'Input',
      label: '字段名',
      field: 'fieldName',
      rules: { required: true },
    },
    {
      type: 'Input',
      label: '标题',
      field: 'title',
      rules: { required: true },
    },
    {
      type: 'Input',
      label: '说明',
      field: 'tip',
      hideInTable: true,
      rules: { required: true },
    },
    {
      type: 'Select',
      label: '数据类型',
      field: 'dataType',
      options: [
        { label: '文本', value: 'text' },
        { label: '数字', value: 'number' },
      ],
    },
    {
      type: 'Switch',
      label: '是否必填',
      field: 'isRequire',
      valueLabels: ['否', '是'],
    },
    { type: 'Input', field: 'col2', label: 'col2' },
  ],
})
