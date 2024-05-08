/// <reference types="../types" />

/* eslint-disable no-use-before-define */
import Vue from 'vue'

import { DefaultOptionType } from 'ant-design-vue/es/select'
import type { Component, HTMLAttributes, VNode, VNodeChild, VNodeTypes } from 'vue'
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
  UploadProps,
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
type VSlot = string | Fn

interface HelpMessage {
  color: 'success' | 'info' | 'warning' | 'error'
}
interface ExtBaseOption {
  type: string
  field?: string
  vModelFields?: Obj<string>
  // value?: Ref
  initialValue?: any
  label?: VSlot
  labelSlot?: Fn<VNodeTypes>
  help?: HelpMessage
  rules?: RuleConfig | RuleConfig[]
  /** 配置复用合并时方便插入 */
  // sort?: number
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
  span?: number | 'auto'
  /** 是否为独立块，分组元素默认为true */
  blocked?: boolean
  /** 是否换行 */
  wrapping?: boolean
  align?: 'left' | 'right' | 'center'
  slots?: Obj<VSlot>
  viewRender?: VSlot
  [key: `on${Capitalize<string>}${string}`]: Fn | undefined
}
interface ExtRow {
  /** 行间排版属性 */
  rowProps?: RowProps & HTMLAttributes
  subSpan?: number | 'auto'
  gutter?: number
}
type ExtDescriptionsProps = {
  mode?: 'table' | 'form' | 'default'
  /** 输入框列属性，置为空对象将清空继承属性 */
  wrapperCol?: ColProps & HTMLAttributes
  /** 标题列属性，置为空对象将清空继承属性 */
  labelCol?: ColProps & HTMLAttributes
  labelAlign?: 'left' | 'center' | 'right'
  labelBgColor?: string
  borderColor?: string
  noInput?: boolean
  span?: number
} & DescriptionsProps &
  ExtRow &
  HTMLAttributes
interface ExtGroupBaseOption extends ExtBaseOption, ExtRow {
  title?: VSlot
  buttons?: ExtButtons
  subItems?: (UniOption | Omit<ExtFormItemOption, 'type' | 'field'>)[]
  descriptionsProps?: ExtDescriptionsProps
}
interface ExtGroupOption extends ExtGroupBaseOption {
  component?: Component
}
interface ExtDescriptionsOption extends Omit<ExtBaseOption, 'type'>, ExtRow {
  title?: VSlot
  buttons?: ExtButtons
  mode?: 'table' | 'form' | 'default'
  attrs?: ExtDescriptionsProps
  isContainer?: boolean
  subItems: (UniOption | Omit<ExtFormItemOption, 'type' | 'field'>)[]
}

interface ExtFormOption extends Omit<ExtGroupBaseOption, 'type'> {
// type?: 'Form'
  attrs?: FormProps & HTMLAttributes
  isContainer?: boolean
  /** 减少行距 */
  compact?: boolean
  /** 不做校验 */
  ignoreRules?: boolean
  subItems: UniOption[]
  buttons?: ExtButtons<'submit' | 'reset' | 'search'>
  descriptionsProps?: ExtDescriptionsProps
}

interface ButtonItem {
  label?: VSlot
  /** 确认提示文本 */
  confirmText?: string
  /** 权限标识 */
  roleName?: string
  roleMode?: 'hidden' | 'disable'
  color?: 'success' | 'error' | 'warning' | 'primary'
  vaildIn?: 'form' | 'detail' | 'both'
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
  export?: Fn<Promise<any>>
}
interface ExtButtonGroup<T extends string = string> {
  limit?: number
  buttonType?: 'primary' | 'link' | 'text' | 'dashed' | 'ghost' | 'default'
  buttonShape?: 'circle' | 'round' | 'default'
  size?: 'large' | 'middle' | 'small'
  align?: 'right' | 'left' | 'center'
  vaildIn?: 'form' | 'detail' | 'both'
  placement?: 'top' | 'bottom'
  /** 分隔符， type为'link'/'text'时默认true */
  divider?: boolean
  /** 是否只显示图标 */
  iconOnly?: boolean
  /** 更多按钮slot */
  moreLabel?: VSlot
  /** 权限模式 */
  roleMode?: 'hidden' | 'disable'
  hidden?: boolean | Fn<boolean>
  disabled?: boolean | Fn<boolean>
  /** 将按钮放置到组件的指定slot中 */
  forSlot?: string
  methods?: Obj<Fn>
  actions?: (T | (ButtonItem | ({ name: T } & ButtonItem)))[]
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
  /** 公共列配置 */
  columnProps?: TableColumnProps
  buttons?: ExtButtons<'add' | 'delete' | 'edit' | 'detail'>
  /** 列表元素右边按钮 */
  rowButtons?: ExtButtons<'delete' | 'edit' | 'detail'> & { columnProps?: TableColumnProps }
  /** 弹窗属性 */
  modalProps?: ModalFuncProps | Obj
  descriptionsProps?: ExtDescriptionsProps
  /** 弹窗表单属性 */
  formSchema?: Omit<ExtFormOption, 'subItems'> & { 'subItems'?: UniOption[] }
}

