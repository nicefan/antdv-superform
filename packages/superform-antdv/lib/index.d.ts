/// <reference types="../types" />

import { ActionAdapter } from './types';
import { ActionRenderType } from './types';
import { AdapterComponent } from './types';
import { Component } from 'vue';
import { ComponentModelConfig } from './types';
import { ComponentOptionsMixin } from 'vue';
import { ComponentProvideOptions } from 'vue';
import { ComputedRef } from 'vue';
import { ContainerAdapter } from './types';
import { CSSProperties } from 'vue';
import { default as default_2 } from 'vue';
import { DefineComponent } from 'vue';
import { ExtractPropTypes } from 'vue';
import { FieldAdapter } from './types';
import { FieldAdapterContext } from './types';
import { FormAdapter } from './types';
import { HTMLAttributes } from 'vue';
import { IconAdapter } from './types';
import { IconAdapterContext } from './types';
import { LayoutAdapter } from './types';
import { LayoutComponentName } from './types';
import { ModalAdapter } from './types';
import { PresentationAdapter } from './types';
import { PresentationRenderType } from './types';
import { PreviewAdapter } from './types';
import { PropType } from 'vue';
import { PublicProps } from 'vue';
import { Ref as Ref_2 } from 'vue';
import { RendererElement } from 'vue';
import { RendererNode } from 'vue';
import { ServiceAdapter } from './types';
import { TableAdapter } from './types';
import { UIAdapter } from './types';
import { UIMessageType } from './types';
import { UIServiceHandle } from './types';
import { UITableColumn } from './types';
import { UITableFilterProps } from './types';
import { UITablePagination } from './types';
import { UITableRenderProps } from './types';
import { UITableSelection } from './types';
import { UITableSelectors } from './types';
import { UploadAdapter } from './types';
import { VNode } from 'vue';
import { VNodeChild } from 'vue';
import { VNodeTypes } from 'vue';

export { ActionAdapter }

export { ActionRenderType }

export { AdapterComponent }

export declare type AdapterDefaultProps = Record<string, Obj | undefined>;

declare type AdapterWidgetTypes = {
    [K in keyof UIFormComponentProps]: UIFormComponentOption<K>
}

/** 无字段组件的 Adapter 实例，供测试和第三方组合使用。 */
export declare const antdvAdapter: UIAdapter;

export declare interface AntdvAdapterOptions {
    /** 不使用自动导入插件时，显式提供实际使用的字段组件。 */
    components?: Partial<Record<AntdvFieldName, Component>>;
}

export declare const antdvCapabilities: Pick<UIAdapter, "form" | "table" | "components" | "layout" | "actions" | "modal" | "upload" | "containers" | "icons" | "presentation" | "services" | "preview">;

export declare const antdvDefaults: NonNullable<UIAdapter['defaults']>;

export declare type AntdvFieldName = "Input" | "TextArea" | "InputNumber" | "InputOTP" | "InputPassword" | "InputSearch" | "AutoComplete" | "Cascader" | "ColorPicker" | "Select" | "Radio" | "RadioGroup" | "Checkbox" | "CheckboxGroup" | "DatePicker" | "DateRangePicker" | "DateMonthPicker" | "DateQuarterPicker" | "DateWeekPicker" | "DateYearPicker" | "TimePicker" | "TimeRangePicker" | "TreeSelect" | "Switch" | "Rate" | "Mentions" | "Segmented" | "Slider" | "Transfer";

export declare const antdvFields: Record<string, FieldAdapter | undefined>;

export declare interface AutoCompleteFieldOption {
    options?: SelectOptions
    dictName?: string
}

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
    dropdownProps?: UIActionProps<'Dropdown'>
    tooltip?: string
    /** 按钮禁用时的提示 */
    disabledTooltip?: string | Fn<string>
    icon?: string | Component
    attrs?: UIActionProps<'Button'> & HTMLAttributes
    hidden?: boolean | Fn<boolean>
    disabled?: boolean | Fn<boolean>
    /** 传递到内置方法时的所需参数 */
    meta?: Obj
    onClick?: Fn
}

