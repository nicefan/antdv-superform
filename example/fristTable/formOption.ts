import { h, ref } from 'vue'
import { defineTable } from '../../src'
import { EditOutlined } from '@ant-design/icons-vue'
import { Modal } from 'ant-design-vue'

export const getTableOption = () => {
  const typeDict = [
    { label: '文本', value: 'text', color: 'green' },
    { label: '数字', value: 'number', color: 'blue' },
  ]
  const type = ref()
  return defineTable({
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
            console.log(data)
            Modal.info({content: JSON.stringify(data.record)})
          },
          disabled: (data) => {
            return !data.record.isRequire
          },
        },
      ],
    },
    tabs: {
      options: typeDict,
      bordered: true,
      activeKey: type,
      customTab: ({ item }) => h('span', { style: 'font-size:18px' }, item.tab),
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
        type: 'Input',
        label: '标题',
        field: 'title',
        rules: { required: true },
      },
      {
        type: 'DateRange',
        label: '日期',
        field: 'date',
        keepField: 'date2',
        rules: { required: true },
      },
      {
        type: 'Select',
        label: '数据类型',
        field: 'dataType',
        // editable: true,
        rules: { required: true },
        options: () =>
          Promise.resolve([
            { label: '文本', value: 'text', color: 'green' },
            { label: '数字', value: 'number', color: 'blue' },
          ]),
        initialValue: () => type.value,
        /** 带有options或字典的自动标签化显示，tagViewer配置为数组或对象，指定value，color, 如果值为字典序值，,即可读取全局颜色配置 */
        // viewRender:({text}) => text.replaceAll(',', ' /')
        // tagViewer: (value, data) => value==='text'? 'green': 'blue'
        // tagViewer: {text:'green', }
      },
      {
        type: 'Select',
        field: 'area',
        label: '区域',
        options: ['湖南', '广东', '江西'],
        // valueToNumber: true,
        valueToString: true,
        attrs: {
          mode: 'multiple',
          style: 'width:100%'
        },
      },
      {
        type: 'Switch',
        label: '是否必填',
        field: 'isRequire',
        options: [
          { value: 0, label: '否' },
          { value: 1, label: '是' },
        ],
        // options: ['否', '是'],
        valueToNumber: true,
        editable: true,
        initialValue: 1,
        attrs: {
          // firstIsChecked: true,
          // defaultChecked: true,
        },
        onChange: ({ current, inTable, value }, e) => {
          if (inTable) {
            console.log('表格内编辑', e)
          }
        },
      },
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
      {
        type: 'Textarea',
        label: '说明',
        field: 'tip',
        span: 24,
        exclude: ['table'],
        // viewRender: (data) => {
        //   return data.text
        // },
      },
    ],
  })
}
