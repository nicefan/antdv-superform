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
        Input: FormComponentProps<typeof import('element-plus')['ElInput']> & InputFieldAttrs
        Rate: FormComponentProps<typeof import('element-plus')['ElRate']>
        Select: FormComponentProps<typeof import('element-plus')['ElSelect']>
        Switch: FormComponentProps<typeof import('element-plus')['ElSwitch']> & SwitchFieldAttrs
      }
    }

    interface UIFormComponentOptionExtensionSources {
      elementPlus: {
        Input: InputFieldOption
        Select: SelectFieldOption
        Switch: SwitchFieldOption
      }
    }
  }
}

export {}
