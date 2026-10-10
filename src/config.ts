import type { SuperFormLocaleConfig } from './locale'
import type { ButtonItem } from './exaTypes'

type Dict = { label: string; value: string | number; [k: string]: string | number }

export interface GlobalConfig {
  /** SuperForm 内置文案，原生 UI 语言由业务 ConfigProvider 配置。 */
  locale?: SuperFormLocaleConfig
  /** 是否在组件接收 schema 时输出诊断信息 */
  schemaDiagnostics?: boolean
  dictApi?: (name: string) => Promise<Dict[]>
  /** 动态传递按钮权限 */
  buttonRoles?: () => string[]
  /** 内置默认按钮配置 */
  defaultButtons?: Obj<ButtonItem>
  /** tag 显示时默认颜色组 */
  tagViewer?: Obj<string> | string[] | false | Fn<string>
}

export const globalConfig: GlobalConfig = {
  tagViewer: ['pink', 'red', 'orange', 'green', 'cyan', 'blue', 'purple'],
}
