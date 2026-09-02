import { merge } from 'lodash-es'
import type { App, Component, VNode } from 'vue'
import { configureComponents, addComponent, type FormComponent } from './components'
import type { BaseComponentName, Locale } from './compat/antdv'
import { initializeUIAdapter, type UIAdapter } from './adapter'
import { globalConfig, type GlobalConfig } from './config'

export interface InstallConfig extends GlobalConfig {
  locale?: Locale
  /** 当前应用使用的 UI 框架适配器；初始化时必须显式传入，之后不可切换。 */
  adapter: UIAdapter
  /** UI 组件注册表；非内置名称可直接作为 schema type。 */
  components?: Partial<Record<BaseComponentName, FormComponent>> & Record<string, FormComponent | undefined>
  /** 组件默认参数 */
  defaultProps?: Obj
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
  const { locale, adapter, components, defaultProps, ..._config } = config
  app.provide('localeData', { locale: locale, exist: true })
  applyAdapter(adapter)
  Object.assign(globalConfig, _config)
  components && configureComponents(components)
  // 用户默认值始终覆盖当前 Adapter 默认值。
  defaultProps && setDefaultProps(defaultProps)
}

/** 绑定到组件上的动态属性 */
interface RegisterParam {
  option: Obj
  effectData: Obj
  /** 当前值 */
  value?: any
  [K: string]: any
}
function registerComponent(name: string, component: ((param: RegisterParam) => VNode) | Component) {
  addComponent(name, component)
}
/** @deprecated 使用 `registerComponent` */
function registComponent(name: string, component: ((param: RegisterParam) => VNode) | Component) {
  registerComponent(name, component)
}
function setDefaultProps(props: Obj) {
  merge(globalProps, props)
}
export default {
  install,
  registerComponent,
  registComponent,
  setDefaultProps,
}
export { globalConfig, globalProps }
