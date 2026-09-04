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

export declare interface ContainerAdapter {
    component: AdapterComponent;
    /** 容器存在受控状态时的 UI model 协议。 */
    model?: ComponentModelConfig;
    /** 将 Core 容器状态转换为 UI 组件属性。 */
    transformProps?: (props: Obj) => Obj;
    /** 容器的 slot 协议不同时自定义最终渲染。 */
    render?: (component: Component, props: Obj, slots: Obj) => VNodeChild;
}

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

export declare interface PresentationAdapter {
    /** 渲染轻量展示原语。 */
    render: (type: PresentationRenderType, props: Obj, slots: Obj) => VNodeChild;
}

export declare type PresentationRenderType = 'tag' | 'checkableTag';

/** 注册 Adapter 已声明字段所需的实际 UI 组件，供初始化配置和构建插件共用。 */
export declare function registerUIComponents(components: Record<string, Component | undefined>): void;

declare type SelectOptions =
| DefaultOptionsType
| Readonly<DefaultOptionsType>
| Ref_2<DefaultOptionsType>
| Fn<DefaultOptionsType | Promise<DefaultOptionsType>>

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
    /** 当前 UI 框架的全局组件默认属性 */
    defaults?: Obj<Obj>;
}

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

