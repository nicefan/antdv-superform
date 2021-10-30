/* eslint-disable no-use-before-define */
import { SelectProps } from 'ant-design-vue/lib/vc-select'
import { SelectTypes } from 'ant-design-vue/es/select'
import * as Vue from '@vue/runtime-core'
import { TreeDataItem } from 'ant-design-vue/es/tree/Tree'
export interface RuleConfig {
  /** 验证类型 */
  type?: 'email' | 'integer' | 'number' | 'idcard' | 'phone' | 'mobile' | 'word' | string
  /** 触发方式 */
  trigger?: 'blur' | 'change'
  /** 是否必填 */
  required?: boolean
  pattern?: RegExp
  /** 长度 */
  len?: number
  /** 最大长度/最大值 */
  max?: number
  /** 最小长度/最小值 */
  min?: number
  /** 自定义验证器 */
  validator?: (any) => any
  /** 提示消息 */
  message?: string
}
declare global {
  type VNode = Vue.VNode
  type Ref<T = any> = Vue.Ref<T>
  // type Readonly<T = any> = Vue.DeepReadonly<T>
  interface ModelData {
    refName: string
    // propRef: Ref
    parent: Obj
    propChain: string[]
    rules: Obj
    currentRules?: Obj
  }
  interface ParentModel {
    parent: Obj
    propChain?: string[]
    rules?: Obj
    propRef?: Ref
    refName?: string
  }
  type ModelsMap<T = ExBaseOption> = Map<T, T extends {subItems: any} ? Required<ModelChildren> : ModelChildren>
  type ModelChildren = { model: ModelData; children?: ModelsMap }

  interface FormOption {
    attr?: Obj
    subItems: UniOption[]
  }
  interface ButtonItem {
    label?: string
    /** 确认提示文本 */
    confirmText?: string
    icon?: string
    attr?: Obj
    hide?: boolean | Fn<boolean>
    disabled?: boolean | Fn<boolean>
    onClick?: Fn
  }

  interface ExButtonGroup<T extends string = string> {
    limit?: number
    type?: 'primary' | 'link' | 'text' | 'dashed' | 'ghost' | 'default'
    shape?: 'circle' | 'round'
    size?: 'large' | 'middle' | 'small'
    iconOnly?: boolean
    hide?: boolean | Fn<boolean>
    disabled?: boolean | Fn<boolean>
    actions?: T[] | { [K in T]?: ButtonItem }
    subItems?: ButtonItem[]
  }
  interface ExBaseOption {
    type: string
    label?: string
    /** 配置复用合并时方便插入 */
    sort?: number
    attr?: Obj
    /** 是否隐藏，提供一个监听方法，根据数据变化自动切换 */
    hide?: boolean | ((formData: Readonly<Obj>) => boolean)
    /** 是否禁用，提供一个监听方法，根据数据变化自动切换 */
    disabled?: boolean | Fn
    dynamicAttr?: Fn<Obj>
    // renderView?: Fn<VNode>
    // customRender?: Fn
    // row?: boolean
    on?: Obj<Fn>
    span?: number
    offset?: number
  }
  interface ExTableOption extends ExBaseOption {
    prop: string
    title?: string | Fn<VNode>
    editMode?: 'inline' | 'modal'
    addMode?: 'inline' | 'modal'
    columns: UniInputOption[]
    buttons?: ExButtonGroup
    /** 列表元素右边按钮 */
    itemButtons?: ExButtonGroup<'del' | 'edit'>
  }
  interface ExGroupOption extends ExBaseOption {
    prop?: string
    title?: string | Fn<VNode>
    gutter?: number
    subItems: UniOption[]
  }
  interface ExInputGroupOption extends ExBaseOption {
    span: number
    gutter?: number
    subItems: UniOption[]
  }
  interface ExCardOption extends ExBaseOption {
    prop?: string
    buttons?: ExButtonGroup
    title?: string | VNode
    subItems: UniOption[]
  }
  interface ExListOption extends ExBaseOption {
    prop: string
    buttons?: ExButtonGroup<'add' | 'refresh'>
    columns: UniInputOption[]
    /** 列表元素右边按钮 */
    itemButtons?: ExButtonGroup<'del' | 'edit'>
  }
  interface ExTabsOption extends ExBaseOption {
    activeKey?: string | Ref<string>
    forceRender?: boolean
    buttons?: ExButtonGroup<'add' | 'refresh'>
    subItems: TabItem[]
  }
  interface TabItem extends Omit<ExBaseOption, 'type'> {
    label: string
    prop?: string
    key?: string
    icon?: string
    subItems: UniOption[]
  }
  interface ExCollapseOption extends ExBaseOption {
    activeKey?: string | Ref<string>
    subItems: CollapseItem[]
  }
  interface CollapseItem extends Omit<ExBaseOption, 'type'> {
    label: string
    prop?: string
    key?: string
    icon?: string
    subItems: UniOption[]
    buttons?: ExButtonGroup
  }

  interface ExFormOption extends ExBaseOption {
    prop: string
    initialValue?: any
    /** 数据联动 提供一个监听方法，根据数据变化自动计算变更绑定值 */
    computed?: (value, formData: Vue.DeepReadonly<Obj>) => any
    rules?: RuleConfig | RuleConfig[]
  }

  interface ExInputOption extends ExFormOption {
    keepProp?: string
    addonAfterIcon?: string
    addonBeforeIcon?: string
    prefixIcon?: string
    suffixIcon?: string
    suffixTips?: string
    btnClick?: (FormData: Obj, e: InputEvent) => void
    onChange?: (FormData: Obj, e: InputEvent) => void
    onBlur?: Fn
    onClick?: Fn
    onPressEnter?: Fn
  }
  type SelectOptions = SelectTypes['options']

  interface ExSelectOption extends ExFormOption {
    keepProp?: string
    options?: SelectOptions | Ref<SelectOptions> | Fn<SelectOptions | Promise<SelectOptions>>
    attr?: SelectProps
  }
  interface ExTreeOption extends ExFormOption {
    data: TreeDataItem[] | Fn<Promise<TreeDataItem[]>>
  }
  interface ExSwitchOption extends ExFormOption {
    valueLabels?: [string, string]
  }

  interface ExDateRange extends ExFormOption {
    /** 绑定结束日期字段 */
    keepProp?: string
  }
  interface ExRadioOption extends ExFormOption {
    options: SelectOptions | Ref<SelectOptions> | Fn<SelectOptions | Promise<SelectOptions>>
  }

  type OptionType = {
    Group: ExGroupOption
    InputGroup: ExInputGroupOption
    Card: ExCardOption
    List: ExListOption
    Tabs: ExTabsOption
    Table: ExTableOption
    Collapse: ExCollapseOption
    Input: ExInputOption
    InputNumber: ExFormOption
    DatePicker: ExFormOption
    TimePicker: ExFormOption
    DateRange: ExDateRange
    Select: ExSelectOption
    TreeSelect: ExTreeOption
    Radio: ExRadioOption
    Checkbox: ExRadioOption
    Switch: ExSwitchOption
    // [key: string]: ExFormOption
    // Password: d
  }

  type UniOption = { [K in keyof OptionType]: { type: K } & OptionType[K] }[keyof OptionType]
  type UniInputOption = Extract<UniOption, ExFormOption>
  type MixOption = { [K in keyof OptionType]: (k: Partial<OptionType[K]>& { type: string }) => void }[keyof OptionType] extends (
    k: infer U
  ) => void
    ? U // & { type: keyof OptionType}
    : never
}
export {}
