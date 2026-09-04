import { h, type Component, type Slots } from 'vue'
import type {
  AdapterComponent,
  ActionRenderType,
  ContainerAdapter,
  FieldAdapter,
  FieldAdapterContext,
  IconAdapterContext,
  LayoutComponentName,
  PresentationRenderType,
  UIAdapter,
} from './types'

let activeAdapter: UIAdapter | undefined
const registeredUIComponents: Record<string, Component> = {}

/** 保留 Adapter 的具体类型并提供统一定义入口。 */
export function defineUIAdapter<T extends UIAdapter>(adapter: T): T {
  return adapter
}

/** 获取当前应用已经初始化的 UIAdapter。 */
export function getUIAdapter() {
  if (!activeAdapter) {
    throw new Error('SuperForm 尚未初始化 UIAdapter，请先调用 superform.useAdapter(adapter)')
  }
  return activeAdapter
}

/** Adapter 在插件首次安装时锁定，组件树运行期间不允许切换 UI 协议。 */
export function initializeUIAdapter(adapter: UIAdapter) {
  if (activeAdapter && activeAdapter !== adapter) {
    throw new Error(`UIAdapter 已初始化为 '${activeAdapter.name}'，不能切换为 '${adapter.name}'`)
  }
  activeAdapter = adapter
  registerUIComponents(adapter.fieldComponents || {})
}

/** 获取指定 Schema 字段的 Adapter 协议。 */
export function getUIFieldAdapter(type: string): FieldAdapter | undefined {
  return getUIAdapter().fields?.[type]
}

/** 注册 Adapter 已声明字段所需的实际 UI 组件，供初始化配置和构建插件共用。 */
export function registerUIComponents(components: Record<string, Component | undefined>) {
  Object.entries(components).forEach(([name, component]) => {
    if (component) registeredUIComponents[name] = component
  })
}

/** 解析 Adapter 字段对应的已注册 UI 组件。 */
export function resolveUIComponent(type: string): Component | undefined {
  const field = getUIFieldAdapter(type)
  if (!field) return
  return registeredUIComponents[field.component]
}

/** 获取字段组件，并在缺少注册时给出明确错误。 */
export function requireUIComponent(type: string) {
  const component = resolveUIComponent(type)
  if (!component) {
    const registeredName = getUIFieldAdapter(type)?.component ?? type
    throw new Error(
      `UIAdapter '${getUIAdapter().name}' 支持字段 '${type}'，但组件 '${String(
        registeredName
      )}' 尚未注册；请启用自动导入插件，或使用 Adapter 的 full 入口`
    )
  }
  return component
}

/** 解析 Adapter 内部固定 UI 原语。 */
function resolveAdapterComponent(component: AdapterComponent): Component | undefined {
  return typeof component === 'string' ? getUIAdapter().components[component] : component
}

/** 获取必需的固定 UI 原语，并统一处理 capability 缺失。 */
function requireAdapterComponent(component: AdapterComponent | undefined, capability: string) {
  const resolved = component && resolveAdapterComponent(component)
  if (!resolved) throw new Error(`UIAdapter '${getUIAdapter().name}' 未提供 ${capability} capability`)
  return resolved
}

/** 将 Core 的标准 value 协议映射为具体 UI 组件 model。 */
function mapModelBinding(props: Obj, model?: { prop?: string; event?: string }) {
  const mapped = { ...props }
  const { prop = 'value', event = 'update:value' } = model || {}
  if (prop !== 'value') {
    mapped[prop] = mapped.value
    delete mapped.value
  }
  if (event !== 'update:value') {
    const listener = event.startsWith('on') ? event : `on${event[0].toUpperCase()}${event.slice(1)}`
    mapped[listener] = mapped['onUpdate:value']
    delete mapped['onUpdate:value']
  }
  return mapped
}

/** 获取布局 capability 及其实际组件。 */
function getUILayout(type: LayoutComponentName) {
  const layout = getUIAdapter().layout
  const configured = type === 'compactSpace' ? layout?.compactSpace ?? layout?.space : layout?.[type]
  return { component: requireAdapterComponent(configured, type), layout }
}

/** 使用当前 Adapter 渲染表单容器。 */
export function renderUIForm(props: Obj, slots: Obj = {}) {
  const form = getUIAdapter().form
  const component = requireAdapterComponent(form?.component, 'Form')
  return h(component, form?.transformProps?.(props) ?? props, slots)
}

/** 使用当前 Adapter 渲染表单项。 */
export function renderUIFormItem(props: Obj, slots: Obj = {}) {
  const form = getUIAdapter().form
  const component = requireAdapterComponent(form?.item, 'FormItem')
  return h(component, form?.transformItemProps?.(props) ?? props, slots)
}

