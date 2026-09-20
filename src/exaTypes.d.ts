/// <reference types="../types" />

/* eslint-disable no-use-before-define */
import Vue from 'vue'

import type { Component, CSSProperties, HTMLAttributes, VNodeChild, VNodeTypes, Ref } from 'vue'

import { RuleConfig } from './utils/buildRule'

// type VNode = VNodeChild
// type Readonly<T = any> = Vue.DeepReadonly<T>
type VSlot = string | Fn

interface HelpMessage {
  color: 'success' | 'info' | 'warning' | 'error'
}

type EffectData =
  | (Obj & {
      /**整个表单数据 */
      formData: Vue.DeepReadonly<Obj>
      /**当前属性所在对象 */
      current: Obj
      /** 上一级数据 */
      parent: EffectData
      value: any
      /** 数组对象序列号 */
      index: number
      /** 当前属性名 */
      field: string
      /** 是否为查看模式 */
      isView: boolean
    })
  | Obj
export interface DefaultOptionType {
  label?: any
  value?: string | number | boolean | null
  children?: Omit<DefaultOptionType, 'children'>[]
  disabled?: boolean
  [name: string]: any
}

type ResponsiveValue<T> = Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl', T>>
type LayoutGutter = number | ResponsiveValue<number>

/** Core 保证的栅格列语义，UI 专属断点与外观属性不在此扩展。 */
export interface LayoutColProps extends HTMLAttributes {
  flex?: string | number
  offset?: number
  order?: number
  pull?: number
  push?: number
  span?: number
}

/** Core 保证的栅格行语义。 */
export interface LayoutRowProps extends HTMLAttributes {
  align?: 'top' | 'middle' | 'bottom' | 'stretch'
  gutter?: LayoutGutter | [LayoutGutter, LayoutGutter]
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'
  wrap?: boolean
}

/** Core 保证的间距布局语义。 */
export interface LayoutSpaceProps extends HTMLAttributes {
  align?: 'start' | 'end' | 'center' | 'baseline'
  direction?: 'horizontal' | 'vertical'
  size?: number | 'small' | 'middle' | 'large' | [number, number]
  wrap?: boolean
}

/** SuperForm 稳定的表单容器属性。 */
export interface FormSchemaProps extends HTMLAttributes {
  colon?: boolean
  disabled?: boolean
  hideRequiredMark?: boolean
  labelAlign?: 'left' | 'right'
  labelCol?: LayoutColProps
  layout?: 'horizontal' | 'vertical' | 'inline'
  scrollToFirstError?: boolean | Obj
  validateOnRuleChange?: boolean
  validateTrigger?: string | string[]
  wrapperCol?: LayoutColProps
}

/** SuperForm 稳定的表单项属性。 */
export interface FormItemSchemaProps extends HTMLAttributes {
  colon?: boolean
  extra?: VSlot
  hasFeedback?: boolean
  help?: VSlot
  htmlFor?: string
  labelAlign?: 'left' | 'right'
  labelCol?: LayoutColProps
  required?: boolean
  validateStatus?: '' | 'success' | 'warning' | 'error' | 'validating'
  validateTrigger?: string | string[] | false
  wrapperCol?: LayoutColProps
}

declare global {
  /** Adapter 类型目录的合并入口，带命名空间以避免污染业务全局类型。 */
  namespace SuperFormTypeRegistry {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface UIContainerComponentPropSources {}
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface UIFormComponentProps {}
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface UIFormComponentOptionExtensions {}
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface UIFormComponentPropSources {}
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface UIFormComponentOptionExtensionSources {}
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface UIActionComponentPropSources {}
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface UITableComponentPropSources {}
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface UIModalComponentPropSources {}
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface UIUploadComponentPropSources {}
  }
}

/** Adapter 对 Core 容器和布局节点提供的 UI Props 类型映射。 */
export type UIContainerComponentProps = MergeRegistrySources<
  SuperFormTypeRegistry.UIContainerComponentPropSources[keyof SuperFormTypeRegistry.UIContainerComponentPropSources]
>

type UIContainerProps<K extends string> = K extends keyof UIContainerComponentProps
  ? UIContainerComponentProps[K]
  : unknown

