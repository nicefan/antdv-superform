import { ref } from 'vue'
import { defineTable } from '../../src'

const key = ref()
export const myTableOption = defineTable({
  attrs: {
    // bordered: true,
    rowKey: 'id',
    pagination: false,
  },
  // editMode: 'inline',
  addMode: 'modal',
  buttons: {
    // forSlot: 'tabBarExtraContent',
    actions: ['add', 'edit', 'delete'],
  },
  editForm: {
    attrs: { layout: 'vertical' },
    subSpan: 24,
  },
  descriptionsProps: { column: 1, size: 'default', mode: 'table' },
  searchForm: {
    attrs: {
      wrapperCol: { style: 'width:100px' },
    },
    buttons: ['search', 'reset', { label: '新增', onClick: ({ table }) => table.add() }],
    subSpan: 8,
    subItems: ['date', 'title', { type: 'Input', label: '其它', field: 'other' }],
  },
  beforeQuery(data) {
    console.log(data)
    return data
  },
  title: 'avc',
  params: { fieldName: 'abc', other: 'abc' },
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
        onClick: (data) => {
          data
        },
        hidden: (data) => {
          return data.record.dataType === 'number'
        },
        // disabled:(data) => {
        //   return data.record.dataType === 'number'
        // }
      },
    ],
  },
  tabs: {
    options: ['湖南', '广东'],
    valueToLabel: true,
    bordered: true,
    activeKey: key,
  },
  slots: {
    footer: 'tableFooter',
  },
  columnProps: {
    ellipsis: true,
  },
  columns: [
    { type: 'Hidden', field: 'id' },
    {
      type: 'DateRange',
      label: '日期',
      field: 'date',
      keepField: 'date2',
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
      // viewRender: (data) => {
      //   return data.text
      // },
    },
    {
      type: 'Select',
      label: '数据类型',
      field: 'dataType',
      attrs: {
        mode: 'multiple',
      },
      options: () =>
        Promise.resolve([
          { label: '文本', value: 'text' },
          { label: '数字', value: 'number' },
        ]),
      // viewRender:({text}) => text.replaceAll(',', ' /')
    },
    {
      type: 'Switch',
      label: '是否必填',
      field: 'isRequire',
      valueLabels: ['否', '是'],
    },
    { type: 'Input', field: 'col2', label: 'col2' },
    {
      type: 'Upload',
      attrs: {
        apis:{
          download: () => new Promise((resolve,reject) => setTimeout(reject, 2000))
        },
      },
      // hideInDescription: true,
      field: 'files',
      label: '附件',
      //  vModelFields: {fileList: 'files'}
    },
  ],
})
