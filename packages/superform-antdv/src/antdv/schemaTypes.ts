import type {
  AutoCompleteProps,
  ButtonProps,
  CheckboxGroupProps,
  ColProps,
  DatePickerProps,
  DropdownProps,
  FormItemProps,
  FormProps,
  InputNumberProps,
  InputProps,
  PaginationProps,
  RadioGroupProps,
  RangePickerProps,
  RowProps,
  SelectProps,
  SpaceProps,
  SwitchProps,
  TableColumnType,
  TableProps,
  TextAreaProps,
  TimePickerProps,
  TimeRangePickerProps,
  TooltipProps,
  TreeSelectProps,
  UploadProps,
} from 'antdv-next'
import type { ModalFuncProps, ModalProps } from 'antdv-next/dist/modal/interface'
import type { Ref } from 'vue'
import type {
  AutoCompleteFieldOption,
  InputFieldAttrs,
  InputFieldOption,
  RangeFieldOption,
  SelectFieldOption,
  SwitchFieldAttrs,
  SwitchFieldOption,
  TreeFieldOption,
} from 'superform'
import type { FormComponentProps } from 'superform'

type AntdvTableProps = Omit<TableProps, 'pagination' | 'rowSelection'> & {
  /** SuperTable 允许把响应式分页状态直接放在 schema 中。 */
  pagination?: false | (PaginationProps & { current?: number | Ref<number> })
  /** SuperTable 允许把响应式选择状态直接放在 schema 中。 */
  rowSelection?: false | (NonNullable<TableProps['rowSelection']> & { selectedRowKeys?: unknown[] | Ref<unknown[]> })
  height?: string | number
  ref?: any
  onResizeColumn?: (width: number, column: TableColumnType) => void
}

declare global {
  // 声明合并使 Adapter 类型在汇总声明后仍通过公开包名引用 Core 类型。
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace SuperFormTypeRegistry {
    interface UIContainerComponentPropSources {
      antdv: {
        Col: ColProps
        Form: FormProps
        FormItem: FormItemProps
        Row: RowProps
        Space: SpaceProps
      }
    }

    interface UIFormComponentPropSources {
      antdv: {
        AutoComplete: AutoCompleteProps
        Checkbox: FormComponentProps<typeof import('antdv-next')['Checkbox']>
        CheckboxGroup: CheckboxGroupProps
        DatePicker: DatePickerProps
        DateRangePicker: RangePickerProps
        Input: InputProps & InputFieldAttrs
        InputNumber: InputNumberProps
        Radio: FormComponentProps<typeof import('antdv-next')['Radio']>
        RadioGroup: RadioGroupProps
        Rate: FormComponentProps<typeof import('antdv-next')['Rate']>
        Select: SelectProps
        Switch: SwitchProps & SwitchFieldAttrs
        TextArea: TextAreaProps
        TimePicker: TimePickerProps
        TimeRangePicker: TimeRangePickerProps
        TreeSelect: TreeSelectProps
      }
    }

    interface UIFormComponentOptionExtensionSources {
      antdv: {
        AutoComplete: AutoCompleteFieldOption
        CheckboxGroup: SelectFieldOption
        DateRangePicker: RangeFieldOption
        Input: InputFieldOption
        RadioGroup: SelectFieldOption
        Select: SelectFieldOption
        Switch: SwitchFieldOption
        TimeRangePicker: RangeFieldOption
        TreeSelect: TreeFieldOption<TreeSelectProps['treeData']>
      }
    }

    interface UIActionComponentPropSources {
      antdv: {
        Button: ButtonProps
        Dropdown: DropdownProps
        Tooltip: TooltipProps
      }
    }

    interface UITableComponentPropSources {
      antdv: {
        Table: AntdvTableProps
        Column: TableColumnType & { resizable?: boolean }
        Pagination: PaginationProps
      }
    }

    interface UIModalComponentPropSources {
      antdv: {
        Modal: ModalFuncProps & ModalProps
      }
    }

    interface UIUploadComponentPropSources {
      antdv: {
        Upload: UploadProps
      }
    }
  }
}

export {}