/** Adapter 为按钮、提示和下拉交互提供的 UI Props 类型映射。 */
export type UIActionComponentProps = MergeRegistrySources<
  SuperFormTypeRegistry.UIActionComponentPropSources[keyof SuperFormTypeRegistry.UIActionComponentPropSources]
>

type UIActionProps<K extends string> = K extends keyof UIActionComponentProps ? UIActionComponentProps[K] : unknown

/** Adapter 为表格、列和分页提供的 UI Props 类型映射。 */
export type UITableComponentProps = MergeRegistrySources<
  SuperFormTypeRegistry.UITableComponentPropSources[keyof SuperFormTypeRegistry.UITableComponentPropSources]
>

type UITableProps<K extends string> = K extends keyof UITableComponentProps ? UITableComponentProps[K] : unknown

/** Adapter 为弹窗提供的 UI Props 类型映射。 */
export type UIModalComponentProps = MergeRegistrySources<
  SuperFormTypeRegistry.UIModalComponentPropSources[keyof SuperFormTypeRegistry.UIModalComponentPropSources]
>

type UIModalProps<K extends string> = K extends keyof UIModalComponentProps ? UIModalComponentProps[K] : unknown

/** Adapter 为上传组件提供的 UI Props 类型映射。 */
export type UIUploadComponentProps = MergeRegistrySources<
  SuperFormTypeRegistry.UIUploadComponentPropSources[keyof SuperFormTypeRegistry.UIUploadComponentPropSources]
>

type UIUploadProps<K extends string> = K extends keyof UIUploadComponentProps ? UIUploadComponentProps[K] : unknown

interface ExtBaseOption {
  type: string
  field?: string
  vModelFields?: Obj<string | Obj>
  initialValue?: any
  label?: VSlot
  labelSlot?: Fn<VNodeTypes>
  tooltip?: VSlot | (UIActionProps<'Tooltip'> & { title: VSlot; icon?: () => VNodeChild })
  // help?: HelpMessage
  /** 校验规则，指定value而没指定field时无效 */
  rules?: RuleConfig | RuleConfig[]
  required?: boolean | Fn<boolean>
  attrs?: Obj
  dynamicAttrs?: Fn<Obj>
  /** 是否隐藏，提供一个监听方法，根据数据变化自动切换 */
  hidden?: boolean | ((data: Readonly<Obj>) => boolean)
  /** 排除指定场景 */
  exclude?: ('table' | 'form' | 'description')[]
  /**@deprecated 改用`exclude: ['form']`*/
  hideInForm?: boolean
  /**@deprecated 改用`exclude: ['description']`*/
  hideInDescription?: boolean
  /** 是否禁用，提供一个监听方法，根据数据变化自动切换 */
  disabled?: boolean | Fn
  on?: Obj<Fn>
  // row?: boolean
  colProps?: LayoutColProps & UIContainerProps<'Col'>
  /** 快捷实现col span */
  span?: number | 'auto'
  /** 当前节点脱离前后栅格组，独立成块；分组元素默认为 true */
  block?: boolean
  /**
   * 是否为独立块
   * @deprecated 使用 `block`
   */
  blocked?: boolean
  /** 当前节点后换行 */
  breakAfter?: boolean
  /**
   * 是否在当前节点后换行
   * @deprecated 使用 `breakAfter`
   */
  wrapping?: boolean
  align?: 'left' | 'right' | 'center'
  slots?: Obj<VSlot>
  viewRender?: VSlot
  /** 数据联动 提供一个监听方法，根据数据变化自动计算变更绑定值 */
  computed?: (value, effectData: EffectData) => any
  onUpdate?: (effectData: EffectData) => void
  [key: `on${Capitalize<string>}${string}`]: ((effectData: EffectData, ...args: any[]) => any) | undefined
}

