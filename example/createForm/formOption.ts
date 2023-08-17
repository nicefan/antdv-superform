import { defineTable } from '../../src'
export const myTableOption = defineTable({
  attrs: { bordered: true },
  // editMode: 'inline',
  addMode: 'modal',
  buttons: {
    actions: ['add', 'edit', 'del'],
  },
  rowButtons: {
    defaultAttrs: { type: 'link' },
    actions: ['edit', 'del'],
  },
  formSechma: {
    attrs: {
      layout: 'vertical',
    },
    wrapperCol: {
      span: 24,
    },
  },
  searchSechma: {
    attrs: {
      labelCol: { span: 6 },
    },
    wrapperCol: {
      span: 8,
    },
    subItems: ['fieldName', 'title', 'tip'],
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
      applyTo: 'Form',
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
