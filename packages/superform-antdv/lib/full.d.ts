import { Component } from 'vue';
import { UIAdapter } from 'superform/sdk';

/** 默认 Adapter 实例；导入时不注册、不修改 Core 状态。 */
export declare const antdvAdapter: UIAdapter;

declare interface AntdvAdapterOptions {
    /** 不使用自动导入插件时，显式提供实际使用的字段组件。 */
    components?: Partial<Record<string, Component>>;
}

/** 已附带全部字段组件，可直接传给 superform.useAdapter。 */
declare const antdvFull: UIAdapter;
export { antdvFull }
export default antdvFull;

/** AntDV Adapter 支持的全量字段组件，适合不使用自动导入插件的应用。 */
export declare const antdvUIComponents: Record<string, Component>;

/** 创建独立的 AntDV Adapter；调用只组装对象，不初始化 SuperForm 全局状态。 */
export declare function createAntdvAdapter(options?: AntdvAdapterOptions): UIAdapter;

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
                Checkbox: FormComponentProps<typeof import('antdv-next')['Checkbox']>;
                CheckboxGroup: CheckboxGroupProps;
                DatePicker: DatePickerProps;
                DateRangePicker: RangePickerProps;
                Input: InputProps & InputFieldAttrs;
                InputNumber: InputNumberProps;
                Radio: FormComponentProps<typeof import('antdv-next')['Radio']>;
                RadioGroup: RadioGroupProps;
                Rate: FormComponentProps<typeof import('antdv-next')['Rate']>;
                Select: SelectProps;
                Switch: SwitchProps & SwitchFieldAttrs;
                TextArea: TextAreaProps;
                TimePicker: TimePickerProps;
                TimeRangePicker: TimeRangePickerProps;
                TreeSelect: TreeSelectProps;
            };
        }
        interface UIFormComponentOptionExtensionSources {
            antdv: {
                AutoComplete: AutoCompleteFieldOption;
                CheckboxGroup: SelectFieldOption;
                DateRangePicker: RangeFieldOption;
                Input: InputFieldOption;
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
  type Obj<T = any> = Record<string, T>
  type Fn<T = any> = (...args: any[]) => T
  type Ref<T = any> = import('vue').Ref<T>
}

