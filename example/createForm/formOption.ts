import { defineTable } from '../../src'
export const myTableOption = defineTable({
  attrs: { bordered: true, rowKey: 'id' },
  // editMode: 'inline',
  addMode: 'modal',
  // buttons: {
  //   actions: ['add', 'edit', 'delete'],
  // },
  formSechma: {
    attrs: { layout: 'vertical' },
    subSpan: 24,
  },
  descriptionsProps: { column: 2, size: 'default' },
  searchSechma: {
    attrs: {
      labelCol: { span: 6 },
    },
    buttons: ['submit', 'reset', { label: '新增', onClick: ({ table }) => table.add() }],
    subSpan: 8,
    subItems: ['fieldName', 'title', { type: 'Input', label: '其它', field: 'other' }],
  },
  beforeSearch(data) {
    console.log(data)
    return data
  },
  modalProps: { width: '500px' },
  rowButtons: {
    columnProps: {
      width: 220,
    },
    actions: [
      'edit',
      'delete',
      'detail',
      {
        label: '检查',
        onClick: () => {},
        hidden: (data) => {
          return data.record.dataType === 'number'
        },
        // disabled:(data) => {
        //   return data.record.dataType === 'number'
        // }
      },
    ],
  },
  columns: [
    { type: 'Hidden', field: 'id' },
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
      type: 'Textarea',
      label: '说明',
      field: 'tip',
      span: 24,
      rules: { required: true },
      viewRender: (data) => {
        return data.text
      },
    },
    {
      type: 'Select',
      label: '数据类型',
      field: 'dataType',
      options: () =>
        Promise.resolve([
          { label: '文本', value: 'text' },
          { label: '数字', value: 'number' },
        ]),
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
