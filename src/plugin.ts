import { merge } from 'lodash-es'
import type { App } from 'vue'
import { registerCustomComponents, type FormComponent } from './components'
import { initializeUIAdapter, type UIAdapter } from './adapter'
import { globalConfig, type GlobalConfig } from './config'

export type AdapterDefaultProps = Record<string, Obj | undefined>

export interface InstallConfig extends GlobalConfig {
  /** 当前应用使用的 UI 框架适配器；初始化时必须显式传入，之后不可切换。 */
  adapter: UIAdapter
  /** UI 组件注册表；非内置名称可直接作为 schema type。 */
  components?: Record<string, FormComponent | undefined>
  /** 组件默认参数 */
  defaultProps?: AdapterDefaultProps
}
const globalProps: Obj = {}

function applyAdapter(adapter: UIAdapter) {
  initializeUIAdapter(adapter)
  // 同一 Adapter 重复安装时重新以其默认值为基线，避免用户默认值跨安装残留。
  Object.keys(globalProps).forEach((name) => delete globalProps[name])
  merge(globalProps, adapter.defaults || {})
}

const install = async (app: App, config: InstallConfig) => {
  if (!config?.adapter) {
    throw new Error('初始化 SuperForm 时必须显式传入 adapter')
  }
  const { adapter, components, defaultProps, ..._config } = config
  applyAdapter(adapter)
  Object.assign(globalConfig, _config)
  if (components) {
    const adapterEnhancedTypes = Object.entries(adapter.fields || {})
      .filter(([, field]) => field?.processors?.length)
      .map(([name]) => name)
    registerCustomComponents(components, adapterEnhancedTypes)
  }
  // 用户默认值始终覆盖当前 Adapter 默认值。
  defaultProps && setDefaultProps(defaultProps)
}

function setDefaultProps(props: Obj) {
  merge(globalProps, props)
}
export default {
  install,
  setDefaultProps,
}
export { globalConfig, globalProps }
