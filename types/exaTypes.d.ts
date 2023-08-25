/* eslint-disable no-use-before-define */
import { SelectProps } from 'ant-design-vue/lib/vc-select'
import { DefaultOptionType } from 'ant-design-vue/es/select'
import Vue, { Component, HTMLAttributes, VNodeChild } from 'vue'
import { TreeDataItem } from 'ant-design-vue/es/tree/Tree'
import {
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
} from 'ant-design-vue'

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
  type VNode = VNodeChild
  type Ref<T = any> = Vue.Ref<T>
  // type Readonly<T = any> = Vue.DeepReadonly<T>

  interface ModelData<T = ExBaseOption> {
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
  interface ModelDataGroup<T = ExGroupOption> extends ModelData<T> {
    children: Map<T, ModelDataGroup>
    /** 存储列表配置默认数据 */
    listData: ModelChildren<T>
  }
  type ModelsMap<T = ExBaseOption> = Map<T, ModelData>
  interface ModelChildren<T = ExBaseOption> {
    modelsMap: ModelsMap<T>
    rules: Obj
    initialData: Ref<Obj>
  }

  interface ExBaseOption {
    type: string
    field?: string
    label?: string
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
  }

  interface ExGroupOption extends ExBaseOption {
    title?: string | Fn<VNode>
    gutter?: number
    buttons?: ExButtons
    subItems: UniOption[]
    /** 弹窗表单中的行间排版属性 */
    rowProps?: RowProps & HTMLAttributes
    /** 子元素的统一排列属性， */
    subSpan?: number
    descriptionsProps?: DescriptionsProps
  }

  interface ExFormOption extends Omit<ExGroupOption, 'type'> {
    // type?: 'Form'
    attrs?: FormProps & HTMLAttributes
    isContainer?: boolean
    /** 减少行距 */
    compact?: boolean
    /** 不做校验 */
    ignoreRules?: boolean
    buttons?: ExButtons<'submit' | 'reset'>
  }

  interface ButtonItem {
    label?: string
    /** 确认提示文本 */
    confirmText?: string
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
  interface ExButtonGroup<T extends string = string> {
    limit?: number
    buttonType?: 'primary' | 'link' | 'text' | 'dashed' | 'ghost' | 'default'
    buttonShape?: 'circle' | 'round' | 'default'
    size?: 'large' | 'middle' | 'small'
    /** 是否独立行 */
    isBlock?: boolean
    /** 是否只显示图标 */
    iconOnly?: boolean
    hidden?: boolean | Fn<boolean>
    disabled?: boolean | Fn<boolean>
    /** 将按钮放置到组件的指定slot中 */
    forSlot?: string
    actions?: (T | (ButtonItem | { name: T }))[]
    // subItems?: ButtonItem[]
  }
  type ExButtons<T extends string = string> = ExButtonGroup<T> | NonNullable<ExButtonGroup<T>['actions']>

  type ExColumnsItem = {
    /** 应用于表格或编辑表单 */
    hideInTable?: boolean
    /** 表格内容渲染 */
    viewRender?: string | Fn<VNodeChild>
    columnProps?: TableColumnProps
  }
  type ColumnsOption = (UniWidgetOption | ExInputGroupOption) & ExColumnsItem
  interface ExTableOption extends ExBaseOption {
    field: string
    title?: string | Fn<VNode>
    editMode?: 'inline' | 'modal'
    addMode?: 'inline' | 'modal'
    columns: ColumnsOption[]
    buttons?: ExButtons
    /** 列表元素右边按钮 */
    rowButtons?: ExButtons<'del' | 'edit' | 'view'> & { columnProps?: TableColumnProps }
    /** 弹窗属性 */
    modalProps?: ModalFuncProps
    descriptionsProps?: DescriptionsProps
    /** 弹窗表单属性 */
    formSechma?: Omit<ExFormOption, 'subItems'> & { 'subItems'?: UniOption[] }
  }

  interface RootTableOption extends Omit<ExTableOption, 'type' | 'field'> {
    isContainer?: boolean
    apis?: TableApis | TableApis['query']
    params?: Obj
    searchSechma?: ExFormOption | { subItems: (UniOption | string)[] }
    pagination?: PaginationProps
  }
  interface ExListOption extends ExBaseOption {
    field: string
    buttons?: ExButtons<'add' | 'refresh'>
    columns: UniWidgetOption[]
    /** 列表元素右边按钮 */
    rowButtons?: ExButtonGroup<'del' | 'edit'>
  }
  interface ExInputGroupOption extends ExBaseOption {
    span: number
    gutter?: number
    subItems: UniOption[]
  }
  // interface ExCardOption extends ExGroupOption {
  //   title?: string | VNode
  //   subItems: UniOption[]
  // }
  interface ExTabsOption extends ExBaseOption {
    activeKey?: Ref<string>
    forceRender?: boolean
    buttons?: ExButtons<'add' | 'refresh'>
    subItems: TabItem[]
  }
  interface TabItem extends Omit<ExGroupOption, 'type'> {
    label: string
    key?: string
    icon?: string | Component
    subItems: UniOption[]
  }
  interface ExCollapseOption extends ExBaseOption {
    activeKey?: string | Ref<string>
    subItems: CollapseItem[]
  }
  interface CollapseItem extends Omit<ExGroupOption, 'type'> {
    label: string
    key?: string
    icon?: string | Component
    subItems: UniOption[]
    buttons?: ExButtons
  }
  /** 表单元素属性 */
  interface ExFormItemOption extends ExBaseOption {
    field: string
    initialValue?: any
    /** 数据联动 提供一个监听方法，根据数据变化自动计算变更绑定值 */
    computed?: (value, formData: Vue.DeepReadonly<Obj>) => any
    rules?: RuleConfig | RuleConfig[]
    formItemProps?: FormItemProps
  }

  interface ExInputOption extends ExFormItemOption {
    addonAfterIcon?: string | Component
    addonBeforeIcon?: string | Component
    prefixIcon?: string | Component
    suffixIcon?: string | Component
    suffixTips?: string
    btnClick?: (FormData: Obj, e: MouseEvent) => void
    onChange?: (FormData: Obj, e: InputEvent) => void
    attrs?: InputProps & HTMLAttributes
  }
  type SelectOptions = DefaultOptionType[]

  interface ExSelectOption extends ExFormItemOption {
    labelField?: string
    options?: SelectOptions | Ref<SelectOptions> | Fn<SelectOptions | Promise<SelectOptions>>
    /** 字典名称 */
    dictName?: string
    attrs?: SelectProps & HTMLAttributes
  }
  interface ExTreeOption extends ExFormItemOption {
    labelField?: string
    attrs?: TreeProps & HTMLAttributes
    data: TreeDataItem[] | Fn<Promise<TreeDataItem[]>>
  }
  interface ExSwitchOption extends ExFormItemOption {
    valueLabels?: [string, string]
  }

  interface ExDateRange extends ExFormItemOption {
    /** 绑定结束日期字段 */
    keepField?: string
  }
  interface ExRadioOption extends ExFormItemOption {
    options: SelectOptions | Ref<SelectOptions> | Fn<SelectOptions | Promise<SelectOptions>>
  }
  type ExSlotOption = { slotName: string } | { render: string | Fn<VNodeChild> }
  type ExInfoSlotOption = ExBaseOption & ExSlotOption
  type ExInputSlotOption = ExFormItemOption & ExSlotOption

  type WrapperTypes = {
    InfoSlot: ExSlotOption
    Form: ExFormOption
    Group: ExGroupOption
    InputGroup: ExInputGroupOption
    Card: ExGroupOption
    List: ExListOption
    Tabs: ExTabsOption
    Table: ExTableOption
    Collapse: ExCollapseOption
  }
  type WidgetTypes = {
    Buttons: ExBaseOption & ExButtonGroup
    Hidden: { field: string }
    InputSlot: ExSlotOption
    InfoSlot: ExSlotOption
    Text: ExBaseOption
    Input: ExInputOption
    InputNumber: ExFormItemOption
    DatePicker: ExFormItemOption
    TimePicker: ExFormItemOption
    DateRange: ExDateRange
    Select: ExSelectOption
    TreeSelect: ExTreeOption
    Radio: ExRadioOption
    Checkbox: ExRadioOption
    Switch: ExSwitchOption
  }
  type OptionType = WrapperTypes & WidgetTypes

  type UniWrapperOption = { [K in keyof WrapperTypes]: { type: K } & WrapperTypes[K] }[keyof WrapperTypes]
  type UniWidgetOption =
    | { [K in keyof WidgetTypes]: { type: K } & WidgetTypes[K] }[keyof WidgetTypes]
    | ExFormItemOption

  type UniOption = UniWrapperOption | UniWidgetOption

  type GetUniOption<T extends keyof OptionType> = OptionType[T] & { type?: T }
  type MixWrapper = {
    [K in keyof WrapperTypes]: (k: Partial<WrapperTypes[K]>) => void
  }[keyof WrapperTypes] extends (k: infer U) => void
    ? U
    : never
  type MixOption = {
    [K in keyof OptionType]: (k: Partial<OptionType[K]>) => void
  }[keyof OptionType] extends (k: infer U) => void
    ? U & ExColumnsItem & Partial<CollapseItem> & { type?: string }
    : never
}

export {}