interface ExtRow {
  /** 行间排版属性 */
  rowProps?: LayoutRowProps & UIContainerProps<'Row'>
  subSpan?: number | 'auto'
  gutter?: number
}
type ExtDescriptionsProps = {
  mode?: 'table' | 'form' | 'default'
  bordered?: boolean
  colon?: boolean
  column?: number
  contentStyle?: CSSProperties
  labelStyle?: CSSProperties
  layout?: 'horizontal' | 'vertical'
  size?: 'default' | 'middle' | 'small'
  /** 输入框列属性，置为空对象将清空继承属性 */
  wrapperCol?: LayoutColProps & UIContainerProps<'Col'>
  /** 标题列属性，置为空对象将清空继承属性 */
  labelCol?: LayoutColProps & UIContainerProps<'Col'>
  labelAlign?: 'left' | 'center' | 'right'
  /**分组数据表格模式展示时，设为fixed,让列宽一致 */
  tableLayout?: 'fixed' | 'auto'
  /**mode为form模式时，该元素不用input风格包裹 */
  noInput?: boolean
  /** 隐藏当前标签的冒号 */
  noColon?: boolean
  span?: number
} & ExtRow &
  HTMLAttributes
interface ExtGroupBaseOption extends ExtBaseOption, ExtRow {
  title?: VSlot
  buttons?: ExtButtons
  subItems?: (UniOption | Omit<ExtFormItemOption, 'type'>)[]
  descriptionsProps?: ExtDescriptionsProps
}
interface ExtGroupOption extends ExtGroupBaseOption {
  component?: Component
  /** 忽略表格表头分组 */
  ignoreTableTitle?: boolean
  contentAttrs?: HTMLAttributes
}
interface ExtDescriptionsOption extends Omit<ExtBaseOption, 'type'>, ExtRow {
  title?: VSlot
  dataSource?: Obj
  buttons?: ExtButtons
  mode?: 'table' | 'form' | 'default'
  attrs?: ExtDescriptionsProps
  isContainer?: boolean
  subItems: (UniOption | Omit<ExtFormItemOption, 'type'>)[]
}

interface ExtFormOption extends Omit<ExtGroupBaseOption, 'type'> {
  // type?: 'Form'
  dataSource?: Obj
  attrs?: FormSchemaProps & UIContainerProps<'Form'>
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
  /** 全局默认配置指定的名称 */
  name?: string
  customRender?: VSlot
  /** 确认提示文本 */
  confirmText?: string | Fn<string>
  /** 权限标识 */
  roleName?: string
  /** 无权限时的展示方式，默认隐藏 */
  unauthorized?: 'hide' | 'disable'
  /**
   * 无权限时禁用，默认隐藏
   * @deprecated 使用 `unauthorized: 'disable'`
   */
  invalidDisabled?: boolean
  /** @deprecated 使用 `unauthorized` */
  roleMode?: 'hidden' | 'disable'
  /** 按钮可见场景 */
  visibleIn?: 'form' | 'detail' | 'both'
  /** @deprecated 使用 `visibleIn` */
  validOn?: 'form' | 'detail' | 'both'
  dropdown?: SelectOptions
  dropdownProps?: UIActionProps<'Dropdown'>
  tooltip?: string
  /** 按钮禁用时的提示 */
  disabledTooltip?: string | Fn<string>
  icon?: () => VNodeChild
  attrs?: UIActionProps<'Button'> & HTMLAttributes
  hidden?: boolean | Fn<boolean>
  disabled?: boolean | Fn<boolean>
  /** 传递到内置方法时的所需参数 */
  meta?: Obj
  onClick?: Fn
}
type TableApis = {
  query?: Fn<Promise<any>>
  info?: Fn<Promise<Obj>>
  save?: Fn<Promise<any>>
  update?: Fn<Promise<any>>
  delete?: Fn<Promise<any>>
  export?: Fn<Promise<any>>
}
interface ExtButtonGroup<T extends string = string> {
  attrs?: LayoutSpaceProps & UIContainerProps<'Space'>
  /** 组内按钮公共原生属性；单按钮 attrs 优先。 */
  buttonProps?: UIActionProps<'Button'> & HTMLAttributes
  limit?: number
  align?: 'right' | 'left' | 'center'
  /** 按钮组可见场景 */
  visibleIn?: 'form' | 'detail' | 'both'
  /** @deprecated 使用 `visibleIn` */
  validOn?: 'form' | 'detail' | 'both'
  /** 表单按钮位置 */
  placement?: 'top' | 'bottom' | 'inline'
  /** 分隔符， type为'link'/'text'时默认true */
  divider?: boolean
  /** 按钮图标文字显示模式 */
  labelMode?: 'icon' | 'label' | 'both'
  /** 更多按钮slot */
  moreLabel?: VSlot
  /** 无权限时的展示方式，默认隐藏 */
  unauthorized?: 'hide' | 'disable'
  /**
   * 无权限时禁用，默认隐藏
   * @deprecated 使用 `unauthorized: 'disable'`
   */
  invalidDisabled?: boolean
  /** @deprecated 使用 `unauthorized` */
  roleMode?: 'hidden' | 'disable'
  hidden?: boolean | Fn<boolean>
  disabled?: boolean | Fn<boolean>
  /** 将按钮放置到组件的指定slot中 */
  /** 按钮组渲染到的目标插槽 */
  targetSlot?: string
  /** @deprecated 使用 `targetSlot` */
  forSlot?: string
  methods?: Obj<Fn>
  /** 传递到事件方法中可响应数据 */
  effectData?: Obj
  actions?: T[] | (string | ButtonItem)[]
  // subItems?: ButtonItem[]
}
type ExtButtons<T extends string = string> = ExtButtonGroup<T> | NonNullable<ExtButtonGroup<T>['actions']>
type TabsHeader = Omit<UIContainerProps<'Tabs'>, 'activeKey'> & {
  field?: string
  initialValue?: any
  bordered?: boolean
  defaultActiveKey?: string | number
  options?: OptionsConfig
  activeKey?: Ref<string | number | undefined>
  slots?: Obj<VSlot>
  /** 设置tab标签 */
  customTab?: Fn
}

