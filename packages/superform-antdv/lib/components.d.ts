import { Component } from 'vue';

declare type AntdvFieldName = "Input" | "TextArea" | "InputNumber" | "InputOTP" | "InputPassword" | "InputSearch" | "AutoComplete" | "Cascader" | "ColorPicker" | "Select" | "Radio" | "RadioGroup" | "Checkbox" | "CheckboxGroup" | "DatePicker" | "DateRangePicker" | "DateMonthPicker" | "DateQuarterPicker" | "DateWeekPicker" | "DateYearPicker" | "TimePicker" | "TimeRangePicker" | "TreeSelect" | "Switch" | "Rate" | "Mentions" | "Segmented" | "Slider" | "Transfer";

/** AntDV Adapter 支持的全量字段组件，适合不使用自动导入插件的应用。 */
export declare const fieldComponents: Record<AntdvFieldName, Component>;

export { }


declare global {
    namespace SuperFormTypeRegistry {
        interface UIContainerComponentPropSources {
            antdv: {
                Col: ColProps;
                Form: FormProps;
                FormItem: FormItemProps;
                Row: RowProps;
                Space: SpaceProps;
            };
        }
        interface UIFormComponentPropSources {
            antdv: {
                AutoComplete: AutoCompleteProps;
                Cascader: FormComponentProps<typeof import('antdv-next')['Cascader']>;
                Checkbox: FormComponentProps<typeof import('antdv-next')['Checkbox']>;
                CheckboxGroup: CheckboxGroupProps;
                ColorPicker: FormComponentProps<typeof import('antdv-next')['ColorPicker']>;
                DateMonthPicker: FormComponentProps<typeof import('antdv-next')['DateMonthPicker']>;
                DatePicker: DatePickerProps;
                DateQuarterPicker: FormComponentProps<typeof import('antdv-next')['DateQuarterPicker']>;
                DateRangePicker: RangePickerProps;
                DateWeekPicker: FormComponentProps<typeof import('antdv-next')['DateWeekPicker']>;
                DateYearPicker: FormComponentProps<typeof import('antdv-next')['DateYearPicker']>;
                Input: InputProps & InputFieldAttrs;
                InputNumber: InputNumberProps;
                InputOTP: FormComponentProps<typeof import('antdv-next')['InputOTP']>;
                InputPassword: FormComponentProps<typeof import('antdv-next')['InputPassword']>;
                InputSearch: FormComponentProps<typeof import('antdv-next')['InputSearch']> & InputFieldAttrs;
                Mentions: FormComponentProps<typeof import('antdv-next')['Mentions']>;
                Radio: FormComponentProps<typeof import('antdv-next')['Radio']>;
                RadioGroup: RadioGroupProps;
                Rate: FormComponentProps<typeof import('antdv-next')['Rate']>;
                Segmented: FormComponentProps<typeof import('antdv-next')['Segmented']>;
                Select: SelectProps;
                Slider: FormComponentProps<typeof import('antdv-next')['Slider']>;
                Switch: SwitchProps & SwitchFieldAttrs;
                TextArea: TextAreaProps;
                TimePicker: TimePickerProps;
                TimeRangePicker: TimeRangePickerProps;
                Transfer: FormComponentProps<typeof import('antdv-next')['Transfer']>;
                TreeSelect: TreeSelectProps;
            };
        }
        interface UIFormComponentOptionExtensionSources {
            antdv: {
                AutoComplete: AutoCompleteFieldOption;
                CheckboxGroup: SelectFieldOption;
                DateRangePicker: RangeFieldOption;
                Input: InputFieldOption;
                InputSearch: InputFieldOption;
                RadioGroup: SelectFieldOption;
                Select: SelectFieldOption;
                Switch: SwitchFieldOption;
                TimeRangePicker: RangeFieldOption;
                TreeSelect: TreeFieldOption<TreeSelectProps['treeData']>;
            };
        }
        interface UIActionComponentPropSources {
            antdv: {
                Button: ButtonProps;
                Dropdown: DropdownProps;
                Tooltip: TooltipProps;
            };
        }
        interface UITableComponentPropSources {
            antdv: {
                Table: AntdvTableProps;
                Column: TableColumnType & {
                    resizable?: boolean;
                };
                Pagination: PaginationProps;
            };
        }
        interface UIModalComponentPropSources {
            antdv: {
                Modal: ModalFuncProps & ModalProps;
            };
        }
        interface UIUploadComponentPropSources {
            antdv: {
                Upload: UploadProps;
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

