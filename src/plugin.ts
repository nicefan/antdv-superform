import zhCN from 'ant-design-vue/es/locale/zh_CN'
import { merge } from 'lodash-es'
import type { App, Component } from 'vue'
import { override, addComponent } from './components'
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
interface InstallConfig extends GlobalConfig {
  locale?: Locale
  components?: { [k in BaseComps]?: Component }
  dictApi?: (name: string) => Promise<Dict[]>
  /** 自定义图标处理组件 */
  customIcon?: (name: string) => VNode
  /** 组件默认参数 */
  defaultProps?: Obj
}
interface GlobalConfig {
  dictApi?: (name: string) => Promise<Dict[]>
  /** 自定义图标处理组件 */
  customIcon?: (name: string) => VNode
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
  const { locale = zhCN, components, dictApi, customIcon, defaultProps } = config
  app.provide('localeData', { locale: locale, exist: true })
  globalConfig.dictApi = dictApi
  globalConfig.customIcon = customIcon
  components && override(components)
  defaultProps && setDefaultProps(defaultProps)
}

interface RegistPram {
  option: Obj
  model: ModelData
  /** 表单数据 */
  effectData: {
    formData: Obj
    /** 当前值 */
    current?: any
  }
  /** 绑定到组件上的动态属性 */
  attrs: Obj
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
