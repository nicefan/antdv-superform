import { defineAsyncComponent, type Component } from 'vue'

// 历史页按需加载，避免未迁移的接口阻断当前验证页。
const P002RealComponentNames = defineAsyncComponent(() => import('./P002RealComponentNames.vue'))
const P003Containers = defineAsyncComponent(() => import('./P003Containers.vue'))
const P006UploadModal = defineAsyncComponent(() => import('./P006UploadModal.vue'))
const P007Table = defineAsyncComponent(() => import('./P007Table.vue'))

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
    id: 'p002-real-component-names',
    phase: 'P002',
    title: '字段路径',
    description: 'TreeSelect 值与标签、事件计数、日期范围、默认属性和插槽。',
    component: P002RealComponentNames,
  },
  {
    id: 'p003-containers',
    phase: 'P003',
    title: '容器路径',
    description: 'Tabs/Collapse 增删、激活回退、业务插槽、默认属性覆盖及列表弹窗。',
    component: P003Containers,
  },
  {
    id: 'p006-upload-modal',
    phase: 'P006',
    title: 'Form / Upload',
    description: '统一校验错误、原生实例、上传卸载后提交及失败重试。',
    component: P006UploadModal,
  },
  {
    id: 'p007-table',
    phase: 'P007',
    title: 'Form / Table',
    description: '行内保存、失败重试与取消；外部重排/替换、插入锚点和选择分页观察。',
    component: P007Table,
  },
]
