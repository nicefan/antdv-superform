<template>
  <section class="test-page">
    <header>
      <div>
        <p>P003 · 容器与布局改造</p>
        <h2>Form、栅格、容器和图标由 Adapter 渲染</h2>
      </div>
      <strong>{{ capabilitiesReady ? 'Capability 检查通过' : 'Capability 配置缺失' }}</strong>
    </header>

    <article>
      <p>编辑区覆盖栅格换行、Group、Card、Tabs、Collapse 和按钮图标；详情区覆盖 Descriptions 布局。</p>
      <SuperForm :schema="formSchema" />
    </article>

    <article>
      <h3>详情布局</h3>
      <SuperDetail :schema="detailSchema" :data-source="model" />
    </article>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { MoreIcon } from '../../src/icons'
import { SuperDetail, SuperForm, type ExtDescriptionsOption, type ExtFormOption } from 'superform-antdv'
import { antdvAdapter } from 'superform-antdv'

const adapter = antdvAdapter
const capabilitiesReady = computed(
  () =>
    !!adapter.form &&
    !!adapter.layout &&
    ['card', 'tabs', 'tab', 'collapse', 'collapsePanel', 'descriptions'].every(
      (name) => !!adapter.containers?.[name]
    ) &&
    ['add', 'remove', 'more', 'expand', 'info'].every((name) => !!adapter.icons?.semantic?.[name])
)

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
      block: true,
      subItems: [{ type: 'Input', field: 'remark', label: '备注' }],
    },
    {
      type: 'Card',
      field: 'card',
      label: '卡片容器',
      block: true,
      subItems: [{ type: 'InputNumber', field: 'amount', label: '数量' }],
    },
    {
      type: 'Tabs',
      field: 'tabs',
      block: true,
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
          subItems: [{ type: 'Input', field: 'text' }],
        },
      ],
    },
    {
      type: 'Collapse',
      field: 'collapse',
      title: '折叠容器',
      block: true,
      subItems: [
        {
          key: 'first',
          field: 'first',
          label: '第一个面板',
          subItems: [{ type: 'Input', field: 'text' }],
        },
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
