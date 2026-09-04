import { Component } from 'vue';
import { UIAdapter } from 'superform/sdk';

/** 创建 Element Plus Adapter；导入包本身不初始化 SuperForm 全局状态。 */
export declare function createElementPlusAdapter(options?: ElementPlusAdapterOptions): UIAdapter;

/** 默认 Adapter 实例，可通过 superform.useAdapter 显式注册。 */
export declare const elementPlusAdapter: UIAdapter;

declare interface ElementPlusAdapterOptions {
    /** 不使用自动导入插件时，显式提供实际使用的字段组件。 */
    components?: Partial<Record<string, Component>>;
}

/** 已附带全部字段组件，可直接传给 superform.useAdapter。 */
declare const elementPlusFull: UIAdapter;
export default elementPlusFull;
export { elementPlusFull }

/** Element Plus 字段全量注册表，字段名遵循 SuperForm Schema 的无前缀约定。 */
export declare const elementPlusUIComponents: Record<string, Component>;

export { }


declare global {
    namespace SuperFormTypeRegistry {
        interface UIFormComponentPropSources {
            elementPlus: {
                Input: FormComponentProps<typeof import('element-plus')['ElInput']> & InputFieldAttrs;
                Rate: FormComponentProps<typeof import('element-plus')['ElRate']>;
                Select: FormComponentProps<typeof import('element-plus')['ElSelect']>;
                Switch: FormComponentProps<typeof import('element-plus')['ElSwitch']> & SwitchFieldAttrs;
            };
        }
        interface UIFormComponentOptionExtensionSources {
            elementPlus: {
                Input: InputFieldOption;
                Select: SelectFieldOption;
                Switch: SwitchFieldOption;
            };
        }
    }
}

declare global {
  type Obj<T = any> = Record<string, T>
  type Fn<T = any> = (...args: any[]) => T
  type Ref<T = any> = import('vue').Ref<T>
}

