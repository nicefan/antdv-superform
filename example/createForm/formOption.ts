import { h, ref } from 'vue'
import { defineTable } from '../../src'
import { EditOutlined } from '@ant-design/icons-vue'

const key = ref()
export const myTableOption = defineTable({
  attrs: {
    // bordered: true,
    rowKey: 'id',
    pagination: false,
  },
  buttons: {
    // forSlot: 'tabBarExtraContent',
    actions: ['add', 'edit', 'delete'],
  },
  rowEditor: {
    // editMode: 'inline',
    addMode: 'modal',
    form: {
      attrs: { layout: 'vertical' },
      subSpan: 24,
    },
    modalProps: {
      title: ({ isNew }) => {
        return h('div', [h(EditOutlined), ' 数据' + (isNew ? '新增' : '修改')])
      },
    },
  },

  descriptionsProps: { column: 1, size: 'default', mode: 'table' },
  searchForm: {
    attrs: {
      wrapperCol: { style: 'width:100px' },
    },
    buttons: ['search', 'reset', { name: 'add', label: '新增', onClick: ({ table }) => table.add() }],
    subSpan: 6,
    limit: 3,
    subItems: ['date', 'title', 'dataType', { type: 'Input', label: '其它', field: 'other' }],
    onSubmit: (data) => {
      console.log('查询条件', data)
      return data
    },
  },
  beforeQuery(data) {
    console.log(data)
    return data
  },
  // title: 'avc',
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
          { label: '文本', value: 'text', color: 'green' },
          { label: '数字', value: 'number', color: 'blue' },
        ]),
      /** 带有options或字典的自动标签化显示，tagViewer配置为数组或对象，指定value，color, 如果值为字典序值，,即可读取全局颜色配置 */
      // viewRender:({text}) => text.replaceAll(',', ' /')
      // tagViewer: (value, data) => value==='text'? 'green': 'blue'
      // tagViewer: {text:'green', }
    },
    {
      type: 'Switch',
      label: '是否必填',
      field: 'isRequire',
      options: [
        { value: true, label: '是' },
        { value: false, label: '否' },
      ],
      editable: true,
      attrs: {
        firstIsChecked: true,
        defaultChecked: true,
      },
    },
    { type: 'InputNumber', field: 'col2', label: '数量' },
    {
      type: 'Upload',
      attrs: {
        apis: {
          download: () => new Promise((resolve, reject) => setTimeout(reject, 2000)),
        },
      },
      // hideInDescription: true,
      field: 'files',
      label: '附件',
      //  vModelFields: {fileList: 'files'}
    },
  ],
})
