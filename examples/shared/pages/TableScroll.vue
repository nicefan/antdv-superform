<template>
  <section ref="sectionRef" class="demo-section">
    <h2>表格高度：显式指定上限，或按内容自然布局</h2>
    <div class="demo-actions" aria-label="高度场景">
      <button v-for="item in scenes" :key="item.id" class="demo-control"
        :class="{ primary: scene === item.id }" :aria-pressed="scene === item.id" @click="scene = item.id">
        {{ item.title }}
      </button>
    </div>
    <div class="demo-actions">
      <label class="demo-control-label">数据量
        <select v-model.number="count" class="demo-control-input">
          <option :value="60">60 行</option>
          <option :value="3">3 行</option>
          <option :value="0">空数据</option>
        </select>
      </label>
      <label class="demo-control-label">
        <input v-model="showHeader" type="checkbox" class="demo-control-input" />显示表头
      </label>
      <label class="demo-control-label">
        <input v-model="fixedHeight" type="checkbox" class="demo-control-input" />固定高度（需配置 maxHeight）
      </label>
      <button class="demo-control" @click="mounted = !mounted">{{ mounted ? '卸载表格' : '挂载表格' }}</button>
    </div>

    <template v-if="scene === 'page'">
      <p class="demo-status">根据表格顶部到页面底部的剩余空间自动计算。调整浏览器高度，表格与分页随之伸缩。</p>
      <pre class="height-config">{ maxHeight: 'viewport', fixedHeight: {{ fixedHeight }}, heightOffset: {{ pageBottomOffset }} }</pre>
      <SuperTable v-if="mounted" :key="'page:' + showHeader" :schema="pageSchema" />
    </template>

    <template v-else-if="scene === 'parent'">
      <p class="demo-status">只给父元素设置高度，按父容器剩余空间计算上限；勾选固定高度后，少量数据也保留空白。</p>
      <div class="demo-actions">
        <label class="demo-control-label">父元素高度：{{ parentHeight }}px
          <input v-model.number="parentHeight" class="demo-control-input" type="range" min="280" max="640" step="20" />
        </label>
      </div>
      <pre class="height-config">父元素 style="height: {{ parentHeight }}px"
{ maxHeight: 'parent', fixedHeight: {{ fixedHeight }} }</pre>
      <div class="height-parent" :style="{ height: parentHeight + 'px' }">
        <SuperTable v-if="mounted" :key="'parent:' + showHeader" :schema="parentSchema" />
      </div>
    </template>

    <template v-else>
      <p class="demo-status">启用上限后，内容区域最多 {{ maxHeight }}px；未勾选固定高度时，少量数据自然收缩。关闭上限可恢复自然高度。</p>
      <div class="demo-actions">
        <label class="demo-control-label">最大行高度：{{ maxHeight }}px
          <input v-model.number="maxHeight" class="demo-control-input" type="range" min="160" max="480" step="20" />
        </label>
        <label class="demo-control-label">
          <input v-model="limitHeight" type="checkbox" class="demo-control-input" />设置 maxHeight
        </label>
      </div>
      <pre class="height-config">{{ limitHeight ? `{ maxHeight: ${maxHeight}, fixedHeight: ${fixedHeight} }` : '未配置 maxHeight：按内容自然布局，fixedHeight 单独配置不生效' }}</pre>
      <SuperTable v-if="mounted" :key="'max:' + showHeader" :schema="maxSchema" />
      <p class="demo-status">表格下方的普通内容：应跟随表格自然高度排列。</p>
    </template>

    <Teleport to="#demo-test-content">
      <div class="dev-tools">
        <h2 class="demo-test-title">开发与测试 · 三种高度</h2>
        <ol>
          <li>页面高度：勾选固定高度，只调整浏览器高度，再展开/收起本测试区，分页应保持在页面工作区底部。</li>
          <li>父元素高度：拖动父高度滑块，父元素外框与表格同步变化，不给 SuperTable 设置 height。</li>
          <li>指定最大高度：拖动滑块，60 行时内部滚动；关闭固定高度后，3 行及空数据自然收缩。关闭再启用 maxHeight，应清除旧约束并恢复滚动。</li>
          <li>三种场景分别关闭表头、切换数据量及反复卸载/挂载，观察滚动和控制台。AntDV 从 60 行切到 3 行或空数据后，内容未超高时纵向滚动条应消失；切回 60 行后恢复。</li>
          <li>AntDV 横向滚动宽度保持 1800px，纵向滚动后切页不自动回到首行；Element Plus 通过列宽产生横向滚动。</li>
        </ol>
      </div>
    </Teleport>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { SuperTable, type RootTableOption } from '@demo/product'
