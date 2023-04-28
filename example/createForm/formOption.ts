import { defineForm } from '../../src'
export const useFormOption = () => {
  return defineForm({
    subItems: [
      {
        type: 'Table',
        prop: 'table',
        label: '表格',
        attr: { bordered: true },
        editMode: 'inline',
        addMode: 'modal',
        buttons: {
          actions: ['add', 'edit', 'del'],
        },
        itemButtons: {
          type: 'link',
          actions: ['edit', 'del'],
        },
        columns: [
          {
            type: 'Input',
            label: '字段名',
            prop: 'fieldName',
            rules: { required: true },
          },
          {
            type: 'Input',
            label: '标题',
            prop: 'title',
            rules: { required: true },
          },
          {
            type: 'Select',
            label: '数据类型',
            prop: 'dataType',
            options: [
              { label: '文本', value: 'text' },
              { label: '数字', value: 'number' },
            ],
          },
          {
            type: 'Switch',
            label: '是否必填',
            prop: 'isRequire',
            valueLabels: ['否', '是'],
          },
          { type: 'Input', prop: 'col2', label: 'col2' },
        ],
      },
    ],
  })
}
