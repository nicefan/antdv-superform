<template>
  <main class="element-page">
    <header>
      <p>P005 · ELEMENT PLUS</p>
      <h1>独立 Schema 与 UI Adapter</h1>
      <span>字段能力由 Adapter 声明，实际 Element Plus 组件均由 Vite 插件按需导入。</span>
      <a href="http://127.0.0.1:5173/upgrade-dev/index.html">返回 AntDV 验证入口</a>
    </header>
    <SuperForm :schema="elementPlusSchema" :data-source="model" />
    <pre>{{ model }}</pre>
  </main>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { SuperForm } from 'superform'
import { elementPlusSchema } from './schema'

const model = reactive({
  name: '第二套 UI',
  city: '杭州',
  enabled: true,
  rating: 3,
  tabs: {
    tags: { value: ['Core', 'Element Plus'] },
    choices: { value: ['适配器'] },
  },
})
</script>

<style scoped>
.element-page {
  display: grid;
  gap: 24px;
  max-width: 960px;
  margin: 0 auto;
  padding: 40px;
}

header {
  display: grid;
  gap: 8px;
}

header p,
header h1 {
  margin: 0;
}

header p {
  color: var(--el-color-primary);
  font-weight: 700;
}

header a {
  width: fit-content;
  color: var(--el-color-primary);
}

pre {
  padding: 16px;
  overflow: auto;
  background: var(--el-fill-color-light);
  border-radius: var(--el-border-radius-base);
}
</style>
