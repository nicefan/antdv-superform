<template>
  <section class="demo-section">
    <h2>同一份数据，不同呈现</h2>
    <div class="demo-guide">
      修改姓名或切换“展示备注”，查看详情中的联动结果。下方业务包装接收 title/actions/default
      插槽；按钮组支持折叠、菜单、确认及动态禁用。
    </div>
    <div class="demo-actions">
      <label class="demo-control-label"
        ><input class="demo-control-input" v-model="showNote" type="checkbox" />展示备注</label
      ><label class="demo-control-label"
        ><input class="demo-control-input" v-model="locked" type="checkbox" />禁用主要操作</label
      ><button class="demo-control" @click="model.name = model.name === '陈清禾' ? '林小满' : '陈清禾'">修改姓名</button
      ><button class="demo-control" @click="detailModal.openModal()">弹窗预览</button>
    </div>
    <SuperDetail :schema="details" :data-source="model" />
    <SuperForm :schema="customSchema"
      ><template #businessHint="scope"
        ><span class="demo-muted">命名插槽：当前联系人 {{ scope.formData?.name }}</span></template
      ></SuperForm
    >
    <div class="demo-actions"><SuperButtons v-bind="buttons" /></div>
    <p class="demo-status">{{ status }}</p>
    <Teleport to="#demo-test-content"
      ><div class="dev-tools">
        <h2 class="demo-test-title">开发与测试 · 默认属性与同源组件注册</h2>
        <div class="dev-controls">
          <label class="demo-control-label"
            >默认属性覆盖<select
              class="demo-control-input"
              :value="defaults ? 'on' : 'off'"
              @change="setMode('defaults', $event)"
            >
              <option value="off">关闭（正常演示）</option>
              <option value="on">注入 Tabs left / Collapse accordion</option>
            </select></label
          ><label class="demo-control-label" v-if="isElement"
            >同源注册<select class="demo-control-input" :value="registration" @change="setMode('registration', $event)">
              <option value="auto">自动注册</option>
              <option value="original">手动原始名</option>
              <option value="range">手动范围名</option>
            </select></label
          >
        </div>
        <p>
          切换会重载页面。开启默认属性后，首组 Tabs 应在左侧，显式 top 仍在上方；默认 Collapse 应只能展开一项，显式
          accordion=false
          可展开多项。手动注册模式下四个日期时间字段都应出现来源标记。范围字段故意传入冲突模式，仍应为双输入。
        </p>
        <SuperForm :schema="probeSchema" /></div
    ></Teleport>
  </section>
</template>
<script setup lang="ts">
import { defineComponent, h, reactive, ref } from 'vue'
import {
  SuperForm,
  SuperDetail,
  SuperButtons,
  useModal,
  type ExtFormOption,
  type ExtDescriptionsOption,
} from '@demo/product'
import { useDemo } from '../context'
const model = reactive({
  name: '陈清禾',
  code: 'SF-001',
  city: '杭州',
  enabled: true,
  note: '演示数据与表单共用一份对象',
  custom: '自定义 Vue 输入',
})
const showNote = ref(true),
  locked = ref(false)
