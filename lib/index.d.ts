/// <reference types="../types" />

import { App } from 'vue';
import { AutoCompleteProps } from 'antdv-next';
import { ButtonProps } from 'antdv-next';
import { CheckboxGroupProps } from 'antdv-next';
import { ColProps } from 'antdv-next';
import { Component } from 'vue';
import { ComponentOptionsMixin } from 'vue';
import { ComponentProvideOptions } from 'vue';
import { ComputedRef } from 'vue';
import { DatePickerProps } from 'antdv-next';
import { default as default_2 } from 'vue';
import { DefineComponent } from 'vue';
import { DescriptionsProps } from 'antdv-next';
import { DropdownProps } from 'antdv-next';
import { ExtractPropTypes } from 'vue';
import { FormItemProps } from 'antdv-next';
import { FormProps } from 'antdv-next';
import { HTMLAttributes } from 'vue';
import { InputNumberProps } from 'antdv-next';
import { InputProps } from 'antdv-next';
import { Locale } from 'antdv-next/dist/locale/index';
import { ModalFuncProps } from 'antdv-next/dist/modal/interface';
import { ModalProps } from 'antdv-next/dist/modal/interface';
import { PaginationProps } from 'antdv-next';
import { PropType } from 'vue';
import { PublicProps } from 'vue';
import { RadioGroupProps } from 'antdv-next';
import { RangePickerProps } from 'antdv-next';
import { Ref as Ref_2 } from 'vue';
import { RendererElement } from 'vue';
import { RendererNode } from 'vue';
import { RowProps } from 'antdv-next';
import { SelectProps } from 'antdv-next';
import { Slots } from 'vue';
import { SpaceProps } from 'antdv-next';
import { SwitchProps } from 'antdv-next';
import { TableColumnType } from 'antdv-next';
import { TableProps } from 'antdv-next';
import { TabsProps } from 'antdv-next';
import { TextAreaProps } from 'antdv-next';
import { TimePickerProps } from 'antdv-next';
import { TimeRangePickerProps } from 'antdv-next';
import { TooltipProps } from 'antdv-next';
import { TreeSelectProps } from 'antdv-next';
import { UploadProps } from 'antdv-next';
import { VNode } from 'vue';
import { VNodeArrayChildren } from 'vue';
import { VNodeChild } from 'vue';
import { VNodeTypes } from 'vue';

export declare interface ActionAdapter {
    /** 渲染按钮组或提示；具体按钮、菜单和下拉结构由 Adapter 内部处理。 */
    render: (type: ActionRenderType, props: Obj, slots: Obj) => VNodeChild;
}

export declare type ActionRenderType = 'group' | 'tooltip';

export declare type AdapterComponent = string | Component;

/** 内置 AntDV Adapter 实现；调用方仍需在安装时显式传入。 */
export declare const antdvAdapter: UIAdapter;

/**
 * 可覆盖的底层组件注册表。字段组件统一读取此对象，安装配置中的 components
 * 也只修改此处，避免再维护独立的 components/base 层。
 */
declare type BaseComponentName = string;

export declare interface ButtonItem {
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
    dropdownProps?: DropdownProps
    tooltip?: string
    /** 按钮禁用时的提示 */
    disabledTooltip?: string | Fn<string>
    icon?: string | Component
    attrs?: ButtonProps & HTMLAttributes
    hidden?: boolean | Fn<boolean>
    disabled?: boolean | Fn<boolean>
    /** 传递到内置方法时的所需参数 */
    meta?: Obj
    onClick?: Fn
}

export declare function clearUIFormValidation(instance: unknown): void;

declare interface CollapseItem extends Omit<ExtGroupBaseOption, 'type'> {
    label: VSlot
    key?: string
    icon?: string | Component
    subItems: UniOption[]
    buttons?: ExtButtons
}

export declare interface ComponentModelConfig {
    /** 组件接收主值的属性名，默认 value */
    prop?: string;
    /** 组件更新主值时触发的事件名，默认 update:value */
    event?: string;
}

declare function configureComponents(components: Record<string, FormComponent | undefined>): void;

export declare interface ContainerAdapter {
    component: AdapterComponent;
    /** 容器存在受控状态时的 UI model 协议。 */
    model?: ComponentModelConfig;
    /** 将 Core 容器状态转换为 UI 组件属性。 */
    transformProps?: (props: Obj) => Obj;
    /** 容器的 slot 协议不同时自定义最终渲染。 */
    render?: (component: Component, props: Obj, slots: Obj) => VNodeChild;
}

export declare function createModal(content?: (() => VNodeTypes) | VNode, { buttons, ...__config }?: Obj): {
    modalRef: Ref_2<any, any>;
    modalSlot: (props: any, ctx: any) => VNode< RendererNode, RendererElement, {
        [key: string]: any;
    }>;
    setModal: (option?: ModalFuncProps | Obj) => void;
    closeModal: () => Promise<void>;
    openModal: (option?: ModalFuncProps | Obj) => Promise<void>;
};

