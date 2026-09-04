import { Component } from 'vue';
import { UIAdapter } from 'superform/sdk';

/** 创建 Element Plus Adapter；导入包本身不初始化 SuperForm 全局状态。 */
export declare function createElementPlusAdapter(options?: ElementPlusAdapterOptions): UIAdapter;

/** 默认 Adapter 实例，可通过 superform.useAdapter 显式注册。 */
declare const elementPlusAdapter: UIAdapter;
export default elementPlusAdapter;
export { elementPlusAdapter }

export declare interface ElementPlusAdapterOptions {
    /** 不使用自动导入插件时，显式提供实际使用的字段组件。 */
    components?: Partial<Record<string, Component>>;
}

export declare const elementPlusCapabilities: Pick<UIAdapter, 'components' | 'form' | 'layout' | 'containers' | 'icons' | 'actions' | 'presentation'>;

export declare const elementPlusDefaults: NonNullable<UIAdapter['defaults']>;

/** 字段名使用 Schema 公开的无 UI 前缀名称，实际组件由 resolver 或 uiComponents 提供。 */
export declare const elementPlusFields: NonNullable<UIAdapter['fields']>;

export { UIAdapter }

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

