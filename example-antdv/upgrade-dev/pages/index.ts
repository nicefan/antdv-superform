import type { Component } from 'vue'
import P001Adapter from './P001Adapter.vue'
import P002RealComponentNames from './P002RealComponentNames.vue'
import P003Containers from './P003Containers.vue'
import P006UploadModal from './P006UploadModal.vue'
import P007Table from './P007Table.vue'

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
    description: '检查产品入口自动初始化的 Adapter、字段映射、默认属性和现有表单渲染。',
    component: P001Adapter,
  },
  {
    id: 'p002-real-component-names',
    phase: 'P002',
    title: '字段处理器与真实组件名',
    description: '验证真实 UI 名称、范围拆分、options、Switch、TreeSelect 和 Input 搜索渲染。',
    component: P002RealComponentNames,
  },
  {
    id: 'p003-containers',
    phase: 'P003',
    title: '容器、布局与图标',
    description: '验证 Form、栅格、Card、Tabs、Collapse、Descriptions 和按钮图标。',
    component: P003Containers,
  },
  {
    id: 'p006-upload-modal',
    phase: 'P006',
    title: 'Upload、Modal 与服务',
    description: '验证五种上传模式、消息服务、预览和命令式 Modal。',
    component: P006UploadModal,
  },
  {
    id: 'p007-table',
    phase: 'P007',
    title: 'Table capability',
    description: '验证表格选择、展开、行内编辑和 AntDV 协议映射。',
    component: P007Table,
  },
]
