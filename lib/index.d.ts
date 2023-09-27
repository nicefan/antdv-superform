/// <reference types="../types" />
/// <reference types="../types/exatypes" />

import { AllowedComponentProps } from 'vue';
import type { App } from 'vue';
import type { Component } from 'vue';
import { ComponentCustomProps } from 'vue';
import { ComponentOptionsMixin } from 'vue';
import { ComputedRef } from 'vue';
import { DefineComponent } from 'vue';
import { ExtractPropTypes } from 'vue';
import type { Locale } from 'ant-design-vue/es/locale-provider';
import { ModalFuncProps } from 'ant-design-vue';
import { ModalProps } from 'ant-design-vue/es';
import { PropType } from 'vue';
import { Ref as Ref_2 } from 'vue';
import { RendererElement } from 'vue';
import { RendererNode } from 'vue';
import { VNode as VNode_2 } from 'vue';
import { VNodeProps } from 'vue';

declare type BaseComps = 'Divider' | 'InputGroup' | 'FormItem' | 'Tooltip' | 'Button' | 'MenuItem' | 'Menu' | 'Dropdown' | 'Space' | 'Card' | 'ListItem' | 'List' | 'Modal' | 'Table' | 'Tabs' | 'TabPane' | 'CollapsePanel' | 'Collapse' | 'Input' | 'InputNumber' | 'InputSearch' | 'Select' | 'Switch' | 'RangePicker' | 'DatePicker' | 'TimePicker' | 'RadioButton' | 'Radio' | 'RadioGroup' | 'Checkbox' | 'CheckboxGroup' | 'TreeSelect';

