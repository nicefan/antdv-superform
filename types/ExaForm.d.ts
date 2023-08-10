/* eslint-disable no-use-before-define */
import { SelectProps } from 'ant-design-vue/lib/vc-select'
import { DefaultOptionType } from 'ant-design-vue/es/select'
import Vue, { HTMLAttributes, VNodeChild } from 'vue'
import { TreeDataItem } from 'ant-design-vue/es/tree/Tree'
import { FormProps, PaginationProps } from 'ant-design-vue'
import { ModalFuncProps, ColProps, RowProps, FormItemProps, InputProps } from 'ant-design-vue/es'

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
  interface ModelData {
    refName: string
    // propRef: Ref
    parent: Obj
    propChain: string[]
    rules: Obj
    currentRules?: Obj
  }
  interface ParentModel {
    /** 父对象 */
    parent: Obj
    /** 属性名链条数组 */
    propChain?: string[]
    rules?: Obj
    propRef?: Ref
    /** 对象属性名 */
    refName?: string
  }
  interface ListModels {
    model: ParentModel
    children: ModelsMap
  }
  type ModelsMap<T = ExBaseOption> = Map<T, T extends { subItems: any } ? Required<ModelChildren<T>> : ModelChildren<T>>
  interface ModelChildren<T = ExBaseOption> {
    model: ModelData
    children?: ModelsMap<T>
    /** 存储列表配置默认数据 */
    listData?: ListModels
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
    /** 是否禁用，提供一个监听方法，根据数据变化自动切换 */
    disabled?: boolean | Fn
    on?: Obj<Fn>
    // renderView?: Fn<VNode>
    // customRender?: Fn
    // row?: boolean
    colProps?: ColProps & HTMLAttributes
    /** 快捷实现col span */
    span?: number
    slots?: Obj<Fn>
  }

  interface ExGroupOption extends ExBaseOption {
    title?: string | Fn<VNode>
    gutter?: number
    buttons?: ExButtonGroup
    subItems: UniOption[]
    /** 弹窗表单中的行间排版属性 */
    rowProps?: RowProps & HTMLAttributes
    /** 子元素的统一排列属性， */
    wrapperCol?: ColProps
  }

  interface ExFormOption extends Omit<ExGroupOption, 'type'> {
    // type?: 'Form'
    attrs?: FormProps & HTMLAttributes
    isContainer?: boolean
    /** 减少行距 */
    compact?: boolean
    /** 不做校验 */
    ignoreRules?: boolean
    buttons?: ExButtonGroup<'submit' | 'reset'>
  }

  interface ButtonItem {
    label?: string
    /** 确认提示文本 */
    confirmText?: string
    icon?: string
    attrs?: Obj & HTMLAttributes
    hidden?: boolean | Fn<boolean>
    disabled?: boolean | Fn<boolean>
    onClick?: Fn
  }
  type TableApis = {
    query: Fn<Promise<any>>
    save?: Fn<Promise<any>>
    update?: Fn<Promise<any>>
    delete?: Fn<Promise<any>>
  }
  interface ExButtonGroup<T extends string = string> {
    limit?: number
    defaultAttrs?: {
      type?: 'primary' | 'link' | 'text' | 'dashed' | 'ghost' | 'default'
      shape?: 'circle' | 'round' | 'default'
      size?: 'large' | 'middle' | 'small'
    }
    align?: 'left' | 'right' | 'center'
    /** 是否独立行 */
    isBlock?: boolean
    /** 是否只显示图标 */
    iconOnly?: boolean
    hidden?: boolean | Fn<boolean>
    disabled?: boolean | Fn<boolean>
    actions?: (T | (ButtonItem & ({ name: T } | { name?: string })))[]
    // subItems?: ButtonItem[]
  }
  type ExColumnsItem = {
    /** 应用于表格或编辑表单 */
    applyTo?: 'table' | 'form'
    /** 表格内容渲染 */
    customRender?: string | Fn<VNodeChild>
  }
  type ColumnsOption = (UniWidgetOption | ExInputGroupOption) & ExColumnsItem
  interface ExTableOption extends ExBaseOption {
    field: string
    title?: string | Fn<VNode>
    editMode?: 'inline' | 'modal'
    addMode?: 'inline' | 'modal'
    columns: ColumnsOption[]
    buttons?: ExButtonGroup
    /** 列表元素右边按钮 */
    rowButtons?: ExButtonGroup<'del' | 'edit'>
    /** 弹窗属性 */
    modalProps?: ModalFuncProps
    /** 弹窗表单属性 */
    formSechma?: Omit<ExFormOption, 'subItems'>
  }

  interface RootTableOption extends Omit<ExTableOption, 'type' | 'field'> {
    apis?: TableApis | TableApis['query']
    params?: Obj
    searchSechma?: ExFormOption | { subItems: (UniOption | string)[] }
    pagination?: PaginationProps
  }
  interface ExListOption extends ExBaseOption {
    field: string
    buttons?: ExButtonGroup<'add' | 'refresh'>
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
    activeKey?: string | Ref<string>
    forceRender?: boolean
    buttons?: ExButtonGroup<'add' | 'refresh'>
    subItems: TabItem[]
  }
  interface TabItem extends Omit<ExGroupOption, 'type'> {
    label: string
    key?: string
    icon?: string
    subItems: UniOption[]
  }
  interface ExCollapseOption extends ExBaseOption {
    activeKey?: string | Ref<string>
    subItems: CollapseItem[]
  }
  interface CollapseItem extends Omit<ExGroupOption, 'type'> {
    label: string
    key?: string
    icon?: string
    subItems: UniOption[]
    buttons?: ExButtonGroup
    formAttrs?: FormProps & HTMLAttributes
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
    addonAfterIcon?: string
    addonBeforeIcon?: string
    prefixIcon?: string
    suffixIcon?: string
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
    Buttons: ExBaseOption & ExButtonGroup
  }
  type WidgetTypes = {
    Hidden: { field: string }
    InputSlot: ExSlotOption
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

  type MixOption = {
    [K in keyof OptionType]: (k: Partial<OptionType[K]>) => void
  }[keyof OptionType] extends (k: infer U) => void
    ? U & ExColumnsItem & { type: string }
    : never
}

export {}
