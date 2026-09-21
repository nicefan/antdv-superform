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
  const originalType = adapter.fieldSources?.[type] ?? type
  // 原始名优先，同源字段任一手动注册均可共享；顺序不依赖哪个字段先渲染。
  const names = [
    originalType,
    ...Object.keys(adapter.fieldSources || {}).filter(
      (name) => name !== originalType && adapter.fieldSources?.[name] === originalType
    ),
  ]
  return (
    rawUIComponents.get(originalType) ??
    names.map((name) => manualUIComponents.get(name)).find(Boolean) ??
    names.map((name) => autoImportedUIComponents.get(name)).find(Boolean)
  )
}

/** 在合成字段前保存原始组件，扩展适配组件通过同一接口读取，避免递归取得自身。 */
export function requireUIComponent(type: string): Component {
  const cached = rawUIComponents.get(type)
  if (cached) return cached
  const component = resolveUIComponent(type)
  if (!component) {
    throw new Error(
      `UIAdapter '${
        getUIAdapter().name
      }' 支持字段 '${type}'，但组件 '${type}' 尚未注册；请启用自动导入插件，或在 superForm.initialize({ components }) 中提供`
    )
  }
  const target = getUIAdapter().fieldSources?.[type] ?? type
  rawUIComponents.set(target, component)
  rawUIComponents.set(type, component)
  return component
}

/** 适配组件只读已加载的原始缓存，不触发字段解析或返回自身。 */
export function useUIComponent(type: string): Component {
  const component = rawUIComponents.get(type)
  if (!component) throw new Error(`原始 UI 组件 '${type}' 尚未加载`)
  return component
}