export declare function createModal(content: (() => VNode_2) | VNode_2, { buttons, ...__config }?: Obj): {
    modalRef: Ref_2<any>;
    modalSlot: (props: any, ctx: any) => VNode_2<RendererNode, RendererElement, {
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

export declare function defineForm<T extends keyof OptionType = 'Form'>(option: GetUniOption<T>): GetUniOption<T>;

export declare function defineTable(option: RootTableOption): RootTableOption;

declare type Dict = {
    label: string;
    value: string | number;
    [k: string]: string | number;
};

export declare const ExaButtons: DefineComponent<{
    limit: NumberConstructor;
    buttonType: PropType<"default" | "link" | "dashed" | "text" | "primary" | "ghost">;
    buttonShape: PropType<"default" | "circle" | "round">;
    size: PropType<"middle" | "small" | "large">;
    /** 是否只显示图标 */
    iconOnly: BooleanConstructor;
    hidden: BooleanConstructor;
    disabled: BooleanConstructor;
    actions: PropType<ButtonItem[]>;
}, () => VNode_2<RendererNode, RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, {}, string, VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<{
    limit: NumberConstructor;
    buttonType: PropType<"default" | "link" | "dashed" | "text" | "primary" | "ghost">;
    buttonShape: PropType<"default" | "circle" | "round">;
    size: PropType<"middle" | "small" | "large">;
    /** 是否只显示图标 */
    iconOnly: BooleanConstructor;
    hidden: BooleanConstructor;
    disabled: BooleanConstructor;
    actions: PropType<ButtonItem[]>;
}>>, {
    hidden: boolean;
    disabled: boolean;
    iconOnly: boolean;
}, {}>;

export declare const ExaDetail: DefineComponent<{
    dataSource: ObjectConstructor;
    option: PropType<ExFormOption>;
}, () => any, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, "register"[], "register", VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<{
    dataSource: ObjectConstructor;
    option: PropType<ExFormOption>;
}>> & {
    onRegister?: ((...args: any[]) => any) | undefined;
}, {}, {}>;

export declare const ExaForm: DefineComponent<{
    config: PropType<ExFormOption>;
    model: ObjectConstructor;
    isContainer: BooleanConstructor;
    /** 减少行距 */
    compact: BooleanConstructor;
    /** 不做校验 */
    ignoreRules: BooleanConstructor;
}, () => any, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, "register"[], "register", VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<{
    config: PropType<ExFormOption>;
    model: ObjectConstructor;
    isContainer: BooleanConstructor;
    /** 减少行距 */
    compact: BooleanConstructor;
    /** 不做校验 */
    ignoreRules: BooleanConstructor;
}>> & {
    onRegister?: ((...args: any[]) => any) | undefined;
}, {
    isContainer: boolean;
    compact: boolean;
    ignoreRules: boolean;
}, {}>;

export declare const ExaTable: DefineComponent<{
    dataSource: ObjectConstructor;
    option: PropType<RootTableOption>;
}, () => any, unknown, {}, {}, ComponentOptionsMixin, ComponentOptionsMixin, ("change" | "register")[], "change" | "register", VNodeProps & AllowedComponentProps & ComponentCustomProps, Readonly<ExtractPropTypes<{
    dataSource: ObjectConstructor;
    option: PropType<RootTableOption>;
}>> & {
    onChange?: ((...args: any[]) => any) | undefined;
    onRegister?: ((...args: any[]) => any) | undefined;
}, {}, {}>;

declare interface GlobalConfig {
    dictApi?: (name: string) => Promise<Dict[]>;
    /** 自定义图标处理组件 */
    customIcon?: (name: string) => VNode;
    /** 动态传递按钮权限 */
    buttonRoles?: () => string[];
}

declare interface InstallConfig extends GlobalConfig {
    locale?: Locale;
    components?: {
        [k in BaseComps]?: Component;
    };
    /** 组件默认参数 */
    defaultProps?: Obj;
}

declare function registComponent(name: string, component: ((param: RegistPram) => VNode) | Component): void;

declare type RegisterMethod = {
    (): () => VNode;
    (actions?: Obj, _tableRef?: Obj): void;
};

declare interface RegistPram {
    option: Obj;
    model: ModelData;
    /** 表单数据 */
    effectData: {
        formData: Obj;
        /** 当前值 */
        current?: any;
    };
    /** 绑定到组件上的动态属性 */
    attrs: Obj;
}

declare function setDefaultProps(props: Obj): void;

export declare function useButtons(config: ExButtonGroup): (() => VNode_2<RendererNode, RendererElement, {
    [key: string]: any;
}>)[];

export declare function useDetail(option: ExFormOption, data?: {}): readonly [(actions?: Obj) => any, {
    readonly setData: (data: any) => void;
}];

export declare function useForm(option: ExFormOption, data?: Obj): readonly [(actions?: Obj) => any, {
    /**
     * @deprecated 使用`resetFields`
     */
    readonly setData: (data: any) => void;
    readonly getForm: () => Promise<any>;
    readonly asyncCall: (key?: string, param?: any) => Promise<any>;
    readonly getSource: () => Ref_2<any>;
    readonly submit: () => Promise<any>;
    readonly resetFields: (rest?: Obj) => Promise<any>;
    readonly setFieldsValue: (data: Obj) => Promise<any>;
}];

export declare function useModal(content: () => VNode_2, config?: (ModalProps & {
    buttons?: ExButtons;
}) | Obj): {
    modalRef: Ref_2<any>;
    openModal: (option?: ModalFuncProps | Obj) => Promise<void>;
    modalSlot: (props: any, ctx: any) => VNode_2<RendererNode, RendererElement, {
        [key: string]: any;
    }>;
    closeModal: () => Promise<void>;
    setModal: (option?: Obj<any> | ModalFuncProps | undefined) => void;
};

export declare const useTable: (option: RootTableOption, data?: any[] | Ref_2<any[]>) => readonly [RegisterMethod, {
    /** 异步获取表格引用 */
    readonly getTable: () => Promise<any>;
    readonly dataSource: ComputedRef<any>;
    readonly tableRef: Ref_2<any>;
    readonly setData: (data: Obj[]) => void;
    /** 返回当前表格数据 */
    readonly getData: () => any;
    /** 跳转到指定页 */
    readonly goPage: (page: number) => void;
    /** 刷新数据，不改动查询条件与当前页 */
    readonly reload: () => void;
    /** 手动执行条件查询 */
    readonly query: (param?: Obj) => Promise<any>;
    /** 查询完成，返回结果回调 */
    readonly onLoaded: (callback: (data: any) => void) => void;
    /** 重置查询表单，并重新查询 */
    readonly resetSearchForm: (param?: Obj) => void;
    readonly selectedRowKeys: ComputedRef<any>;
    readonly selectedRows: ComputedRef<any>;
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

export { }
