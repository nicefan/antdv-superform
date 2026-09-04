import { ref } from 'vue'
import type { ExtFormOption } from 'superform'

const activeTab = ref('tags')

export const elementPlusSchema: ExtFormOption = {
  isContainer: true,
  subSpan: 12,
  buttons: {
    actions: [{ label: '保存' }, { label: '取消' }],
  },
  subItems: [
    { type: 'Input', field: 'name', label: '名称', rules: { required: true } },
    {
      type: 'Select',
      field: 'city',
      label: '城市',
      options: ['上海', '深圳', '杭州'],
    },
    {
      type: 'Switch',
      field: 'enabled',
      label: '启用',
      valueLabels: ['停用', '启用'],
    },
    { type: 'Rate', field: 'rating', label: '评分', initialValue: 3 },
    {
      type: 'Tabs',
      field: 'tabs',
      block: true,
      activeKey: activeTab,
      subItems: [
        {
          key: 'tags',
          field: 'tags',
          label: '标签输入',
          subItems: [{ type: 'TagInput', field: 'value', label: '标签', initialValue: ['Core', 'Element Plus'] }],
        },
        {
          key: 'choices',
          field: 'choices',
          label: '标签选择',
          subItems: [
            {
              type: 'TagSelect',
              field: 'value',
              label: '方向',
              options: ['表单', '适配器', '自动导入'],
              attrs: { multiple: true },
            },
          ],
        },
      ],
    },
  ],
}
