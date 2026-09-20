import type { Component, Slots, VNodeChild } from 'vue'

export interface FormAdapter {
  /** 只校验指定字段路径，供复合字段更新时使用。 */
  validateField?: (instance: any, path: (string | number)[]) => Promise<unknown>
  /** 执行当前 UI 表单实例的校验。 */
  validate: (instance: any) => Promise<unknown>
  /** 清理当前 UI 表单实例的校验状态。 */
  clearValidate: (instance: any) => void
}

export type LayoutComponentName = 'row' | 'col' | 'space' | 'compactSpace'

/** 普通分组的内容与布局意图；具体 DOM 由 Adapter 决定。 */
export interface UIGroupState {
  attrs?: Obj
  contentAttrs?: Obj
  component?: Component
  slots?: Obj
  title?: () => VNodeChild
  extra?: () => VNodeChild
  extraPlacement?: 'title' | 'bottom'
  extraAlign?: string
  content: () => VNodeChild
}

export interface UICardState {
  attrs?: Obj
  slots?: Obj
  title?: () => VNodeChild
  extra?: () => VNodeChild
  content: () => VNodeChild
}

/** 面板只提供内容和状态，不指定 TabPane、CollapsePanel 等 UI 结构。 */
export interface UIContainerItem {
  key: string | number
  attrs?: Obj
  /** Core 已合成图标和标题，Adapter 只决定放置位置。 */
  title?: () => VNodeChild
  disabled?: boolean
  extra?: () => VNodeChild
  content: () => VNodeChild
}

export interface UITabsState {
  attrs?: Obj
  slots?: Obj
  activeKeys?: string | number
  onActiveChange?: (keys: string | number) => void
  extra?: () => VNodeChild
  content?: () => VNodeChild
  items: UIContainerItem[]
}

export interface UICollapseState {
  attrs?: Obj
  slots?: Obj
  title?: () => VNodeChild
  activeKeys?: string | number | (string | number)[]
  onActiveChange?: (keys: string | number | (string | number)[]) => void
  content?: () => VNodeChild
  items: UIContainerItem[]
}

export interface IconAdapter {
  /** Core 内置交互使用的语义图标渲染函数。 */
  semantic?: Record<string, (() => VNodeChild) | undefined>
}

export interface UIServiceHandle {
  /** 更新当前命令式提示或确认框。 */
  update: (props: Obj) => void
  /** 销毁当前命令式提示或确认框。 */
  destroy: () => void
}

export type UIMessageType = 'success' | 'error' | 'info' | 'warning'

export interface ServiceAdapter {
  /** 显示轻量消息。 */
  message: (type: UIMessageType, content: unknown) => void
  /** 打开命令式确认框。 */
  confirm: (props: Obj) => UIServiceHandle
  /** 打开命令式信息框，主要用于可更新的加载与错误反馈。 */
  info: (props: Obj) => UIServiceHandle
}

export interface ModalAdapter {
  /** 在组件 setup 中捕获 UI 框架上下文。 */
  useContext?: () => unknown
  /** 为脱离原组件树挂载的弹窗恢复 UI 框架上下文。 */
  wrapContext?: (content: (props?: Obj) => VNodeChild, context: unknown, props: Obj) => VNodeChild
}

export interface UploadAdapter {
  /** UI 框架拒绝文件但不加入列表时使用的特殊返回值。 */
  listIgnore: unknown
}

export interface UITableSelection {
  selectedKeys: unknown[]
  /** Core 统一回传选中 key、行和 UI 框架提供的附加信息。 */
  onChange?: (keys: unknown[], rows: Obj[], info?: Obj) => void
  /** 返回 false 时禁止选择当前行。 */
  isRowSelectable?: (row: Obj) => boolean
  /** UI 包公开的选择扩展属性，由对应 Adapter 消费。 */
  attrs?: Obj
}

export interface UITablePagination {
  current?: number
  pageSize?: number
  total?: number
  pageSizeOptions?: Array<number | string>
  onChange?: (page: number, pageSize?: number) => unknown
  onShowSizeChange?: (page: number, pageSize: number) => unknown
  /** UI 包公开的分页扩展属性，由对应 Adapter 消费。 */
  attrs?: Obj
}

export interface UITableColumn extends Obj {
  key?: PropertyKey
  dataIndex?: string | string[]
  title?: unknown
  children?: UITableColumn[]
  customRender?: (context: Obj) => unknown
}

export interface UITableRenderProps extends Obj {
  data: Obj[]
  columns: UITableColumn[]
  selection?: UITableSelection
  pagination?: false | UITablePagination
  rowKey: string | ((row: Obj) => PropertyKey)
  expandedKeys?: unknown[]
  onExpandedChange?: (keys: unknown[]) => void
}

export interface UITableFilterProps {
  bordered?: boolean
  items: Array<Obj & { key: PropertyKey; tab: unknown }>
  value?: unknown
  onValueChange: (value: unknown) => void
  attrs?: Obj
}

export interface UITableSelectors {
  table: string
  title?: string
  header?: string
  footer?: string
  pagination?: string
  wrapper?: string
  empty?: string
  emptyCell?: string
  body?: string
}

export interface TableAdapter {
  /** 自动高度计算需要访问的 UI 私有 DOM 节点，由 Adapter 明确声明。 */
  selectors: UITableSelectors
}

