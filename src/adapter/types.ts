import type { Component, Slots, VNodeChild } from 'vue'

export interface ComponentModelConfig {
  /** 组件接收主值的属性名，默认 value */
  prop?: string
  /** 组件更新主值时触发的事件名，默认 update:value */
  event?: string
}

export interface FieldAdapterContext {
  type: string
  option: Obj
  effectData: Obj
}

export interface FieldAdapter {
  /** 实际组件或 adapter.components 中的组件名称 */
  component: string | Component
  /** 当前 UI 框架使用的受控值协议 */
  model?: ComponentModelConfig
  /** 该字段在当前 UI 框架下的默认属性 */
  defaultProps?: Obj
  /** 需要依次应用的 Core 字段处理器 */
  processors?: string[]
  /** 将核心字段状态转换为当前 UI 组件属性 */
  transformProps?: (props: Obj, context: FieldAdapterContext) => Obj
  /** 当前 UI 框架需要特殊组件或 slot 协议时自定义最终渲染 */
  render?: (component: Component, props: Obj, context: FieldAdapterContext, slots: Slots) => VNodeChild
}

export interface UIAdapter {
  /** 用于诊断和调试的适配器名称 */
  name: string
  /** 当前 UI 框架提供的基础组件 */
  components: Record<string, Component>
  /** SuperForm 增强字段到 UI 组件协议的映射 */
  fields?: Record<string, FieldAdapter | undefined>
  /** 当前 UI 框架的全局组件默认属性 */
  defaults?: Obj<Obj>
}
