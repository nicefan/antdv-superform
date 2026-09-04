/**
 * Adapter 开发 SDK。独立 Adapter 包只能依赖这里的稳定契约，不能引用 Core 源码路径。
 */
export { defineUIAdapter, registerUIComponents } from './adapter'
export type {
  ActionAdapter,
  ActionRenderType,
  AdapterComponent,
  ComponentModelConfig,
  ContainerAdapter,
  FieldAdapter,
  FieldAdapterContext,
  FormAdapter,
  IconAdapter,
  IconAdapterContext,
  LayoutAdapter,
  LayoutComponentName,
  PresentationAdapter,
  PresentationRenderType,
  UIAdapter,
} from './adapter'
export { globalConfig } from './config'
export { toNode } from './utils/toNode'