/** SuperForm 稳定的弹窗语义，其他外观和交互属性由 Adapter 补充。 */
export interface ModalSchemaProps {
  title?: VSlot
  content?: VSlot
  icon?: () => VNodeChild
  buttons?: ExtButtons
  destroyOnClose?: boolean
  maskClosable?: boolean
  afterClose?: Fn
  onOk?: Fn
  onCancel?: Fn
}

export type ExtModalProps = ModalSchemaProps & Omit<UIModalProps<'Modal'>, keyof ModalSchemaProps>
export type ModalOpenOptions = Partial<ExtModalProps> & { data?: Obj }

/** SuperForm 稳定的表格容器语义。 */
export interface TableSchemaProps {
  /** 数据初始化后默认展开的行。 */
  defaultExpandLevel?: number | 'all'
  /** 当前展开行；Core 会在默认展开层级计算完成后更新该值。 */
  expandedRowKeys?: (string | number)[]
  /** 显式关闭选择列，具体选择配置由 Adapter 提供。 */
  rowSelection?: false | (UITableProps<'Table'> extends { rowSelection?: infer T } ? T : Obj)
}

export type ExtTableProps = TableSchemaProps & Omit<UITableProps<'Table'>, keyof TableSchemaProps>
export type ExtTableColumnProps = UITableProps<'Column'>

/** 请求分页只依赖这三个字段，其他分页外观属性由 Adapter 补充。 */
export interface TablePaginationSchemaProps {
  current?: number
  pageSize?: number
  total?: number
}

export type ExtTablePaginationProps = TablePaginationSchemaProps &
  Omit<UITableProps<'Pagination'>, keyof TablePaginationSchemaProps>

