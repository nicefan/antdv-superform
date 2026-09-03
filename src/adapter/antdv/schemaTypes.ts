import type {
  AutoCompleteProps,
  CheckboxGroupProps,
  ColProps,
  DatePickerProps,
  FormItemProps,
  FormProps,
  InputNumberProps,
  InputProps,
  RadioGroupProps,
  RangePickerProps,
  RowProps,
  SelectProps,
  SpaceProps,
  SwitchProps,
  TextAreaProps,
  TimePickerProps,
  TimeRangePickerProps,
  TreeSelectProps,
} from 'antdv-next'
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
  }
}

export {}
