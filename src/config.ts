import type { ButtonItem } from './exaTypes'

type Dict = { label: string; value: string | number; [k: string]: string | number }

export interface GlobalConfig {
  /** 是否在组件接收 schema 时输出诊断信息 */
  schemaDiagnostics?: boolean
  dictApi?: (name: string) => Promise<Dict[]>
  /** 动态传递按钮权限 */
  buttonRoles?: () => string[]
  /** 内置默认按钮配置 */
  defaultButtons?: Obj<ButtonItem>
  /** tag 显示时默认颜色组 */
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
}

export const globalConfig: GlobalConfig = {
  tagViewer: ['pink', 'red', 'orange', 'green', 'cyan', 'blue', 'purple'],
}
