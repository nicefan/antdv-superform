<template>
  <aside class="inspector" :class="{ 'inspector-collapsed': !state.open.value }" aria-label="数据观察区">
    <button
      v-if="!state.open.value"
      class="demo-control inspector-expand"
      aria-label="展开数据观察区"
      @click="state.open.value = true"
    >
      数据观察 ‹
    </button>
    <template v-else>
      <header class="inspector-handle">
        <strong
          >数据观察 <small>{{ state.paused.value ? '已暂停' : '实时' }}</small></strong
        >
        <button class="demo-control" @click="state.open.value = false" aria-label="收起数据观察区">收起 ›</button>
      </header>
      <nav class="inspector-tabs" aria-label="观察内容">
        <button
          v-for="item in tabs"
          :key="item.key"
          class="demo-control"
          :class="{ active: tab === item.key }"
          @click="tab = item.key"
        >
          {{ item.label }}
        </button>
      </nav>
      <div class="inspector-tools">
        <button class="demo-control" @click="state.paused.value = !state.paused.value">
          {{ state.paused.value ? '继续观察' : '暂停观察' }}
        </button>
        <button class="demo-control" @click="clearRecords">清空记录</button>
        <button class="demo-control" @click="copy">复制</button>
      </div>
      <div class="inspector-body">
        <pre v-if="tab === 'data'">{{ state.data.value }}</pre>
        <template v-else-if="tab === 'changes'">
          <p v-if="!state.changes.value.length" class="demo-muted">修改任一字段，这里会显示前后值。</p>
          <article v-for="(item, index) in [...state.changes.value].reverse()" :key="index">
            <small>{{ item.time }}</small
            ><b>{{ item.path }}</b>
            <pre class="before">{{ item.before }}</pre>
            <pre class="after">{{ item.after }}</pre>
          </article>
        </template>
        <template v-else>
          <p v-if="!state.events.value.length" class="demo-muted">提交、校验、查询和按钮事件会记录在这里。</p>
          <article v-for="(item, index) in [...state.events.value].reverse()" :key="index">
            <small>{{ item.time }}</small
            ><b>{{ item.name }}</b>
            <pre>{{ item.data }}</pre>
          </article>
        </template>
      </div>
      <footer role="status">{{ message || '暂停只影响观察，不暂停演示。收起后主内容区自动扩展。' }}</footer>
    </template>
  </aside>
</template>
<script setup lang="ts">
import { inject, ref } from 'vue'
import { inspectorKey, snapshot } from './context'
const state = inject(inspectorKey)!
const tab = ref('data')
const message = ref('')
const tabs = [
  { key: 'data', label: '当前数据' },
  { key: 'changes', label: '变化记录' },
  { key: 'events', label: '事件与结果' },
]
// 多条语句放在脚本中，避免模板表达式经无分号格式化后无法解析。
function clearRecords() {
  state.changes.value = []
  state.events.value = []
  message.value = ''
}
async function copy() {
  try {
    await navigator.clipboard.writeText(
      tab.value === 'data'
        ? state.data.value
        : snapshot(tab.value === 'changes' ? state.changes.value : state.events.value)
    )
    message.value = '已复制'
  } catch {
    message.value = '复制不可用，请选中文字手动复制。'
  }
}
</script>
