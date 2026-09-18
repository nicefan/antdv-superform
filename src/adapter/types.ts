import type { Component, Slots, VNodeChild } from 'vue'

export type AdapterComponent = string | Component

export interface FormAdapter {
  /** 只校验指定字段路径，供复合字段更新时使用。 */
  validateField?: (instance: any, path: (string | number)[]) => Promise<unknown>
  /** 表单容器组件 */
  component: AdapterComponent
  /** 表单项组件 */
  item: AdapterComponent
  /** 将 Core 表单状态转换为 UI 组件属性 */
  transformProps?: (props: Obj) => Obj
  /** 将 Core 表单项状态转换为 UI 组件属性 */
  transformItemProps?: (props: Obj) => Obj
  /** 执行当前 UI 表单实例的校验。 */
  validate: (instance: any) => Promise<unknown>
  /** 清理当前 UI 表单实例的校验状态。 */
  clearValidate: (instance: any) => void
}

export type LayoutComponentName = 'row' | 'col' | 'space' | 'compactSpace'

export interface LayoutAdapter {
  row: AdapterComponent
  col: AdapterComponent
  space: AdapterComponent
  /** 可选的紧凑空间容器；未提供时回退到普通 space。 */
  compactSpace?: AdapterComponent
  /** 栅格和空间属性的 UI 协议转换。 */
  transformProps?: Partial<Record<LayoutComponentName, (props: Obj) => Obj>>
}

export interface ContainerAdapter {
  component: AdapterComponent
  /** 容器存在受控状态时的 UI model 协议。 */
  model?: ComponentModelConfig
  /** 将 Core 容器状态转换为 UI 组件属性。 */
  transformProps?: (props: Obj) => Obj
  /** 容器的 slot 协议不同时自定义最终渲染。 */
  render?: (component: Component, props: Obj, slots: Obj) => VNodeChild
}

export interface IconAdapter {
  /** Core 内置交互使用的语义图标渲染函数。 */
  semantic?: Record<string, (() => VNodeChild) | undefined>
}

export type ActionRenderType = 'group' | 'tooltip'

export interface ActionAdapter {
  /** 渲染按钮组或提示；具体按钮、菜单和下拉结构由 Adapter 内部处理。 */
  render: (type: ActionRenderType, props: Obj, slots: Obj) => VNodeChild
}

export type PresentationRenderType = 'tag' | 'checkableTag'

export interface PresentationAdapter {
  /** 渲染轻量展示原语。 */
  render: (type: PresentationRenderType, props: Obj, slots: Obj) => VNodeChild
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
  /** 渲染受控弹窗；Core 统一使用 visible/onUpdate:visible 协议。 */
  render: (props: Obj, slots: Obj) => VNodeChild
  /** 在组件 setup 中捕获 UI 框架上下文。 */
  useContext?: () => unknown
  /** 为脱离原组件树挂载的弹窗恢复 UI 框架上下文。 */
  wrapContext?: (
    content: (props?: Obj) => VNodeChild,
    context: unknown,
    props: Obj
  ) => VNodeChild
}

export interface UploadAdapter {
  /** UI 框架拒绝文件但不加入列表时使用的特殊返回值。 */
  listIgnore: unknown
  /** 渲染上传组件，并在内部完成 fileList、事件和 slot 协议转换。 */
  render: (props: Obj, slots: Obj) => VNodeChild
  /** 渲染默认上传触发按钮。 */
  renderTrigger: (props: Obj, slots: Obj) => VNodeChild
}

export interface PreviewAdapter {
  /** 渲染受控图片预览；Core 统一使用 visible/onUpdate:visible 协议。 */
  render: (props: Obj) => VNodeChild
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
  /** 将 Core 表格状态转换为当前 UI 框架的表格、列和分页结构。 */
  render: (props: UITableRenderProps, slots: Obj) => VNodeChild
  /** 渲染表格顶部的选项卡筛选。 */
  renderFilter: (props: UITableFilterProps, slots: Obj) => VNodeChild
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

export interface UIAdapter {
  /** 用于诊断和调试的适配器名称 */
  name: string
  /** Core 运行必需、由 Adapter 直接引入的固定 UI 原语；不包含 Schema 字段组件。 */
  components: Record<string, Component>
  /** 受支持输入组件目录，与字段差异配置分离，不持有真实组件。 */
  supportedFields: readonly string[]
  /** UI package 提前固化的普通输入协议。 */
  adaptFieldProps?: FieldPropsAdapter
  /** 只描述输入组件的适配差异；key 就是原始组件注册名。 */
  fields?: Record<string, FieldAdapter | undefined>
  /** 初始化 Adapter 时一并注册的字段组件；官方产品通常由 /components 入口提供。 */
  fieldComponents?: Record<string, Component | undefined>
  /** 表单容器、表单项及实例协议。 */
  form?: FormAdapter
  /** 栅格和空间容器协议。 */
  layout?: LayoutAdapter
  /** Card、Tabs、Collapse、List 等容器渲染协议。 */
  containers?: Record<string, ContainerAdapter | undefined>
  /** 内部语义图标的渲染函数映射；业务图标直接消费配置函数。 */
  icons?: IconAdapter
  /** 按钮组使用的按钮、菜单、下拉和提示原语。 */
  actions?: ActionAdapter
  /** 详情展示和 Core 复合字段使用的轻量展示原语。 */
  presentation?: PresentationAdapter
  /** 消息、确认和可更新信息框等命令式 UI 服务。 */
  services?: ServiceAdapter
  /** 声明式与命令式弹窗共用的渲染协议。 */
  modal?: ModalAdapter
  /** Upload 组件的 UI 协议和忽略标记。 */
  upload?: UploadAdapter
  /** 图片预览协议。 */
  preview?: PreviewAdapter
  /** 表格、列、分页、选择、展开和筛选协议。 */
  table?: TableAdapter
  /** 当前 UI 框架的全局组件默认属性 */
  defaults?: Obj<Obj>
}
