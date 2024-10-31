/// <reference types="../types" />

import { AllowedComponentProps } from 'vue';
import type { App } from 'vue';
import type { ColProps } from 'ant-design-vue';
import type { Component } from 'vue';
import { ComponentCustomProps } from 'vue';
import { ComponentOptionsMixin } from 'vue';
import { ComputedRef } from 'vue';
import { DefaultOptionType } from 'ant-design-vue/es/select';
import { DefineComponent } from 'vue';
import type { DescriptionsProps } from 'ant-design-vue';
import { ExtractPropTypes } from 'vue';
import type { FormItemProps } from 'ant-design-vue';
import type { FormProps } from 'ant-design-vue';
import type { HTMLAttributes } from 'vue';
import type { InputProps } from 'ant-design-vue';
import type { ListProps } from 'ant-design-vue';
import type { Locale } from 'ant-design-vue/es/locale-provider';
import type { ModalFuncProps } from 'ant-design-vue';
import type { ModalProps } from 'ant-design-vue';
import type { PaginationProps } from 'ant-design-vue';
import { PropType } from 'vue';
import type { RadioGroupProps } from 'ant-design-vue';
import { Ref as Ref_2 } from 'vue';
import { RendererElement } from 'vue';
import { RendererNode } from 'vue';
import type { RowProps } from 'ant-design-vue';
import type { SelectProps } from 'ant-design-vue';
import type { SpaceProps } from 'ant-design-vue';
import type { TableColumnProps } from 'ant-design-vue';
import type { TableProps } from 'ant-design-vue';
import type { TabsProps } from 'ant-design-vue';
import type { TreeSelectProps } from 'ant-design-vue';
import type { UploadProps } from 'ant-design-vue';
import { VNode } from 'vue';
import { VNodeProps } from 'vue';
import { VNodeTypes } from 'vue';
import Vue from 'vue';

declare type BaseComps = 'Divider' | 'InputGroup' | 'FormItem' | 'Tooltip' | 'Button' | 'MenuItem' | 'Menu' | 'Dropdown' | 'Space' | 'Card' | 'ListItem' | 'List' | 'Modal' | 'Table' | 'Tabs' | 'TabPane' | 'CollapsePanel' | 'Collapse' | 'Input' | 'InputNumber' | 'InputSearch' | 'Select' | 'Switch' | 'RangePicker' | 'DatePicker' | 'TimePicker' | 'RadioButton' | 'Radio' | 'RadioGroup' | 'Checkbox' | 'CheckboxGroup' | 'TreeSelect';

