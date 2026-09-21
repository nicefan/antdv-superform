<template>
  <div class="upgrade-shell">
    <header class="upgrade-header">
      <div>
        <p class="eyebrow">ANTDV SUPERFORM</p>
        <h1>统一渲染协议 · 人工验证</h1>
        <p>按左侧顺序操作，比较预期与实际现象；测试页不自动判定通过。</p>
      </div>
      <div class="upgrade-links">
        <a href="http://127.0.0.1:5174/">Element Plus 验证</a>
        <a href="/index.html">返回现有示例</a>
      </div>
    </header>

    <div class="upgrade-layout">
      <nav class="upgrade-nav" aria-label="改造验证页面">
        <button
          v-for="page of upgradeTestPages"
          :key="page.id"
          :class="{ active: page.id === activePage.id }"
          type="button"
          @click="selectPage(page.id)"
        >
          <span>{{ page.phase }}</span>
          <strong>{{ page.title }}</strong>
          <small>{{ page.description }}</small>
        </button>
      </nav>

      <main class="upgrade-content">
        <component :is="activePage.component" />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { upgradeTestPages } from './pages'

const fallbackPage = upgradeTestPages[0]
const initialId = location.hash.slice(1)
const activeId = ref(upgradeTestPages.some(({ id }) => id === initialId) ? initialId : fallbackPage.id)
const activePage = computed(() => upgradeTestPages.find(({ id }) => id === activeId.value) || fallbackPage)

function selectPage(id: string) {
  activeId.value = id
  location.hash = id
}
</script>

<style>
:root {
  color: #172033;
  background: #f4f6fa;
  font-family: Inter, 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

button,
a {
  font: inherit;
}

.upgrade-links {
  display: flex;
  gap: 16px;
}

.upgrade-shell {
  min-height: 100vh;
}

.upgrade-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  padding: 32px 40px;
  color: #fff;
  background: #172033;
}

.upgrade-header h1,
.upgrade-header p {
  margin: 0;
}

.upgrade-header h1 {
  margin: 6px 0 8px;
  font-size: 28px;
}

.upgrade-header .eyebrow {
  color: #92adff;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.upgrade-header a {
  color: #cbd7ff;
}

.upgrade-layout {
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 24px;
  padding: 24px 40px 40px;
}

.upgrade-nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.upgrade-nav button {
  display: grid;
  gap: 4px;
  width: 100%;
  padding: 16px;
  color: #4c5872;
  text-align: left;
  background: #fff;
  border: 1px solid #dfe4ee;
  border-radius: 10px;
  cursor: pointer;
}

.upgrade-nav button.active {
  color: #172033;
  border-color: #5474dc;
  box-shadow: 0 0 0 2px rgb(84 116 220 / 12%);
}

.upgrade-nav span,
.upgrade-nav small {
  font-size: 12px;
}

.upgrade-nav span {
  color: #5474dc;
  font-weight: 700;
}

.upgrade-content {
  min-width: 0;
}

@media (max-width: 800px) {
  .upgrade-header {
    align-items: flex-start;
    padding: 24px;
  }

  .upgrade-layout {
    grid-template-columns: 1fr;
    padding: 20px;
  }
}
</style>