type ExtColumnsItem = (UniOption | Partial<ExtFormItemOption>) & {
  /**
   *  应用于表格或编辑表单
   *  @deprecated 该属性已废弃，使用exclude替代
   * */
  hideInTable?: boolean
  /** 表格内容渲染 */
  viewRender?: VSlot
  columnProps?: ExtTableColumnProps
}
interface ExtTableOption extends ExtBaseOption {
  field: string
  title?: VSlot
  attrs?: ExtTableProps
  /** @deprecated 更名为editable */
  edit?: boolean
  /** 表格全部为编辑状态，开启后rowEdit无效 */
  editable?: boolean | Fn<boolean>
  rowEditor?: {
    editMode?: 'inline' | 'modal'
    addMode?: 'inline' | 'modal'
    form?: Omit<ExtFormOption, 'subItems'> & { 'subItems'?: UniOption[] }
    modalProps?: ExtModalProps
    /**提交保存前 */
    onSave?: Fn
    onCancel?: Fn
  }
  /** @deprecated  移至rowEditor */
  editMode?: 'inline' | 'modal'
  /** @deprecated  移至rowEditor */
  addMode?: 'inline' | 'modal'
  columns: ExtColumnsItem[]
  tabs?: TabsHeader | false
  /** 公共列配置 */
  columnProps?: ExtTableColumnProps
  /**序号列*/
  indexColumn?: boolean | ExtTableColumnProps
  buttons?: ExtButtons<'add' | 'delete' | 'edit' | 'detail'> | false
  /** 列表元素右边按钮 */
  rowButtons?: false | (ExtButtons<'delete' | 'edit' | 'detail' | 'add'> & { columnProps?: ExtTableColumnProps })
  /** 弹窗属性 */
  modalProps?: ExtModalProps
  descriptionsProps?: ExtDescriptionsProps & { modalProps?: ExtModalProps }
  /** @deprecated  弹窗表单配置,移至rowEditor */
  editForm?: Omit<ExtFormOption, 'subItems'> & { 'subItems'?: UniOption[]; modalProps?: ExtModalProps }
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
  apis?: TableApis
  dataSource?: Obj[] | Ref<any[]>
  params?: Obj
  /**是否立即查询，默认为true */
  immediate?: boolean
  /** 查询请求前可对请求参数进行处理 */
  beforeQuery?: (data: Obj) => Obj | void
  /** 查询请求后可对返回结果进行处理 */
  afterQuery?: (data: Obj) => Obj | void
  onLoaded?: Fn
  /**
   * @deprecated 改为searchForm
   */
  searchSchema?: void
  /** 查询表单配置 */
  searchForm?: Omit<ExtFormOption, 'subItems'> & {
    subItems: (UniOption | string)[]
    searchOnChange?: boolean
    teleport?: string
    /** 超出限制显示展开 */
    limit?: number
    /** 开启高级查询 */
    advanced?: boolean
  }
  pagination?: ExtTablePaginationProps | false
  attrs?: ExtTableProps & TableScanHight
}
/** CardList、TabList、CollapseList 共用的数组配置。 */
interface ExtListOption extends ExtBaseOption, ExtRow {
  field: string
  title?: VSlot
  /** 从行记录读取标题，支持点分路径。 */
  titleField?: string
  attrs?: HTMLAttributes & {
    rowKey?: string
    /** CardList 每张卡片的栅格宽度，默认 24。 */
    span?: number
  }
  columns: UniWidgetOption[]
  buttons?: false | ExtButtons<'add'>
  rowButtons?: false | ExtButtons<'add' | 'delete' | 'edit'>
  /** 配置后在弹窗编辑，容器内显示详情。 */
  editModal?: {
    form?: Partial<ExtFormOption>
    modalProps?: ExtModalProps
  }
  descriptionsProps?: ExtDescriptionsProps
}
interface ExtGroupListOption extends Omit<ExtGroupOption, 'subItems'> {
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
  compact?: boolean
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
interface ExtTabsOption extends Omit<ExtBaseOption, 'attrs'> {
  activeKey?: Ref<string | undefined>
  buttons?: ExtButtons<'add' | 'refresh'>
  subItems: ExtTabItem[]
}
interface ExtTabItem extends Omit<ExtGroupBaseOption, 'type' | 'attrs'> {
  label: VSlot
  key?: string
  icon?: () => VNodeChild
  attrs?: {
    closable?: boolean
    closeIcon?: () => VNodeChild
    forceRender?: boolean
  }
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
  icon?: () => VNodeChild
  subItems: UniOption[]
  buttons?: ExtButtons
}
/** 表单元素属性 */
interface ExtFormItemOption extends ExtBaseOption, RangeFieldOption {
  /** 指定ref对象时，同步变化 */
  value?: any
  /** 指定查看时显示的字段 */
  labelField?: string
  /**标签化显示，当有options时自动开启 */
  tagViewer?:
    | boolean
    | Obj<string>
    | string[]
    | { label?: string; value: any; color: string; icon?: () => VNodeChild }[]
    | Fn<string | { label: string; color?: string; icon?: () => VNodeChild }>
  formItemProps?: FormItemSchemaProps & UIContainerProps<'FormItem'>
  descriptionsProps?: ExtDescriptionsProps
  /**是否可编辑 */
  editable?: boolean | Fn<boolean>
}

type KeysOfUnion<T> = T extends unknown ? keyof T : never
type ValueOfUnion<T, K extends PropertyKey> = T extends unknown ? (K extends keyof T ? T[K] : never) : never
type MergeRegistrySources<T> = {
  [K in KeysOfUnion<T>]: ValueOfUnion<T, K>
}
type UIFormComponentPropSource =
  SuperFormTypeRegistry.UIFormComponentPropSources[keyof SuperFormTypeRegistry.UIFormComponentPropSources]
type UIFormComponentOptionExtensionSource =
  SuperFormTypeRegistry.UIFormComponentOptionExtensionSources[keyof SuperFormTypeRegistry.UIFormComponentOptionExtensionSources]

/** Adapter UI 字段的 attrs 类型映射；同名字段按 Adapter 来源合并为联合类型。 */
export type UIFormComponentProps = SuperFormTypeRegistry.UIFormComponentProps &
  MergeRegistrySources<UIFormComponentPropSource>

/** Adapter 为字段组件关联的 Core 增强配置。 */
export type UIFormComponentOptionExtensions = SuperFormTypeRegistry.UIFormComponentOptionExtensions &
  MergeRegistrySources<UIFormComponentOptionExtensionSource>

/** 自定义 UI 字段的 attrs 类型映射。 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface CustomFormComponentProps {}

type DefaultOptionsType = (string | number | boolean)[] | DefaultOptionType[] | { [k: string | number]: any }
export type OptionsSource =
  | DefaultOptionsType
  | Readonly<DefaultOptionsType>
  | Ref<DefaultOptionsType>
  | ((effectData: Obj) => DefaultOptionsType | Promise<DefaultOptionsType>)

// 动作下拉仍使用数据源类型，不参与输入字段配置包的迁移。
type SelectOptions = OptionsSource

export type OptionsConfig = {
  /** 与 dictName 同时配置时优先使用 source，并给出警告。 */
  source?: OptionsSource
  dictName?: string
  fieldNames?: { label?: string; value?: string; children?: string }
  valueToNumber?: boolean
  labelAsValue?: boolean
}

