import { ref } from 'vue'
import type { ExtFormOption } from 'superform-element-plus'

export const probe = {
  treeData: ref([
    { value: 'a', label: '节点 A' },
    { value: 'b', label: '节点 B' },
  ]),
  events: ref({
    update: 0,
    change: 0,
    schemaChange: 0,
    multiUpdate: 0,
    multiChange: 0,
    multiSchemaChange: 0,
    tabs: 0,
    collapse: 0,
  }),
  activeTab: ref('tags'),
  activeCollapse: ref<string[]>(['one']),
  hideTab: ref(false),
  disableTab: ref(false),
  showUpload: ref(true),
  failUpload: ref(false),
  uploadCalls: ref(0),
}

export const elementPlusSchema: ExtFormOption = {
  isContainer: true,
  subSpan: 12,
  subItems: [
    {
      type: 'Input',
      field: 'name',
      label: '名称',
      required: true,
      slots: { prefix: () => '业务前缀' },
    },
    {
      type: 'Select',
      field: 'city',
      labelField: 'cityLabel',
      label: '城市',
      options: { source: ['上海', '深圳', '杭州'] },
    },
    {
      type: 'TreeSelect',
      field: 'node',
      labelField: 'nodeLabel',
      label: '单选树',
      treeData: probe.treeData,
      onChange: () => probe.events.value.schemaChange++,
      attrs: {
        clearable: true,
        'onUpdate:modelValue': () => probe.events.value.update++,
        onChange: () => probe.events.value.change++,
      },
    },
    {
      type: 'TreeSelect',
      field: 'nodes',
      labelField: 'nodeLabels',
      label: '多选树',
      treeData: probe.treeData,
      onChange: () => probe.events.value.multiSchemaChange++,
      attrs: {
        multiple: true,
        clearable: true,
        'onUpdate:modelValue': () => probe.events.value.multiUpdate++,
        onChange: () => probe.events.value.multiChange++,
      },
    },
    {
      type: 'DatePicker',
      field: 'day',
      label: '单日期',
      attrs: { valueFormat: 'YYYY-MM-DD' },
    },
    {
      type: 'DateRangePicker',
      field: 'start',
      endField: 'end',
      label: '固定日期范围',
      attrs: {
        type: 'date',
        valueFormat: 'YYYY-MM-DD',
        startPlaceholder: '业务开始',
        endPlaceholder: '',
      },
    },
    {
      type: 'TimePicker',
      field: 'time',
      label: '单时间',
      attrs: { valueFormat: 'HH:mm:ss' },
    },
    {
      type: 'TimeRangePicker',
      field: 'timeStart',
      endField: 'timeEnd',
      label: '固定时间范围',
      attrs: { isRange: false, valueFormat: 'HH:mm:ss' },
    },
    { type: 'InputNumber', field: 'defaultWidth', label: '默认数量' },
    {
      type: 'InputNumber',
      field: 'customWidth',
      label: '覆盖数量',
      attrs: { style: { width: '160px' } },
    },
    {
      type: 'Switch',
      field: 'enabled',
      labelField: 'enabledLabel',
      label: '启用',
      options: {
        source: [
          { label: '停用', value: false },
          { label: '启用', value: true },
        ],
      },
    },
    {
      type: 'Upload',
      field: 'files',
      label: '提交时上传',
      hidden: () => !probe.showUpload.value,
      attrs: {
        uploadMode: 'submit',
        apis: {
          upload: async (data: FormData) => {
            // 本地模拟上传：不发送文件内容，仅返回占位地址供模型观察。
            probe.uploadCalls.value++
            await new Promise((resolve) => setTimeout(resolve, 700))
            if (probe.failUpload.value) throw new Error('模拟上传失败')
            return {
              name: (data.get('file') as File).name,
              url: 'data:text/plain,probe',
            }
          },
        },
      },
    },
    {
      type: 'Tabs',
      field: 'tabs',
      block: true,
      activeKey: probe.activeTab,
      attrs: {
        tabPosition: 'top',
        'onUpdate:modelValue': () => probe.events.value.tabs++,
      },
      slots: { extra: () => '业务 Tabs extra' },
      subItems: [
        {
          key: 'tags',
          field: 'tags',
          label: '标签输入',
          subItems: [{ type: 'TagInput', field: 'value', label: '标签' }],
        },
        {
          key: 'choices',
          field: 'choices',
          label: '标签选择',
          hidden: () => probe.hideTab.value,
          attrs: () => ({ disabled: probe.disableTab.value }),
          subItems: [
            {
              type: 'TagSelect',
              field: 'value',
              label: '方向',
              options: { source: ['表单', '适配器', '自动导入'] },
              attrs: { multiple: true },
            },
          ],
        },
      ],
    },
    {
      type: 'Collapse',
      field: 'collapse',
      block: true,
      activeKey: probe.activeCollapse,
      attrs: {
        accordion: false,
        'onUpdate:modelValue': () => probe.events.value.collapse++,
      },
      slots: { title: () => '业务 Collapse 标题' },
      subItems: [
        {
          key: 'one',
          field: 'one',
          label: '面板一',
          subItems: [{ type: 'Input', field: 'text', label: '内容一' }],
        },
        {
          key: 'two',
          field: 'two',
          label: '面板二',
          subItems: [{ type: 'Input', field: 'text', label: '内容二' }],
        },
      ],
    },
    {
      type: 'Card',
      field: 'card',
      block: true,
      label: '原标题',
      slots: { title: () => '业务 Card 标题', extra: () => '业务 Card extra' },
      subItems: [{ type: 'Input', field: 'text', label: '卡片内容' }],
    },
    {
      type: 'Group',
      block: true,
      label: '默认内容覆盖',
      slots: {
        title: () => '业务 Group 标题',
        default: () => '业务 default 内容',
      },
      subItems: [{ type: 'Input', field: 'replaced', label: '被覆盖字段' }],
    },
    {
      type: 'Tabs',
      field: 'defaultTabs',
      block: true,
      subItems: [
        {
          key: 'one',
          label: '默认应在左侧',
          subItems: [{ type: 'Input', field: 'text', label: '默认属性示例' }],
        },
        { key: 'two', label: '第二页', subItems: [] },
      ],
    },
    {
      type: 'TabList',
      field: 'tabRows',
      label: '动态页签',
      titleField: 'name',
      block: true,
      rowButtons: { labelMode: 'label' },
      columns: [{ type: 'Input', field: 'name', label: '成员', required: true }],
    },
    {
      type: 'CollapseList',
      field: 'collapseRows',
      label: '动态折叠',
      titleField: 'name',
      block: true,
      attrs: { accordion: false },
      rowButtons: { labelMode: 'label' },
      columns: [{ type: 'Input', field: 'name', label: '成员', required: true }],
    },
  ],
}
