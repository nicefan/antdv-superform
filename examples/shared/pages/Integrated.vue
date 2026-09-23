<template>
  <section class="demo-section">
    <h2>采购订单</h2>
    <div class="demo-guide">
      填写客户信息，切换企业开票查看必填项；在明细中选择商品、修改数量，金额会自动计算。预览与编辑共享数据，提交会生成独立快照。右侧观察窗可以追踪整条流程。
    </div>
    <div class="demo-flow">
      <span class="active">① 客户信息</span><b>→</b
      ><span :class="{ active: order.lines.length > 0 }">② 商品明细 · {{ order.lines.length }} 项</span><b>→</b
      ><span :class="{ active: !!submission }">③ {{ submission ? '已生成提交快照' : '预览与提交' }}</span>
    </div>
    <SuperForm :schema="schema" @register="register" />
    <div class="demo-summary">
      <div>
        <small>商品数量</small><strong>{{ quantity }}</strong>
      </div>
      <div>
        <small>明细合计</small><strong>¥ {{ total.toFixed(2) }}</strong>
      </div>
      <div>
        <small>开票方式</small><strong>{{ order.invoice ? '企业开票' : '个人订单' }}</strong>
      </div>
    </div>
    <div class="demo-actions">
      <button class="demo-control primary" @click="submit">提交订单</button
      ><button class="demo-control" @click="preview.openModal()">预览当前订单</button
      ><button
        class="demo-control"
        @click="
          run('填入客户', () =>
            form.setFieldsValue({
              customer: '明川设计工作室',
              contact: '林小满',
              invoice: true,
              company: '明川设计有限公司',
            })
          )
        "
      >
        填入示例客户</button
      ><button
        class="demo-control"
        @click="
          run('重置订单', async () => {
            await form.resetFields()
            submission = undefined
          })
        "
      >
        重置订单
      </button>
    </div>
    <p class="demo-status" role="status">{{ status }}</p>
    <Teleport to="#demo-test-content"
      ><div class="dev-tools">
        <h2 class="demo-test-title">最近提交快照（后续编辑不会改变它）</h2>
        <p v-if="!submission">
          提交订单后查看独立快照；再修改商品数量，快照应保持不变。切换企业开票检查抬头必填，删除明细检查总额联动。
        </p>
        <pre v-else class="demo-code">{{ snapshot(submission) }}</pre>
      </div></Teleport
    >
  </section>
</template>
<script setup lang="ts">
import { computed, h, reactive, ref } from 'vue'
import { SuperForm, SuperDetail, useForm, useModal, type ExtFormOption } from '@demo/product'
import { useDemo, snapshot } from '../context'
const products = [
  { label: '设计服务', value: 'design', price: 800 },
  { label: '开发服务', value: 'dev', price: 1200 },
  { label: '测试服务', value: 'qa', price: 600 },
]
const order = reactive({
  customer: '明川工作室',
  contact: '陈清禾',
  invoice: false,
  company: '',
  lines: [
    { id: 1, product: 'design', quantity: 2, price: 800, amount: 1600 },
    { id: 2, product: 'qa', quantity: 1, price: 600, amount: 600 },
  ],
  attachments: [],
  delivery: { details: { address: '杭州市', note: '' } },
  tags: ['新项目'],
})
const submission = ref<unknown>()
const total = computed(() =>
  order.lines.reduce((sum, row) => sum + (Number(row.quantity) || 0) * (Number(row.price) || 0), 0)
)
const quantity = computed(() => order.lines.reduce((sum, row) => sum + (Number(row.quantity) || 0), 0))
const { run, status, event } = useDemo(() => ({
  order,
  total: total.value,
  quantity: quantity.value,
  submission: submission.value,
}))
const schema: ExtFormOption = {
  dataSource: order,
  subSpan: 12,
  subItems: [
    {
      type: 'Group',
      title: '客户信息',
      subItems: [
        { type: 'Input', field: 'customer', label: '客户名称', required: true },
        { type: 'Input', field: 'contact', label: '联系人', required: true },
        { type: 'Switch', field: 'invoice', label: '企业开票' },
        {
          type: 'Input',
          field: 'company',
          label: '开票抬头',
          hidden: ({ current }) => !current.invoice,
          required: ({ current }) => current.invoice,
        },
        {
          type: 'DateRangePicker',
          field: 'start',
          endField: 'end',
          label: '服务日期',
          attrs: { valueFormat: 'YYYY-MM-DD' },
        },
        { type: 'TagInput', field: 'tags', label: '订单标签' },
      ],
    },
    {
      type: 'Table',
      field: 'lines',
      label: '商品明细',
      editable: true,
      attrs: { rowKey: 'id', pagination: false },
      buttons: { actions: ['add'] },
      rowButtons: { actions: ['delete'], labelMode: 'label' },
      columns: [
        {
          type: 'Select',
          field: 'product',
          label: '商品',
          required: true,
          options: { source: products },
          onChange: ({ current }) => {
            current.price = products.find((item) => item.value === current.product)?.price ?? 0
            event('商品变化，更新单价', current)
          },
        },
        { type: 'InputNumber', field: 'quantity', label: '数量', initialValue: 1, attrs: { min: 1 }, required: true },
        { type: 'InputNumber', field: 'price', label: '单价', attrs: { min: 0, precision: 2 }, required: true },
        {
          type: 'InputNumber',
          field: 'amount',
          label: '金额',
          computed: (_value, { current }) => Number(((current.quantity || 0) * (current.price || 0)).toFixed(2)),
          attrs: { readonly: true },
        },
      ],
    },
    {
      type: 'Collapse',
      field: 'delivery',
      title: '交付信息',
      subItems: [
        {
          field: 'details',
          label: '交付说明',
          subItems: [
            { type: 'Input', field: 'address', label: '地址' },
            {
              type: 'TextArea',
              field: 'note',
              label: '说明',
            },
          ],
        },
      ],
    },
    { type: 'Upload', field: 'attachments', label: '订单附件', attrs: { uploadMode: 'custom' }, block: true },
  ],
}
const [register, form] = useForm(schema)
const preview = useModal(
  () => h(SuperDetail, { schema: { subItems: schema.subItems, subSpan: schema.subSpan }, dataSource: order }),
  { title: '订单预览', width: 1000 }
)
async function submit() {
  await run('提交订单', async () => {
    const data = await form.submit()
    submission.value = JSON.parse(snapshot(data))
    return submission.value
  })
}
</script>
