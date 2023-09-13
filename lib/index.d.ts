/// <reference types="../types" />
/// <reference types="../types/exatypes" />
import * as vue from 'vue';
import { App, Component, PropType } from 'vue';
import { Locale } from 'ant-design-vue/es/locale-provider';
import { ModalFuncProps } from 'ant-design-vue';
import { ModalProps } from 'ant-design-vue/es';

type BaseComps = 'Divider' | 'InputGroup' | 'FormItem' | 'Tooltip' | 'Button' | 'MenuItem' | 'Menu' | 'Dropdown' | 'Space' | 'Card' | 'ListItem' | 'List' | 'Modal' | 'Table' | 'Tabs' | 'TabPane' | 'CollapsePanel' | 'Collapse' | 'Input' | 'InputNumber' | 'InputSearch' | 'Select' | 'Switch' | 'RangePicker' | 'DatePicker' | 'TimePicker' | 'RadioButton' | 'Radio' | 'RadioGroup' | 'Checkbox' | 'CheckboxGroup' | 'TreeSelect';
type Dict = {
    label: string;
    value: string | number;
    [k: string]: string | number;
};
interface InstallConfig extends GlobalConfig {
    locale?: Locale;
    components?: {
        [k in BaseComps]?: Component;
    };
    /** 组件默认参数 */
    defaultProps?: Obj;
}
interface GlobalConfig {
    dictApi?: (name: string) => Promise<Dict[]>;
    /** 自定义图标处理组件 */
    customIcon?: (name: string) => VNode;
    /** 动态传递按钮权限 */
    buttonRoles?: () => string[];
}
interface RegistPram {
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
declare function registComponent(name: string, component: ((param: RegistPram) => VNode) | Component): void;
declare function setDefaultProps(props: Obj): void;
declare const _default$4: {
    install: (app: App<any>, config?: InstallConfig) => Promise<void>;
    registComponent: typeof registComponent;
    setDefaultProps: typeof setDefaultProps;
};

declare const _default$3: vue.DefineComponent<{
    config: PropType<ExFormOption>;
    model: ObjectConstructor;
}, () => any, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, "register"[], "register", vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
    config: PropType<ExFormOption>;
    model: ObjectConstructor;
}>> & {
    onRegister?: ((...args: any[]) => any) | undefined;
}, {}, {}>;

declare function useForm(option: ExFormOption, data?: Obj): readonly [(actions?: Obj, _ref?: Obj) => any, {
    readonly setData: (data: any) => void;
    readonly getForm: (key?: string, param?: any) => Promise<any>;
    readonly getSource: () => vue.Ref<any>;
    readonly submit: () => Promise<any>;
    readonly resetFields: (rest?: Obj) => Promise<any>;
    readonly setFieldsValue: (data: Obj) => Promise<any>;
}];

declare function defineForm<T extends keyof OptionType = 'Form'>(option: GetUniOption<T>): GetUniOption<T>;

declare const _default$2: vue.DefineComponent<{
    dataSource: ObjectConstructor;
    option: PropType<RootTableOption>;
}, () => any, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, "register"[], "register", vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
    dataSource: ObjectConstructor;
    option: PropType<RootTableOption>;
}>> & {
    onRegister?: ((...args: any[]) => any) | undefined;
}, {}, {}>;

type RegisterMethod = {
    (): () => VNode;
    (actions?: Obj, _tableRef?: Obj): void;
};
declare const useTable: (option: RootTableOption, data?: any[]) => readonly [RegisterMethod, {
    readonly setData: (data: any) => void;
    readonly tableRef: vue.Ref<any>;
    readonly getTable: (key?: string, param?: any) => Promise<any>;
}];

declare function defineTable(option: RootTableOption): RootTableOption;

declare const _default$1: vue.DefineComponent<{
    limit: NumberConstructor;
    buttonType: PropType<"default" | "link" | "dashed" | "text" | "primary" | "ghost">;
    buttonShape: PropType<"default" | "circle" | "round">;
    size: PropType<"middle" | "small" | "large">;
    /** 是否只显示图标 */
    iconOnly: BooleanConstructor;
    hidden: BooleanConstructor;
    disabled: BooleanConstructor;
    actions: PropType<ButtonItem[]>;
}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, {}, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
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

declare function export_default(config: ExButtonGroup): (() => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>)[];

declare const _default: vue.DefineComponent<{
    dataSource: ObjectConstructor;
    option: PropType<ExFormOption>;
}, () => any, unknown, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, "register"[], "register", vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{
    dataSource: ObjectConstructor;
    option: PropType<ExFormOption>;
}>> & {
    onRegister?: ((...args: any[]) => any) | undefined;
}, {}, {}>;

declare function useDetail(option: ExFormOption, data?: Obj): readonly [(actions?: Obj) => any, {
    readonly setData: (data: any) => void;
}];

declare function createModal(content: (() => VNode) | VNode, { buttons, ...__config }?: Obj): {
    modalRef: vue.Ref<any>;
    modalSlot: (props: any, ctx: any) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>;
    setModal: (option?: ModalFuncProps | Obj) => void;
    closeModal: () => Promise<void>;
    openModal: (option?: ModalFuncProps | Obj) => Promise<void>;
};
declare function useModal(content: () => VNode, config?: (ModalProps & {
    buttons?: ExButtons;
}) | Obj): {
    modalRef: vue.Ref<any>;
    openModal: (option?: ModalFuncProps | Obj) => Promise<void>;
    modalSlot: (props: any, ctx: any) => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>;
    closeModal: () => Promise<void>;
    setModal: (option?: Obj<any> | ModalFuncProps | undefined) => void;
};

export { _default$1 as ExaButtons, _default as ExaDetail, _default$3 as ExaForm, _default$2 as ExaTable, createModal, _default$4 as default, defineForm, defineTable, export_default as useButtons, useDetail, useForm, useModal, useTable };
