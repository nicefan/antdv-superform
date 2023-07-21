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

interface InstallConfig {
  locale?: Locale
  components?: { [k in BaseComps]?: Component }
}

const install = async (app: App, config: InstallConfig = {}) => {
  const { locale = zhCN, components } = config
  app.provide('localeData', { locale: locale, exist: true })
  app.component('VIcon', VIcon)

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
