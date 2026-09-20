import { renderDefaultGroup } from './defaultGroup'
import type { UIAdapter, UIAdapterOverrides, UIGroupState, UIRenderers } from './types'
import { registerUIComponents } from './fieldRegistry'

let activeAdapter: UIAdapter | undefined

/** 保留 Adapter 的具体类型并提供统一定义入口。 */
export function defineUIAdapter<T extends UIAdapter>(adapter: T): T {
  return adapter
}

export function getUIAdapter() {
  if (!activeAdapter) {
    throw new Error(
      'SuperForm 尚未初始化 UIAdapter；官方产品请先调用 superForm.initialize()，独立 Core 请调用 superForm.useAdapter(adapter)'
    )
  }
  return activeAdapter
}

/** 初始化后锁定 UI 协议；重复使用同一 Adapter 不重新登记组件。 */
export function initializeUIAdapter(adapter: UIAdapter) {
  if (activeAdapter) {
    if (activeAdapter !== adapter) {
      throw new Error(`UIAdapter 已初始化为 '${activeAdapter.name}'，不能切换为 '${adapter.name}'`)
    }
    return
  }
  activeAdapter = adapter
  registerUIComponents(adapter.fieldComponents || {}, 'manual')
}

/** 初始化期间应用覆盖，不在渲染阶段重复合并。 */
export function extendUIAdapter(adapter: UIAdapter, overrides: UIAdapterOverrides = {}): UIAdapter {
  return { ...adapter, ...overrides, render: { ...adapter.render, ...overrides.render } }
}

const renderCache: Partial<UIRenderers> = {}

/** 首次使用时校验并缓存；不得在模块导入阶段调用，避免早于 initialize。 */
export function getUIRender<K extends keyof UIRenderers>(name: K): UIRenderers[K] {
  const cached = renderCache[name]
  if (cached) return cached
  const adapter = getUIAdapter()
  let render = adapter.render[name]
  if (name === 'group') {
    const configured = adapter.render.group || renderDefaultGroup
    render = ((state: UIGroupState) =>
      state.component ? renderDefaultGroup(state) : configured(state)) as UIRenderers[K]
  } else if (name === 'compactSpace') {
    render ||= adapter.render.space as UIRenderers[K]
  }
  if (!render) throw new Error(`UIAdapter '${adapter.name}' 未提供 render.${name}`)
  renderCache[name] = render
  return render
}

export function getUIService<K extends 'form' | 'services' | 'icons' | 'upload' | 'table'>(
  name: K
): NonNullable<UIAdapter[K]> {
  const adapter = getUIAdapter()
  const service = adapter[name]
  if (!service) throw new Error(`UIAdapter '${adapter.name}' 未提供 ${name} 协议`)
  return service
}
