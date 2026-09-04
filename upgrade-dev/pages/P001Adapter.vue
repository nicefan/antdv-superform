<template>
  <section class="test-page">
    <div class="page-heading">
      <div>
        <p>P001 · 已完成</p>
        <h2>UIAdapter 基础接口</h2>
      </div>
      <span :class="['result', allPassed ? 'passed' : 'failed']">
        {{ allPassed ? '基础检查通过' : '存在异常' }}
      </span>
    </div>

    <div class="check-grid">
      <article v-for="item of checks" :key="item.label">
        <span>{{ item.passed ? '通过' : '失败' }}</span>
        <strong>{{ item.label }}</strong>
        <code>{{ item.value }}</code>
      </article>
    </div>

    <article class="demo-card">
      <div>
        <h3>现有表单渲染冒烟检查</h3>
        <p>确认显式初始化 AntDV Adapter 后，原有 Input 和 Switch 增强字段仍可正常渲染与更新模型。</p>
      </div>
      <SuperForm :schema="schema" />
      <pre>{{ model }}</pre>
    </article>
  </section>
</template>

<script setup lang="ts">
import { computed, reactive } from 'vue'
import { SuperForm } from '../../src'
import { getUIAdapter, getUIFieldAdapter, resolveUIComponent } from '../../src/adapter'
import type { ExtFormOption } from '../../src'

const adapter = getUIAdapter()
const switchAdapter = getUIFieldAdapter('Switch')
const model = reactive({
  name: 'Adapter 基础验证',
  enabled: true,
})
const schema: ExtFormOption = {
  isContainer: true,
  dataSource: model,
  subItems: [
    { type: 'Input', field: 'name', label: '名称', span: 12 },
    { type: 'Switch', field: 'enabled', label: '启用', span: 12 },
  ],
}

const checks = computed(() => [
  {
    label: '当前 Adapter',
    passed: adapter.name === 'antdv-next',
    value: adapter.name,
  },
  {
    label: 'Input 组件解析',
    passed: resolveUIComponent('Input') === adapter.components.Input,
    value: resolveUIComponent('Input')?.name || '未解析',
  },
  {
    label: 'TimeRangePicker 真实名称',
    passed: resolveUIComponent('TimeRangePicker') === adapter.components.TimeRangePicker,
    value: resolveUIComponent('TimeRangePicker')?.name || '未解析',
  },
  {
    label: 'Switch model 协议',
    passed: switchAdapter?.model?.prop === 'checked' && switchAdapter.model.event === 'update:checked',
    value: `${switchAdapter?.model?.prop} / ${switchAdapter?.model?.event}`,
  },
  {
    label: 'TimePicker 默认格式',
    passed: adapter.defaults?.TimePicker?.valueFormat === 'HH:mm:ss',
    value: String(adapter.defaults?.TimePicker?.valueFormat),
  },
])
const allPassed = computed(() => checks.value.every(({ passed }) => passed))
</script>

<style scoped>
.test-page {
  display: grid;
  gap: 20px;
}

.page-heading,
.demo-card {
  padding: 24px;
  background: #fff;
  border: 1px solid #dfe4ee;
  border-radius: 12px;
}

.page-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.page-heading p,
.page-heading h2,
.demo-card h3,
.demo-card p {
  margin: 0;
}

.page-heading p {
  margin-bottom: 4px;
  color: #5474dc;
  font-size: 13px;
  font-weight: 700;
}

.result {
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
}

.result.passed {
  color: #18794e;
  background: #e8f7ef;
}

.result.failed {
  color: #b42318;
  background: #feeceb;
}

.check-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 12px;
}

.check-grid article {
  display: grid;
  gap: 7px;
  padding: 18px;
  background: #fff;
  border: 1px solid #dfe4ee;
  border-radius: 10px;
}

.check-grid span {
  color: #18794e;
  font-size: 12px;
  font-weight: 700;
}

.check-grid code,
.demo-card pre {
  overflow: auto;
  padding: 8px;
  color: #34405a;
  background: #f4f6fa;
  border-radius: 6px;
}

.demo-card {
  display: grid;
  gap: 20px;
}

.demo-card p {
  margin-top: 6px;
  color: #68738a;
}
</style>
