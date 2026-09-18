import type { UIAdapter } from './types'
import { registerUIComponents } from './fieldRegistry'

let activeAdapter: UIAdapter | undefined

/** 保留 Adapter 的具体类型并提供统一定义入口。 */
export function defineUIAdapter<T extends UIAdapter>(adapter: T): T {
  return adapter
}

export function getUIAdapter() {
  if (!activeAdapter) {
    throw new Error('SuperForm 尚未初始化 UIAdapter；官方产品请先调用 superForm.initialize()，独立 Core 请调用 superForm.useAdapter(adapter)')
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
