import { Component } from 'vue';
import { FieldAdapter } from 'superform/sdk';
import { UIAdapter } from 'superform/sdk';

/** 默认 Adapter 实例；导入时不注册、不修改 Core 状态。 */
declare const antdvAdapter: UIAdapter;
export { antdvAdapter }
export default antdvAdapter;

export declare interface AntdvAdapterOptions {
    /** 不使用自动导入插件时，显式提供实际使用的字段组件。 */
    components?: Partial<Record<string, Component>>;
}

export declare const antdvCapabilities: Pick<UIAdapter, "form" | "components" | "layout" | "containers" | "icons" | "actions" | "presentation">;

export declare const antdvDefaults: NonNullable<UIAdapter['defaults']>;

export declare const antdvFields: Record<string, FieldAdapter | undefined>;

/** 创建独立的 AntDV Adapter；调用只组装对象，不初始化 SuperForm 全局状态。 */
export declare function createAntdvAdapter(options?: AntdvAdapterOptions): UIAdapter;

export declare function createAntdvCapabilities(): Pick<UIAdapter, 'components' | 'form' | 'layout' | 'containers' | 'icons' | 'actions' | 'presentation'>;

export declare function createAntdvFields(): NonNullable<UIAdapter['fields']>;

export declare function renderAntdvIcon(icon: unknown, { customIcon }?: {
    customIcon?: (name: string) => any;
}): any;

export { UIAdapter }

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

