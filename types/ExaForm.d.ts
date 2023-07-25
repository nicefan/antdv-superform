/* eslint-disable no-use-before-define */
import { SelectProps } from 'ant-design-vue/lib/vc-select'
import { DefaultOptionType } from 'ant-design-vue/es/select'
import Vue from 'vue'
import { TreeDataItem } from 'ant-design-vue/es/tree/Tree'
import { FormProps } from 'ant-design-vue'
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

  interface FormOption {
    attrs?: FormProps | Fn<FormProps>
    isContainer?: boolean
    /** 弹窗表单中的行间排版属性 */
    rowProps?: RowProps
    /** 表单元素的统一排列属性， */
    wrapperCol?: ColProps
    /** 减少行距 */
    compact?: boolean
    /** 不做校验 */
    ignoreRules?: boolean
    subItems: UniOption[]
    buttons?: ExButtonGroup<'submit' | 'reset'>
  }

  interface ButtonItem {
    label?: string
    /** 确认提示文本 */
    confirmText?: string
    icon?: string
    attrs?: Obj
    hidden?: boolean | Fn<boolean>
    disabled?: boolean | Fn<boolean>
    onClick?: Fn
  }

  interface ExButtonGroup<T extends string = string> {
    limit?: number
    defaultAttrs?: {
      type?: 'primary' | 'link' | 'text' | 'dashed' | 'ghost' | 'default'
      shape?: 'circle' | 'round' | 'default'
      size?: 'large' | 'middle' | 'small'
    }
    align?: 'left' | 'right' | 'center'
    /** 是否独立行，默认true */
    isBlock?: boolean
    /** 是否只显示图标 */
    iconOnly?: boolean
    hidden?: boolean | Fn<boolean>
    disabled?: boolean | Fn<boolean>
    actions?: (T | (ButtonItem & { name?: T }))[]
    // subItems?: ButtonItem[]
  }
  interface ExBaseOption {
    type: string
    field?: string
    label?: string
    /** 配置复用合并时方便插入 */
    sort?: number
    attrs?: Obj | Fn<Obj>
    /** 是否隐藏，提供一个监听方法，根据数据变化自动切换 */
    hidden?: boolean | ((formData: Readonly<Obj>) => boolean)
    /** 是否禁用，提供一个监听方法，根据数据变化自动切换 */
    disabled?: boolean | Fn
    on?: Obj<Fn>
    // dynamicAttrs?: Fn<Obj>
    // renderView?: Fn<VNode>
    // customRender?: Fn
    // row?: boolean
    colProps?: ColProps
    /** 快捷实现col span */
    span?: number
    slots?: Obj<Fn>
  }
  interface ExTableOption extends ExBaseOption {
    field: string
    title?: string | Fn<VNode>
    editMode?: 'inline' | 'modal'
    addMode?: 'inline' | 'modal'
    columns: UniInputOption[]
    buttons?: ExButtonGroup
    /** 列表元素右边按钮 */
    itemButtons?: ExButtonGroup<'del' | 'edit'>
    /** 弹窗属性 */
    modalProps?: ModalFuncProps
    /** 弹窗表单属性 */
    formProps?: FormProps
    /** 弹窗表单中的行间排版属性 */
    rowProps?: RowProps
    /** 表单元素的统一排列属性， */
    wrapperCol?: ColProps
    searchSechma?: FormOption | { subItems: (UniOption | string)[] }
  }
  interface ExListOption extends ExBaseOption {
    field: string
    buttons?: ExButtonGroup<'add' | 'refresh'>
    columns: UniInputOption[]
    /** 列表元素右边按钮 */
    itemButtons?: ExButtonGroup<'del' | 'edit'>
  }
  interface ExGroupOption extends ExBaseOption {
    title?: string | Fn<VNode>
    gutter?: number
    buttons?: ExButtonGroup
    subItems: UniOption[]
    /** 弹窗表单中的行间排版属性 */
    rowProps?: RowProps
    /** 子元素的统一排列属性， */
    wrapperCol?: ColProps
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
    formAttrs?: FormProps
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
    attrs?: InputProps
  }
  type SelectOptions = DefaultOptionType[]

  interface ExSelectOption extends ExFormItemOption {
    labelField?: string
    options?: SelectOptions | Ref<SelectOptions> | Fn<SelectOptions | Promise<SelectOptions>>
    attrs?: SelectProps
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

  type OptionType = {
    Text: ExBaseOption
    Group: ExGroupOption
    InputGroup: ExInputGroupOption
    Card: ExGroupOption
    List: ExListOption
    Tabs: ExTabsOption
    Table: ExTableOption
    Collapse: ExCollapseOption
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
    Buttons: ExBaseOption & ExButtonGroup
    // [key: string]: ExFormOption
    // Password: d
  }

  type UniOption = (
    | { [K in keyof OptionType]: { type: K } & OptionType[K] }
    | {
        [k: string]: ExFormItemOption
      }
  )[keyof OptionType]
  type UniInputOption = Extract<UniOption, ExFormItemOption | ExGroupOption>
  type MixOption = {
    [K in keyof OptionType]: (k: Partial<OptionType[K]> & { type: string }) => void
  }[keyof OptionType] extends (k: infer U) => void
    ? U // & { type: keyof OptionType}
    : never
}
export {}
