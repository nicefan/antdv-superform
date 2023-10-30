import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { merge } from 'lodash-es'
import type { App, Component, VNode } from 'vue'
import { override, addComponent } from './components'
import type { Locale } from 'ant-design-vue/es/locale-provider'
import type { ModelData } from './exaTypes'
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
interface InstallConfig extends GlobalConfig {
  locale?: Locale
  components?: { [k in BaseComps]?: Component }
  /** 组件默认参数 */
  defaultProps?: Obj
}
interface GlobalConfig {
  dictApi?: (name: string) => Promise<Dict[]>
  /** 自定义图标处理组件 */
  customIcon?: (name: string) => VNode
  /** 动态传递按钮权限 */
  buttonRoles?: () => string[]
  /** 全局按钮权限过滤 */
  // buttonsAuth?: (actions: ButtonItem[]) => ButtonItem[]
}
const globalConfig: GlobalConfig = {}

const globalProps: Obj = {
  FormItem: {
    validateFirst: true,
  },
  Table: {
    size: 'small',
  },
}

const install = async (app: App, config: InstallConfig = {}) => {
  const { locale = zhCN, components, defaultProps, ..._config } = config
  app.provide('localeData', { locale: locale, exist: true })
  Object.assign(globalConfig, _config)
  components && override(components)
  defaultProps && setDefaultProps(defaultProps)
}

interface RegistPram {
  /** 绑定到组件上的动态属性 */
  attrs: Obj
  formData: Obj
  /** 当前对象 */
  current: any
  /** 当前值 */
  value?: any
}
function registComponent(name: string, component: ((param: RegistPram) => VNode) | Component) {
  addComponent(name, component)
}
function setDefaultProps(props: Obj) {
  merge(globalProps, props)
}
export default {
  install,
  registComponent,
  setDefaultProps,
}
export { globalConfig, globalProps }
