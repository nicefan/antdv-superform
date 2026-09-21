<template>
  <section class="demo-section">
    <h2>让联动关系可见</h2>
    <div class="demo-guide">
      切换账户类型，企业名称随之显隐；选择省份会刷新城市并清空旧选择；修改数量和单价会计算金额。锁定信息时，整组字段禁用。模型与变化路径可在右侧观察。
    </div>
    <div class="demo-flow">
      <span :class="{ active: model.account === '企业' }">账户：{{ model.account }}</span
      ><b>→</b
      ><span :class="{ active: model.account === '企业' }"
        >企业信息{{ model.account === '企业' ? '显示并必填' : '隐藏' }}</span
      ><span>省份：{{ model.province }}</span
      ><b>→</b><span>城市选项：{{ cityNames.join(' / ') }}</span>
    </div>
    <SuperForm :schema="schema" />
    <div class="demo-summary">
      <div>
        <small>自动计算</small><strong>¥ {{ Number(model.total || 0).toFixed(2) }}</strong>
      </div>
      <div>
        <small>树选择标签</small><strong>{{ model.nodeLabel || '尚未选择' }}</strong>
      </div>
    </div>
    <Teleport to="#demo-test-content"
      ><div class="dev-tools">
        <h2 class="demo-test-title">开发与测试 · TreeSelect 事件与外部数据</h2>
        <div class="dev-controls">
          <button class="demo-control" @click="assignNodes">外部赋值</button
          ><button class="demo-control" @click="clearNodes">外部清空</button
          ><button class="demo-control" @click="updateTree">异步修改节点标签</button
          ><button class="demo-control" @click="Object.keys(counts).forEach((key) => (counts[key] = 0))">
            清空事件计数
          </button>
        </div>
        <p>
          单次选择应分别产生一次原生更新、一次原生 change 和一次 Schema change。外部赋值不应伪造用户
          change；标签同步结果请观察模型。
        </p>
        <pre class="demo-code">{{ counts }}</pre>
      </div></Teleport
    >
  </section>
</template>
<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { SuperForm, type ExtFormOption } from '@demo/product'
import { useDemo } from '../context'
const model = reactive({
  account: '个人',
  company: '',
  province: '浙江',
  city: '杭州',
  quantity: 2,
  price: 120,
  total: 240,
  locked: false,
  node: 'a' as string | undefined,
  nodeLabel: '',
  nodes: ['a'],
  nodeLabels: [],
})
const treeData = ref([
  { value: 'a', label: '设计组' },
  { value: 'b', label: '开发组' },
])
const counts = reactive<Record<string, number>>({
  update: 0,
  nativeChange: 0,
  schemaChange: 0,
  multiUpdate: 0,
  multiNativeChange: 0,
  multiSchemaChange: 0,
})
const cities: Record<string, string[]> = { 浙江: ['杭州', '宁波'], 广东: ['广州', '深圳'] }
const cityNames = computed(() => cities[model.province] || [])
const { isElement, event } = useDemo(() => ({ model, counts, treeData: treeData.value }))
function assignNodes() {
  model.node = 'b'
  model.nodes = ['a', 'b']
}
function clearNodes() {
  model.node = undefined
  model.nodes = []
}
async function updateTree() {
  await new Promise((resolve) => setTimeout(resolve, 400))
  treeData.value = [
    { value: 'a', label: '设计组（更新）' },
    { value: 'b', label: '开发组（更新）' },
  ]
  event('异步更新树标签')
}
const schema: ExtFormOption = {
  dataSource: model,
  subSpan: 12,
  subItems: [
    { type: 'RadioGroup', field: 'account', label: '账户类型', options: { source: ['个人', '企业'] } },
    {
      type: 'Input',
      field: 'company',
      label: '企业名称',
      hidden: ({ current }) => current.account !== '企业',
      required: ({ current }) => current.account === '企业',
    },
    {
      type: 'Select',
      field: 'province',
      label: '省份',
      options: { source: ['浙江', '广东'] },
      onChange: () => {
        model.city = ''
        event('省份变化，清空城市')
      },
    },
    { type: 'Select', field: 'city', label: '城市', options: { source: () => cityNames.value } },
    { type: 'InputNumber', field: 'quantity', label: '数量', attrs: { min: 0 } },
    { type: 'InputNumber', field: 'price', label: '单价', attrs: { min: 0, precision: 2 } },
    {
      type: 'InputNumber',
      field: 'total',
      label: '自动金额',
      computed: (_value, { current }) => Number(((current.quantity || 0) * (current.price || 0)).toFixed(2)),
      attrs: { readonly: true },
    },
    { type: 'Switch', field: 'locked', label: '锁定信息' },
    {
      type: 'Group',
      title: '组级禁用优先于子字段',
      disabled: ({ current }) => current.locked,
      subItems: [
        { type: 'Input', field: 'contact', label: '联系人', disabled: false },
        { type: 'Input', field: 'phone', label: '联系电话' },
      ],
    },
    {
      type: 'TreeSelect',
      field: 'node',
      labelField: 'nodeLabel',
      label: '所属部门',
      treeData,
      onChange: () => counts.schemaChange++,
      attrs: {
        ...(isElement ? { clearable: true } : { allowClear: true }),
        [isElement ? 'onUpdate:modelValue' : 'onUpdate:value']: () => counts.update++,
        onChange: () => counts.nativeChange++,
      },
    },
    {
      type: 'TreeSelect',
      field: 'nodes',
      labelField: 'nodeLabels',
      label: '协作部门',
      treeData,
      onChange: () => counts.multiSchemaChange++,
      attrs: {
        multiple: true,
        ...(isElement ? { clearable: true } : { allowClear: true }),
        [isElement ? 'onUpdate:modelValue' : 'onUpdate:value']: () => counts.multiUpdate++,
        onChange: () => counts.multiNativeChange++,
      },
    },
  ],
}
</script>