/** 调用当前 UI 表单实例的校验方法。 */
export function validateUIForm(instance: unknown) {
  const form = getUIAdapter().form
  if (!form) throw new Error(`UIAdapter '${getUIAdapter().name}' 未提供 Form capability`)
  return form.validate(instance)
}

/** 清理当前 UI 表单实例的校验状态。 */
export function clearUIFormValidation(instance: unknown) {
  const form = getUIAdapter().form
  if (!form) throw new Error(`UIAdapter '${getUIAdapter().name}' 未提供 Form capability`)
  return form.clearValidate(instance)
}

/** 使用当前 Adapter 渲染布局原语。 */
export function renderUILayout(type: LayoutComponentName, props: Obj = {}, slots: Obj = {}) {
  const { component, layout } = getUILayout(type)
  return h(component, layout?.transformProps?.[type]?.(props) ?? props, slots)
}

/** 获取指定容器的 Adapter 协议。 */
export function getUIContainerAdapter(type: string): ContainerAdapter | undefined {
  return getUIAdapter().containers?.[type]
}

/** 将 Core 容器属性映射为具体 UI 协议。 */
export function mapUIContainerProps(type: string, props: Obj) {
  const container = getUIContainerAdapter(type)
  let mapped = mapModelBinding(props, container?.model)
  if (container?.transformProps) mapped = container.transformProps(mapped)
  return mapped
}

/** 使用当前 Adapter 渲染容器。 */
export function renderUIContainer(type: string, props: Obj = {}, slots: Obj = {}) {
  const container = getUIContainerAdapter(type)
  const component = requireAdapterComponent(container?.component, `Container(${type})`)
  const mapped = mapUIContainerProps(type, props)
  return container?.render ? container.render(component, mapped, slots) : h(component, mapped, slots)
}

/** 使用当前 Adapter 渲染 Schema 图标。 */
export function renderUIIcon(icon: unknown, context: IconAdapterContext = {}) {
  const icons = getUIAdapter().icons
  if (!icons) throw new Error(`UIAdapter '${getUIAdapter().name}' 未提供 Icon capability`)
  return icons.render(icon, context)
}

/** 渲染 Core 内置交互使用的语义图标。 */
export function renderUISemanticIcon(name: string) {
  const icons = getUIAdapter().icons
  if (!icons) throw new Error(`UIAdapter '${getUIAdapter().name}' 未提供 Icon capability`)
  const component = icons.semantic?.[name]
  return component ? h(requireAdapterComponent(component, `Icon(${name})`)) : undefined
}

/** 获取布局类型对应的实际 UI 组件。 */
export function resolveUILayoutComponent(type: LayoutComponentName) {
  return getUILayout(type).component
}

/** 使用当前 Adapter 渲染动作能力。 */
export function renderUIAction(type: ActionRenderType, props: Obj = {}, slots: Obj = {}) {
  const actions = getUIAdapter().actions
  if (!actions) throw new Error(`UIAdapter '${getUIAdapter().name}' 未提供 Action capability`)
  return actions.render(type, props, slots)
}

/** 使用当前 Adapter 渲染展示原语。 */
export function renderUIPresentation(type: PresentationRenderType, props: Obj = {}, slots: Obj = {}) {
  const presentation = getUIAdapter().presentation
  if (!presentation) throw new Error(`UIAdapter '${getUIAdapter().name}' 未提供 Presentation capability`)
  return presentation.render(type, props, slots)
}

/** 合并并转换指定字段的 UI 属性。 */
export function mapUIFieldProps(type: string, props: Obj, context: Omit<FieldAdapterContext, 'type'>): Obj {
  const field = getUIFieldAdapter(type)
  let mapped = mapModelBinding({ ...field?.defaultProps, ...props }, field?.model)
  if (field?.transformProps) mapped = field.transformProps(mapped, { type, ...context })
  return mapped
}

/** 使用字段协议和已注册组件渲染 Schema 字段。 */
export function renderUIField(type: string, props: Obj, context: Omit<FieldAdapterContext, 'type'>, slots: Slots = {}) {
  const component = requireUIComponent(type)
  const field = getUIFieldAdapter(type)
  const mapped = mapUIFieldProps(type, props, context)
  return field?.render ? field.render(component, mapped, { type, ...context }, slots) : h(component, mapped, slots)
}

export type {
  AdapterComponent,
  ActionAdapter,
  ActionRenderType,
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
  PresentationRenderType,
  UIAdapter,
} from './types'
