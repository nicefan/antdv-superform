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
  TabsProps,
  TreeSelectProps,
  UploadProps,
} from 'antdv-next'
import type { ModalFuncProps, ModalProps } from 'antdv-next/dist/modal/interface'
import type { Ref } from 'vue'
import type {
  AutoCompleteFieldOption,
  RangeFieldOption,
  SelectFieldOption,
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
        Tabs: TabsProps
      }
    }

    interface UIFormComponentPropSources {
      antdv: {
        AutoComplete: AutoCompleteProps
        Cascader: FormComponentProps<typeof import('antdv-next')['Cascader']>
        Checkbox: FormComponentProps<typeof import('antdv-next')['Checkbox']>
        CheckboxGroup: CheckboxGroupProps
        ColorPicker: FormComponentProps<typeof import('antdv-next')['ColorPicker']>
        DateMonthPicker: FormComponentProps<typeof import('antdv-next')['DateMonthPicker']>
        DatePicker: DatePickerProps
        DateQuarterPicker: FormComponentProps<typeof import('antdv-next')['DateQuarterPicker']>
        DateRangePicker: RangePickerProps
        DateWeekPicker: FormComponentProps<typeof import('antdv-next')['DateWeekPicker']>
        DateYearPicker: FormComponentProps<typeof import('antdv-next')['DateYearPicker']>
        Input: InputProps
        InputNumber: InputNumberProps
        InputOTP: FormComponentProps<typeof import('antdv-next')['InputOTP']>
        InputPassword: FormComponentProps<typeof import('antdv-next')['InputPassword']>
        InputSearch: FormComponentProps<typeof import('antdv-next')['InputSearch']>
        Mentions: FormComponentProps<typeof import('antdv-next')['Mentions']>
        Radio: FormComponentProps<typeof import('antdv-next')['Radio']>
        RadioGroup: RadioGroupProps
        Rate: FormComponentProps<typeof import('antdv-next')['Rate']>
        Segmented: FormComponentProps<typeof import('antdv-next')['Segmented']>
        Select: SelectProps
        Slider: FormComponentProps<typeof import('antdv-next')['Slider']>
        Switch: SwitchProps
        TextArea: TextAreaProps
        TimePicker: TimePickerProps
        TimeRangePicker: TimeRangePickerProps
        Transfer: FormComponentProps<typeof import('antdv-next')['Transfer']>
        TreeSelect: TreeSelectProps
      }
    }

    interface UIFormComponentOptionExtensionSources {
      antdv: {
        AutoComplete: AutoCompleteFieldOption
        CheckboxGroup: SelectFieldOption
        DateRangePicker: RangeFieldOption
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
