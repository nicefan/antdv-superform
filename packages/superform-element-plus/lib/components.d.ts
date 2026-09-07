import { Component } from 'vue';

declare type ElementPlusFieldName = "Input" | "InputNumber" | "InputOtp" | "InputTag" | "Autocomplete" | "Mention" | "Select" | "SelectV2" | "Cascader" | "TreeSelect" | "Radio" | "RadioGroup" | "Checkbox" | "CheckboxGroup" | "Switch" | "DatePicker" | "TimePicker" | "TimeSelect" | "ColorPicker" | "Rate" | "Slider" | "Segmented" | "Transfer";

/** Element Plus 字段全量组件，键名统一使用 Schema 的无 El 前缀名称。 */
export declare const fieldComponents: Record<ElementPlusFieldName, Component>;

export { }


declare global {
    namespace SuperFormTypeRegistry {
        interface UIFormComponentPropSources {
            elementPlus: {
                Autocomplete: FormComponentProps<typeof import('element-plus')['ElAutocomplete']>;
                Cascader: FormComponentProps<typeof import('element-plus')['ElCascader']>;
                Checkbox: FormComponentProps<typeof import('element-plus')['ElCheckbox']>;
                CheckboxGroup: FormComponentProps<typeof import('element-plus')['ElCheckboxGroup']>;
                ColorPicker: FormComponentProps<typeof import('element-plus')['ElColorPicker']>;
                DatePicker: FormComponentProps<typeof import('element-plus')['ElDatePicker']>;
                Input: FormComponentProps<typeof import('element-plus')['ElInput']> & InputFieldAttrs;
                InputNumber: FormComponentProps<typeof import('element-plus')['ElInputNumber']>;
                InputOtp: FormComponentProps<typeof import('element-plus')['ElInputOtp']>;
                InputTag: FormComponentProps<typeof import('element-plus')['ElInputTag']>;
                Mention: FormComponentProps<typeof import('element-plus')['ElMention']>;
                Radio: FormComponentProps<typeof import('element-plus')['ElRadio']>;
                RadioGroup: FormComponentProps<typeof import('element-plus')['ElRadioGroup']>;
                Rate: FormComponentProps<typeof import('element-plus')['ElRate']>;
                Segmented: FormComponentProps<typeof import('element-plus')['ElSegmented']>;
                Select: FormComponentProps<typeof import('element-plus')['ElSelect']>;
                SelectV2: FormComponentProps<typeof import('element-plus')['ElSelectV2']>;
                Slider: FormComponentProps<typeof import('element-plus')['ElSlider']>;
                Switch: FormComponentProps<typeof import('element-plus')['ElSwitch']> & SwitchFieldAttrs;
                TimePicker: FormComponentProps<typeof import('element-plus')['ElTimePicker']>;
                TimeSelect: FormComponentProps<typeof import('element-plus')['ElTimeSelect']>;
                Transfer: FormComponentProps<typeof import('element-plus')['ElTransfer']>;
                TreeSelect: FormComponentProps<typeof import('element-plus')['ElTreeSelect']>;
            };
        }
        interface UIFormComponentOptionExtensionSources {
            elementPlus: {
                CheckboxGroup: SelectFieldOption;
                DatePicker: RangeFieldOption;
                Input: InputFieldOption;
                RadioGroup: SelectFieldOption;
                Select: SelectFieldOption;
                SelectV2: SelectFieldOption;
                Switch: SwitchFieldOption;
                TimePicker: RangeFieldOption;
            };
        }
        interface UITableComponentPropSources {
            elementPlus: {
                Table: FormComponentProps<typeof import('element-plus')['ElTable']> & {
                    pagination?: false | FormComponentProps<typeof import('element-plus')['ElPagination']>;
                    rowSelection?: false | Obj;
                    height?: string | number;
                    ref?: any;
                };
                Column: FormComponentProps<typeof import('element-plus')['ElTableColumn']>;
                Pagination: FormComponentProps<typeof import('element-plus')['ElPagination']>;
            };
        }
    }
}



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

declare global {
  type Obj<T = any> = Record<string, T>
  type Fn<T = any> = (...args: any[]) => T
  type Ref<T = any> = import('vue').Ref<T>
}

