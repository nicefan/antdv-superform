/// <reference types="../types" />

/* eslint-disable no-use-before-define */
import Vue from 'vue'

import type { Component, HTMLAttributes, VNode, VNodeChild, VNodeTypes, Ref } from 'vue'
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
  TableProps,
  RadioGroupProps,
  ListProps,
  UploadProps,
  TabsProps,
  TreeSelectProps,
  SpaceProps,
  SwitchProps,
} from 'ant-design-vue'

import { RuleConfig } from './utils/buildRule'

// type VNode = VNodeChild
// type Readonly<T = any> = Vue.DeepReadonly<T>
type VSlot = string | Fn

interface HelpMessage {
  color: 'success' | 'info' | 'warning' | 'error'
}

export interface DefaultOptionType {
  label?: any
  value?: string | number | boolean | null
  children?: Omit<DefaultOptionType, 'children'>[]
  disabled?: boolean
  [name: string]: any
}

interface ExtBaseOption {
  type: string
  field?: string
  vModelFields?: Obj<string>
  value?: Ref
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
  dataSource?: Obj
  buttons?: ExtButtons
  mode?: 'table' | 'form' | 'default'
  attrs?: ExtDescriptionsProps
  isContainer?: boolean
  subItems: (UniOption | Omit<ExtFormItemOption, 'type' | 'field'>)[]
}

interface ExtFormOption extends Omit<ExtGroupBaseOption, 'type'> {
  // type?: 'Form'
  dataSource?: Obj
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
  confirmText?: string | Fn<string>
  /** 权限标识 */
  roleName?: string
  roleMode?: 'hidden' | 'disable'
  color?: 'success' | 'error' | 'warning' | 'primary'
  validOn?: 'form' | 'detail' | 'both'
  dropdown?: DefaultOptionType
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
  attrs?: SpaceProps & HTMLAttributes
  limit?: number
  buttonType?: 'primary' | 'link' | 'text' | 'dashed' | 'ghost' | 'default'
  buttonShape?: 'circle' | 'round' | 'default'
  size?: 'large' | 'middle' | 'small'
  align?: 'right' | 'left' | 'center'
  validOn?: 'form' | 'detail' | 'both'
  placement?: 'top' | 'bottom'
  /** 分隔符， type为'link'/'text'时默认true */
  divider?: boolean
  /** 按钮图标文字显示模式 */
  labelMode?: 'icon' | 'label' | 'both'
  /** 更多按钮slot */
  moreLabel?: VSlot
  /** 权限模式 */
  roleMode?: 'hidden' | 'disable'
  hidden?: boolean | Fn<boolean>
  disabled?: boolean | Fn<boolean>
  /** 将按钮放置到组件的指定slot中 */
  forSlot?: string
  methods?: Obj<Fn>
  /** 传递到事件方法中可响应数据 */
  effectData?: Obj
  actions?: (T | ({ name?: T } & ButtonItem))[]
  // subItems?: ButtonItem[]
}
type ExtButtons<T extends string = string> = ExtButtonGroup<T> | NonNullable<ExtButtonGroup<T>['actions']>
interface TabsHeader extends Omit<TabsProps, 'activeKey'> {
  field?: string
  initialValue?: any
  bordered?: boolean
  options?: SelectOptions
  /** 字典名称 */
  dictName?: string
  /** 选项中的value使用label */
  valueToLabel?: boolean
  activeKey?: Ref<string | number | undefined>
  slots?: Obj<VSlot>
  /** 设置tab标签 */
  customTab?: Fn
}
type ExtColumnsItem = (UniOption | Partial<ExtFormItemOption>) & {
  /** 应用于表格或编辑表单 */
  hideInTable?: boolean
  /** 表格内容渲染 */
  viewRender?: VSlot
  columnProps?: TableColumnProps
  /**是否可编辑 */
  editable?: boolean | Fn<boolean>
}
interface ExtTableOption extends ExtBaseOption {
  field: string
  title?: VSlot
  attrs?: TableProps | Obj
  /** @deprecated 更名为editable */
  edit?:boolean
  /** 表格全部为编辑状态，开启后rowEdit无效 */
  editable?: boolean
  rowEditor?: {
    editMode?: 'inline' | 'modal'
    addMode?: 'inline' | 'modal'
    form?: Omit<ExtFormOption, 'subItems'> & { 'subItems'?: UniOption[]; }
    modalProps?: ModalFuncProps | Obj
    onSave?: Fn
    onCancel?:Fn
  }
  /** @deprecated  移至rowEditor */
  editMode?: 'inline' | 'modal'
  /** @deprecated  移至rowEditor */
  addMode?: 'inline' | 'modal'
  columns: ExtColumnsItem[]
  tabs?: TabsHeader | false
  /** 公共列配置 */
  columnProps?: TableColumnProps
  /**序号列*/
  indexColumn?: boolean | TableColumnProps
  buttons?: ExtButtons<'add' | 'delete' | 'edit' | 'detail'> | false
  /** 列表元素右边按钮 */
  rowButtons?: false | (ExtButtons<'delete' | 'edit' | 'detail' | 'add'> & { columnProps?: TableColumnProps })
  /** 弹窗属性 */
  modalProps?: ModalFuncProps | Obj
  descriptionsProps?: ExtDescriptionsProps & { modalProps?: ModalFuncProps | Obj }
  /** @deprecated  弹窗表单配置,移至rowEditor */
  editForm?: Omit<ExtFormOption, 'subItems'> & { 'subItems'?: UniOption[]; modalProps?: ModalFuncProps | Obj }
}

