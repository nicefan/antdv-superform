import { h, type Component, type Slots } from 'vue'
import type {
  AdapterComponent,
  ActionComponentName,
  ContainerAdapter,
  FieldAdapter,
  FieldAdapterContext,
  IconAdapterContext,
  LayoutComponentName,
  PresentationComponentName,
  UIAdapter,
} from './types'

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

function resolveAdapterComponent(component: AdapterComponent): Component | undefined {
  return typeof component === 'string' ? getUIAdapter().components[component] : component
}

function requireAdapterComponent(component: AdapterComponent | undefined, capability: string) {
  const resolved = component && resolveAdapterComponent(component)
  if (!resolved) throw new Error(`UIAdapter '${getUIAdapter().name}' 未提供 ${capability} capability`)
  return resolved
}

export function renderUIForm(props: Obj, slots: Obj = {}) {
  const form = getUIAdapter().form
  const component = requireAdapterComponent(form?.component, 'Form')
  return h(component, form?.transformProps?.(props) ?? props, slots)
}

export function renderUIFormItem(props: Obj, slots: Obj = {}) {
  const form = getUIAdapter().form
  const component = requireAdapterComponent(form?.item, 'FormItem')
  return h(component, form?.transformItemProps?.(props) ?? props, slots)
}

export function validateUIForm(instance: unknown) {
  const form = getUIAdapter().form
  if (!form) throw new Error(`UIAdapter '${getUIAdapter().name}' 未提供 Form capability`)
  return form.validate(instance)
}

export function clearUIFormValidation(instance: unknown) {
  const form = getUIAdapter().form
  if (!form) throw new Error(`UIAdapter '${getUIAdapter().name}' 未提供 Form capability`)
  return form.clearValidate(instance)
}

export function renderUILayout(type: LayoutComponentName, props: Obj = {}, slots: Obj = {}) {
  const layout = getUIAdapter().layout
  const configured = type === 'compactSpace' ? layout?.compactSpace ?? layout?.space : layout?.[type]
  const component = requireAdapterComponent(configured, type)
  return h(component, layout?.transformProps?.[type]?.(props) ?? props, slots)
}

export function getUIContainerAdapter(type: string): ContainerAdapter | undefined {
  return getUIAdapter().containers?.[type]
}

export function mapUIContainerProps(type: string, props: Obj) {
  const container = getUIContainerAdapter(type)
  let mapped = { ...props }
  const { prop = 'value', event = 'update:value' } = container?.model || {}
  if (prop !== 'value') {
    mapped[prop] = mapped.value
    delete mapped.value
  }
  if (event !== 'update:value') {
    const listener = event.startsWith('on') ? event : `on${event[0].toUpperCase()}${event.slice(1)}`
    mapped[listener] = mapped['onUpdate:value']
    delete mapped['onUpdate:value']
  }
  if (container?.transformProps) mapped = container.transformProps(mapped)
  return mapped
}

export function renderUIContainer(type: string, props: Obj = {}, slots: Obj = {}) {
  const container = getUIContainerAdapter(type)
  const component = requireAdapterComponent(container?.component, `Container(${type})`)
  const mapped = mapUIContainerProps(type, props)
  return container?.render ? container.render(component, mapped, slots) : h(component, mapped, slots)
}

export function renderUIIcon(icon: unknown, context: IconAdapterContext = {}) {
  const icons = getUIAdapter().icons
  if (!icons) throw new Error(`UIAdapter '${getUIAdapter().name}' 未提供 Icon capability`)
  return icons.render(icon, context)
}

export function renderUISemanticIcon(name: string) {
  const icons = getUIAdapter().icons
  if (!icons) throw new Error(`UIAdapter '${getUIAdapter().name}' 未提供 Icon capability`)
  const component = icons.semantic?.[name]
  return component ? h(requireAdapterComponent(component, `Icon(${name})`)) : undefined
}

export function resolveUILayoutComponent(type: LayoutComponentName) {
  const layout = getUIAdapter().layout
  const configured = type === 'compactSpace' ? layout?.compactSpace ?? layout?.space : layout?.[type]
  return requireAdapterComponent(configured, type)
}

export function resolveUIActionComponent(type: ActionComponentName) {
  return requireAdapterComponent(getUIAdapter().actions?.components[type], `Action(${type})`)
}

export function getUIActionSlot(type: 'popup') {
  return getUIAdapter().actions?.slots?.[type] ?? type
}

export function resolveUIPresentationComponent(type: PresentationComponentName) {
  return requireAdapterComponent(getUIAdapter().presentation?.components[type], `Presentation(${type})`)
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
export type {
  AdapterComponent,
  ActionAdapter,
  ActionComponentName,
  ContainerAdapter,
  ComponentModelConfig,
  FieldAdapter,
  FieldAdapterContext,
  FormAdapter,
  IconAdapter,
  IconAdapterContext,
  LayoutAdapter,
  LayoutComponentName,
  PresentationAdapter,
  PresentationComponentName,
  UIAdapter,
} from './types'