declare interface CollapseItem extends Omit<ExtGroupBaseOption, 'type'> {
    label: VSlot
    key?: string
    icon?: string | Component
    subItems: UniOption[]
    buttons?: ExtButtons
}

export { ComponentModelConfig }

/** 配置 Core 的应用级行为和默认属性。 */
export declare function configure(config?: SuperFormConfig): void;

export { ContainerAdapter }

declare type CoreWidgetTypes = {
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

/** 创建独立的 AntDV Adapter；调用只组装对象，不初始化 Core 全局状态。 */
export declare function createAntdvAdapter(options?: AntdvAdapterOptions): UIAdapter;

export declare function createAntdvCapabilities(): Pick<UIAdapter, 'components' | 'form' | 'layout' | 'containers' | 'icons' | 'actions' | 'presentation' | 'services' | 'modal' | 'upload' | 'preview' | 'table'>;

export declare function createAntdvFields(): NonNullable<UIAdapter['fields']>;

export declare function createModal(content?: (() => VNodeTypes) | VNode, { buttons, ...__config }?: ExtModalProps): {
    config: any;
    modalRef: Ref_2<any, any>;
    modalSlot: (props: any, ctx: any) => VNodeChild;
    setModal: (option?: Partial<ExtModalProps>) => void;
    closeModal: () => Promise<void>;
    openModal: (option?: Partial<ExtModalProps>) => Promise<void>;
};

/** 自定义 UI 字段的 attrs 类型映射。 */
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export declare interface CustomFormComponentProps {}

declare type CustomWidgetTypes = {
    [K in keyof CustomFormComponentProps]: ExtFormItemOption & {
        attrs?: CustomFormComponentProps[K] & HTMLAttributes
    }
}

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

/** 保留 Adapter 的具体类型并提供统一定义入口。 */
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

export declare interface ExtBaseOption {
    type: string
    field?: string
    vModelFields?: Obj<string | Obj>
    initialValue?: any
    label?: VSlot
    labelSlot?: Fn<VNodeTypes>
    tooltip?: VSlot | (UIActionProps<'Tooltip'> & { title: VSlot; icon?: VSlot })
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

export declare interface ExtButtonGroup<T extends string = string> {
    attrs?: LayoutSpaceProps & UIContainerProps<'Space'>
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
    columnProps?: ExtTableColumnProps
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

/** 表单元素属性 */
export declare interface ExtFormItemOption extends ExtBaseOption, RangeFieldOption {
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
    formItemProps?: FormItemSchemaProps & UIContainerProps<'FormItem'>
    descriptionsProps?: ExtDescriptionsProps
    /**是否可编辑 */
    editable?: boolean | Fn<boolean>
}

export declare interface ExtFormOption extends Omit<ExtGroupBaseOption, 'type'> {
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

export declare type ExtModalProps = ModalSchemaProps & Omit<UIModalProps<'Modal'>, keyof ModalSchemaProps>

declare interface ExtRow {
    /** 行间排版属性 */
    rowProps?: LayoutRowProps & UIContainerProps<'Row'>
    subSpan?: number | 'auto'
    gutter?: number
}

declare type ExtSlotOption = { render: VSlot }

export declare interface ExtTabItem extends Omit<ExtGroupBaseOption, 'type' | 'attrs'> {
    label: VSlot
    key?: string
    icon?: string | Component
    attrs?: {
        closable?: boolean
        closeIcon?: VSlot
        forceRender?: boolean
    }
    subItems: UniOption[]
}

export declare type ExtTableColumnProps = UITableProps<'Column'>

export declare interface ExtTableOption extends ExtBaseOption {
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

export declare type ExtTablePaginationProps = TablePaginationSchemaProps &
Omit<UITableProps<'Pagination'>, keyof TablePaginationSchemaProps>

export declare type ExtTableProps = TableSchemaProps & Omit<UITableProps<'Table'>, keyof TableSchemaProps>

export declare interface ExtTabsOption extends Omit<ExtBaseOption, 'attrs'> {
    activeKey?: Ref_2<string | undefined>
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

declare interface ExtTagSelectOption extends ExtFormItemOption, SelectFieldOption {
    attrs?: {
        multiple?: boolean
        /** 将多选结果转换为逗号分隔字符串后写回字段 */
        stringifyValue?: boolean
    }
}

declare interface ExtUpload extends ExtFormItemOption {
    vModelFields?: {
        fileList?: string | Obj
    }
    attrs?: ExtUploadProps
}

export declare type ExtUploadProps = UploadSchemaProps & Omit<UIUploadProps<'Upload'>, keyof UploadSchemaProps>

export { FieldAdapter }

export { FieldAdapterContext }

export { FormAdapter }

export declare type FormComponent = Component | FormComponentConfig;

export declare interface FormComponentConfig {
    component: Component;
    /** 不同 UI 库的受控值协议 */
    model?: ComponentModelConfig;
}

export declare type FormComponentProps<T> = T extends new (...args: any[]) => {
    $props: infer P;
} ? P : T extends (props: infer P, ...args: any[]) => any ? P : Obj;

/** SuperForm 稳定的表单项属性。 */
export declare interface FormItemSchemaProps extends HTMLAttributes {
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

/** SuperForm 稳定的表单容器属性。 */
export declare interface FormSchemaProps extends HTMLAttributes {
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

export { IconAdapter }

export { IconAdapterContext }

export declare interface InputFieldAttrs {
    enterButton?: any
}

export declare interface InputFieldOption {
    onSearch?: (effectData: Obj, value: string) => void
}

declare type KeysOfUnion<T> = T extends unknown ? keyof T : never

export { LayoutAdapter }

/** Core 保证的栅格列语义，UI 专属断点与外观属性不在此扩展。 */
export declare interface LayoutColProps extends HTMLAttributes {
    flex?: string | number
    offset?: number
    order?: number
    pull?: number
    push?: number
    span?: number
}

export { LayoutComponentName }

declare type LayoutGutter = number | ResponsiveValue<number>

/** Core 保证的栅格行语义。 */
export declare interface LayoutRowProps extends HTMLAttributes {
    align?: 'top' | 'middle' | 'bottom' | 'stretch'
    gutter?: LayoutGutter | [LayoutGutter, LayoutGutter]
    justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly'
    wrap?: boolean
}

/** Core 保证的间距布局语义。 */
export declare interface LayoutSpaceProps extends HTMLAttributes {
    align?: 'start' | 'end' | 'center' | 'baseline'
    direction?: 'horizontal' | 'vertical'
    size?: number | 'small' | 'middle' | 'large' | [number, number]
    wrap?: boolean
}

declare type MergeRegistrySources<T> = {
    [K in KeysOfUnion<T>]: ValueOfUnion<T, K>
}

export { ModalAdapter }

export declare type ModalOpenOptions = Partial<ExtModalProps> & { data?: Obj }

/** SuperForm 稳定的弹窗语义，其他外观和交互属性由 Adapter 补充。 */
export declare interface ModalSchemaProps {
    title?: VSlot
    content?: VSlot
    icon?: string | Component
    buttons?: ExtButtons
    destroyOnClose?: boolean
    maskClosable?: boolean
    afterClose?: Fn
    onOk?: Fn
    onCancel?: Fn
}

declare interface OfficialProductInitializeOptions<FieldName extends string> {
    /** 手动提供 Adapter 已声明字段的实际 UI 组件。 */
    components?: Partial<Record<FieldName, Component>>;
}

declare type OfficialSuperFormProduct<FieldName extends string> =
typeof superform & {
    /** 显式初始化官方 UI Adapter；重复无参调用可安全复用。 */
    initialize(
    options?: OfficialProductInitializeOptions<FieldName>
    ): OfficialSuperFormProduct<FieldName>;
};

export declare type OptionType = WrapperTypes & WidgetTypes & CustomWidgetTypes

export { PresentationAdapter }

export { PresentationRenderType }

export { PreviewAdapter }

declare const product: OfficialSuperFormProduct<AntdvFieldName>;
export default product;

export declare interface RangeFieldOption {
    /** 绑定结束日期字段 */
    endField?: string
    /** @deprecated 使用 `endField` */
    keepField?: string
    /** 未配置 `endField` 时，将日期范围转换为逗号分隔字符串后写回字段 */
    stringifyValue?: boolean
}

/** 仅供构建插件生成的虚拟模块登记按需导入组件。 */
export declare function registerAutoImportedComponents(components: Record<string, FormComponent | undefined>, adapterFields?: Iterable<string>): void;

/** 注册一个项目自定义 Schema 组件。 */
export declare function registerComponent(name: string, component: FormComponent): void;

/** 注册项目自定义 Schema 组件。 */
export declare function registerComponents(components: Record<string, FormComponent | undefined>): void;

declare type RegisterMethod = {
    (): () => VNode;
    (actions?: Obj, _tableRef?: Obj): void;
};

export declare function renderAntdvIcon(icon: unknown, { customIcon }?: {
    customIcon?: (name: string) => any;
}): any;

declare type ResponsiveValue<T> = Partial<Record<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl', T>>

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
    pagination?: ExtTablePaginationProps | false
    attrs?: ExtTableProps & TableScanHight
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

export declare interface SelectFieldOption {
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

declare type SelectOptions =
| DefaultOptionsType
| Readonly<DefaultOptionsType>
| Ref_2<DefaultOptionsType>
| Fn<DefaultOptionsType | Promise<DefaultOptionsType>>

export { ServiceAdapter }

export declare const SuperButtons: DefineComponent<ExtractPropTypes<    {
limit: NumberConstructor;
buttonType: PropType<"link" | "text" | "default" | "primary" | "dashed">;
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
}>, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, PublicProps, Readonly<ExtractPropTypes<    {
limit: NumberConstructor;
buttonType: PropType<"link" | "text" | "default" | "primary" | "dashed">;
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

export declare const SuperDetail: DefineComponent<ExtractPropTypes<    {
dataSource: ObjectConstructor;
schema: PropType<ExtDescriptionsOption>;
}>, () => any, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, "register"[], "register", PublicProps, Readonly<ExtractPropTypes<    {
dataSource: ObjectConstructor;
schema: PropType<ExtDescriptionsOption>;
}>> & Readonly<{
onRegister?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>;

export declare const SuperForm: DefineComponent<ExtractPropTypes<    {
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
}>, () => any, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, "register"[], "register", PublicProps, Readonly<ExtractPropTypes<    {
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

declare const superform = {
    useAdapter,
    configure,
    registerComponent,
    registerComponents,
    setDefaultProps,
};

export declare interface SuperFormConfig extends GlobalConfig {
    /** 组件默认参数 */
    defaultProps?: AdapterDefaultProps;
}

export declare const SuperTable: DefineComponent<ExtractPropTypes<    {
dataSource: PropType<Obj<any>[]>;
schema: PropType<RootTableOption>;
}>, () => any, {}, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, ("load" | "register" | "update:dataSource")[], "load" | "register" | "update:dataSource", PublicProps, Readonly<ExtractPropTypes<    {
dataSource: PropType<Obj<any>[]>;
schema: PropType<RootTableOption>;
}>> & Readonly<{
onLoad?: ((...args: any[]) => any) | undefined;
onRegister?: ((...args: any[]) => any) | undefined;
"onUpdate:dataSource"?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {}, {}, string, ComponentProvideOptions, true, {}, any>;

export declare interface SwitchFieldAttrs {
    /** 第一个选项为选中值 */
    firstIsChecked?: boolean
    /** 默认是否选中 */
    defaultChecked?: boolean
}

export declare interface SwitchFieldOption extends SelectFieldOption {
    valueLabels?: [string, string]
}

export { TableAdapter }

export declare type TableApis = {
    query?: Fn<Promise<any>>
    info?: Fn<Promise<Obj>>
    save?: Fn<Promise<any>>
    update?: Fn<Promise<any>>
    delete?: Fn<Promise<any>>
    export?: Fn<Promise<any>>
}

/** 请求分页只依赖这三个字段，其他分页外观属性由 Adapter 补充。 */
export declare interface TablePaginationSchemaProps {
    current?: number
    pageSize?: number
    total?: number
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

/** SuperForm 稳定的表格容器语义。 */
export declare interface TableSchemaProps {
    /** 数据初始化后默认展开的行。 */
    defaultExpandLevel?: number | 'all'
    /** 当前展开行；Core 会在默认展开层级计算完成后更新该值。 */
    expandedRowKeys?: (string | number)[]
    /** 显式关闭选择列，具体选择配置由 Adapter 提供。 */
    rowSelection?: false | (UITableProps<'Table'> extends { rowSelection?: infer T } ? T : Obj)
}

declare type TabsHeader = Omit<UIContainerProps<'Tabs'>, 'activeKey'> & {
    field?: string
    initialValue?: any
    bordered?: boolean
    defaultActiveKey?: string | number
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

export declare interface TreeFieldOption<TreeData = unknown> {
    labelField?: string
    /**
     * @deprecated 使用`treeData`
     */
    data?: TreeData | Fn<Promise<TreeData>>
    treeData?: TreeData | Fn<Promise<TreeData>> | Fn<TreeData>
}

/** Adapter 为按钮、提示和下拉交互提供的 UI Props 类型映射。 */
export declare type UIActionComponentProps = MergeRegistrySources<
SuperFormTypeRegistry.UIActionComponentPropSources[keyof SuperFormTypeRegistry.UIActionComponentPropSources]
>

declare type UIActionProps<K extends string> = K extends keyof UIActionComponentProps ? UIActionComponentProps[K] : unknown

export { UIAdapter }

/** Adapter 对 Core 容器和布局节点提供的 UI Props 类型映射。 */
export declare type UIContainerComponentProps = MergeRegistrySources<
SuperFormTypeRegistry.UIContainerComponentPropSources[keyof SuperFormTypeRegistry.UIContainerComponentPropSources]
>

declare type UIContainerProps<K extends string> = K extends keyof UIContainerComponentProps
? UIContainerComponentProps[K]
: unknown

declare type UIFormComponentOption<K extends keyof UIFormComponentProps> = ExtFormItemOption &
(K extends keyof UIFormComponentOptionExtensions ? UIFormComponentOptionExtensions[K] : unknown) & {
    // UI 库的必填 Props 可能由动态属性、Adapter 默认值或增强处理器补充，Schema 静态 attrs 只约束已填写的属性。
    attrs?: Partial<UIFormComponentProps[K]> & HTMLAttributes
}

/** Adapter 为字段组件关联的 Core 增强配置。 */
export declare type UIFormComponentOptionExtensions = SuperFormTypeRegistry.UIFormComponentOptionExtensions &
MergeRegistrySources<UIFormComponentOptionExtensionSource>

declare type UIFormComponentOptionExtensionSource = SuperFormTypeRegistry.UIFormComponentOptionExtensionSources[
keyof SuperFormTypeRegistry.UIFormComponentOptionExtensionSources
]

/** Adapter UI 字段的 attrs 类型映射；同名字段按 Adapter 来源合并为联合类型。 */
export declare type UIFormComponentProps = SuperFormTypeRegistry.UIFormComponentProps &
MergeRegistrySources<UIFormComponentPropSource>

declare type UIFormComponentPropSource = SuperFormTypeRegistry.UIFormComponentPropSources[
keyof SuperFormTypeRegistry.UIFormComponentPropSources
]

export { UIMessageType }

/** Adapter 为弹窗提供的 UI Props 类型映射。 */
export declare type UIModalComponentProps = MergeRegistrySources<
SuperFormTypeRegistry.UIModalComponentPropSources[keyof SuperFormTypeRegistry.UIModalComponentPropSources]
>

declare type UIModalProps<K extends string> = K extends keyof UIModalComponentProps ? UIModalComponentProps[K] : unknown

export { UIServiceHandle }

export { UITableColumn }

/** Adapter 为表格、列和分页提供的 UI Props 类型映射。 */
export declare type UITableComponentProps = MergeRegistrySources<
SuperFormTypeRegistry.UITableComponentPropSources[keyof SuperFormTypeRegistry.UITableComponentPropSources]
>

export { UITableFilterProps }

export { UITablePagination }

declare type UITableProps<K extends string> = K extends keyof UITableComponentProps ? UITableComponentProps[K] : unknown

export { UITableRenderProps }

export { UITableSelection }

export { UITableSelectors }

/** Adapter 为上传组件提供的 UI Props 类型映射。 */
export declare type UIUploadComponentProps = MergeRegistrySources<
SuperFormTypeRegistry.UIUploadComponentPropSources[keyof SuperFormTypeRegistry.UIUploadComponentPropSources]
>

declare type UIUploadProps<K extends string> = K extends keyof UIUploadComponentProps ? UIUploadComponentProps[K] : unknown

export declare type UniOption = UniWrapperOption | UniWidgetOption

export declare type UniWidgetOption =
| { [K in keyof WidgetTypes]: { type: K } & WidgetTypes[K] }[keyof WidgetTypes]
| {
    [K in keyof CustomWidgetTypes]: { type: K } & CustomWidgetTypes[K]
}[keyof CustomWidgetTypes]

export declare type UniWrapperOption = { [K in keyof WrapperTypes]: { type: K } & WrapperTypes[K] }[keyof WrapperTypes]

export { UploadAdapter }

/** SuperForm 自身消费的上传配置，底层组件属性由 Adapter 补充。 */
export declare interface UploadSchemaProps {
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

/** 显式初始化应用级 Adapter；首次初始化后不允许切换协议。 */
export declare function useAdapter(adapter: UIAdapter): UIAdapter;

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
    openModal: (option?: Partial<ExtModalProps>) => Promise<void>;
    modalSlot: (props: any, ctx: any) => VNodeChild;
    closeModal: () => Promise<void>;
    setModal: (option?: Partial<ExtModalProps> | undefined) => void;
};

export declare function useModalForm(formOption: ExtFormOption, config?: ExtModalProps): {
    openModal: ({ data, onOk, ...__config }?: ModalOpenOptions) => Promise<void>;
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
    modalSlot: (props: any, ctx: any) => VNodeChild;
    closeModal: () => Promise<void>;
    setModal: (option?: Partial<ExtModalProps> | undefined) => void;
};

export declare const useTable: (option: UseTableOption, data?: any[] | Ref<any[]>) => readonly [RegisterMethod, {
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
        meta?: Obj<any> | undefined;
    } | undefined) => any;
    /** 修改行，须判断是否已有选中行 */
    readonly edit: (param?: {
        /** 弹窗标题 */
        title?: string | undefined;
        record?: Obj<any> | undefined;
        meta?: Obj<any> | undefined;
    } | undefined) => any;
    /** 删除行，须判断是否已有选中行 */
    readonly delete: () => any;
    /** 查看详情，须判断是否已有选中行 */
    readonly detail: (param?: {
        /** 弹窗标题 */
        title?: string | undefined;
        record?: Obj<any> | undefined;
        meta?: Obj<any> | undefined;
    } | undefined) => any;
    readonly asyncCall: (key?: string, param?: any) => Promise<any>;
    /** `editable`模式下进行表单校验 */
    readonly validate: () => Promise<any>;
}];

declare type UseTableOption = RootTableOption | (() => RootTableOption) | (() => Promise<RootTableOption>);

declare type ValueOfUnion<T, K extends PropertyKey> = T extends unknown ? (K extends keyof T ? T[K] : never) : never

declare type VSlot = string | Fn

declare type WidgetTypes = CoreWidgetTypes & AdapterWidgetTypes

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
    namespace SuperFormTypeRegistry {
        interface UIContainerComponentPropSources {
            antdv: {
                Col: ColProps;
                Form: FormProps;
                FormItem: FormItemProps;
                Row: RowProps;
                Space: SpaceProps;
            };
        }
        interface UIFormComponentPropSources {
            antdv: {
                AutoComplete: AutoCompleteProps;
                Cascader: FormComponentProps<typeof import('antdv-next')['Cascader']>;
                Checkbox: FormComponentProps<typeof import('antdv-next')['Checkbox']>;
                CheckboxGroup: CheckboxGroupProps;
                ColorPicker: FormComponentProps<typeof import('antdv-next')['ColorPicker']>;
                DateMonthPicker: FormComponentProps<typeof import('antdv-next')['DateMonthPicker']>;
                DatePicker: DatePickerProps;
                DateQuarterPicker: FormComponentProps<typeof import('antdv-next')['DateQuarterPicker']>;
                DateRangePicker: RangePickerProps;
                DateWeekPicker: FormComponentProps<typeof import('antdv-next')['DateWeekPicker']>;
                DateYearPicker: FormComponentProps<typeof import('antdv-next')['DateYearPicker']>;
                Input: InputProps & InputFieldAttrs;
                InputNumber: InputNumberProps;
                InputOTP: FormComponentProps<typeof import('antdv-next')['InputOTP']>;
                InputPassword: FormComponentProps<typeof import('antdv-next')['InputPassword']>;
                InputSearch: FormComponentProps<typeof import('antdv-next')['InputSearch']> & InputFieldAttrs;
                Mentions: FormComponentProps<typeof import('antdv-next')['Mentions']>;
                Radio: FormComponentProps<typeof import('antdv-next')['Radio']>;
                RadioGroup: RadioGroupProps;
                Rate: FormComponentProps<typeof import('antdv-next')['Rate']>;
                Segmented: FormComponentProps<typeof import('antdv-next')['Segmented']>;
                Select: SelectProps;
                Slider: FormComponentProps<typeof import('antdv-next')['Slider']>;
                Switch: SwitchProps & SwitchFieldAttrs;
                TextArea: TextAreaProps;
                TimePicker: TimePickerProps;
                TimeRangePicker: TimeRangePickerProps;
                Transfer: FormComponentProps<typeof import('antdv-next')['Transfer']>;
                TreeSelect: TreeSelectProps;
            };
        }
        interface UIFormComponentOptionExtensionSources {
            antdv: {
                AutoComplete: AutoCompleteFieldOption;
                CheckboxGroup: SelectFieldOption;
                DateRangePicker: RangeFieldOption;
                Input: InputFieldOption;
                InputSearch: InputFieldOption;
                RadioGroup: SelectFieldOption;
                Select: SelectFieldOption;
                Switch: SwitchFieldOption;
                TimeRangePicker: RangeFieldOption;
                TreeSelect: TreeFieldOption<TreeSelectProps['treeData']>;
            };
        }
        interface UIActionComponentPropSources {
            antdv: {
                Button: ButtonProps;
                Dropdown: DropdownProps;
                Tooltip: TooltipProps;
            };
        }
        interface UITableComponentPropSources {
            antdv: {
                Table: AntdvTableProps;
                Column: TableColumnType & {
                    resizable?: boolean;
                };
                Pagination: PaginationProps;
            };
        }
        interface UIModalComponentPropSources {
            antdv: {
                Modal: ModalFuncProps & ModalProps;
            };
        }
        interface UIUploadComponentPropSources {
            antdv: {
                Upload: UploadProps;
            };
        }
    }
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

declare global {
  type Obj<T = any> = Record<string, T>
  type Fn<T = any> = (...args: any[]) => T
  type Ref<T = any> = import('vue').Ref<T>
}

