<template>
  <div class="demo-app">
    <aside class="demo-sidebar">
      <a class="demo-brand" :href="`${otherUrl}/#${current.id}`" title="切换 UI">
        <span class="demo-brand-mark">SF</span>
        <span class="demo-brand-name"
          >SuperForm<small>{{ ui === 'antdv' ? 'AntDV Next' : 'Element Plus' }}</small></span
        >
      </a>
      <nav aria-label="功能导航">
        <a
          v-for="(page, index) in pages"
          :key="page.id"
          :href="`#${page.id}`"
          :class="{ selected: current.id === page.id }"
          :aria-current="current.id === page.id ? 'page' : undefined"
          ><span>{{ String(index + 1).padStart(2, '0') }}</span
          >{{ page.title }}</a
        >
      </nav>
      <p class="sidebar-note">开发 · 演示 · 测试<br />右侧观察数据，底部展开测试。</p>
    </aside>
    <header class="demo-topbar">
      <div class="demo-heading">
        <h1>{{ current.title }}</h1>
        <p>{{ current.description }}</p>
      </div>
      <div class="demo-header-tools">
        <button class="demo-control" @click="revision++">重置当前演示</button>
      </div>
    </header>
    <div class="demo-body">
      <div class="demo-workspace">
        <!-- 先挂载目标，再渲染动态页面，确保页内 Teleport 可直接找到测试区。 -->
        <footer class="demo-test-dock">
          <div id="demo-test-content" v-show="testsOpen" class="demo-test-content" />
          <button
            class="demo-control demo-test-toggle"
            :aria-expanded="testsOpen"
            aria-controls="demo-test-content"
            @click="testsOpen = !testsOpen"
          >
            {{ testsOpen ? '收起测试区 ↓' : '展开测试区 ↑' }}<span>{{ current.title }} · 开发与测试</span>
          </button>
        </footer>
        <main class="demo-main">
          <Suspense
            ><component :is="current.component" :key="`${current.id}:${revision}`" /><template #fallback
              ><p>正在加载演示…</p></template
            ></Suspense
          >
        </main>
      </div>
      <DataInspector />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, defineAsyncComponent, onBeforeUnmount, provide, ref } from 'vue'
import { createInspector, inspectorKey, uiKey } from './context'
import DataInspector from './DataInspector.vue'
import './demo.css'
const props = defineProps<{ ui: 'antdv' | 'element' }>()
provide(uiKey, props.ui)
const inspector = createInspector()
provide(inspectorKey, inspector)
const pages = [
  {
    id: 'basic',
    title: '基础表单',
    kicker: 'FORM',
    description: '从录入到提交，了解字段、校验和表单公开方法。',
    component: defineAsyncComponent(() => import('./pages/BasicForm.vue')),
  },
  {
    id: 'linkage',
    title: '字段联动',
    kicker: 'REACTIONS',
    description: '看见一个操作如何改变其它字段、选项和计算结果。',
    component: defineAsyncComponent(() => import('./pages/Linkage.vue')),
  },
  {
    id: 'containers',
    title: '容器与列表',
    kicker: 'LAYOUT',
    description: '分组、页签、折叠面板，以及可编辑的动态列表。',
    component: defineAsyncComponent(() => import('./pages/Containers.vue')),
  },
  {
    id: 'tables',
    title: '表格操作',
    kicker: 'TABLE',
    description: '筛选查询、分页选择、行内与弹窗编辑，组成完整的数据管理流程。',
    component: defineAsyncComponent(() => import('./pages/Tables.vue')),
  },
  {
    id: 'overlays',
    title: '上传与弹窗',
    kicker: 'WORKFLOW',
    description: '上传、弹窗表单和弹窗表格，观察提交与取消的边界。',
    component: defineAsyncComponent(() => import('./pages/Overlays.vue')),
  },
  {
    id: 'extensions',
    title: '详情与扩展',
    kicker: 'CUSTOMIZATION',
    description: '详情布局、业务组件、插槽和按钮组，把 Schema 接入业务界面。',
    component: defineAsyncComponent(() => import('./pages/Extensions.vue')),
  },
  {
    id: 'integrated',
    title: '综合示例',
    kicker: 'ORDER',
    description: '创建一张采购订单：填写信息、编辑明细、计算金额、预览并提交。',
    component: defineAsyncComponent(() => import('./pages/Integrated.vue')),
  },
]
const active = ref(location.hash.slice(1) || 'basic')
const revision = ref(0)
const testsOpen = ref(false)
const current = computed(() => pages.find((page) => page.id === active.value) || pages[0])
const otherUrl = props.ui === 'antdv' ? 'http://127.0.0.1:5174' : 'http://127.0.0.1:5173'
function navigate() {
  active.value = location.hash.slice(1) || 'basic'
}
window.addEventListener('hashchange', navigate)
onBeforeUnmount(() => window.removeEventListener('hashchange', navigate))
</script>
