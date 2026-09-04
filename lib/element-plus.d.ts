import { Component } from 'vue';
import { Slots } from 'vue';
import { VNodeChild } from 'vue';

declare interface ActionAdapter {
    /** 渲染按钮组或提示；具体按钮、菜单和下拉结构由 Adapter 内部处理。 */
    render: (type: ActionRenderType, props: Obj, slots: Obj) => VNodeChild;
}

declare type ActionRenderType = 'group' | 'tooltip';

declare type AdapterComponent = string | Component;

declare interface ComponentModelConfig {
    /** 组件接收主值的属性名，默认 value */
    prop?: string;
    /** 组件更新主值时触发的事件名，默认 update:value */
    event?: string;
}

declare interface ContainerAdapter {
    component: AdapterComponent;
    /** 容器存在受控状态时的 UI model 协议。 */
    model?: ComponentModelConfig;
    /** 将 Core 容器状态转换为 UI 组件属性。 */
    transformProps?: (props: Obj) => Obj;
    /** 容器的 slot 协议不同时自定义最终渲染。 */
    render?: (component: Component, props: Obj, slots: Obj) => VNodeChild;
}

/** P005 的真实第二 Adapter，只覆盖本阶段要求的表单、容器和复合字段能力。 */
declare const elementPlusAdapter: UIAdapter;
export default elementPlusAdapter;
export { elementPlusAdapter }

declare interface FieldAdapter {
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

declare interface FieldAdapterContext {
    type: string;
    option: Obj;
    effectData: Obj;
}

declare interface FormAdapter {
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

declare interface IconAdapter {
    /** Core 内置交互使用的语义图标。 */
    semantic?: Record<string, AdapterComponent | undefined>;
    /** 渲染 Schema 传入的字符串、组件或节点。 */
    render: (icon: unknown, context: IconAdapterContext) => VNodeChild;
}

declare interface IconAdapterContext {
    /** 消费项目对字符串图标的自定义解析入口。 */
    customIcon?: (name: string) => VNodeChild;
}

declare interface LayoutAdapter {
    row: AdapterComponent;
    col: AdapterComponent;
    space: AdapterComponent;
    /** 可选的紧凑空间容器；未提供时回退到普通 space。 */
    compactSpace?: AdapterComponent;
    /** 栅格和空间属性的 UI 协议转换。 */
    transformProps?: Partial<Record<LayoutComponentName, (props: Obj) => Obj>>;
}

declare type LayoutComponentName = 'row' | 'col' | 'space' | 'compactSpace';

declare interface PresentationAdapter {
    /** 渲染轻量展示原语。 */
    render: (type: PresentationRenderType, props: Obj, slots: Obj) => VNodeChild;
}

declare type PresentationRenderType = 'tag' | 'checkableTag';

declare interface UIAdapter {
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

export { }
