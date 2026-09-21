<template>
  <section class="test-page">
    <header>
      <div>
        <p>P003 · 容器与布局改造</p>
        <h2>Form、栅格、容器和图标由 Adapter 渲染</h2>
      </div>
      <strong>人工验证页 · 未自动判定通过</strong>
    </header>

    <article>
      <p>编辑区覆盖栅格换行、Group、Card、Tabs、Collapse 和按钮图标；详情区覆盖 Descriptions 布局。</p>
      <ol>
        <li>入口注入 Tabs 默认 left、Collapse 默认 accordion=true；本页显式 top/false 应覆盖默认值。</li>
        <li>选择高级页后隐藏或禁用它，应回退有效页；比较激活值和原生事件次数。</li>
        <li>Group/Card/Collapse 标题及 Tabs extra 应显示业务插槽；Tabs 的标准 extra 应优先于原生 rightExtra。</li>
        <li>下方复用列表容器页：检查增删后刷新、激活项、弹窗取消和失效插入锚点。</li>
      </ol>
      <label><input v-model="hideAdvanced" type="checkbox" />隐藏高级页</label>
      <label><input v-model="disableAdvanced" type="checkbox" />禁用高级页</label>
      <SuperForm :schema="formSchema" />
      <pre>Tabs 激活：{{ activeTab }}；Collapse 激活：{{ activeCollapse }}；事件：{{ events }}</pre>
    </article>
    <article><ListContainersTest /></article>

    <article>
      <h3>详情布局</h3>
      <SuperDetail :schema="detailSchema" :data-source="model" />
    </article>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { MoreIcon } from '../../src/icons'
import { SuperDetail, SuperForm, type ExtDescriptionsOption, type ExtFormOption } from 'superform-antdv'
import ListContainersTest from '../../src/ListContainersTest.vue'

const activeTab = ref('basic')
const activeCollapse = ref<string[]>(['first'])
const hideAdvanced = ref(false)
const disableAdvanced = ref(false)
const events = reactive({ tabs: 0, collapse: 0 })

const model = reactive({
  name: '张三',
  code: 'SF-003',
  group: { remark: '分组内容' },
  card: { amount: 3 },
  tabs: { basic: { text: '基础页' }, advanced: { text: '高级页' } },
  collapse: { first: { text: '面板内容' } },
})

const formSchema: ExtFormOption = {
  isContainer: true,
  dataSource: model,
  buttons: {
    actions: [
      { label: '保存', onClick: () => undefined },
      { label: '更多', icon: MoreIcon, onClick: () => undefined },
    ],
  },
  subItems: [
    { type: 'Input', field: 'name', label: '名称', span: 12 },
    { type: 'Input', field: 'code', label: '编码', span: 12, breakAfter: true },
    {
      type: 'Group',
      field: 'group',
      label: '分组容器',
      slots: {
        title: () => '业务 Group 标题',
        extra: () => '业务 Group extra',
      },
      block: true,
      subItems: [{ type: 'Input', field: 'remark', label: '备注' }],
    },
    {
      type: 'Card',
      field: 'card',
      label: '卡片容器',
      slots: { title: () => '业务 Card 标题', extra: () => '业务 Card extra' },
      block: true,
      subItems: [{ type: 'InputNumber', field: 'amount', label: '数量' }],
    },
    {
      type: 'Tabs',
      field: 'tabs',
      block: true,
      activeKey: activeTab,
      attrs: { tabPosition: 'top', 'onUpdate:activeKey': () => events.tabs++ },
      slots: {
        extra: () => '业务 Tabs extra',
        rightExtra: () => '原生备用 extra（应被覆盖）',
      },
      subItems: [
        {
          key: 'basic',
          field: 'basic',
          label: '基础页',
          subItems: [{ type: 'Input', field: 'text' }],
        },
        {
          key: 'advanced',
          field: 'advanced',
          label: '高级页',
          hidden: () => hideAdvanced.value,
          attrs: () => ({ disabled: disableAdvanced.value }),
          subItems: [{ type: 'Input', field: 'text' }],
        },
      ],
    },
    {
      type: 'Collapse',
      field: 'collapse',
      title: '折叠容器',
      block: true,
      activeKey: activeCollapse,
      attrs: { accordion: false, onChange: () => events.collapse++ },
      slots: { title: () => '业务 Collapse 标题' },
      subItems: [
        {
          key: 'first',
          field: 'first',
          label: '第一个面板',
          subItems: [{ type: 'Input', field: 'text' }],
        },
        {
          key: 'second',
          field: 'second',
          label: '第二个面板',
          subItems: [{ type: 'Input', field: 'text' }],
        },
      ],
    },
    {
      type: 'Group',
      label: '默认内容覆盖',
      block: true,
      slots: { default: () => '业务 default 内容' },
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
  ],
}

const detailSchema: ExtDescriptionsOption = {
  isContainer: true,
  attrs: { bordered: true },
  subSpan: 12,
  subItems: [
    { field: 'name', label: '名称' },
    { field: 'code', label: '编码', breakAfter: true },
    { field: 'group.remark', label: '备注', span: 24 },
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
article p,
article h3 {
  margin: 0;
}

header p,
header strong {
  color: #18794e;
}
</style>
