import type { InputSearchProps } from './components/InputSearchField'
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
        DateRangePicker: Omit<FormComponentProps<typeof import('element-plus')['ElDatePicker']>, 'placeholder'> & { placeholder?: string | [string, string] }
        Input: FormComponentProps<typeof import('element-plus')['ElInput']>
        TextArea: FormComponentProps<typeof import('element-plus')['ElInput']>
        InputPassword: FormComponentProps<typeof import('element-plus')['ElInput']>
        InputSearch: InputSearchProps
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
        TimeRangePicker: Omit<FormComponentProps<typeof import('element-plus')['ElTimePicker']>, 'placeholder'> & { placeholder?: string | [string, string] }
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

    interface UIContainerComponentPropSources {
      elementPlus: {
        Col: FormComponentProps<typeof import('element-plus')['ElCol']>
        Form: FormComponentProps<typeof import('element-plus')['ElForm']>
        FormItem: FormComponentProps<typeof import('element-plus')['ElFormItem']>
        Row: FormComponentProps<typeof import('element-plus')['ElRow']>
        Space: FormComponentProps<typeof import('element-plus')['ElSpace']>
        Tabs: FormComponentProps<typeof import('element-plus')['ElTabs']>
      }
    }

    interface UIActionComponentPropSources {
      elementPlus: {
        Button: FormComponentProps<typeof import('element-plus')['ElButton']>
        Dropdown: FormComponentProps<typeof import('element-plus')['ElDropdown']>
        Tooltip: FormComponentProps<typeof import('element-plus')['ElTooltip']>
      }
    }

    interface UIModalComponentPropSources {
      elementPlus: {
        Modal: FormComponentProps<typeof import('element-plus')['ElDialog']>
      }
    }

    interface UIUploadComponentPropSources {
      elementPlus: {
        Upload: FormComponentProps<typeof import('element-plus')['ElUpload']>
      }
    }

    interface UITableComponentPropSources {
      elementPlus: {
        Table: FormComponentProps<typeof import('element-plus')['ElTable']> & {
          pagination?: false | FormComponentProps<typeof import('element-plus')['ElPagination']>
          rowSelection?: false | Obj
          height?: string | number
          ref?: any
        }
        Column: FormComponentProps<typeof import('element-plus')['ElTableColumn']>
        Pagination: FormComponentProps<typeof import('element-plus')['ElPagination']>
      }
    }
  }
}

export {}