import { useDemo } from '../context'

const scenes = [
  { id: 'page', title: '1. 自动计算页面高度' },
  { id: 'parent', title: '2. 填充父元素高度' },
  { id: 'max', title: '3. 指定最大高度' },
]
const scene = ref('page')
const count = ref(60)
const showHeader = ref(true)
const mounted = ref(true)
const fixedHeight = ref(false)
const limitHeight = ref(true)
const parentHeight = ref(440)
const maxHeight = ref(240)
const sectionRef = ref<HTMLElement>()
const pageBottomOffset = ref(0)
const rows = Array.from({ length: 60 }, (_, index) => ({
  id: index + 1,
  name: '成员 ' + (index + 1),
  department: index % 2 ? '产品研发' : '客户服务',
  city: index % 2 ? '杭州' : '上海',
  note: '用于观察横向滚动和纵向高度的示例数据',
}))
const dataSource = computed(() => rows.slice(0, count.value))
const { isElement } = useDemo(() => ({
  scene: scene.value,
  count: count.value,
  showHeader: showHeader.value,
  mounted: mounted.value,
  parentHeight: parentHeight.value,
  maxHeight: maxHeight.value,
  fixedHeight: fixedHeight.value,
  limitHeight: limitHeight.value,
  pageBottomOffset: pageBottomOffset.value,
}))

const baseSchema = computed<RootTableOption>(() => ({
  dataSource,
  immediate: false,
  pagination: { pageSize: 20 },
  attrs: {
    rowKey: 'id',
    showHeader: showHeader.value,
    scroll: { x: 1800, scrollToFirstRowOnChange: false },
  },
  columns: [
    { type: 'Text', field: 'id', label: 'ID', columnProps: { width: 100, fixed: 'left' } },
    { type: 'Text', field: 'name', label: '姓名', columnProps: { width: 250 } },
    { type: 'Text', field: 'department', label: '部门', columnProps: { width: 300 } },
    { type: 'Text', field: 'city', label: '城市', columnProps: { width: 250 } },
    { type: 'Text', field: 'note', label: '备注', columnProps: { width: isElement ? 900 : undefined } },
  ],
}))
const pageSchema = computed<RootTableOption>(() => ({
  ...baseSchema.value,
  maxHeight: 'viewport',
  fixedHeight: fixedHeight.value,
  heightOffset: pageBottomOffset.value,
}))
const parentSchema = computed<RootTableOption>(() => ({
  ...baseSchema.value,
  maxHeight: 'parent',
  fixedHeight: fixedHeight.value,
}))
const maxSchema = computed<RootTableOption>(() => ({
  ...baseSchema.value,
  maxHeight: limitHeight.value ? maxHeight.value : undefined,
  fixedHeight: fixedHeight.value,
}))

// 示例外壳有底部测试区，按实际工作区底边预留空间，避免用固定偏移掩盖页面高度效果。
let workspace: HTMLElement | null = null
let workspaceObserver: ResizeObserver | undefined
function updatePageOffset() {
  if (!workspace || !sectionRef.value) return
  const workspaceStyle = getComputedStyle(workspace)
  const sectionStyle = getComputedStyle(sectionRef.value)
  pageBottomOffset.value = Math.max(0, document.documentElement.clientHeight
    - workspace.getBoundingClientRect().bottom
    + (parseFloat(workspaceStyle.paddingBottom) || 0)
    - (parseFloat(sectionStyle.marginBottom) || 0))
}
onMounted(() => {
  workspace = sectionRef.value?.closest<HTMLElement>('.demo-main') ?? null
  updatePageOffset()
  workspaceObserver = new ResizeObserver(updatePageOffset)
  if (workspace) workspaceObserver.observe(workspace)
  window.addEventListener('resize', updatePageOffset)
})
onUnmounted(() => {
  workspaceObserver?.disconnect()
  window.removeEventListener('resize', updatePageOffset)
})
</script>

<style scoped>
.height-config {
  margin: 12px 0;
  padding: 10px 12px;
  background: #f6f8fb;
  white-space: pre-wrap;
}
.height-parent {
  box-sizing: border-box;
  border: 1px dashed #9fb3cb;
  padding: 12px 16px 24px 40px;
  overflow: hidden;
}
</style>
