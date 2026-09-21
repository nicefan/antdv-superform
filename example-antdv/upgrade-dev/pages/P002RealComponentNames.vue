<template>
  <section class="test-page">
    <h2>字段协议定向验证 · AntDV</h2>
    <ol>
      <li>单选/多选树各选择一次、清空一次，分别观察原生更新、原生 change、Schema change 计数和 labelField。</li>
      <li>外部赋值后更新树标签，检查值、标签、展示是否同步；外部赋值不应伪造用户 change。</li>
      <li>日期/时间范围应拆分写入两个字段；开始/结束提示、默认格式、disabledDate 回调保持原生语义。</li>
      <li>数量默认宽度 100%，覆盖数量应为 160px；自定义输入插槽应保留。</li>
    </ol>
    <div class="controls">
      <button
        @click="
          model.node = 'b'
          model.nodes = ['a', 'b']
        "
      >
        外部赋值
      </button>
      <button
        @click="
          model.node = undefined
          model.nodes = []
        "
      >
        外部清空
      </button>
      <button :disabled="loading" @click="loadTree">异步更新树标签</button>
      <button @click="Object.keys(events).forEach((key) => (events[key] = 0))">清空计数</button>
      <button @click="events.disabledDate = disabledDateCalls">读取日期回调次数</button>
      <button @click="reset">重置本页</button>
    </div>
    <SuperForm :key="revision" :schema="schema" />
    <pre>事件计数：{{ events }}</pre>
    <pre>实时模型：{{ model }}</pre>
    <p>观察结果由人工判定；这里的计数不代表验证通过。</p>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { SuperForm, type ExtFormOption } from 'superform-antdv'

const initial = () => ({
  node: undefined as string | undefined,
  nodeLabel: '',
  nodes: [] as string[],
  nodeLabels: [],
  start: '2026-09-01',
  end: '2026-09-02',
  timeStart: '09:00:00',
  timeEnd: '18:00:00',
})
const model = reactive(initial())
const treeData = ref([
  { value: 'a', label: '节点 A' },
  { value: 'b', label: '节点 B' },
])
const events = reactive<Record<string, number>>({
  singleUpdate: 0,
  singleNativeChange: 0,
  singleSchemaChange: 0,
  multipleUpdate: 0,
  multipleNativeChange: 0,
  multipleSchemaChange: 0,
  disabledDate: 0,
})
const loading = ref(false)
const revision = ref(0)
// disabledDate 可能在原生渲染阶段调用，计数手动读取，避免形成响应式渲染循环。
let disabledDateCalls = 0
async function loadTree() {
  loading.value = true
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))
    treeData.value = [
      { value: 'a', label: '节点 A 更新' },
      { value: 'b', label: '节点 B 更新' },
    ]
  } finally {
    loading.value = false
  }
}
function reset() {
  Object.assign(model, initial())
  treeData.value = [
    { value: 'a', label: '节点 A' },
    { value: 'b', label: '节点 B' },
  ]
  Object.keys(events).forEach((key) => (events[key] = 0))
  revision.value++
}
const schema: ExtFormOption = {
  dataSource: model,
  subSpan: 12,
  subItems: [
    {
      type: 'TreeSelect',
      field: 'node',
      labelField: 'nodeLabel',
      label: '单选树',
      treeData,
      onChange: () => events.singleSchemaChange++,
      attrs: {
        allowClear: true,
        'onUpdate:value': () => events.singleUpdate++,
        onChange: () => events.singleNativeChange++,
      },
    },
    {
      type: 'TreeSelect',
      field: 'nodes',
      labelField: 'nodeLabels',
      label: '多选树',
      treeData,
      onChange: () => events.multipleSchemaChange++,
      attrs: {
        multiple: true,
        allowClear: true,
        'onUpdate:value': () => events.multipleUpdate++,
        onChange: () => events.multipleNativeChange++,
      },
    },
    { type: 'DatePicker', field: 'date', label: '单日期' },
    {
      type: 'DateRangePicker',
      field: 'start',
      endField: 'end',
      label: '日期范围',
      attrs: { placeholder: ['业务开始', ''] },
      disabledDate: (_context, date) => {
        disabledDateCalls++
        return date.date() === 1
      },
    },
    { type: 'TimePicker', field: 'time', label: '单时间' },
    {
      type: 'TimeRangePicker',
      field: 'timeStart',
      endField: 'timeEnd',
      label: '时间范围',
    },
    { type: 'InputNumber', field: 'defaultWidth', label: '默认数量' },
    {
      type: 'InputNumber',
      field: 'customWidth',
      label: '覆盖数量',
      attrs: { style: { width: '160px' } },
    },
    {
      type: 'Input',
      field: 'slot',
      label: '输入插槽',
      slots: { prefix: () => '业务前缀' },
    },
    {
      type: 'Switch',
      field: 'enabled',
      labelField: 'enabledLabel',
      label: '状态标签',
      options: {
        source: [
          { value: false, label: '停用' },
          { value: true, label: '启用' },
        ],
      },
    },
  ],
}
</script>

<style scoped>
.test-page {
  display: grid;
  gap: 16px;
  padding: 24px;
  background: white;
}
.controls {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}
pre {
  margin: 0;
  padding: 12px;
  background: #f4f6fa;
  overflow: auto;
  max-height: 360px;
}
</style>