/**
 * 自定义 UI 字段的 attrs 类型映射。应用可通过模块扩展增加 type 与组件 Props 的对应关系。
 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export declare interface CustomFormComponentProps {}

declare type CustomWidgetTypes = {
    [K in keyof CustomFormComponentProps]: ExtFormItemOption & {
        attrs?: CustomFormComponentProps[K] & HTMLAttributes
    }
}

declare const _default: {
    install: (app: App<any>, config: InstallConfig) => Promise<void>;
    registerComponent: typeof registerComponent;
    registComponent: typeof registComponent;
    setDefaultProps: typeof setDefaultProps;
};
export default _default;

declare type DefaultOptionsType = (string | number)[] | DefaultOptionType[] | { [k: string | number]: any }

export declare interface DefaultOptionType {
    label?: any
    value?: string | number | boolean | null
    children?: Omit<DefaultOptionType, 'children'>[]
    disabled?: boolean
    [name: string]: any
}

export declare function defineDetail(option: ExtDescriptionsOption): ExtDescriptionsOption;

export declare function defineForm<T extends keyof OptionType = 'Form'>(option: OptionType[T]): OptionType[T];

export declare function defineTable(option: RootTableOption): RootTableOption;

export declare function defineUIAdapter<T extends UIAdapter>(adapter: T): T;

declare type DetailOption = ExtDescriptionsOption | ExtFormOption | (() => ExtDescriptionsOption | ExtFormOption) | (() => Promise<ExtDescriptionsOption | ExtFormOption>);

export declare function diagnoseSchema(schema: Obj, kind?: SchemaKind): SchemaDiagnostic[];

declare type Dict = {
    label: string;
    value: string | number;
    [k: string]: string | number;
};

declare type EffectData =
| (Obj & {
    /**整个表单数据 */
    formData: default_2.DeepReadonly<Obj>
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

declare interface ExtAutoCompleteOption extends ExtFormItemOption {
    options?: SelectOptions
    dictName?: string
    attrs?: AutoCompleteProps & HTMLAttributes
}

