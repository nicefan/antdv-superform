<template>
  <section class="demo-section">
    <h2>容器布局</h2>
    <div class="demo-guide">查看 Group、Card、Tabs 和 Collapse 的标题、插槽、激活状态与动态显隐。</div>
    <div class="demo-actions">
      <label class="demo-control-label"
        ><input class="demo-control-input" v-model="viewOnly" type="checkbox" />查看模式</label
      ><button class="demo-control" @click="run('容器校验', () => form?.submit())" :disabled="viewOnly">校验</button>
    </div>
    <SuperDetail v-if="viewOnly" :schema="detailSchema" :data-source="model" />
    <SuperForm v-else :schema="schema" @register="register" />
    <p role="status" class="demo-status">{{ status }}</p>
    <Teleport to="#demo-test-content"
      ><div class="dev-tools">
        <h2 class="demo-test-title">开发与测试 · 容器状态</h2>
        <div class="dev-controls">
          <label class="demo-control-label"
            ><input class="demo-control-input" v-model="hideAdvanced" type="checkbox" />隐藏高级页</label
          ><label class="demo-control-label"
            ><input class="demo-control-input" v-model="disableAdvanced" type="checkbox" />禁用高级页</label
          >
        </div>
        <ol>
          <li>选择高级页后隐藏或禁用，应回退有效页；观察窗显示 Tabs/Collapse 激活值。</li>
          <li>切换查看模式，检查分组、卡片、页签与折叠内容。</li>
        </ol>
      </div></Teleport
    >
  </section>
</template>
<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { SuperForm, SuperDetail, type ExtFormOption } from '@demo/product'
import { useDemo } from '../context'

const viewOnly = ref(false)
const hideAdvanced = ref(false),
  disableAdvanced = ref(false)
const activeTab = ref('basic'),
  activeCollapse = ref<string[]>(['first'])
const model = reactive({})
const { run, status, event, isElement } = useDemo(() => ({
  model,
  activeTab: activeTab.value,
  activeCollapse: activeCollapse.value,
}))
let form: { submit: () => Promise<unknown> } | undefined
function register(_actions: unknown, instance?: typeof form) {
  form = instance
}
const schema = computed((): ExtFormOption => ({
  dataSource: model,
  subSpan: 12,
  subItems: [
    {
      type: 'Group',
      title: '基础分组',
      slots: { extra: () => '业务 extra 插槽' },
      subItems: [{ type: 'Input', field: 'project', label: '项目名称' }],
    },
    {
      type: 'Card',
      title: '业务卡片',
      slots: { title: () => '自定义卡片标题', extra: () => 'Card extra' },
      subItems: [{ type: 'Input', field: 'owner', label: '负责人' }],
    },
    {
      type: 'Tabs',
      field: 'tabs',
      activeKey: activeTab,
      attrs: {
        tabPosition: 'top',
        [isElement ? 'onUpdate:modelValue' : 'onUpdate:activeKey']: (key) => event('Tabs 切换', key),
      },
      slots: { extra: () => 'Tabs extra 插槽' },
      subItems: [
        {
          key: 'basic',
          field: 'basic',
          label: '基础信息',
          subItems: [{ type: 'Input', field: 'name', label: '标题' }],
        },
        {
          key: 'advanced',
          field: 'advanced',
          label: '高级信息',
          hidden: () => hideAdvanced.value,
          disabled: () => disableAdvanced.value,
          subItems: [{ type: 'Input', field: 'note', label: '说明' }],
        },
      ],
    },
    {
      type: 'Collapse',
      field: 'collapse',
      title: '补充信息',
      activeKey: activeCollapse,
      attrs: {
        accordion: false,
        [isElement ? 'onUpdate:modelValue' : 'onChange']: (value) => event('Collapse 切换', value),
      },
      subItems: [
        {
          key: 'first',
          field: 'first',
          label: '联系信息',
          subItems: [{ type: 'Input', field: 'text', label: '地址' }],
        },
        {
          key: 'second',
          field: 'second',
          label: '其他信息',
          subItems: [{ type: 'Input', field: 'text', label: '备注' }],
        },
      ],
    },
  ],
}))
const detailSchema = computed(() => ({ subItems: schema.value.subItems, subSpan: schema.value.subSpan }))
</script>
