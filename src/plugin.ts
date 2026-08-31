import { merge } from 'lodash-es'
import type { App, Component, VNode } from 'vue'
import { override, addComponent } from './components'
import type { Locale } from './compat/antdv'
import type { ButtonItem } from './exaTypes'
type BaseComps =
  | 'Divider'
  | 'SpaceCompact'
  | 'FormItem'
  | 'Tooltip'
  | 'Button'
  | 'MenuItem'
  | 'Menu'
  | 'Dropdown'
  | 'Space'
  | 'Card'
  | 'SuperListItem'
  | 'SuperList'
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
  | 'DateRangePicker'
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
  /** 是否在组件接收 schema 时输出诊断信息 */
  schemaDiagnostics?: boolean
  dictApi?: (name: string) => Promise<Dict[]>
  /** 自定义图标处理组件 */
  customIcon?: (name: string) => VNode
  /** 动态传递按钮权限 */
  buttonRoles?: () => string[]
  /** 内置默认按钮配置 */
  defaultButtons?: Obj<ButtonItem>
  /**tag显示时默认颜色组 */
  tagViewer?: Obj<string> | string[] | false | Fn<string>
  /** 接口返回数据结构处理 */
  tableApiSetting?: {
    /** 当前页请求参数名 */
    currentField?: string
    /** 当前每页数量请求参数名 */
    sizeField?: string
    /** 返回结果格式转换，无分页时直接返回数组 */
    resultTransform?: (result: any) =>
      | any[]
      | {
          current: number
          size: number
          total: number
          records: any[]
        }
  }
  /** 全局按钮权限过滤 */
  // buttonsAuth?: (actions: ButtonItem[]) => ButtonItem[]
}
const globalConfig: GlobalConfig = {
  tagViewer: ['pink', 'red', 'orange', 'green', 'cyan', 'blue', 'purple'],
}

const globalProps: Obj = {
  FormItem: {
    validateFirst: true,
  },
  Table: {
    size: 'small',
  },
  TimePicker: {
    valueFormat: 'HH:mm:ss',
  },
  TimeRange: {
    valueFormat: 'HH:mm:ss',
  },
}

const install = async (app: App, config: InstallConfig = {}) => {
  const { locale, components, defaultProps, ..._config } = config
  app.provide('localeData', { locale: locale, exist: true })
  Object.assign(globalConfig, _config)
  components && override(components)
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
