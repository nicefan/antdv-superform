import { defineUIAdapter, type UIAdapter } from 'superform/sdk'
import type { Component } from 'vue'
import { elementPlusCapabilities } from './capabilities'
import { elementPlusDefaults, elementPlusFields } from './fields'
import './schemaTypes'

export interface ElementPlusAdapterOptions {
  /** 不使用自动导入插件时，显式提供实际使用的字段组件。 */
  components?: Partial<Record<string, Component>>
}

/** 创建 Element Plus Adapter；导入包本身不初始化 SuperForm 全局状态。 */
export function createElementPlusAdapter(options: ElementPlusAdapterOptions = {}): UIAdapter {
  return defineUIAdapter({
    name: 'element-plus',
    ...elementPlusCapabilities,
    fields: elementPlusFields,
    fieldComponents: options.components,
    defaults: elementPlusDefaults,
  })
}

/** 默认 Adapter 实例，可通过 superform.useAdapter 显式注册。 */
export const elementPlusAdapter = createElementPlusAdapter()

export { elementPlusCapabilities, elementPlusDefaults, elementPlusFields }
export type { UIAdapter } from 'superform/sdk'
export default elementPlusAdapter
