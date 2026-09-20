import type { Component } from 'vue'
import superform from './plugin'
import { extendUIAdapter, type UIAdapter, type UIAdapterOverrides } from './adapter'

const officialProductKey = Symbol.for('superform.official-product')

export interface OfficialProductInitializeOptions<FieldName extends string> {
  /** 手动提供 Adapter 已声明字段的实际 UI 组件。 */
  components?: Partial<Record<FieldName, Component>>
  /** 初始化时按项覆盖固定 UI 渲染，初始化后不可替换。 */
  overrides?: UIAdapterOverrides
}

export type OfficialSuperFormProduct<FieldName extends string> = typeof superform & {
  /** 显式初始化官方 UI Adapter；重复无参调用可安全复用。 */
  initialize(options?: OfficialProductInitializeOptions<FieldName>): OfficialSuperFormProduct<FieldName>
}

/** 创建无导入副作用的官方产品实例。 */
export function createOfficialProduct<FieldName extends string>(
  productName: string,
  createAdapter: (components?: Partial<Record<FieldName, Component>>) => UIAdapter
): OfficialSuperFormProduct<FieldName> {
  let initialized = false

  // 使用独立外观对象，避免同一模块图中出现多个产品时相互覆盖 initialize。
  const product = {
    ...superform,
    initialize(options: OfficialProductInitializeOptions<FieldName> = {}) {
      const components = options.components
      const componentNames = Object.keys(components || {})

      if (initialized) {
        if (componentNames.length || options.overrides) {
          throw new Error(`SuperForm '${productName}' 已初始化，不能再追加字段组件或覆盖 UI 协议`)
        }
        return product
      }

      const adapter = extendUIAdapter(createAdapter(components), options.overrides)
      for (const name of componentNames) {
        if (!adapter.supportedFields.includes(name)) {
          throw new Error(`UIAdapter '${adapter.name}' 未声明字段 '${name}'，不能初始化对应 UI 组件`)
        }
      }

      const scope = globalThis as Record<PropertyKey, unknown>
      const activeProduct = scope[officialProductKey]
      if (activeProduct && activeProduct !== productName) {
        throw new Error(`SuperForm 已初始化官方产品 '${String(activeProduct)}'，不能再初始化 '${productName}'`)
      }

      superform.useAdapter(adapter)
      scope[officialProductKey] = productName
      initialized = true
      return product
    },
  } as OfficialSuperFormProduct<FieldName>

  return product
}