interface RootTableOption extends Omit<ExtTableOption, 'type' | 'field'> {
  isContainer?: boolean
  apis?: TableApis | TableApis['query']
  params?: Obj
  /**是否立即查询，默认为true */
  immediate?: boolean
  beforeSearch?: (data: { param?: Obj } | Obj) => Obj
  searchSchema?: ExtFormOption | { subItems: (UniOption | string)[]; searchOnChange?: boolean }
  pagination?: PaginationProps | false
  maxHeight?: number
  /** 自动计算高度至底部 */
  isScanHeight?: boolean
  /**计算高度时表格底部至边缘边距不等于36px时，进行补齐 */
  resizeHeightOffset?: number
  /** 固定高度，分页移至底部 */
  isFixedHeight?: boolean
  /** 按父元素填充高度 */
  inheritHeight?: boolean
}
interface ExtListOption extends ExtBaseOption, ExtRow {
  field: string
  title?: VSlot
  attrs?: ListProps | Obj
  buttons?: ExtButtons<'add' | 'refresh'>
  columns: UniWidgetOption[]
  /** 列表元素右边按钮 */
  rowButtons?: ExtButtons<'delete' | 'edit'>
  descriptionsProps?: ExtDescriptionsProps
}
interface ExtListGroupOption extends Omit<ExtGroupOption, 'subItems'> {
  field: string
  attrs?: {
    /** 标签后加序号 */
    labelIndex?: boolean
    rowKey?: string
  }
  rowButtons?: false | ExtButtons<'delete' | 'add'>
  columns: UniWidgetOption[]
}
interface ExtInputList extends ExtFormItemOption, ExtRow {
  title?: VSlot
  attrs?: {
    /** 标签后加序号 */
    labelIndex?: boolean
  }
  rowButtons?: false | ExtButtons<'delete' | 'add'>
  columns: UniWidgetOption[]
}
interface ExtInputGroupOption extends ExtBaseOption, ExtRow {
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
interface ExtTabItem extends Omit<ExtGroupBaseOption, 'type'> {
  label: VSlot
  key?: string
  icon?: string | Component
  subItems: UniOption[]
}
interface ExtCollapseOption extends ExtBaseOption {
  title?: VSlot
  activeKey?: string | Ref<string>
  subItems: CollapseItem[]
}
interface CollapseItem extends Omit<ExtGroupBaseOption, 'type'> {
  label: VSlot
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
  descriptionsProps?: ExtDescriptionsProps
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
type DefaultOptionsType = (string | number)[] | DefaultOptionType[] | { [k: string | number]: string | number }
type SelectOptions =
  | DefaultOptionsType
  | Readonly<DefaultOptionsType>
  | Ref<DefaultOptionsType>
  | Fn<DefaultOptionsType | Promise<DefaultOptionsType>>
interface ExtSelect {
  labelField?: string
  options?: SelectOptions
  /** 字典名称 */
  dictName?: string
  /** 选项中的value转成number类型 */
  valueToNumber?: boolean
  /** 选项中的value使用label */
  valueToLabel?: boolean
}
interface ExtSelectOption extends ExtFormItemOption, ExtSelect {
  attrs?: SelectProps & HTMLAttributes
}
interface ExtTagSelectOption extends ExtFormItemOption, ExtSelect{
  attrs?: {
    multiple?: boolean
    valueToString?: boolean
  }
}
interface ExtTagInputOption extends ExtFormItemOption {
  attrs?: {
    valueToString?: boolean
  }
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
interface ExtRadioOption extends ExtFormItemOption, ExtSelect {
  attrs?: RadioGroupProps & HTMLAttributes
}
interface ExtUpload extends ExtFormItemOption {
  vModelFields?: {
    fileList?: string
  }
  attrs: UploadProps & {
    apis?: {
      upload?: (data: FormData, { onUploadProgress: Fn }) => Promise<any>
      delete?: (file: Obj) => Promise<any>
      download?: (file: Obj) => Promise<any>
    }
    /** 指定文件信息字段 */
    infoNames?: { [k in 'uid' | 'name' | 'url']?: string } | Obj<string>
    /** 指定文件信息中某属性作为同步绑定值，不指定将同步绑定文件对象 */
    valueKey?: string
    /** 文件最小MB */
    minSize?: number
    /** 文件最大MB */
    maxSize?: number
    /** 单文件上传, 绑定值为字符串或文件对象 */
    isSingle?: boolean
    /** 超出文件数量时，隐藏上传主体 */
    outHide?: boolean
    /** 上传模式，默认auto,选择文件后自动上传，submit:提交时上传，custom通过绑定fileList中的文件对象手动上传 */
    uploadMode?: 'auto' | 'submit' | 'custom'
    tip?: string
    /** 上传按钮标题 */
    title?: VSlot
    /** 是否允许重名文件 */
    repeatable?: boolean
    /** 查看模式 */
    isView?: boolean
  }
}
type ExtSlotOption = { render: VSlot }
type ExtInfoSlotOption = (ExtBaseOption & ExtSlotOption) | ExtFormItemOption
type ExtInputSlotOption = ExtFormItemOption & ExtSlotOption

type WrapperTypes = {
  InfoSlot: ExtInfoSlotOption
  Form: ExtFormOption
  Group: ExtGroupOption
  Card: ExtGroupBaseOption
  List: ExtListOption
  ListGroup: ExtListGroupOption
  Tabs: ExtTabsOption
  Table: ExtTableOption
  Collapse: ExtCollapseOption
  Descriptions: ExtDescriptionsOption | ExtGroupOption
}
type WidgetTypes = {
  Buttons: ExtBaseOption & ExtButtonGroup
  Hidden: ExtBaseOption
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
  Upload: ExtUpload
  InputGroup: ExtInputGroupOption
  InputList: ExtInputList
  TagInput: ExtTagInputOption
  TagSelect: ExtTagSelectOption
}
export type OptionType = WrapperTypes & WidgetTypes
export type UniWrapperOption = { [K in keyof WrapperTypes]: { type: K } & WrapperTypes[K] }[keyof WrapperTypes]
export type UniWidgetOption =
  | { [K in keyof WidgetTypes]: { type: K } & WidgetTypes[K] }[keyof WidgetTypes]
  | (ExtFormItemOption & { type: `Ext${Capitalize<string>}${string}` })

export type UniOption = UniWrapperOption | UniWidgetOption

declare global {
  export type GetOption<T extends keyof OptionType> = OptionType[T] & { type?: T }
  export type GetBaseOption = ExtBaseOption & ExtRow
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

  export interface ModelData<T = ExtBaseOption> {
    refData: any
    refName?: string
    parent: Obj
    initialValue: any
    fieldName?: string
    propChain: string[]
    rules?: Obj[]
    children?: ModelsMap<T>
    /** 存储列表配置默认数据 */
    listData?: ModelChildren
  }
  export interface ModelDataGroup<T = ExtGroupBaseOption> extends ModelData<T> {
    children: Map<T, ModelDataGroup>
    /** 存储列表配置默认数据 */
    listData: ModelChildren
  }
  export type ModelsMap<T = ExtBaseOption> = Map<T, ModelData>
  export interface ModelChildren<T = ExtBaseOption> {
    modelsMap: ModelsMap<T>
    rules: Obj
    initialData: any
  }
}

export {
  ExtBaseOption,
  ExtFormOption,
  ExtFormItemOption,
  ExtGroupOption,
  ExtGroupBaseOption,
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
  ExtListGroupOption,
  ExtDescriptionsOption,
}
