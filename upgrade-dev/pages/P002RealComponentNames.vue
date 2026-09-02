<template>
  <section class="test-page">
    <header>
      <div>
        <p>P002 · 命名统一已完成</p>
        <h2>UI Schema 使用真实组件名</h2>
      </div>
      <strong>{{ checksPassed ? '命名与处理器检查通过' : '仍有配置异常' }}</strong>
    </header>

    <article>
      <p>
        本页使用真实 UI 组件名，覆盖 Picker 范围拆分、options 归一化、标签同步、Switch 值映射、 TreeSelect 异步数据和
        Input 搜索渲染。
      </p>
      <SuperForm :schema="schema" />
      <pre>{{ model }}</pre>
    </article>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { SuperForm, getUIAdapter, getUIFieldAdapter } from '../../src'
import type { ExtFormOption } from '../../src'

const adapter = getUIAdapter()
const aliasesRemoved = computed(() => ['Textarea', 'DateRange', 'TimeRange'].every((name) => !adapter.components[name]))
const pickerConfigured = computed(() =>
  ['DatePicker', 'DateRangePicker', 'TimePicker', 'TimeRangePicker'].every((name) =>
    getUIFieldAdapter(name)?.processors?.includes('picker')
  )
)
const enhancedFieldsConfigured = computed(() =>
  [
    ['Input', 'input'],
    ['AutoComplete', 'autoComplete'],
    ['Select', 'select'],
    ['RadioGroup', 'radioGroup'],
    ['CheckboxGroup', 'checkboxGroup'],
    ['TreeSelect', 'treeSelect'],
    ['Switch', 'switch'],
  ].every(([name, processor]) => getUIFieldAdapter(name)?.processors?.includes(processor))
)
const checksPassed = computed(() => aliasesRemoved.value && pickerConfigured.value && enhancedFieldsConfigured.value)
const model = reactive({
  remark: '真实组件名验证',
  count: 1,
  keyword: '',
  status: 'draft',
  statusName: '草稿',
  enabled: 1,
  enabledName: '启用',
  node: undefined,
  nodeName: undefined,
  dateStart: '2026-09-01',
  dateEnd: '2026-09-02',
  timeStart: '09:00:00',
  timeEnd: '18:00:00',
  level: 'normal',
  features: ['schema'],
})
const schema: ExtFormOption = {
  isContainer: true,
  dataSource: model,
  subItems: [
    { type: 'TextArea', field: 'remark', label: '说明', span: 12 },
    { type: 'InputNumber', field: 'count', label: '数量', span: 12 },
    {
      type: 'Rate',
      field: 'rating',
      label: '评分',
      initialValue: 3,
      attrs: {
        allowHalf: true,
      },
    },
    {
      type: 'Input',
      field: 'keyword',
      label: '搜索输入',
      onSearch: async () => Promise.resolve(),
      span: 12,
    },
    {
      type: 'Select',
      field: 'status',
      labelField: 'statusName',
      label: '状态',
      options: ['草稿', '发布'].map((label, index) => ({
        label,
        value: index ? 'published' : 'draft',
      })),
      span: 12,
    },
    {
      type: 'Switch',
      field: 'enabled',
      labelField: 'enabledName',
      label: '启用状态',
      options: [
        { label: '停用', value: 0 },
        { label: '启用', value: 1 },
      ],
      span: 12,
    },
    {
      type: 'TreeSelect',
      field: 'node',
      labelField: 'nodeName',
      label: '异步节点',
      treeData: async () => [{ label: '根节点', value: 'root' }],
      span: 12,
    },
    {
      type: 'DateRangePicker',
      field: 'dateStart',
      endField: 'dateEnd',
      label: '日期范围',
      span: 12,
    },
    {
      type: 'TimeRangePicker',
      field: 'timeStart',
      endField: 'timeEnd',
      label: '时间范围',
      span: 12,
    },
    {
      type: 'RadioGroup',
      field: 'level',
      label: '级别',
      options: [
        { label: '普通', value: 'normal' },
        { label: '重要', value: 'important' },
      ],
      span: 12,
    },
    {
      type: 'CheckboxGroup',
      field: 'features',
      label: '能力',
      options: [
        { label: 'Schema', value: 'schema' },
        { label: 'Adapter', value: 'adapter' },
      ],
      span: 12,
    },
  ],
}
</script>

<style scoped>
.test-page,
article {
  display: grid;
  gap: 20px;
}

header,
article {
  padding: 24px;
  background: #fff;
  border: 1px solid #dfe4ee;
  border-radius: 12px;
}

header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

header p,
header h2,
article p {
  margin: 0;
}

header p,
header strong {
  color: #18794e;
}

pre {
  overflow: auto;
  margin: 0;
  padding: 14px;
  color: #34405a;
  background: #f4f6fa;
  border-radius: 8px;
}
</style>
