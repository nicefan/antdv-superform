/// <reference types="../types" />

/* eslint-disable no-use-before-define */
import Vue from 'vue'

import { DefaultOptionType } from 'ant-design-vue/es/select'
import type { Component, HTMLAttributes, VNode, VNodeTypes } from 'vue'
import { TreeDataItem } from 'ant-design-vue/es/tree/Tree'
import type {
  SelectProps,
  FormProps,
  PaginationProps,
  TableColumnProps,
  ModalFuncProps,
  ColProps,
  RowProps,
  FormItemProps,
  InputProps,
  DescriptionsProps,
  TreeProps,
  TableProps,
  RadioGroupProps,
  ListProps,
} from 'ant-design-vue'

interface RuleConfig {
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

// type VNode = VNodeChild
// type Readonly<T = any> = Vue.DeepReadonly<T>
type VSlot = string | Fn<VNodeTypes>

interface ExtBaseOption {
  type: string
  field?: string
  initialValue?: any
  label?: string
  labelSlot?: Fn<VNodeTypes>
  rules?: RuleConfig | RuleConfig[]
  /** 配置复用合并时方便插入 */
  sort?: number
  attrs?: Obj
  dynamicAttrs?: Fn<Obj>
  /** 是否隐藏，提供一个监听方法，根据数据变化自动切换 */
  hidden?: boolean | ((data: Readonly<Obj>) => boolean)
  hideInForm?: boolean
  hideInDescription?: boolean
  /** 是否禁用，提供一个监听方法，根据数据变化自动切换 */
  disabled?: boolean | Fn
  on?: Obj<Fn>
  // row?: boolean
  colProps?: ColProps & HTMLAttributes
  /** 快捷实现col span */
  span?: number
  /** 是否为独立块，分组元素默认为true */
  isBlock?: boolean
  /** 是否换行 */
  isBreak?: boolean
  align?: 'left' | 'right' | 'center'
  slots?: Obj<Fn>
  [key: `on${Capitalize<string>}${string}`]: Fn | undefined
}

interface ExtGroupOption extends ExtBaseOption {
  title?: VSlot
  gutter?: number
  buttons?: ExtButtons
  subItems: UniOption[]
  /** 弹窗表单中的行间排版属性 */
  rowProps?: RowProps & HTMLAttributes
  /** 子元素的统一排列属性， */
  subSpan?: number
  descriptionsProps?: DescriptionsProps
}

interface ExtFormOption extends Omit<ExtGroupOption, 'type'> {
  // type?: 'Form'
  attrs?: FormProps & HTMLAttributes
  isContainer?: boolean
  /** 减少行距 */
  compact?: boolean
  /** 不做校验 */
  ignoreRules?: boolean
  buttons?: ExtButtons<'submit' | 'reset'>
}

interface ButtonItem {
  label?: string
  /** 确认提示文本 */
  confirmText?: string
  /** 权限标识 */
  roleName?: string
  roleMode?: 'hidden' | 'disable'
  color?: 'success' | 'error' | 'warning'
  tooltip?: string
  icon?: string | Component
  attrs?: Obj & HTMLAttributes
  hidden?: boolean | Fn<boolean>
  disabled?: boolean | Fn<boolean>
  /** 传递到内置方法时的所需参数 */
  meta?: Obj
  onClick?: Fn
}
type TableApis = {
  query: Fn<Promise<any>>
  info?: Fn<Promise<Obj>>
  save?: Fn<Promise<any>>
  update?: Fn<Promise<any>>
  delete?: Fn<Promise<any>>
}
interface ExtButtonGroup<T extends string = string> {
  limit?: number
  buttonType?: 'primary' | 'link' | 'text' | 'dashed' | 'ghost' | 'default'
  buttonShape?: 'circle' | 'round' | 'default'
  size?: 'large' | 'middle' | 'small'
  /** 分隔符， type为'link'/'text'时默认true */
  divider?: boolean
  /** 是否独立行 */
  isBlock?: boolean
  /** 是否只显示图标 */
  iconOnly?: boolean
  /** 权限模式 */
  roleMode?: 'hidden' | 'disable'
  hidden?: boolean | Fn<boolean>
  disabled?: boolean | Fn<boolean>
  /** 将按钮放置到组件的指定slot中 */
  forSlot?: string
  actions?: (T | (ButtonItem | { name: T }))[]
  // subItems?: ButtonItem[]
}
type ExtButtons<T extends string = string> = ExtButtonGroup<T> | NonNullable<ExtButtonGroup<T>['actions']>

type ExtColumnsItem = (UniOption | Omit<ExtFormItemOption, 'type' | 'field'>) & {
  /** 应用于表格或编辑表单 */
  hideInTable?: boolean
  /** 表格内容渲染 */
  viewRender?: VSlot
  columnProps?: TableColumnProps
}
interface ExtTableOption extends ExtBaseOption {
  field: string
  title?: VSlot
  attrs?: TableProps | Obj
  editMode?: 'inline' | 'modal'
  addMode?: 'inline' | 'modal'
  columns: ExtColumnsItem[]
  buttons?: ExtButtons
  /** 列表元素右边按钮 */
  rowButtons?: ExtButtons<'delete' | 'edit' | 'detail'> & { columnProps?: TableColumnProps }
  /** 弹窗属性 */
  modalProps?: ModalFuncProps | Obj
  descriptionsProps?: DescriptionsProps
  /** 弹窗表单属性 */
  formSechma?: Omit<ExtFormOption, 'subItems'> & { 'subItems'?: UniOption[] }
}

interface RootTableOption extends Omit<ExtTableOption, 'type' | 'field'> {
  isContainer?: boolean
  apis?: TableApis | TableApis['query']
  params?: Obj
  beforeSearch?: (data: { param?: Obj } | Obj) => Obj
  searchSechma?: ExtFormOption | { subItems: (UniOption | string)[] }
  pagination?: PaginationProps | false
}
interface ExtListOption extends ExtBaseOption {
  field: string
  title?: VSlot
  attrs?: ListProps | Obj
  buttons?: ExtButtons<'add' | 'refresh'>
  columns: UniWidgetOption[]
  /** 列表元素右边按钮 */
  rowButtons?: ExtButtons<'delete' | 'edit'>
  subSpan?: number
  gutter?: number
}
interface ExtInputGroupOption extends ExtBaseOption {
  span: number
  gutter?: number
  subItems: UniOption[]
}
// interface ExtCardOption extends ExtGroupOption {
//   title?: string | VNode
//   subItems: UniOption[]
// }
interface ExtTabsOption extends ExtBaseOption {
  activeKey?: Ref<string>
  forceRender?: boolean
  buttons?: ExtButtons<'add' | 'refresh'>
  subItems: ExtTabItem[]
}
interface ExtTabItem extends Omit<ExtGroupOption, 'type'> {
  label: string
  key?: string
  icon?: string | Component
  subItems: UniOption[]
}
interface ExtCollapseOption extends ExtBaseOption {
  title?: VSlot
  activeKey?: string | Ref<string>
  subItems: CollapseItem[]
}
interface CollapseItem extends Omit<ExtGroupOption, 'type'> {
  label: string
  key?: string
  icon?: string | Component
  subItems: UniOption[]
  buttons?: ExtButtons
}
/** 表单元素属性 */
interface ExtFormItemOption extends ExtBaseOption {
  field: string
  /** 数据联动 提供一个监听方法，根据数据变化自动计算变更绑定值 */
  computed?: (value, formData: Vue.DeepReadonly<Obj>) => any
  formItemProps?: FormItemProps
}

interface ExtInputOption extends ExtFormItemOption {
  addonAfter?: VSlot
  addonBefore?: VSlot
  prefix?: VSlot
  suffix?: VSlot
  suffixTips?: string
  enterButton?: (effectData: Obj) => Component
  onSearch?: (effectData: Obj, value: string) => void
  attrs?: InputProps & HTMLAttributes
}
type DefaultOptionsType = (string | number)[] | DefaultOptionType[]
type SelectOptions =
  | DefaultOptionsType
  | Readonly<DefaultOptionsType>
  | Ref<DefaultOptionsType>
  | Fn<DefaultOptionsType | Promise<DefaultOptionsType>>
interface ExtSelectOption extends ExtFormItemOption {
  labelField?: string
  options?: SelectOptions
  /** 字典名称 */
  dictName?: string
  /** 选项中的value转成number类型 */
  valueToNumber?: boolean
  /** 选项中的value使用label */
  valueToLabel?: boolean
  attrs?: SelectProps & HTMLAttributes
}
interface ExtTreeOption extends ExtFormItemOption {
  labelField?: string
  attrs?: TreeProps & HTMLAttributes
  data: TreeDataItem[] | Fn<Promise<TreeDataItem[]>>
}
interface ExtSwitchOption extends ExtFormItemOption {
  valueLabels?: [string, string]
}

interface ExtDateRange extends ExtFormItemOption {
  /** 绑定结束日期字段 */
  keepField?: string
}
interface ExtRadioOption extends ExtFormItemOption {
  labelField?: string
  options?: SelectOptions
  /** 字典名称 */
  dictName?: string
  /** 选项中的value转成number类型 */
  valueToNumber?: boolean
  /** 选项中的value使用label */
  valueToLabel?: boolean
  attrs?: RadioGroupProps & HTMLAttributes
}
type ExtSlotOption = { render: VSlot }
type ExtInfoSlotOption = (ExtBaseOption & ExtSlotOption) | ExtFormItemOption
type ExtInputSlotOption = ExtFormItemOption & ExtSlotOption

type WrapperTypes = {
  InfoSlot: ExtInfoSlotOption
  Form: ExtFormOption
  Group: ExtGroupOption
  InputGroup: ExtInputGroupOption
  Card: ExtGroupOption
  List: ExtListOption
  Tabs: ExtTabsOption
  Table: ExtTableOption
  Collapse: ExtCollapseOption
}
type WidgetTypes = {
  Buttons: ExtBaseOption & ExtButtonGroup
  Hidden: { field: string }
  InputSlot: ExtInputSlotOption
  InfoSlot: ExtInfoSlotOption
  Text: ExtFormItemOption
  Textarea: ExtFormItemOption
  Input: ExtInputOption
  InputNumber: ExtFormItemOption
  DatePicker: ExtFormItemOption
  TimePicker: ExtFormItemOption
  DateRange: ExtDateRange
  Select: ExtSelectOption
  TreeSelect: ExtTreeOption
  Radio: ExtRadioOption
  Checkbox: ExtRadioOption
  Switch: ExtSwitchOption
}
export type OptionType = WrapperTypes & WidgetTypes

declare global {
  export type UniWrapperOption = { [K in keyof WrapperTypes]: { type: K } & WrapperTypes[K] }[keyof WrapperTypes]
  export type UniWidgetOption =
    | { [K in keyof WidgetTypes]: { type: K } & WidgetTypes[K] }[keyof WidgetTypes]
    | (ExtFormItemOption & { type: `Ext${Capitalize<string>}${string}` })

  export type UniOption = UniWrapperOption | UniWidgetOption

  export type GetOption<T extends keyof OptionType> = OptionType[T] & { type?: T }
  export type MixWrapper = {
    [K in keyof WrapperTypes]: (k: Partial<WrapperTypes[K]>) => void
  }[keyof WrapperTypes] extends (k: infer U) => void
    ? U
    : never
  export type MixOption = {
    [K in keyof OptionType]: (k: Partial<OptionType[K]>) => void
  }[keyof OptionType] extends (k: infer U) => void
    ? U & ExtColumnsItem & Partial<CollapseItem> & { type?: string }
    : never

  interface ModelData<T = ExtBaseOption> {
    refData: any
    refName?: string
    parent: Obj
    initialValue: any
    fieldName?: string
    propChain: string[]
    rules?: Obj[]
    children?: ModelsMap<T>
    /** 存储列表配置默认数据 */
    listData?: ModelChildren<T>
  }
  interface ModelDataGroup<T = ExtGroupOption> extends ModelData<T> {
    children: Map<T, ModelDataGroup>
    /** 存储列表配置默认数据 */
    listData: ModelChildren<T>
  }
  type ModelsMap<T = ExtBaseOption> = Map<T, ModelData>
  interface ModelChildren<T = ExtBaseOption> {
    modelsMap: ModelsMap<T>
    rules: Obj
    initialData: Ref<Obj>
  }
}

export {
  ModelData,
  ExtBaseOption,
  ModelsMap,
  ExtFormOption,
  ExtFormItemOption,
  ExtGroupOption,
  ExtTableOption,
  RootTableOption,
  ExtButtons,
  ButtonItem,
  ExtButtonGroup,
  ExtTreeOption,
  ExtInputOption,
  ExtTabItem,
  TableApis,
  ExtColumnsItem,
  ExtInputGroupOption,
  ExtTabsOption,
  ExtCollapseOption,
  ExtListOption,
}
