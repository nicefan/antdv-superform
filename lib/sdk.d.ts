import { Component } from 'vue';
import { HTMLAttributes } from 'vue';
import { Ref as Ref_2 } from 'vue';
import { Slots } from 'vue';
import { VNode } from 'vue';
import { VNodeChild } from 'vue';

export declare interface ActionAdapter {
    /** 渲染按钮组或提示；具体按钮、菜单和下拉结构由 Adapter 内部处理。 */
    render: (type: ActionRenderType, props: Obj, slots: Obj) => VNodeChild;
}

export declare type ActionRenderType = 'group' | 'tooltip';

export declare type AdapterComponent = string | Component;

declare type AdapterDefaultProps = Record<string, Obj | undefined>;

declare interface ButtonItem {
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

export declare interface ComponentModelConfig {
    /** 组件接收主值的属性名，默认 value */
    prop?: string;
    /** 组件更新主值时触发的事件名，默认 update:value */
    event?: string;
}

/** 配置 Core 的应用级行为和默认属性。 */
declare function configure(config?: SuperFormConfig): void;

export declare interface ContainerAdapter {
    component: AdapterComponent;
    /** 容器存在受控状态时的 UI model 协议。 */
    model?: ComponentModelConfig;
    /** 将 Core 容器状态转换为 UI 组件属性。 */
    transformProps?: (props: Obj) => Obj;
    /** 容器的 slot 协议不同时自定义最终渲染。 */
    render?: (component: Component, props: Obj, slots: Obj) => VNodeChild;
}

/** 创建无导入副作用的官方产品实例。 */
export declare function createOfficialProduct<FieldName extends string>(productName: string, createAdapter: (components?: Partial<Record<FieldName, Component>>) => UIAdapter): OfficialSuperFormProduct<FieldName>;

declare type DefaultOptionsType = (string | number)[] | DefaultOptionType[] | { [k: string | number]: any }

declare interface DefaultOptionType {
    label?: any
    value?: string | number | boolean | null
    children?: Omit<DefaultOptionType, 'children'>[]
    disabled?: boolean
    [name: string]: any
}

/** 保留 Adapter 的具体类型并提供统一定义入口。 */
export declare function defineUIAdapter<T extends UIAdapter>(adapter: T): T;

declare type Dict = {
    label: string;
    value: string | number;
    [k: string]: string | number;
};

export declare interface FieldAdapter {
    /** 初始化或自动导入时使用的组件注册名；Adapter 本身不直接持有字段组件。 */
    component: string;
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

declare type FormComponent = Component | FormComponentConfig;

declare interface FormComponentConfig {
    component: Component;
    /** 不同 UI 库的受控值协议 */
    model?: ComponentModelConfig;
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

export declare const globalConfig: GlobalConfig;

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

declare type KeysOfUnion<T> = T extends unknown ? keyof T : never

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

declare type MergeRegistrySources<T> = {
    [K in KeysOfUnion<T>]: ValueOfUnion<T, K>
}

export declare interface ModalAdapter {
    /** 渲染受控弹窗；Core 统一使用 visible/onUpdate:visible 协议。 */
    render: (props: Obj, slots: Obj) => VNodeChild;
    /** 在组件 setup 中捕获 UI 框架上下文。 */
    useContext?: () => unknown;
    /** 为脱离原组件树挂载的弹窗恢复 UI 框架上下文。 */
    wrapContext?: (content: (props?: Obj) => VNodeChild, context: unknown, props: Obj) => VNodeChild;
}

export declare interface OfficialProductInitializeOptions<FieldName extends string> {
    /** 手动提供 Adapter 已声明字段的实际 UI 组件。 */
    components?: Partial<Record<FieldName, Component>>;
}

export declare type OfficialSuperFormProduct<FieldName extends string> = typeof superform & {
    /** 显式初始化官方 UI Adapter；重复无参调用可安全复用。 */
    initialize(options?: OfficialProductInitializeOptions<FieldName>): OfficialSuperFormProduct<FieldName>;
};

export declare interface PresentationAdapter {
    /** 渲染轻量展示原语。 */
    render: (type: PresentationRenderType, props: Obj, slots: Obj) => VNodeChild;
}

export declare type PresentationRenderType = 'tag' | 'checkableTag';

export declare interface PreviewAdapter {
    /** 渲染受控图片预览；Core 统一使用 visible/onUpdate:visible 协议。 */
    render: (props: Obj) => VNodeChild;
}

/** 注册一个项目自定义 Schema 组件。 */
declare function registerComponent(name: string, component: FormComponent): void;

/** 注册项目自定义 Schema 组件。 */
declare function registerComponents(components: Record<string, FormComponent | undefined>): void;

/** 按来源登记 Adapter 字段组件；手动配置始终覆盖自动导入。 */
export declare function registerUIComponents(components: Record<string, Component | undefined>, source?: UIComponentSource): void;

declare type SelectOptions =
| DefaultOptionsType
| Readonly<DefaultOptionsType>
| Ref_2<DefaultOptionsType>
| Fn<DefaultOptionsType | Promise<DefaultOptionsType>>

export declare interface ServiceAdapter {
    /** 显示轻量消息。 */
    message: (type: UIMessageType, content: unknown) => void;
    /** 打开命令式确认框。 */
    confirm: (props: Obj) => UIServiceHandle;
    /** 打开命令式信息框，主要用于可更新的加载与错误反馈。 */
    info: (props: Obj) => UIServiceHandle;
}

/** 合并组件默认参数。 */
declare function setDefaultProps(props: Obj): void;

declare const superform: {
    useAdapter: typeof useAdapter;
    configure: typeof configure;
    registerComponent: typeof registerComponent;
    registerComponents: typeof registerComponents;
    setDefaultProps: typeof setDefaultProps;
};

declare interface SuperFormConfig extends GlobalConfig {
    /** 组件默认参数 */
    defaultProps?: AdapterDefaultProps;
}

export declare interface TableAdapter {
    /** 将 Core 表格状态转换为当前 UI 框架的表格、列和分页结构。 */
    render: (props: UITableRenderProps, slots: Obj) => VNodeChild;
    /** 渲染表格顶部的选项卡筛选。 */
    renderFilter: (props: UITableFilterProps, slots: Obj) => VNodeChild;
    /** 自动高度计算需要访问的 UI 私有 DOM 节点，由 Adapter 明确声明。 */
    selectors: UITableSelectors;
}

export declare function toNode(node: any, param?: any): any;

/** Adapter 为按钮、提示和下拉交互提供的 UI Props 类型映射。 */
declare type UIActionComponentProps = MergeRegistrySources<
SuperFormTypeRegistry.UIActionComponentPropSources[keyof SuperFormTypeRegistry.UIActionComponentPropSources]
>

declare type UIActionProps<K extends string> = K extends keyof UIActionComponentProps ? UIActionComponentProps[K] : unknown

export declare interface UIAdapter {
    /** 用于诊断和调试的适配器名称 */
    name: string;
    /** Core 运行必需、由 Adapter 直接引入的固定 UI 原语；不包含 Schema 字段组件。 */
    components: Record<string, Component>;
    /** Adapter 支持的 Schema 字段及其组件协议；这里只声明能力，不负责引入字段组件。 */
    fields?: Record<string, FieldAdapter | undefined>;
    /** 初始化 Adapter 时一并注册的字段组件；通常只由各 Adapter 的 full 入口提供。 */
    fieldComponents?: Record<string, Component | undefined>;
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
    /** 消息、确认和可更新信息框等命令式 UI 服务。 */
    services?: ServiceAdapter;
    /** 声明式与命令式弹窗共用的渲染协议。 */
    modal?: ModalAdapter;
    /** Upload 组件的 UI 协议和忽略标记。 */
    upload?: UploadAdapter;
    /** 图片预览协议。 */
    preview?: PreviewAdapter;
    /** 表格、列、分页、选择、展开和筛选协议。 */
    table?: TableAdapter;
    /** 当前 UI 框架的全局组件默认属性 */
    defaults?: Obj<Obj>;
}

declare type UIComponentSource = "manual" | "auto";

export declare type UIMessageType = 'success' | 'error' | 'info' | 'warning';

export declare interface UIServiceHandle {
    /** 更新当前命令式提示或确认框。 */
    update: (props: Obj) => void;
    /** 销毁当前命令式提示或确认框。 */
    destroy: () => void;
}

export declare interface UITableColumn extends Obj {
    key?: PropertyKey;
    dataIndex?: string | string[];
    title?: unknown;
    children?: UITableColumn[];
    customRender?: (context: Obj) => unknown;
}

export declare interface UITableFilterProps {
    bordered?: boolean;
    items: Array<Obj & {
        key: PropertyKey;
        tab: unknown;
    }>;
    value?: unknown;
    onValueChange: (value: unknown) => void;
    attrs?: Obj;
}

export declare interface UITablePagination {
    current?: number;
    pageSize?: number;
    total?: number;
    pageSizeOptions?: Array<number | string>;
    onChange?: (page: number, pageSize?: number) => unknown;
    onShowSizeChange?: (page: number, pageSize: number) => unknown;
    /** UI 包公开的分页扩展属性，由对应 Adapter 消费。 */
    attrs?: Obj;
}

export declare interface UITableRenderProps extends Obj {
    data: Obj[];
    columns: UITableColumn[];
    selection?: UITableSelection;
    pagination?: false | UITablePagination;
    rowKey: string | ((row: Obj) => PropertyKey);
    expandedKeys?: unknown[];
    onExpandedChange?: (keys: unknown[]) => void;
}

export declare interface UITableSelection {
    selectedKeys: unknown[];
    /** Core 统一回传选中 key、行和 UI 框架提供的附加信息。 */
    onChange?: (keys: unknown[], rows: Obj[], info?: Obj) => void;
    /** 返回 false 时禁止选择当前行。 */
    isRowSelectable?: (row: Obj) => boolean;
    /** UI 包公开的选择扩展属性，由对应 Adapter 消费。 */
    attrs?: Obj;
}

export declare interface UITableSelectors {
    table: string;
    title?: string;
    header?: string;
    footer?: string;
    pagination?: string;
    wrapper?: string;
    empty?: string;
    emptyCell?: string;
    body?: string;
}

export declare interface UploadAdapter {
    /** UI 框架拒绝文件但不加入列表时使用的特殊返回值。 */
    listIgnore: unknown;
    /** 渲染上传组件，并在内部完成 fileList、事件和 slot 协议转换。 */
    render: (props: Obj, slots: Obj) => VNodeChild;
    /** 渲染默认上传触发按钮。 */
    renderTrigger: (props: Obj, slots: Obj) => VNodeChild;
}

/** 显式初始化应用级 Adapter；首次初始化后不允许切换协议。 */
declare function useAdapter(adapter: UIAdapter): UIAdapter;

declare type ValueOfUnion<T, K extends PropertyKey> = T extends unknown ? (K extends keyof T ? T[K] : never) : never

declare type VSlot = string | Fn

export { }



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

