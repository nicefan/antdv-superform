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
import type {
  AutoCompleteFieldOption,
  InputFieldAttrs,
  InputFieldOption,
  RangeFieldOption,
  SelectFieldOption,
  SwitchFieldAttrs,
  SwitchFieldOption,
  TreeFieldOption,
} from '../../exaTypes'

declare global {
  // 声明合并能让类型目录在 d.ts 汇总后保持稳定，不遗留源码相对路径。
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace SuperFormTypeRegistry {
    interface UIContainerComponentProps {
      Col: ColProps
      Form: FormProps
      FormItem: FormItemProps
      Row: RowProps
      Space: SpaceProps
    }

    interface UIFormComponentProps {
      AutoComplete: AutoCompleteProps
      CheckboxGroup: CheckboxGroupProps
      DatePicker: DatePickerProps
      DateRangePicker: RangePickerProps
      Input: InputProps & InputFieldAttrs
      InputNumber: InputNumberProps
      RadioGroup: RadioGroupProps
      Select: SelectProps
      Switch: SwitchProps & SwitchFieldAttrs
      TextArea: TextAreaProps
      TimePicker: TimePickerProps
      TimeRangePicker: TimeRangePickerProps
      TreeSelect: TreeSelectProps
    }

    interface UIFormComponentOptionExtensions {
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

    interface UIActionComponentProps {
      Button: ButtonProps
      Dropdown: DropdownProps
      Tooltip: TooltipProps
    }

    interface UITableComponentProps {
      Table: TableProps
      Column: TableColumnType
      Pagination: PaginationProps
    }

    interface UIModalComponentProps {
      Modal: ModalFuncProps & ModalProps
    }

    interface UIUploadComponentProps {
      Upload: UploadProps
    }
  }
}

export {}
