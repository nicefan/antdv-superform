import type { Component } from 'vue'
import P001Adapter from './P001Adapter.vue'
import P002RealComponentNames from './P002RealComponentNames.vue'

export interface UpgradeTestPage {
  id: string
  phase: string
  title: string
  description: string
  component: Component
}

/** 每个阶段完成后在这里登记对应的人工验证页面。 */
export const upgradeTestPages: UpgradeTestPage[] = [
  {
    id: 'p001-adapter',
    phase: 'P001',
    title: 'UIAdapter 基础接口',
    description: '检查显式初始化的 Adapter、字段映射、默认属性和现有表单渲染。',
    component: P001Adapter,
  },
  {
    id: 'p002-real-component-names',
    phase: 'P002',
    title: '字段处理器与真实组件名',
    description: '验证真实 UI 名称、范围拆分、options、Switch、TreeSelect 和 Input 搜索渲染。',
    component: P002RealComponentNames,
  },
]
