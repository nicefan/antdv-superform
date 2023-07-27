import VIcon from './icon/VIcon'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import type { App, Component } from 'vue'
import { override, addComponent } from './controls'
import type { Locale } from 'ant-design-vue/es/locale-provider'
type BaseComps =
  | 'Divider'
  | 'InputGroup'
  | 'FormItem'
  | 'Tooltip'
  | 'Button'
  | 'MenuItem'
  | 'Menu'
  | 'Dropdown'
  | 'Space'
  | 'Card'
  | 'ListItem'
  | 'List'
  | 'Modal'
  | 'Table'
  | 'Tabs'
  | 'TabPane'
  | 'CollapsePanel'
  | 'Collapse'
  | 'Input'
  | 'InputNumber'
  | 'InputSearch'
  | 'Select'
  | 'Switch'
  | 'RangePicker'
  | 'DatePicker'
  | 'TimePicker'
  | 'RadioButton'
  | 'Radio'
  | 'RadioGroup'
  | 'Checkbox'
  | 'CheckboxGroup'
  | 'TreeSelect'

type Dict = { label: string; value: string | number; [k: string]: string | number }
interface InstallConfig {
  locale?: Locale
  components?: { [k in BaseComps]?: Component }
  dictApi?: (name: string) => Promise<Dict[]>
}
interface GlobalConfig {
  dictApi?: (name: string) => Promise<Dict[]>
}
const globalConfig: GlobalConfig = {}
const install = async (app: App, config: InstallConfig = {}) => {
  const { locale = zhCN, components } = config
  app.provide('localeData', { locale: locale, exist: true })
  app.component('VIcon', VIcon)
  globalConfig.dictApi = config.dictApi
  components && override(components)
}

interface RegistPram {
  option: Obj
  /** 表单数据 */
  effectData: {
    formData: Obj
    /** 当前值 */
    record?: any
  }
  /** 绑定到组件上的动态属性 */
  attrs: Obj
}
function registComponent(name: string, component: ((param: RegistPram) => VNode) | Component) {
  addComponent(name, component)
}
export default {
  install,
  registComponent,
}
export { globalConfig }