interface TableScanHight {
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
interface RootTableOption extends Omit<ExtTableOption, 'type' | 'field'>, TableScanHight {
  isContainer?: boolean
  apis?: TableApis | TableApis['query']
  dataSource?: Obj[] | Ref<any[]>
  params?: Obj
  /**是否立即查询，默认为true */
  immediate?: boolean
  /** 查询请求前可对请求参数进行处理 */
  beforeQuery?: (data: Obj) => Obj
  /** 查询请求后可对返回结果进行处理 */
  afterQuery?: (data: Obj) => Obj
  /**
   * @deprecated 改为searchForm
   */
  searchSchema?: void
  /** 查询表单配置 */
  searchForm?: ExtFormOption | { subItems: (UniOption | string)[]; searchOnChange?: boolean; teleport?: string }
  pagination?: PaginationProps | false
  attrs?: TableProps | (TableProps & TableScanHight) | Obj
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
  activeKey?: Ref<string | undefined>
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
  /** 指定ref对象时，同步变化 */
  value?: any
  /** 数据联动 提供一个监听方法，根据数据变化自动计算变更绑定值 */
  computed?: (value, formData: Vue.DeepReadonly<Obj>) => any
  tagViewer?:
    | boolean
    | Obj<string>
    | string[]
    | { label?: string; value: string; color: string; icon?: Fn }[]
    | Fn<string>
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
type DefaultOptionsType = (string | number)[] | DefaultOptionType[] | { [k: string | number]: any }
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
interface ExtTagSelectOption extends ExtFormItemOption, ExtSelect {
  attrs?: {
    multiple?: boolean
    valueToString?: boolean
  } & HTMLAttributes
}
interface ExtTagInputOption extends ExtFormItemOption {
  attrs?: {
    valueToString?: boolean
  } & HTMLAttributes
}
interface ExtTreeOption extends ExtFormItemOption {
  labelField?: string
  attrs?: TreeSelectProps & HTMLAttributes
  /**
   * @deprecated 使用`treeData`
   */
  data?: TreeSelectProps['treeData'] | Fn<Promise<TreeSelectProps['treeData']>>
  treeData?: TreeSelectProps['treeData'] | Fn<Promise<TreeSelectProps['treeData']>> | Fn<TreeSelectProps['treeData']>
}
interface ExtSwitchOption extends ExtFormItemOption, ExtSelect {
  valueLabels?: [string, string]
  attrs?: {
    /** 第一个选项为选中值 */
    firstIsChecked?: boolean
    /** 默认是否选中 */
    defaultChecked?: boolean
  } & SwitchProps &
    HTMLAttributes
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
  attrs?: UploadProps & {
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
    uploadMode?: 'auto' | 'submit' | 'custom' | 'base64'
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
  Hidden: ExtFormItemOption
  InputSlot: ExtInputSlotOption
  InfoSlot: ExtInfoSlotOption
  Text: ExtFormItemOption
  HTML: ExtFormItemOption
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
  export type GetBaseOption = Partial<ExtBaseOption> & ExtRow
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

  export interface ModelData<T = GetBaseOption> {
    refData: any
    refName?: string
    parent: Obj
    index?: number
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
  export type ModelsMap<T = GetBaseOption> = Map<T, ModelData>
  export interface ModelChildren<T = GetBaseOption> {
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