const { isElement, event, status } = useDemo(() => ({ model, showNote: showNote.value, locked: locked.value }))
const details: ExtDescriptionsOption = {
  attrs: { bordered: true },
  subSpan: 12,
  subItems: [
    { field: 'name', label: '姓名' },
    { field: 'code', label: '编号' },
    { field: 'city', label: '城市' },
    {
      type: 'Switch',
      field: 'enabled',
      label: '状态',
      options: {
        source: [
          { value: false, label: '停用' },
          { value: true, label: '启用' },
        ],
      },
    },
    { field: 'note', label: '备注', hidden: () => !showNote.value, span: 24 },
  ],
}
const BusinessGroup = defineComponent({
  setup(_, { slots }) {
    return () =>
      h('section', { class: 'business-group' }, [
        h('header', [h('strong', slots.title?.()), slots.actions?.()]),
        slots.default?.(),
      ])
  },
})
const BusinessInput = defineComponent({
  props: { value: String },
  emits: ['update:value'],
  setup(props, { emit }) {
    return () =>
      h('input', {
        value: props.value,
        style: { padding: '8px', border: '1px solid #9eb8b1', borderRadius: '5px', width: '100%' },
        onInput: (e: Event) => emit('update:value', (e.target as HTMLInputElement).value),
      })
  },
})
const customSchema: ExtFormOption = {
  dataSource: model,
  subSpan: 12,
  subItems: [
    {
      type: 'Group',
      title: '业务自定义包装',
      component: BusinessGroup,
      buttons: { actions: [{ label: '记录当前数据', onClick: () => event('自定义 Group 动作', model) }] },
      subItems: [
        { type: 'Input', field: 'name', label: '姓名', slots: { prefix: () => '用户' } },
        { type: 'InputSlot', field: 'custom', label: '自定义组件', render: ({ props }) => h(BusinessInput, props) },
        { type: 'InfoSlot', render: 'businessHint', block: true },
        { type: 'HTML', label: 'HTML 展示', value: '<strong>可信示例内容</strong>' },
        { type: 'Hidden', field: 'internalCode', initialValue: 'demo-only' },
        {
          type: 'Buttons',
          block: true,
          actions: [{ label: 'Schema 内按钮', onClick: () => event('Schema 按钮', model) }],
        },
      ],
    },
    {
      type: 'Descriptions',
      title: '表单内的描述布局',
      subSpan: 12,
      attrs: { bordered: true },
      subItems: [
        { type: 'Input', field: 'code', label: '编号' },
        { type: 'Input', field: 'city', label: '城市' },
      ],
    },
  ],
}
const buttons = {
  limit: 3,
  actions: [
    {
      label: '主要操作',
      disabled: () => locked.value,
      tooltip: '禁用开关会限制本操作',
      onClick: () => event('主要操作', model),
    },
    { label: '确认操作', confirmText: '确认执行这个本地演示操作吗？', onClick: () => event('确认操作') },
    {
      label: '下拉操作',
      dropdown: [
        { label: '导出', value: 'export' },
        { label: '复制', value: 'copy' },
      ],
      onClick: (data) => event('下拉选择', data.e?.key),
    },
    { label: '折叠操作一', onClick: () => event('折叠操作一') },
    { label: '折叠操作二', onClick: () => event('折叠操作二') },
  ],
}
const detailModal = useModal(() => h(SuperDetail, { schema: details, dataSource: model }), {
  title: '当前资料预览',
  width: 780,
})
const query = new URLSearchParams(location.search),
  registration = query.get('registration') || 'auto',
  defaults = query.get('defaults') === 'on'
function setMode(name: string, e: Event) {
  const url = new URL(location.href)
  url.searchParams.set(name, (e.target as HTMLSelectElement).value)
  location.href = url.href
}
const probeSchema: ExtFormOption = {
  subSpan: 12,
  subItems: [
    {
      type: 'Tabs',
      field: 'defaults',
      subItems: [
        { key: 'one', label: '默认位置', subItems: [] },
        { key: 'two', label: '第二页', subItems: [] },
      ],
    },
    {
      type: 'Tabs',
      field: 'override',
      attrs: { tabPosition: 'top' },
      subItems: [
        { key: 'one', label: '显式顶部', subItems: [] },
        { key: 'two', label: '第二页', subItems: [] },
      ],
    },
    {
      type: 'Collapse',
      field: 'defaultCollapse',
      title: '默认折叠规则',
      subItems: [
        { key: 'one', field: 'one', label: '第一项', subItems: [{ type: 'Input', field: 'text', label: '内容' }] },
        { key: 'two', field: 'two', label: '第二项', subItems: [{ type: 'Input', field: 'text', label: '内容' }] },
      ],
    },
    {
      type: 'Collapse',
      field: 'overrideCollapse',
      title: '显式 accordion=false',
      attrs: { accordion: false },
      subItems: [
        { key: 'one', field: 'one', label: '第一项', subItems: [{ type: 'Input', field: 'text', label: '内容' }] },
        { key: 'two', field: 'two', label: '第二项', subItems: [{ type: 'Input', field: 'text', label: '内容' }] },
      ],
    },
    { type: 'DatePicker', field: 'day', label: '单日期', attrs: { valueFormat: 'YYYY-MM-DD' } },
    {
      type: 'DateRangePicker',
      field: 'start',
      endField: 'end',
      label: '固定日期范围',
      attrs: isElement
        ? { type: 'date', startPlaceholder: '业务开始', endPlaceholder: '', valueFormat: 'YYYY-MM-DD' }
        : { placeholder: ['业务开始', ''], valueFormat: 'YYYY-MM-DD' },
    },
    { type: 'TimePicker', field: 'time', label: '单时间', attrs: { valueFormat: 'HH:mm:ss' } },
    {
      type: 'TimeRangePicker',
      field: 'timeStart',
      endField: 'timeEnd',
      label: '固定时间范围',
      attrs: { ...(isElement ? { isRange: false } : {}), valueFormat: 'HH:mm:ss' },
    },
  ],
}
</script>
