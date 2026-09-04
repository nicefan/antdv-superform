import { SuperFormComponentResolver } from 'superform/unplugin/vite';

/** Element Plus 字段自动导入 resolver；只描述映射，不注册 Adapter 或修改全局状态。 */
declare function createElementPlusResolver(): SuperFormComponentResolver;
export { createElementPlusResolver }
export default createElementPlusResolver;

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