export declare interface ExtBaseOption {
    type: string
    field?: string
    vModelFields?: Obj<string | Obj>
    initialValue?: any
    label?: VSlot
    labelSlot?: Fn<VNodeTypes>
    tooltip?: VSlot | (TooltipProps & { title: VSlot; icon?: VSlot })
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
    colProps?: ColProps & HTMLAttributes
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

export declare interface ExtButtonGroup<T extends string = string> {
    attrs?: SpaceProps & HTMLAttributes
    limit?: number
    buttonType?: 'primary' | 'link' | 'text' | 'dashed' | 'default'
    buttonShape?: 'circle' | 'round' | 'default'
    size?: 'large' | 'middle' | 'small'
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

export declare type ExtButtons<T extends string = string> = ExtButtonGroup<T> | NonNullable<ExtButtonGroup<T>['actions']>

declare interface ExtCheckboxGroupOption extends ExtFormItemOption, ExtSelect {
    attrs?: CheckboxGroupProps & HTMLAttributes
}

export declare interface ExtCollapseOption extends ExtBaseOption {
    title?: VSlot
    activeKey?: string | Ref_2<string>
    subItems: CollapseItem[]
}

export declare type ExtColumnsItem = (UniOption | Partial<ExtFormItemOption>) & {
    /**
     *  应用于表格或编辑表单
     *  @deprecated 该属性已废弃，使用exclude替代
     * */
    hideInTable?: boolean
    /** 表格内容渲染 */
    viewRender?: VSlot
    columnProps?: TableColumnType
}

declare interface ExtDatePickerOption extends ExtFormItemOption {
    attrs?: DatePickerProps & HTMLAttributes
}

declare interface ExtDateRangePicker extends ExtFormItemOption {
    attrs?: RangePickerProps & HTMLAttributes
    /** 绑定结束日期字段 */
    endField?: string
    /** @deprecated 使用 `endField` */
    keepField?: string
    /** 未配置 `endField` 时，将日期范围转换为逗号分隔字符串后写回字段 */
    stringifyValue?: boolean
}

export declare interface ExtDescriptionsOption extends Omit<ExtBaseOption, 'type'>, ExtRow {
    title?: VSlot
    dataSource?: Obj
    buttons?: ExtButtons
    mode?: 'table' | 'form' | 'default'
    attrs?: ExtDescriptionsProps
    isContainer?: boolean
    subItems: (UniOption | Omit<ExtFormItemOption, 'type'>)[]
}

declare type ExtDescriptionsProps = {
    mode?: 'table' | 'form' | 'default'
    /** 输入框列属性，置为空对象将清空继承属性 */
    wrapperCol?: ColProps & HTMLAttributes
    /** 标题列属性，置为空对象将清空继承属性 */
    labelCol?: ColProps & HTMLAttributes
    labelAlign?: 'left' | 'center' | 'right'
    /**分组数据表格模式展示时，设为fixed,让列宽一致 */
    tableLayout?: 'fixed' | 'auto'
    /**@deprecated */
    labelBgColor?: string
    /**@deprecated */
    borderColor?: string
    /**mode为form模式时，该元素不用input风格包裹 */
    noInput?: boolean
    span?: number
} & DescriptionsProps &
ExtRow &
HTMLAttributes

/** 表单元素属性 */
export declare interface ExtFormItemOption extends ExtBaseOption {
    /** 指定ref对象时，同步变化 */
    value?: any
    /** 指定查看时显示的字段 */
    labelField?: string
    /**标签化显示，当有options时自动开启 */
    tagViewer?:
    | boolean
    | Obj<string>
    | string[]
    | { label?: string; value: any; color: string; icon?: Fn }[]
    | Fn<string | { label: string; color?: string; icon?: Fn }>
    formItemProps?: FormItemProps
    descriptionsProps?: ExtDescriptionsProps
    /**是否可编辑 */
    editable?: boolean | Fn<boolean>
}

export declare interface ExtFormOption extends Omit<ExtGroupBaseOption, 'type'> {
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

export declare interface ExtGroupBaseOption extends ExtBaseOption, ExtRow {
    title?: VSlot
    buttons?: ExtButtons
    subItems?: (UniOption | Omit<ExtFormItemOption, 'type'>)[]
    descriptionsProps?: ExtDescriptionsProps
}

export declare interface ExtGroupOption extends ExtGroupBaseOption {
    component?: Component
    /** 忽略表格表头分组 */
    ignoreTableTitle?: boolean
    contentAttrs?: HTMLAttributes
}

declare type ExtInfoSlotOption = (ExtBaseOption & ExtSlotOption) | ExtFormItemOption

export declare interface ExtInputGroupOption extends ExtBaseOption, ExtRow {
    subItems: UniOption[]
}

declare interface ExtInputList extends ExtFormItemOption, ExtRow {
    title?: VSlot
    compact?: boolean
    attrs?: {
        /** 标签后加序号 */
        labelIndex?: boolean
    }
    rowButtons?: false | ExtButtons<'delete' | 'add'>
    columns: UniWidgetOption[]
}

declare interface ExtInputNumberOption extends ExtFormItemOption {
    attrs?: InputNumberProps & HTMLAttributes
}

export declare interface ExtInputOption extends ExtFormItemOption {
    // enterButton?: (effectData: Obj) => Component
    onSearch?: (effectData: Obj, value: string) => void
    attrs?: InputProps & { enterButton?: any } & HTMLAttributes
}

declare type ExtInputSlotOption = ExtFormItemOption & ExtSlotOption

export declare interface ExtListGroupOption extends Omit<ExtGroupOption, 'subItems'> {
    field: string
    attrs?: {
        /** 标签后加序号 */
        labelIndex?: boolean
        rowKey?: string
    }
    rowButtons?: false | ExtButtons<'delete' | 'add'>
    columns: UniWidgetOption[]
}

export declare interface ExtListOption extends ExtBaseOption, ExtRow {
    field: string
    title?: VSlot
    attrs?: HTMLAttributes & {
        rowKey?: string
        itemClass?: HTMLAttributes['class']
        itemStyle?: HTMLAttributes['style']
    }
    buttons?: ExtButtons<'add' | 'refresh'>
    columns: UniWidgetOption[]
    /** 列表元素右边按钮 */
    rowButtons?: ExtButtons<'delete' | 'edit'>
    descriptionsProps?: ExtDescriptionsProps
}

declare type ExtModalProps = (ModalFuncProps & ModalProps) | (ModalFuncProps & {
    buttons?: ExtButtons;
    [k: string]: any;
});

declare interface ExtRadioGroupOption extends ExtFormItemOption, ExtSelect {
    attrs?: RadioGroupProps & HTMLAttributes
}

declare interface ExtRow {
    /** 行间排版属性 */
    rowProps?: RowProps & HTMLAttributes
    subSpan?: number | 'auto'
    gutter?: number
}

declare interface ExtSelect {
    options?: SelectOptions
    /** 字典名称 */
    dictName?: string
    /** 选项中的value转成number类型 */
    valueToNumber?: boolean
    /** 使用选项 label 作为字段值 */
    labelAsValue?: boolean
    /**
     * 选项中的 value 使用 label
     * @deprecated 使用 `labelAsValue`
     */
    valueToLabel?: boolean
    /** 将多选结果转换为逗号分隔字符串后写回字段 */
    stringifyValue?: boolean
    /**
     * 多选时保存为逗号分隔字符串
     * @deprecated 使用 `stringifyValue`
     */
    valueToString?: boolean
}

declare interface ExtSelectOption extends ExtFormItemOption, ExtSelect {
    attrs?: SelectProps & HTMLAttributes
}

declare type ExtSlotOption = { render: VSlot }

declare interface ExtSwitchOption extends ExtFormItemOption, ExtSelect {
    valueLabels?: [string, string]
    attrs?: {
        /** 第一个选项为选中值 */
        firstIsChecked?: boolean
        /** 默认是否选中 */
        defaultChecked?: boolean
    } & SwitchProps &
    HTMLAttributes
}

export declare interface ExtTabItem extends Omit<ExtGroupBaseOption, 'type'> {
    label: VSlot
    key?: string
    icon?: string | Component
    subItems: UniOption[]
}

export declare interface ExtTableOption extends ExtBaseOption {
    field: string
    title?: VSlot
    attrs?: Obj &
    TableProps & {
        /**数据初始化后默认展开的行 */
        defaultExpandLevel?: number | 'all'
        rowSelection?: false | TableProps['rowSelection']
    }
    /** @deprecated 更名为editable */
    edit?: boolean
    /** 表格全部为编辑状态，开启后rowEdit无效 */
    editable?: boolean | Fn<boolean>
    rowEditor?: {
        editMode?: 'inline' | 'modal'
        addMode?: 'inline' | 'modal'
        form?: Omit<ExtFormOption, 'subItems'> & { 'subItems'?: UniOption[] }
        modalProps?: ModalFuncProps | Obj
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
    columnProps?: TableColumnType
    /**序号列*/
    indexColumn?: boolean | TableColumnType
    buttons?: ExtButtons<'add' | 'delete' | 'edit' | 'detail'> | false
    /** 列表元素右边按钮 */
    rowButtons?: false | (ExtButtons<'delete' | 'edit' | 'detail' | 'add'> & { columnProps?: TableColumnType })
    /** 弹窗属性 */
    modalProps?: ModalFuncProps | Obj
    descriptionsProps?: ExtDescriptionsProps & { modalProps?: ModalFuncProps | Obj }
    /** @deprecated  弹窗表单配置,移至rowEditor */
    editForm?: Omit<ExtFormOption, 'subItems'> & { 'subItems'?: UniOption[]; modalProps?: ModalFuncProps | Obj }
}

export declare interface ExtTabsOption extends ExtBaseOption {
    activeKey?: Ref_2<string | undefined>
    forceRender?: boolean
    buttons?: ExtButtons<'add' | 'refresh'>
    subItems: ExtTabItem[]
}

declare interface ExtTagInputOption extends ExtFormItemOption {
    attrs?: {
        /** 将标签数组转换为逗号分隔字符串后写回字段 */
        stringifyValue?: boolean
        /**新增标签名 */
        newLabel?: VSlot
        /** 是否可删除, 默认为true */
        closable?: boolean | ((tag: string, index: number) => boolean)
    }
}

declare interface ExtTagSelectOption extends ExtFormItemOption, ExtSelect {
    attrs?: {
        multiple?: boolean
        /** 将多选结果转换为逗号分隔字符串后写回字段 */
        stringifyValue?: boolean
    }
}

declare interface ExtTextAreaOption extends ExtFormItemOption {
    attrs?: TextAreaProps & HTMLAttributes
}

declare interface ExtTimePickerOption extends ExtFormItemOption {
    attrs?: TimePickerProps & HTMLAttributes
}

declare interface ExtTimeRangePicker extends Omit<ExtDateRangePicker, 'attrs'> {
    attrs?: TimeRangePickerProps & HTMLAttributes
}

export declare interface ExtTreeOption extends ExtFormItemOption {
    labelField?: string
    attrs?: TreeSelectProps & HTMLAttributes
    /**
     * @deprecated 使用`treeData`
     */
    data?: TreeSelectProps['treeData'] | Fn<Promise<TreeSelectProps['treeData']>>
    treeData?: TreeSelectProps['treeData'] | Fn<Promise<TreeSelectProps['treeData']>> | Fn<TreeSelectProps['treeData']>
}

declare interface ExtUpload extends ExtFormItemOption {
    vModelFields?: {
        fileList?: string | Obj
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
        /** 达到最大文件数量时，隐藏上传主体 */
        hideOnMax?: boolean
        /** 上传模式，默认auto,选择文件后自动上传，submit:提交时上传，custom通过绑定fileList中的文件对象手动上传 */
        uploadMode?: 'auto' | 'submit' | 'custom' | 'base64' | 'text'
        tip?: string
        /** 上传按钮标题 */
        title?: VSlot
        /** 是否允许重名文件 */
        repeatable?: boolean
        /** 查看模式 */
        isView?: boolean
    }
}

export declare interface FieldAdapter {
    /** 实际组件或 adapter.components 中的组件名称 */
    component: AdapterComponent;
    /** 当前 UI 框架使用的受控值协议 */
    model?: ComponentModelConfig;
    /** 该字段在当前 UI 框架下的默认属性 */
    defaultProps?: Obj;
    /** 需要依次应用的 Core 字段处理器 */
    processors?: string[];
    /** 将核心字段状态转换为当前 UI 组件属性 */
    transformProps?: (props: Obj, context: FieldAdapterContext) => Obj;
    /** 当前 UI 框架需要特殊组件或 slot 协议时自定义最终渲染 */
    render?: (component: Component, props: Obj, context: FieldAdapterContext, slots: Slots) => VNodeChild;
}

export declare interface FieldAdapterContext {
    type: string;
    option: Obj;
    effectData: Obj;
}

export declare interface FormAdapter {
    /** 表单容器组件 */
    component: AdapterComponent;
    /** 表单项组件 */
    item: AdapterComponent;
    /** 将 Core 表单状态转换为 UI 组件属性 */
    transformProps?: (props: Obj) => Obj;
    /** 将 Core 表单项状态转换为 UI 组件属性 */
    transformItemProps?: (props: Obj) => Obj;
    /** 执行当前 UI 表单实例的校验。 */
    validate: (instance: any) => Promise<unknown>;
    /** 清理当前 UI 表单实例的校验状态。 */
    clearValidate: (instance: any) => void;
}

export declare type FormComponent = Component | FormComponentConfig;

export declare interface FormComponentConfig {
    component: Component;
    /** 不同 UI 库的受控值协议 */
    model?: ComponentModelConfig;
}

export declare type FormComponentProps<T> = T extends new (...args: any[]) => {
    $props: infer P;
} ? P : T extends (props: infer P, ...args: any[]) => any ? P : Obj;

export declare function getUIAdapter(): UIAdapter;

export declare function getUIContainerAdapter(type: string): ContainerAdapter | undefined;

export declare function getUIFieldAdapter(type: string): FieldAdapter | undefined;

declare interface GlobalConfig {
    /** 是否在组件接收 schema 时输出诊断信息 */
    schemaDiagnostics?: boolean;
    dictApi?: (name: string) => Promise<Dict[]>;
    /** 自定义图标处理组件 */
    customIcon?: (name: string) => VNode;
    /** 动态传递按钮权限 */
    buttonRoles?: () => string[];
    /** 内置默认按钮配置 */
    defaultButtons?: Obj<ButtonItem>;
    /** tag 显示时默认颜色组 */
    tagViewer?: Obj<string> | string[] | false | Fn<string>;
    /** 接口返回数据结构处理 */
    tableApiSetting?: {
        /** 当前页请求参数名 */
        currentField?: string;
        /** 当前每页数量请求参数名 */
        sizeField?: string;
        /** 返回结果格式转换，无分页时直接返回数组 */
        resultTransform?: (result: any) => any[] | {
            current: number;
            size: number;
            total: number;
            records: any[];
        };
    };
}

export declare interface IconAdapter {
    /** Core 内置交互使用的语义图标。 */
    semantic?: Record<string, AdapterComponent | undefined>;
    /** 渲染 Schema 传入的字符串、组件或节点。 */
    render: (icon: unknown, context: IconAdapterContext) => VNodeChild;
}

export declare interface IconAdapterContext {
    /** 消费项目对字符串图标的自定义解析入口。 */
    customIcon?: (name: string) => VNodeChild;
}

export declare interface InstallConfig extends GlobalConfig {
    locale?: Locale;
    /** 当前应用使用的 UI 框架适配器；初始化时必须显式传入，之后不可切换。 */
    adapter: UIAdapter;
    /** UI 组件注册表；非内置名称可直接作为 schema type。 */
    components?: Partial<Record<BaseComponentName, FormComponent>> & Record<string, FormComponent | undefined>;
    /** 组件默认参数 */
    defaultProps?: Obj;
}

export declare interface LayoutAdapter {
    row: AdapterComponent;
    col: AdapterComponent;
    space: AdapterComponent;
    /** 可选的紧凑空间容器；未提供时回退到普通 space。 */
    compactSpace?: AdapterComponent;
    /** 栅格和空间属性的 UI 协议转换。 */
    transformProps?: Partial<Record<LayoutComponentName, (props: Obj) => Obj>>;
}

export declare type LayoutComponentName = 'row' | 'col' | 'space' | 'compactSpace';

export declare function mapUIContainerProps(type: string, props: Obj): {
    [x: string]: any;
};

export declare function mapUIFieldProps(type: string, props: Obj, context: Omit<FieldAdapterContext, 'type'>): Obj;

export declare type OptionType = WrapperTypes & WidgetTypes & CustomWidgetTypes

export declare interface PresentationAdapter {
    /** 渲染轻量展示原语。 */
    render: (type: PresentationRenderType, props: Obj, slots: Obj) => VNodeChild;
}

export declare type PresentationRenderType = 'tag' | 'checkableTag';

/** @deprecated 使用 `registerComponent` */
declare function registComponent(name: string, component: ((param: RegisterParam) => VNode) | Component): void;

declare function registerComponent(name: string, component: ((param: RegisterParam) => VNode) | Component): void;

export declare const registerFormComponents: typeof configureComponents;

declare type RegisterMethod = {
    (): () => VNode;
    (actions?: Obj, _tableRef?: Obj): void;
};

/** 绑定到组件上的动态属性 */
declare interface RegisterParam {
    option: Obj;
    effectData: Obj;
    /** 当前值 */
    value?: any;
    [K: string]: any;
}

export declare function renderUIAction(type: ActionRenderType, props?: Obj, slots?: Obj): VNodeChild;

export declare function renderUIContainer(type: string, props?: Obj, slots?: Obj): string | number | boolean | void | VNode<RendererNode, RendererElement, {
    [key: string]: any;
}> | VNodeArrayChildren | null;

export declare function renderUIField(type: string, props: Obj, context: Omit<FieldAdapterContext, 'type'>, slots?: Slots): string | number | boolean | void | VNode<RendererNode, RendererElement, {
    [key: string]: any;
}> | VNodeArrayChildren | null;

export declare function renderUIForm(props: Obj, slots?: Obj): VNode<RendererNode, RendererElement, {
    [key: string]: any;
}>;

export declare function renderUIFormItem(props: Obj, slots?: Obj): VNode<RendererNode, RendererElement, {
    [key: string]: any;
}>;

export declare function renderUIIcon(icon: unknown, context?: IconAdapterContext): VNodeChild;

export declare function renderUILayout(type: LayoutComponentName, props?: Obj, slots?: Obj): VNode<RendererNode, RendererElement, {
    [key: string]: any;
}>;

export declare function renderUIPresentation(type: PresentationRenderType, props?: Obj, slots?: Obj): VNodeChild;

export declare function renderUISemanticIcon(name: string): VNode<RendererNode, RendererElement, {
    [key: string]: any;
}> | undefined;

export declare function resolveUIComponent(type: string): Component | undefined;

export declare function resolveUILayoutComponent(type: LayoutComponentName): Component;

export declare interface RootTableOption extends Omit<ExtTableOption, 'type' | 'field'>, TableScanHight {
    isContainer?: boolean
    apis?: TableApis
    dataSource?: Obj[] | Ref_2<any[]>
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
    pagination?: PaginationProps | false
    attrs?: ExtTableOption['attrs'] | (TableProps & TableScanHight) | Obj
}

declare interface RuleConfig {
    /** 验证类型 */
    type?: 'string' | keyof typeof ruleTypeMap;
    /** 触发方式 */
    trigger?: 'blur' | 'change';
    /** 是否必填 */
    required?: boolean;
    pattern?: RegExp;
    /** 长度 */
    len?: number;
    /** 最大长度/最大值 */
    max?: number;
    /** 最小长度/最小值 */
    min?: number;
    /** 自定义验证器, 返回true验证通过，返回Error,提示Error中消息 */
    validator?: (effectData: Obj, value: any) => boolean | Error | Promise<any>;
    /** 提示消息 */
    message?: string;
}

declare const ruleTypeMap: {
    email: {
        type: string;
        message: string;
    };
    integer: {
        type: string;
        message: string;
        pattern: RegExp;
        transform: (value: any) => number;
    };
    number: {
        type: string;
        message: string;
        transform: (value: any) => number;
    };
    idcard: {
        pattern: RegExp;
        message: string;
    };
    phone: {
        pattern: RegExp;
        message: string;
    };
    mobile: {
        pattern: RegExp;
        message: string;
    };
    twoDecimal: {
        pattern: RegExp;
        message: string;
    };
    word: {
        pattern: RegExp;
        message: string;
    };
};

export declare type SchemaDiagnostic = {
    level: SchemaDiagnosticLevel;
    code: string;
    path: string;
    message: string;
};

export declare type SchemaDiagnosticLevel = 'error' | 'warning' | 'suggestion';

export declare type SchemaKind = 'auto' | 'form' | 'table' | 'detail';

declare type SelectOptions =
| DefaultOptionsType
| Readonly<DefaultOptionsType>
| Ref_2<DefaultOptionsType>
| Fn<DefaultOptionsType | Promise<DefaultOptionsType>>

declare function setDefaultProps(props: Obj): void;

export declare const SuperButtons: DefineComponent<ExtractPropTypes<{
    limit: NumberConstructor;
    buttonType: PropType<"link" | "default" | "primary" | "text" | "dashed">;
    buttonShape: PropType<"default" | "circle" | "round">;
    size: PropType<"small" | "middle" | "large">;
    /** 按钮显示方式icon/label */
    labelMode: PropType<"label" | "icon" | "both">;
    hidden: PropType<boolean | Fn<boolean>>;
    /** 无权限时的展示方式，默认隐藏 */
    unauthorized: PropType<"hide" | "disable">;
    /** @deprecated 使用 `unauthorized: 'disable'` */
    invalidDisabled: BooleanConstructor;
    disabled: PropType<boolean | Fn<boolean>>;
    actions: PropType<ButtonItem[]>;
    effectData: ObjectConstructor;
}>, () => VNode<RendererNode, RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly< ExtractPropTypes<{
    limit: NumberConstructor;
    buttonType: PropType<"link" | "default" | "primary" | "text" | "dashed">;
    buttonShape: PropType<"default" | "circle" | "round">;
    size: PropType<"small" | "middle" | "large">;
    /** 按钮显示方式icon/label */
    labelMode: PropType<"label" | "icon" | "both">;
    hidden: PropType<boolean | Fn<boolean>>;
    /** 无权限时的展示方式，默认隐藏 */
    unauthorized: PropType<"hide" | "disable">;
    /** @deprecated 使用 `unauthorized: 'disable'` */
    invalidDisabled: BooleanConstructor;
    disabled: PropType<boolean | Fn<boolean>>;
    actions: PropType<ButtonItem[]>;
    effectData: ObjectConstructor;
}>> & Readonly<{}>, {
    invalidDisabled: boolean;
}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>;

export declare const SuperDetail: DefineComponent<ExtractPropTypes<{
    dataSource: ObjectConstructor;
    schema: PropType<ExtDescriptionsOption>;
}>, () => any, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, "register"[], "register", PublicProps, Readonly< ExtractPropTypes<{
    dataSource: ObjectConstructor;
    schema: PropType<ExtDescriptionsOption>;
}>> & Readonly<{
    onRegister?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>;

export declare const SuperForm: DefineComponent<ExtractPropTypes<{
    schema: PropType<ExtFormOption>;
    model: PropType<Obj<any>>;
    dataSource: PropType<Obj<any>>;
    isContainer: BooleanConstructor;
    compact: {
        type: BooleanConstructor;
        default: undefined;
    };
    ignoreRules: {
        type: BooleanConstructor;
        default: undefined;
    };
}>, () => any, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, "register"[], "register", PublicProps, Readonly< ExtractPropTypes<{
    schema: PropType<ExtFormOption>;
    model: PropType<Obj<any>>;
    dataSource: PropType<Obj<any>>;
    isContainer: BooleanConstructor;
    compact: {
        type: BooleanConstructor;
        default: undefined;
    };
    ignoreRules: {
        type: BooleanConstructor;
        default: undefined;
    };
}>> & Readonly<{
    onRegister?: ((...args: any[]) => any) | undefined;
}>, {
    isContainer: boolean;
    compact: boolean;
    ignoreRules: boolean;
}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>;

export declare const SuperTable: DefineComponent<ExtractPropTypes<{
    dataSource: PropType<Obj<any>[]>;
    schema: PropType<RootTableOption>;
}>, () => any, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, ("load" | "register" | "update:dataSource")[], "load" | "register" | "update:dataSource", PublicProps, Readonly< ExtractPropTypes<{
    dataSource: PropType<Obj<any>[]>;
    schema: PropType<RootTableOption>;
}>> & Readonly<{
    onLoad?: ((...args: any[]) => any) | undefined;
    onRegister?: ((...args: any[]) => any) | undefined;
    "onUpdate:dataSource"?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>;

export declare type TableApis = {
    query?: Fn<Promise<any>>
    info?: Fn<Promise<Obj>>
    save?: Fn<Promise<any>>
    update?: Fn<Promise<any>>
    delete?: Fn<Promise<any>>
    export?: Fn<Promise<any>>
}

declare interface TableScanHight {
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

declare interface TabsHeader extends Omit<TabsProps, 'activeKey'> {
    field?: string
    initialValue?: any
    bordered?: boolean
    options?: SelectOptions
    /** 字典名称 */
    dictName?: string
    /** 使用选项 label 作为字段值 */
    labelAsValue?: boolean
    /**
     * 选项中的 value 使用 label
     * @deprecated 使用 `labelAsValue`
     */
    valueToLabel?: boolean
    activeKey?: Ref_2<string | number | undefined>
    slots?: Obj<VSlot>
    /** 设置tab标签 */
    customTab?: Fn
}

export declare interface UIAdapter {
    /** 用于诊断和调试的适配器名称 */
    name: string;
    /** 当前 UI 框架提供的基础组件 */
    components: Record<string, Component>;
    /** SuperForm 增强字段到 UI 组件协议的映射 */
    fields?: Record<string, FieldAdapter | undefined>;
    /** 表单容器、表单项及实例协议。 */
    form?: FormAdapter;
    /** 栅格和空间容器协议。 */
    layout?: LayoutAdapter;
    /** Card、Tabs、Collapse、List 等容器渲染协议。 */
    containers?: Record<string, ContainerAdapter | undefined>;
    /** 语义图标和用户图标的渲染协议。 */
    icons?: IconAdapter;
    /** 按钮组使用的按钮、菜单、下拉和提示原语。 */
    actions?: ActionAdapter;
    /** 详情展示和 Core 复合字段使用的轻量展示原语。 */
    presentation?: PresentationAdapter;
    /** 当前 UI 框架的全局组件默认属性 */
    defaults?: Obj<Obj>;
}

export declare type UniOption = UniWrapperOption | UniWidgetOption

export declare type UniWidgetOption =
| { [K in keyof WidgetTypes]: { type: K } & WidgetTypes[K] }[keyof WidgetTypes]
| {
    [K in keyof CustomWidgetTypes]: { type: K } & CustomWidgetTypes[K]
}[keyof CustomWidgetTypes]
| (ExtFormItemOption & { type: `Ext${Capitalize<string>}${string}` })

export declare type UniWrapperOption = { [K in keyof WrapperTypes]: { type: K } & WrapperTypes[K] }[keyof WrapperTypes]

export declare function useButtons(option: ExtButtonGroup): (() => VNode<RendererNode, RendererElement, {
    [key: string]: any;
}>)[];

export declare function useDetail(option: DetailOption, data?: Obj): readonly [(actions?: Obj) => any, {
    readonly setData: (data: any) => void;
}];

export declare function useForm(option: UseFormOption): readonly [(actions?: Obj, ref?: Obj) => any, {
    readonly dataSource: ComputedRef<any>;
    readonly getForm: () => Promise<any>;
    readonly asyncCall: (key?: string, param?: any) => Promise<any>;
    readonly getData: () => any;
    readonly submit: () => Promise<any>;
    readonly resetFields: (rest?: Obj) => Promise<any>;
    readonly setFieldsValue: (data: Obj) => Promise<any>;
    /**
     * @deprecated 使用`resetFields`
     */
    readonly setData: (data: any) => void;
}];

declare type UseFormOption = ExtFormOption | (() => ExtFormOption) | (() => Promise<ExtFormOption>);

export declare function useModal(content?: () => VNodeTypes, config?: ExtModalProps): {
    modalRef: Ref_2<any, any>;
    openModal: (option?: ModalFuncProps | Obj) => Promise<void>;
    modalSlot: (props: any, ctx: any) => VNode< RendererNode, RendererElement, {
        [key: string]: any;
    }>;
    closeModal: () => Promise<void>;
    setModal: (option?: Obj<any> | ModalFuncProps | undefined) => void;
};

export declare function useModalForm(formOption: ExtFormOption, config?: ExtModalProps): {
    openModal: ({ data, onOk, ...__config }?: ModalFuncProps & {
        data?: Obj<any> | undefined;
    }) => Promise<void>;
    formActions: {
        readonly dataSource: ComputedRef<any>;
        readonly getForm: () => Promise<any>;
        readonly asyncCall: (key?: string | undefined, param?: any) => Promise<any>;
        readonly getData: () => any;
        readonly submit: () => Promise<any>;
        readonly resetFields: (rest?: Obj<any> | undefined) => Promise<any>;
        readonly setFieldsValue: (data: Obj<any>) => Promise<any>;
        readonly setData: (data: any) => void;
    };
    modalRef: Ref_2<any, any>;
    modalSlot: (props: any, ctx: any) => VNode< RendererNode, RendererElement, {
        [key: string]: any;
    }>;
    closeModal: () => Promise<void>;
    setModal: (option?: Obj<any> | ModalFuncProps | undefined) => void;
};

export declare const useTable: (option: UseTableOption, data?: any[] | Ref_2<any[]>) => readonly [RegisterMethod, {
    /** 异步获取表格引用 */
    readonly getTable: () => Promise<any>;
    readonly tableRef: Ref_2<any, any>;
    readonly redoHeight: () => void;
    readonly setData: (data: Obj[]) => void;
    /** 返回当前表格数据 */
    readonly getData: () => any;
    readonly dataSource: ComputedRef<any>;
    /** 跳转到指定页 */
    readonly goPage: (page: number) => void;
    /** 设置表格列 */
    readonly setColumns: (cols: RootTableOption['columns']) => void;
    /** 刷新数据，不改动查询条件与当前页 */
    readonly reload: () => any;
    /** 手动执行条件查询，不覆盖搜索表单参数 */
    readonly query: (param?: Obj) => Promise<any>;
    /** 查询完成，返回结果回调 */
    readonly onLoaded: (callback: (data: any) => void) => void;
    /** 重置查询表单，并重新查询 */
    readonly resetSearchForm: (param?: Obj) => void;
    readonly getQueryParams: () => any;
    readonly selectedRowKeys: ComputedRef<any>;
    readonly selectedRows: ComputedRef<any>;
    /** 设置选中行 */
    readonly setSelectedRows: (arr: any[]) => any;
    readonly expandedRowKeys: ComputedRef<any>;
    readonly setExpandedRowKeys: (arr: any[]) => any;
    readonly expandAll: () => void;
    /** 新增行 */
    readonly add: (param?: {
        /** 初始化数据 */
        resetData?: Obj<any> | undefined;
        /** 弹窗标题 */
        meta?: ModalFuncProps | undefined;
    } | undefined) => any;
    /** 修改行，须判断是否已有选中行 */
    readonly edit: (param?: {
        /** 弹窗标题 */
        title?: string | undefined;
        record?: Obj<any> | undefined;
        meta?: ModalFuncProps | undefined;
    } | undefined) => any;
    /** 删除行，须判断是否已有选中行 */
    readonly delete: () => any;
    /** 查看详情，须判断是否已有选中行 */
    readonly detail: (param?: {
        /** 弹窗标题 */
        title?: string | undefined;
        record?: Obj<any> | undefined;
        meta?: ModalFuncProps | undefined;
    } | undefined) => any;
    readonly asyncCall: (key?: string, param?: any) => Promise<any>;
    /** `editable`模式下进行表单校验 */
    readonly validate: () => Promise<any>;
}];

declare type UseTableOption = RootTableOption | (() => RootTableOption) | (() => Promise<RootTableOption>);

export declare function validateUIForm(instance: unknown): Promise<unknown>;

declare type VSlot = string | Fn

declare type WidgetTypes = {
    Buttons: ExtBaseOption & ExtButtonGroup
    Hidden: ExtFormItemOption
    InputSlot: ExtInputSlotOption
    InfoSlot: ExtInfoSlotOption
    Text: ExtFormItemOption
    HTML: ExtFormItemOption
    TextArea: ExtTextAreaOption
    Input: ExtInputOption
    AutoComplete: ExtAutoCompleteOption
    InputNumber: ExtInputNumberOption
    DatePicker: ExtDatePickerOption
    TimePicker: ExtTimePickerOption
    DateRangePicker: ExtDateRangePicker
    TimeRangePicker: ExtTimeRangePicker
    Select: ExtSelectOption
    TreeSelect: ExtTreeOption
    RadioGroup: ExtRadioGroupOption
    CheckboxGroup: ExtCheckboxGroupOption
    Switch: ExtSwitchOption
    Upload: ExtUpload
    InputGroup: ExtInputGroupOption
    InputList: ExtInputList
    TagInput: ExtTagInputOption
    TagSelect: ExtTagSelectOption
}

declare type WrapperTypes = {
    InfoSlot: ExtInfoSlotOption
    Form: ExtFormOption
    Group: ExtGroupOption
    Fragment: Pick<ExtGroupBaseOption, 'type' | 'field' | 'disabled' | 'exclude' | 'hidden' | 'subItems' | 'subSpan'>
    Card: ExtGroupBaseOption
    List: ExtListOption
    ListGroup: ExtListGroupOption
    Tabs: ExtTabsOption
    Table: ExtTableOption
    Collapse: ExtCollapseOption
    Descriptions: ExtDescriptionsOption | ExtGroupOption
}

export { }



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