export interface ComponentModelConfig {
  /** 组件接收主值的属性名，默认 value */
  prop?: string
  /** 组件更新主值时触发的事件名，默认 update:value */
  event?: string
}

export interface FieldAdapterContext {
  type: string
  option: Obj
  effectData: Obj
  model: ModelData
  binding: Obj
  state: FieldState
}

/** Core 专项处理结果；缺省项表示不接管对应的原生配置。 */
export interface FieldState {
  disabled?: boolean
  options?: Obj[]
  treeData?: any[]
  /** Core 提供默认提示；range 处理器输出两端提示，UI package 只转换属性协议。 */
  placeholder?: string | [string, string]
  switch?: { unchecked: { value: unknown; label?: unknown }; checked: { value: unknown; label?: unknown } }
}

export type FieldPropsAdapter = (attrs: Obj, context: FieldAdapterContext) => Obj

export interface FieldAdapter {
  /** 字符串指定原始组件别名目标；独立适配组件接收 Core 上下文。 */
  component?: Component | string
  defaults?: Obj
  /** 固定原生属性，在用户 attrs 和专项 props 合成后覆盖，适用于各类别名。 */
  fixedProps?: Obj
  processors?: string[]
  adaptProps?: FieldPropsAdapter
  /** 接收 Core 已包装上下文的 slots，保持延迟执行。 */
  adaptSlots?: (slots: Slots, context: FieldAdapterContext) => Slots
}

export interface ResolvedField extends Omit<FieldAdapter, 'component'> {
  component: Component
  type: string
  /** 区分独立适配组件与原始组件的入参。 */
  adapted: boolean
  /** Core 按当前字段上下文生成缺省属性，显式 attrs 优先。 */
  getAttrs: (attrs: Obj, option: Obj, state?: FieldState) => Obj
  adaptProps: FieldPropsAdapter
}

/** 固定 UI 的唯一渲染目录；复杂组件与轻量函数共用同一调用协议。 */
export interface UIRenderers {
  form: (props: Obj, slots?: Obj) => VNodeChild
  formItem: (props: UIFormItemProps, slots?: Obj) => VNodeChild
  row: (props?: Obj, slots?: Obj) => VNodeChild
  col: (props?: Obj, slots?: Obj) => VNodeChild
  space: (props?: Obj, slots?: Obj) => VNodeChild
  compactSpace: (props?: Obj, slots?: Obj) => VNodeChild
  group: (state: UIGroupState) => VNodeChild
  card: (state: UICardState) => VNodeChild
  tabs: (state: UITabsState) => VNodeChild
  collapse: (state: UICollapseState) => VNodeChild
  descriptions: (props: UIDescriptionsProps) => VNodeChild
  actionGroup: (props: UIActionGroupProps) => VNodeChild
  tooltip: (props: Obj, slots?: Obj) => VNodeChild
  tag: (props: Obj, slots?: Obj) => VNodeChild
  checkableTag: (props: Obj, slots?: Obj) => VNodeChild
  empty: () => VNodeChild
  modal: (props: Obj, slots?: Obj) => VNodeChild
  upload: (props: Obj, slots?: Obj) => VNodeChild
  uploadTrigger: (props: Obj, slots?: Obj) => VNodeChild
  preview: (props: Obj) => VNodeChild
  table: (props: UITableRenderProps, slots?: Obj) => VNodeChild
  tableFilter: (props: UITableFilterProps, slots?: Obj) => VNodeChild
}

export interface UIFormItemProps extends Obj {
  name?: (string | number)[]
  rules?: unknown
}

export interface UIDescriptionItem {
  attrs: Obj
  colProps: Obj
  labelCol: Obj
  wrapperCol: Obj
  label?: () => VNodeChild
  content: () => VNodeChild
  /** 原生详情项使用的逻辑列跨度。 */
  colspan: number
}

export interface UIDescriptionsProps {
  attrs: Obj
  mode: 'table' | 'form' | 'default'
  layout?: string
  rowProps?: Obj
  colon?: boolean
  size?: string
  tableLayout?: string
  column: number
  rows: UIDescriptionItem[][]
}

export interface UIActionGroupProps {
  groupProps?: Obj
  buttons: Obj[]
  moreButtons: Obj[]
  defaultButtonProps?: Obj
  divider?: boolean
  labelOnly?: boolean
  iconOnly?: boolean
  moreLabel?: unknown
  effectData: Obj
}

export interface UIAdapter {
  name: string
  /** 固定 UI 声明集中于此，不参与输入字段自动导入。 */
  render: Partial<UIRenderers>
  supportedFields: readonly string[]
  adaptFieldProps?: FieldPropsAdapter
  fields?: Record<string, FieldAdapter | undefined>
  fieldComponents?: Record<string, Component | undefined>
  form?: FormAdapter
  icons?: IconAdapter
  services?: ServiceAdapter
  modal?: ModalAdapter
  upload?: UploadAdapter
  table?: TableAdapter
  defaults?: Obj<Obj>
}

/** 渲染按单项覆盖，其它协议整项替换，避免深合并出不完整的服务实现。 */
export type UIAdapterOverrides = Partial<
  Pick<UIAdapter, 'form' | 'icons' | 'services' | 'modal' | 'upload' | 'table'>
> & {
  render?: Partial<UIRenderers>
}
