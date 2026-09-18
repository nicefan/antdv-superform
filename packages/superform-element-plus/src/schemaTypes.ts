import type {
  FormComponentProps,
  RangeFieldOption,
  TreeFieldOption,
  SelectFieldOption,
  SwitchFieldOption,
} from 'superform'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace SuperFormTypeRegistry {
    interface UIFormComponentPropSources {
      elementPlus: {
        Autocomplete: FormComponentProps<typeof import('element-plus')['ElAutocomplete']>
        Cascader: FormComponentProps<typeof import('element-plus')['ElCascader']>
        Checkbox: FormComponentProps<typeof import('element-plus')['ElCheckbox']>
        CheckboxGroup: FormComponentProps<typeof import('element-plus')['ElCheckboxGroup']>
        ColorPicker: FormComponentProps<typeof import('element-plus')['ElColorPicker']>
        DatePicker: FormComponentProps<typeof import('element-plus')['ElDatePicker']>
        DateRangePicker: FormComponentProps<typeof import('element-plus')['ElDatePicker']>
        Input: FormComponentProps<typeof import('element-plus')['ElInput']>
        InputNumber: FormComponentProps<typeof import('element-plus')['ElInputNumber']>
        InputOtp: FormComponentProps<typeof import('element-plus')['ElInputOtp']>
        InputTag: FormComponentProps<typeof import('element-plus')['ElInputTag']>
        Mention: FormComponentProps<typeof import('element-plus')['ElMention']>
        Radio: FormComponentProps<typeof import('element-plus')['ElRadio']>
        RadioGroup: FormComponentProps<typeof import('element-plus')['ElRadioGroup']>
        Rate: FormComponentProps<typeof import('element-plus')['ElRate']>
        Segmented: FormComponentProps<typeof import('element-plus')['ElSegmented']>
        Select: FormComponentProps<typeof import('element-plus')['ElSelect']>
        SelectV2: FormComponentProps<typeof import('element-plus')['ElSelectV2']>
        Slider: FormComponentProps<typeof import('element-plus')['ElSlider']>
        Switch: FormComponentProps<typeof import('element-plus')['ElSwitch']>
        TimePicker: FormComponentProps<typeof import('element-plus')['ElTimePicker']>
        TimeRangePicker: FormComponentProps<typeof import('element-plus')['ElTimePicker']>
        TimeSelect: FormComponentProps<typeof import('element-plus')['ElTimeSelect']>
        Transfer: FormComponentProps<typeof import('element-plus')['ElTransfer']>
        TreeSelect: FormComponentProps<typeof import('element-plus')['ElTreeSelect']>
      }
    }

    interface UIFormComponentOptionExtensionSources {
      elementPlus: {
        CheckboxGroup: SelectFieldOption
        DatePicker: RangeFieldOption
        DateRangePicker: RangeFieldOption
        RadioGroup: SelectFieldOption
        Select: SelectFieldOption
        SelectV2: SelectFieldOption
        Switch: SwitchFieldOption
        TreeSelect: TreeFieldOption
        TimePicker: RangeFieldOption
        TimeRangePicker: RangeFieldOption
      }
    }

    interface UITableComponentPropSources {
      elementPlus: {
        Table: FormComponentProps<typeof import('element-plus')['ElTable']> & {
          pagination?:
            | false
            | FormComponentProps<typeof import('element-plus')['ElPagination']>
          rowSelection?: false | Obj
          height?: string | number
          ref?: any
        }
        Column: FormComponentProps<
          typeof import('element-plus')['ElTableColumn']
        >
        Pagination: FormComponentProps<
          typeof import('element-plus')['ElPagination']
        >
      }
    }
  }
}

export {}
