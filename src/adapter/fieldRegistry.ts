import type { Component } from 'vue'
import { getUIAdapter } from './runtime'

export type UIComponentSource = 'manual' | 'auto'

const manualUIComponents = new Map<string, Component>()
const autoImportedUIComponents = new Map<string, Component>()
const rawUIComponents = new Map<string, Component>()

/** 注册规则保持手动组件优先；最终字段的适配组件不会写入这些原始组件表。 */
export function registerUIComponents(
  components: Record<string, Component | undefined>,
  source: UIComponentSource = 'manual'
) {
  const registry = source === 'manual' ? manualUIComponents : autoImportedUIComponents
  Object.entries(components).forEach(([name, component]) => {
    if (component) registry.set(name, component)
  })
}

export function resolveUIComponent(type: string): Component | undefined {
  const adapter = getUIAdapter()
  if (!adapter.supportedFields.includes(type)) return
  const target = adapter.fields?.[type]?.component
  const originalType = typeof target === 'string' ? target : type
  // 别名共用原始组件；保留按别名手动提供组件的入口，手动来源始终优先自动导入。
  return rawUIComponents.get(originalType) ?? rawUIComponents.get(type)
    ?? manualUIComponents.get(type) ?? manualUIComponents.get(originalType)
    ?? autoImportedUIComponents.get(originalType) ?? autoImportedUIComponents.get(type)
}

/** 在合成字段前保存原始组件，扩展适配组件通过同一接口读取，避免递归取得自身。 */
export function requireUIComponent(type: string): Component {
  const cached = rawUIComponents.get(type)
  if (cached) return cached
  const component = resolveUIComponent(type)
  if (!component) {
    throw new Error(`UIAdapter '${getUIAdapter().name}' 支持字段 '${type}'，但组件 '${type}' 尚未注册；请启用自动导入插件，或在 superForm.initialize({ components }) 中提供`)
  }
  const target = getUIAdapter().fields?.[type]?.component
  if (typeof target === 'string') rawUIComponents.set(target, component)
  rawUIComponents.set(type, component)
  return component
}

/** 适配组件只读已加载的原始缓存，不触发字段解析或返回自身。 */
export function useUIComponent(type: string): Component {
  const component = rawUIComponents.get(type)
  if (!component) throw new Error(`原始 UI 组件 '${type}' 尚未加载`)
  return component
}