export declare interface ButtonItem {
    label?: VSlot
    /** 确认提示文本 */
    confirmText?: string | Fn<string>
    /** 权限标识 */
    roleName?: string
    roleMode?: 'hidden' | 'disable'
    color?: 'success' | 'error' | 'warning' | 'primary'
    validOn?: 'form' | 'detail' | 'both'
    tooltip?: string
    icon?: string | Component
    attrs?: Obj & HTMLAttributes
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

export declare function createModal(content: (() => VNodeTypes) | VNode, { buttons, ...__config }?: Obj): {
    modalRef: Ref_2<any>;
    modalSlot: (props: any, ctx: any) => VNode<RendererNode, RendererElement, {
        [key: string]: any;
    }>;
    setModal: (option?: ModalFuncProps | Obj) => void;
    closeModal: () => Promise<void>;
    openModal: (option?: ModalFuncProps | Obj) => Promise<void>;
};

declare const _default: {
    install: (app: App<any>, config?: InstallConfig) => Promise<void>;
    registComponent: typeof registComponent;
    setDefaultProps: typeof setDefaultProps;
};
export default _default;

declare type DefaultOptionsType = (string | number)[] | DefaultOptionType[] | { [k: string | number]: string | number }

export declare function defineDetail(option: ExtDescriptionsOption): ExtDescriptionsOption;

export declare function defineForm<T extends keyof OptionType = 'Form'>(option: OptionType[T]): OptionType[T];

export declare function defineTable(option: RootTableOption): RootTableOption;

declare type DetailOption = ExtDescriptionsOption | ExtFormOption | (() => ExtDescriptionsOption | ExtFormOption) | (() => Promise<ExtDescriptionsOption | ExtFormOption>);

declare type Dict = {
    label: string;
    value: string | number;
    [k: string]: string | number;
};

export declare interface ExtBaseOption {
    type: string
    field?: string
    vModelFields?: Obj<string>
    value?: Ref_2
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

export declare interface ExtButtonGroup<T extends string = string> {
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
    /** 传递到事件方法中可响应数据 */
    effectData?: Obj
    actions?: (T | ({ name?: T } & ButtonItem))[]
    // subItems?: ButtonItem[]
}

export declare type ExtButtons<T extends string = string> = ExtButtonGroup<T> | NonNullable<ExtButtonGroup<T>['actions']>

export declare interface ExtCollapseOption extends ExtBaseOption {
    title?: VSlot
    activeKey?: string | Ref_2<string>
    subItems: CollapseItem[]
}

export declare type ExtColumnsItem = (UniOption | Omit<ExtFormItemOption, 'type' | 'field'>) & {
    field?: string
    /** 应用于表格或编辑表单 */
    hideInTable?: boolean
    /** 表格内容渲染 */
    viewRender?: VSlot
    columnProps?: TableColumnProps
}

declare interface ExtDateRange extends ExtFormItemOption {
    /** 绑定结束日期字段 */
    keepField?: string
}

export declare interface ExtDescriptionsOption extends Omit<ExtBaseOption, 'type'>, ExtRow {
    title?: VSlot
    dataSource?: Obj
    buttons?: ExtButtons
    mode?: 'table' | 'form' | 'default'
    attrs?: ExtDescriptionsProps
    isContainer?: boolean
    subItems: (UniOption | Omit<ExtFormItemOption, 'type' | 'field'>)[]
}

declare type ExtDescriptionsProps = {
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

/** 表单元素属性 */
export declare interface ExtFormItemOption extends ExtBaseOption {
    field: string
    /** 指定ref对象时，同步变化 */
    value?: any
    /** 数据联动 提供一个监听方法，根据数据变化自动计算变更绑定值 */
    computed?: (value, formData: Vue.DeepReadonly<Obj>) => any
    formItemProps?: FormItemProps
    descriptionsProps?: ExtDescriptionsProps
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
    subItems?: (UniOption | Omit<ExtFormItemOption, 'type' | 'field'>)[]
    descriptionsProps?: ExtDescriptionsProps
}

export declare interface ExtGroupOption extends ExtGroupBaseOption {
    component?: Component
}

declare type ExtInfoSlotOption = (ExtBaseOption & ExtSlotOption) | ExtFormItemOption

export declare interface ExtInputGroupOption extends ExtBaseOption, ExtRow {
    subItems: UniOption[]
}

declare interface ExtInputList extends ExtFormItemOption, ExtRow {
    title?: VSlot
    attrs?: {
        /** 标签后加序号 */
        labelIndex?: boolean
    }
    rowButtons?: false | ExtButtons<'delete' | 'add'>
    columns: UniWidgetOption[]
}

export declare interface ExtInputOption extends ExtFormItemOption {
    addonAfter?: VSlot
    addonBefore?: VSlot
    prefix?: VSlot
    suffix?: VSlot
    suffixTips?: string
    enterButton?: (effectData: Obj) => Component
    onSearch?: (effectData: Obj, value: string) => void
    attrs?: InputProps & HTMLAttributes
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
    attrs?: ListProps | Obj
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

declare interface ExtRadioOption extends ExtFormItemOption, ExtSelect {
    attrs?: RadioGroupProps & HTMLAttributes
}

declare interface ExtRow {
    /** 行间排版属性 */
    rowProps?: RowProps & HTMLAttributes
    subSpan?: number | 'auto'
    gutter?: number
}

declare interface ExtSelect {
    labelField?: string
    options?: SelectOptions
    /** 字典名称 */
    dictName?: string
    /** 选项中的value转成number类型 */
    valueToNumber?: boolean
    /** 选项中的value使用label */
    valueToLabel?: boolean
}

declare interface ExtSelectOption extends ExtFormItemOption, ExtSelect {
    attrs?: SelectProps & HTMLAttributes
}

declare type ExtSlotOption = { render: VSlot }

declare interface ExtSwitchOption extends ExtFormItemOption {
    valueLabels?: [string, string]
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
    attrs?: TableProps | Obj
    editMode?: 'inline' | 'modal'
    addMode?: 'inline' | 'modal'
    columns: ExtColumnsItem[]
    tabs?: TabsHeader | false
    /** 公共列配置 */
    columnProps?: TableColumnProps
    buttons?: ExtButtons<'add' | 'delete' | 'edit' | 'detail'> | false
    /** 列表元素右边按钮 */
    rowButtons?: false | (ExtButtons<'delete' | 'edit' | 'detail'> & { columnProps?: TableColumnProps })
    /** 弹窗属性 */
    modalProps?: ModalFuncProps | Obj
    descriptionsProps?: ExtDescriptionsProps
    /** @deprecated 改为editForm */
    formSchema?: void
    /** 弹窗表单配置 */
    editForm?: Omit<ExtFormOption, 'subItems'> & { 'subItems'?: UniOption[] }
}

export declare interface ExtTabsOption extends ExtBaseOption {
    activeKey?: Ref_2<string>
    forceRender?: boolean
    buttons?: ExtButtons<'add' | 'refresh'>
    subItems: ExtTabItem[]
}

declare interface ExtTagInputOption extends ExtFormItemOption {
    attrs?: {
        valueToString?: boolean
    } & HTMLAttributes
}

declare interface ExtTagSelectOption extends ExtFormItemOption, ExtSelect {
    attrs?: {
        multiple?: boolean
        valueToString?: boolean
    } & HTMLAttributes
}

export declare interface ExtTreeOption extends ExtFormItemOption {
    labelField?: string
    attrs?: TreeSelectProps & HTMLAttributes
    /**
     * @deprecated 使用`treeData`
     */
    data?: TreeSelectProps['treeData'] | Fn<Promise<TreeSelectProps['treeData']>>
    treeData?: TreeSelectProps['treeData'] | Fn<Promise<TreeSelectProps['treeData']>>
}

declare interface ExtUpload extends ExtFormItemOption {
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

declare interface GlobalConfig {
    dictApi?: (name: string) => Promise<Dict[]>;
    /** 自定义图标处理组件 */
    customIcon?: (name: string) => VNode;
    /** 动态传递按钮权限 */
    buttonRoles?: () => string[];
    /** 内置默认按钮配置 */
    defaultButtons?: Obj<ButtonItem>;
}

declare interface HelpMessage {
    color: 'success' | 'info' | 'warning' | 'error'
}

declare interface InstallConfig extends GlobalConfig {
    locale?: Locale;
    components?: {
        [k in BaseComps]?: Component;
    };
    /** 组件默认参数 */
    defaultProps?: Obj;
}

export declare type OptionType = WrapperTypes & WidgetTypes

declare function registComponent(name: string, component: ((param: RegistPram) => VNode) | Component): void;

declare type RegisterMethod = {
    (): () => VNode;
    (actions?: Obj, _tableRef?: Obj): void;
};

declare interface RegistPram {
    /** 绑定到组件上的动态属性 */
    attrs: Obj;
    formData: Obj;
    /** 当前对象 */
    current: any;
    /** 当前值 */
    value?: any;
}

export declare interface RootTableOption extends Omit<ExtTableOption, 'type' | 'field'>, TableScanHight {
    isContainer?: boolean
    apis?: TableApis | TableApis['query']
    dataSource?: Obj[] | Ref_2<any[]>
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
    searchForm?: ExtFormOption | { subItems: (UniOption | string)[]; searchOnChange?: boolean }
    pagination?: PaginationProps | false
    attrs?: TableProps | TableScanHight | Obj
}

declare interface RuleConfig {
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

declare type SelectOptions =
| DefaultOptionsType
| Readonly<DefaultOptionsType>
| Ref_2<DefaultOptionsType>
| Fn<DefaultOptionsType | Promise<DefaultOptionsType>>

declare function setDefaultProps(props: Obj): void;

export declare const SuperButtons: DefineComponent<{
    limit: NumberConstructor;
    buttonType: PropType<"default" | "text" | "primary" | "link" | "dashed" | "ghost">;
    buttonShape: PropType<"default" | "circle" | "round">;
    size: PropType<"small" | "middle" | "large">;
    /** 是否只显示图标 */
    iconOnly: BooleanConstructor;
    hidden: BooleanConstructor;
    disabled: BooleanConstructor;
    actions: PropType<ButtonItem[]>;
    effectData: ObjectConstructor;
}, () => VNode<RendererNode, RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<{
    limit: NumberConstructor;
    buttonType: PropType<"default" | "text" | "primary" | "link" | "dashed" | "ghost">;
    buttonShape: PropType<"default" | "circle" | "round">;
    size: PropType<"small" | "middle" | "large">;
    /** 是否只显示图标 */
    iconOnly: BooleanConstructor;
    hidden: BooleanConstructor;
    disabled: BooleanConstructor;
    actions: PropType<ButtonItem[]>;
    effectData: ObjectConstructor;
}>>, {
    hidden: boolean;
    disabled: boolean;
    iconOnly: boolean;
}, {}>;

export declare const SuperDetail: DefineComponent<{
    dataSource: ObjectConstructor;
    schema: PropType<ExtDescriptionsOption>;
}, () => any, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, "register"[], "register", VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<{
    dataSource: ObjectConstructor;
    schema: PropType<ExtDescriptionsOption>;
}>> & {
    onRegister?: ((...args: any[]) => any) | undefined;
}, {}, {}>;

export declare const SuperForm: DefineComponent<SuperFormProps, any, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<SuperFormProps>, {}, {}>;

declare type SuperFormProps = FormProps & {
    /** 是否为容器包装 */
    isContainer?: boolean;
    schema?: ExtFormOption;
    /** 减少行距 */
    compact?: boolean;
    /** 不做校验 */
    ignoreRules?: boolean;
    dataSource?: Obj;
    onRegister?: () => void;
};

export declare const SuperTable: DefineComponent<{
    dataSource: PropType<Obj<any>[]>;
    schema: PropType<RootTableOption>;
}, () => any, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, ("register" | "load" | "update:dataSource")[], "register" | "load" | "update:dataSource", VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<{
    dataSource: PropType<Obj<any>[]>;
    schema: PropType<RootTableOption>;
}>> & {
    onLoad?: ((...args: any[]) => any) | undefined;
    onRegister?: ((...args: any[]) => any) | undefined;
    "onUpdate:dataSource"?: ((...args: any[]) => any) | undefined;
}, {}, {}>;

export declare type TableApis = {
    query: Fn<Promise<any>>
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
    /** 选项中的value使用label */
    valueToLabel?: boolean
    activeKey?: Ref_2<string | number | undefined>
    slots?: Obj<VSlot>
}

export declare type UniOption = UniWrapperOption | UniWidgetOption

export declare type UniWidgetOption =
| { [K in keyof WidgetTypes]: { type: K } & WidgetTypes[K] }[keyof WidgetTypes]
| (ExtFormItemOption & { type: `Ext${Capitalize<string>}${string}` })

export declare type UniWrapperOption = { [K in keyof WrapperTypes]: { type: K } & WrapperTypes[K] }[keyof WrapperTypes]

export declare function useButtons(option: ExtButtonGroup): (() => VNode<RendererNode, RendererElement, {
    [key: string]: any;
}>)[];

export declare function useDetail(option: DetailOption, data?: Obj): readonly [(actions?: Obj) => any, {
    readonly setData: (data: any) => void;
}];

export declare function useForm(option: UseFormOption, data?: Obj): readonly [(actions?: Obj, ref?: Obj) => any, {
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

export declare function useModal(content: () => VNodeTypes, config?: ExtModalProps): {
    modalRef: Ref_2<any>;
    openModal: (option?: ModalFuncProps | Obj) => Promise<void>;
    modalSlot: (props: any, ctx: any) => VNode<RendererNode, RendererElement, {
        [key: string]: any;
    }>;
    closeModal: () => Promise<void>;
    setModal: (option?: Obj<any> | ModalFuncProps | undefined) => void;
};

export declare function useModalForm(formOption: ExtFormOption, config?: ExtModalProps): {
    openModal: ({ data, onOk, ...__config }?: ModalFuncProps & {
        data?: Obj<any> | undefined;
    }) => Promise<void>;
    closeModal: () => Promise<void>;
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
};

export declare const useTable: (option: UseTableOption, data?: any[] | Ref_2<any[]>) => readonly [RegisterMethod, {
    /** 异步获取表格引用 */
    readonly getTable: () => Promise<any>;
    readonly tableRef: Ref_2<any>;
    readonly setData: (data: Obj[]) => void;
    /** 返回当前表格数据 */
    readonly getData: () => any;
    readonly dataSource: ComputedRef<any>;
    /** 跳转到指定页 */
    readonly goPage: (page: number) => void;
    /** 刷新数据，不改动查询条件与当前页 */
    readonly reload: () => void;
    /** 增加条件刷新数据 */
    readonly request: (param: Obj) => void;
    /** 手动执行条件查询，覆盖搜索表单参数 */
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
    /** 新增行 */
    readonly add: (param?: {
        /** 初始化数据 */
        resetData?: Obj<any> | undefined;
        /** 弹窗标题 */
        meta?: {
            /** 弹窗标题 */
            title?: string | undefined;
        } | undefined;
    } | undefined) => any;
    /** 修改行，须判断是否已有选中行 */
    readonly edit: (param?: {
        /** 弹窗标题 */
        title?: string | undefined;
    } | undefined) => any;
    /** 删除行，须判断是否已有选中行 */
    readonly delete: () => any;
    /** 查看详情，须判断是否已有选中行 */
    readonly detail: (param?: {
        /** 弹窗标题 */
        title?: string | undefined;
    } | undefined) => any;
    readonly asyncCall: (key?: string, param?: any) => Promise<any>;
}];

declare type UseTableOption = RootTableOption | (() => RootTableOption) | (() => Promise<RootTableOption>);

declare type VSlot = string | Fn

declare type WidgetTypes = {
    Buttons: ExtBaseOption & ExtButtonGroup
    Hidden: ExtBaseOption
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

declare type WrapperTypes = {
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

export { }
