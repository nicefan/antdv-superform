<template>
  <section class="list-test">
    <h2>列表容器测试</h2>
    <div class="controls">
      <label
        >容器
        <select v-model="listType" data-testid="list-type">
          <option>CardList</option>
          <option>TabList</option>
          <option>CollapseList</option>
        </select>
      </label>
      <label><input v-model="modalEdit" type="checkbox" />弹窗编辑</label>
      <label><input v-model="viewOnly" type="checkbox" />查看模式</label>
      <label v-if="listType === 'CardList'"
        >每张卡片宽度
        <select v-model.number="span">
          <option :value="24">整行</option>
          <option :value="12">二列</option>
          <option :value="8">三列</option>
        </select>
      </label>
      <label><input v-model="customGroup" type="checkbox" />GroupList 自定义包装</label>
    </div>
    <div class="controls">
      <Button @click="reset">重置数据</Button>
      <Button @click="data.rows = []">清空新列表</Button>
      <Button @click="data.rows.reverse()">反转行顺序</Button>
      <Button @click="data.rows.shift()">移除第一行</Button>
      <Button :disabled="viewOnly" @click="validate">校验表单</Button>
    </div>
    <p>姓名同时作为行标题；“编辑备注”仅编辑可见，“展示编号”仅详情可见。查看 JSON 可检查弹窗取消是否影响原值。</p>
    <p>GroupList 不受弹窗开关影响，空数组会补一行；自定义包装保留标题和行按钮。</p>
    <SuperDetail v-if="viewOnly" :key="pageKey" :schema="detailSchema" :data-source="data" />
    <SuperForm v-else :key="pageKey" :schema="schema" :data-source="data" @register="register" />
    <p role="status">{{ status }}</p>
    <details open>
      <summary>实时数据</summary>
      <pre data-testid="list-data">{{ JSON.stringify(data, null, 2) }}</pre>
    </details>
  </section>
</template>

<script setup lang="ts">
import { computed, defineComponent, h, reactive, ref } from 'vue'
import { Button } from 'antdv-next'
import {
  SuperDetail,
  SuperForm,
  type ExtDescriptionsOption,
  type ExtFormOption,
  type UniWidgetOption,
} from 'superform-antdv'

const listType = ref<'CardList' | 'TabList' | 'CollapseList'>('CardList')
const modalEdit = ref(false)
const viewOnly = ref(false)
const customGroup = ref(false)
const span = ref(12)
const revision = ref(0)
const status = ref('尚未校验')
let form: { submit: () => Promise<unknown> } | undefined
const initialRows = () => [
  { id: 1, profile: { name: '张三' }, note: '只在编辑时显示', code: '成员 A' },
  { id: 2, profile: { name: '李四' }, note: '可在弹窗修改后取消', code: '成员 B' },
  { id: 3, profile: { name: '王五' }, note: '用于观察重排后的绑定', code: '成员 C' },
]
const data = reactive({ rows: initialRows(), groups: [] as Array<{ name?: string }> })
const columns: UniWidgetOption[] = [
  { type: 'Input', field: 'profile.name', label: '姓名', required: true },
  { type: 'Input', field: 'note', label: '编辑备注', exclude: ['description'] },
  { type: 'Input', field: 'code', label: '展示编号', exclude: ['form'] },
]
const CustomGroup = defineComponent({
  setup(_, { slots }) {
    return () =>
      h('section', { class: 'custom-group' }, [
        h('header', [h('strong', slots.title?.()), slots.actions?.()]),
        slots.default?.(),
      ])
  },
})
const schema = computed<ExtFormOption>(() => ({
  subItems: [
    {
      type: listType.value,
      field: 'rows',
      label: '成员列表',
      titleField: 'profile.name',
      attrs: { rowKey: 'id', ...(listType.value === 'CardList' ? { span: span.value } : {}) },
      subSpan: 24,
      columns,
      ...(modalEdit.value ? { editModal: { modalProps: { width: 640 } } } : {}),
    },
    {
      type: 'GroupList',
      field: 'groups',
      label: '分组',
      attrs: { labelIndex: true },
      ...(customGroup.value ? { component: CustomGroup } : {}),
      columns: [{ type: 'Input', field: 'name', label: '组员姓名', required: true }],
    },
  ],
}))
const detailSchema = computed<ExtDescriptionsOption>(() => ({ subItems: schema.value.subItems }))
// 模式变化重新建立组件实例，避免把配置切换与行数据更新混为同一项验证。
const pageKey = computed(() =>
  [listType.value, modalEdit.value, viewOnly.value, customGroup.value, span.value, revision.value].join(':')
)
function register(_actions: unknown, instance?: typeof form) {
  form = instance?.submit ? instance : undefined
}
function reset() {
  data.rows = initialRows()
  data.groups = []
  revision.value++
  status.value = '数据已重置'
}
async function validate() {
  if (!form) {
    status.value = '表单尚未就绪'
    return
  }
  try {
    await form.submit()
    status.value = '校验通过'
  } catch {
    status.value = '校验未通过，请检查必填姓名和 GroupList 组员姓名'
  }
}
</script>

<style scoped>
.list-test {
  display: grid;
  gap: 16px;
}
.controls {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
}
.controls label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}
p {
  margin: 0;
}
pre {
  max-height: 360px;
  overflow: auto;
  padding: 16px;
  background: #f5f5f5;
}
:deep(.custom-group) {
  border: 1px dashed #1677ff;
  padding: 16px;
  margin-block: 12px;
}
:deep(.custom-group header) {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}
</style>
