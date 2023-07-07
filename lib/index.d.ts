/// <reference types="../types" />
/// <reference types="../types/exaform" />
import * as vue from 'vue';
import { App, Component } from 'vue';
import { Locale } from 'ant-design-vue/es/locale-provider';
import * as ant_design_vue_es from 'ant-design-vue/es';
import { ModalFuncProps } from 'ant-design-vue/es';
import { VueNode } from 'ant-design-vue/es/_util/type';

type BaseComps = 'Divider' | 'InputGroup' | 'FormItem' | 'Tooltip' | 'Button' | 'MenuItem' | 'Menu' | 'Dropdown' | 'Space' | 'Card' | 'ListItem' | 'List' | 'Modal' | 'Table' | 'Tabs' | 'TabPane' | 'CollapsePanel' | 'Collapse' | 'Input' | 'InputNumber' | 'InputSearch' | 'Select' | 'Switch' | 'RangePicker' | 'DatePicker' | 'TimePicker' | 'RadioButton' | 'Radio' | 'RadioGroup' | 'Checkbox' | 'CheckboxGroup' | 'TreeSelect';
interface InstallConfig {
    locale?: Locale;
    components?: {
        [k in BaseComps]?: Component;
    };
}
interface RegistPram {
    option: Obj;
    /** 表单数据 */
    effectData: {
        formData: Obj;
        /** 当前值 */
        record?: any;
    };
    /** 绑定到组件上的动态属性 */
    attrs: Obj;
}
declare function registComponent(name: string, component: ((param: RegistPram) => Component) | VNode): Promise<void>;
declare const _default: {
    install: (app: App<any>, config?: InstallConfig) => Promise<void>;
    registComponent: typeof registComponent;
};

declare function defineForm(option: FormOption): FormOption;
declare function buildForm(optionData: any): {
    FormComponent: () => vue.VNode<vue.RendererNode, vue.RendererElement, {
        [key: string]: any;
    }>;
    onSubmit: () => any;
    resetFields: () => any;
    setFieldsValue: (data: any) => any;
};
declare function buildModal(optionData: any): {
    openModal: (option?: ant_design_vue_es.ModalFuncProps | undefined) => void;
    onSubmit: () => any;
};

declare function useModal(content: () => VueNode, config?: Obj): {
    openModal: (option?: ModalFuncProps | undefined) => void;
};

export { buildForm, buildModal, _default as default, defineForm, useModal };