export interface SelectFieldOption {
  options?: OptionsConfig
  stringifyValue?: boolean
}
interface ExtTagSelectOption extends ExtFormItemOption, SelectFieldOption {
  attrs?: {
    multiple?: boolean
    /** 将多选结果转换为逗号分隔字符串后写回字段 */
    stringifyValue?: boolean
  }
}
interface ExtTagInputOption extends ExtFormItemOption {
  attrs?: {
    /** 将标签数组转换为逗号分隔字符串后写回字段 */
    stringifyValue?: boolean
    /**新增标签名 */
    newLabel?: VSlot
    /** 是否可删除, 默认为true */
    closable?: boolean | ((tag: string, index: number) => boolean)
  }
}
export interface TreeFieldOption<TreeData = unknown> {
  labelField?: string
  treeData?: TreeData | Fn<Promise<TreeData>> | Fn<TreeData>
}

export interface SwitchFieldOption extends SelectFieldOption {}

export interface RangeFieldOption {
  /** 保留 UI 原生日期及临时选择参数，额外接收表单上下文。 */
  disabledDate?: (effectData: Obj, ...args: any[]) => boolean
  /** 绑定结束日期字段 */
  endField?: string
  /** 未配置 `endField` 时，将日期范围转换为逗号分隔字符串后写回字段 */
  stringifyValue?: boolean
}

export interface AutoCompleteFieldOption {
  options?: OptionsConfig
}

