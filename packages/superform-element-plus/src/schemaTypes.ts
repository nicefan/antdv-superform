import type {
  FormComponentProps,
  InputFieldAttrs,
  InputFieldOption,
  SelectFieldOption,
  SwitchFieldAttrs,
  SwitchFieldOption,
} from 'superform'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace SuperFormTypeRegistry {
    interface UIFormComponentPropSources {
      elementPlus: {
        Input: FormComponentProps<typeof import('element-plus')['ElInput']> &
          InputFieldAttrs
        Rate: FormComponentProps<typeof import('element-plus')['ElRate']>
        Select: FormComponentProps<typeof import('element-plus')['ElSelect']>
        Switch: FormComponentProps<typeof import('element-plus')['ElSwitch']> &
          SwitchFieldAttrs
      }
    }

    interface UIFormComponentOptionExtensionSources {
      elementPlus: {
        Input: InputFieldOption
        Select: SelectFieldOption
        Switch: SwitchFieldOption
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
