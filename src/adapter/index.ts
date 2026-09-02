import { h, type Component, type Slots } from 'vue'
import type { FieldAdapter, FieldAdapterContext, UIAdapter } from './types'

let activeAdapter: UIAdapter | undefined

export function defineUIAdapter<T extends UIAdapter>(adapter: T): T {
  return adapter
}

export function getUIAdapter() {
  if (!activeAdapter) {
    throw new Error('SuperForm 尚未初始化 UIAdapter，请在 app.use 时显式传入 adapter')
  }
  return activeAdapter
}

/** Adapter 在插件首次安装时锁定，组件树运行期间不允许切换 UI 协议。 */
export function initializeUIAdapter(adapter: UIAdapter) {
  if (activeAdapter && activeAdapter !== adapter) {
    throw new Error(`UIAdapter 已初始化为 '${activeAdapter.name}'，不能切换为 '${adapter.name}'`)
  }
  activeAdapter = adapter
}

export function getUIFieldAdapter(type: string): FieldAdapter | undefined {
  return getUIAdapter().fields?.[type]
}

export function resolveUIComponent(type: string): Component | undefined {
  const adapter = getUIAdapter()
  const component = getUIFieldAdapter(type)?.component ?? type
  return typeof component === 'string' ? adapter.components[component] : component
}

export function mapUIFieldProps(type: string, props: Obj, context: Omit<FieldAdapterContext, 'type'>): Obj {
  const field = getUIFieldAdapter(type)
  let mapped = { ...field?.defaultProps, ...props }
  const { prop = 'value', event = 'update:value' } = field?.model || {}
  if (prop !== 'value') {
    mapped[prop] = mapped.value
    delete mapped.value
  }
  if (event !== 'update:value') {
    const listener = event.startsWith('on') ? event : `on${event[0].toUpperCase()}${event.slice(1)}`
    mapped[listener] = mapped['onUpdate:value']
    delete mapped['onUpdate:value']
  }
  if (field?.transformProps) mapped = field.transformProps(mapped, { type, ...context })
  return mapped
}

export function renderUIField(type: string, props: Obj, context: Omit<FieldAdapterContext, 'type'>, slots: Slots = {}) {
  const component = resolveUIComponent(type)
  if (!component) return
  const field = getUIFieldAdapter(type)
  const mapped = mapUIFieldProps(type, props, context)
  return field?.render ? field.render(component, mapped, { type, ...context }, slots) : h(component, mapped, slots)
}

export { default as antdvAdapter } from './antdv'
export type { ComponentModelConfig, FieldAdapter, FieldAdapterContext, UIAdapter } from './types'