/** SuperForm 自身消费的上传配置，底层组件属性由 Adapter 补充。 */
export interface UploadSchemaProps {
  apis?: {
    upload?: (data: FormData, { onUploadProgress: Fn }) => Promise<any>
    delete?: (file: Obj) => Promise<any>
    download?: (file: Obj) => Promise<any>
  }
  /** 指定文件信息字段 */
  infoNames?: { [k in 'uid' | 'name' | 'url']?: string } | Obj<string>
  /** 指定文件信息中某属性作为同步绑定值，不指定将同步绑定文件对象 */
  valueKey?: string
  /** 文件最小 MB */
  minSize?: number
  /** 文件最大 MB */
  maxSize?: number
  /** 单文件上传，绑定值为字符串或文件对象 */
  isSingle?: boolean
  /** 最大文件数量 */
  maxCount?: number
  /** 允许的文件类型 */
  accept?: string
  /** 达到最大文件数量时隐藏上传主体 */
  hideOnMax?: boolean
  /** 上传模式：auto 自动上传；submit 提交时上传；custom 手动上传；base64/text 转换内容。 */
  uploadMode?: 'auto' | 'submit' | 'custom' | 'base64' | 'text'
  tip?: string
  /** 上传按钮标题 */
  title?: VSlot
  /** 是否允许重名文件 */
  repeatable?: boolean
  /** 查看模式 */
  isView?: boolean
}

export type ExtUploadProps = UploadSchemaProps & Omit<UIUploadProps<'Upload'>, keyof UploadSchemaProps>

interface ExtUpload extends ExtFormItemOption {
  vModelFields?: {
    fileList?: string | Obj
  }
  attrs?: ExtUploadProps
}
type ExtSlotOption = { render: VSlot }
type ExtInfoSlotOption = (ExtBaseOption & ExtSlotOption) | ExtFormItemOption
type ExtInputSlotOption = ExtFormItemOption & ExtSlotOption

type WrapperTypes = {
  InfoSlot: ExtInfoSlotOption
  Form: ExtFormOption
  Group: ExtGroupOption
  Fragment: Pick<ExtGroupBaseOption, 'type' | 'field' | 'disabled' | 'exclude' | 'hidden' | 'subItems' | 'subSpan'>
  Card: ExtGroupBaseOption
  CardList: ExtListOption
  TabList: ExtListOption
  CollapseList: ExtListOption
  GroupList: ExtGroupListOption
  Tabs: ExtTabsOption
  Table: ExtTableOption
  Collapse: ExtCollapseOption
  Descriptions: ExtDescriptionsOption | ExtGroupOption
}
type CoreWidgetTypes = {
  Buttons: ExtBaseOption & ExtButtonGroup
  Hidden: ExtFormItemOption
  InputSlot: ExtInputSlotOption
  InfoSlot: ExtInfoSlotOption
  Text: ExtFormItemOption
  HTML: ExtFormItemOption
  Upload: ExtUpload
  InputGroup: ExtInputGroupOption
  InputList: ExtInputList
  TagInput: ExtTagInputOption
  TagSelect: ExtTagSelectOption
}

type UIFormComponentOption<K extends keyof UIFormComponentProps> = ExtFormItemOption &
  (K extends keyof UIFormComponentOptionExtensions ? UIFormComponentOptionExtensions[K] : unknown) & {
    // UI 库的必填 Props 可能由动态属性、Adapter 默认值或增强处理器补充，Schema 静态 attrs 只约束已填写的属性。
    attrs?: Partial<UIFormComponentProps[K]> & HTMLAttributes
  }

type AdapterWidgetTypes = {
  [K in keyof UIFormComponentProps]: UIFormComponentOption<K>
}

type CustomWidgetTypes = {
  [K in keyof CustomFormComponentProps]: ExtFormItemOption & {
    attrs?: CustomFormComponentProps[K] & HTMLAttributes
  }
}
type WidgetTypes = CoreWidgetTypes & AdapterWidgetTypes
export type OptionType = WrapperTypes & WidgetTypes & CustomWidgetTypes
export type UniWrapperOption = { [K in keyof WrapperTypes]: { type: K } & WrapperTypes[K] }[keyof WrapperTypes]
export type UniWidgetOption =
  | { [K in keyof WidgetTypes]: { type: K } & WidgetTypes[K] }[keyof WidgetTypes]
  | {
      [K in keyof CustomWidgetTypes]: { type: K } & CustomWidgetTypes[K]
    }[keyof CustomWidgetTypes]

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
    initialValue?: any
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
  ExtTabItem,
  TableApis,
  ExtColumnsItem,
  ExtInputGroupOption,
  ExtTabsOption,
  ExtCollapseOption,
  ExtListOption,
  ExtGroupListOption,
  ExtDescriptionsOption,
}
