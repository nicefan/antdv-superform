import type { FormComponentProps } from '../../components'
import type {
  InputFieldAttrs,
  InputFieldOption,
  SelectFieldOption,
  SwitchFieldAttrs,
  SwitchFieldOption,
} from '../../exaTypes'

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace SuperFormTypeRegistry {
    interface UIFormComponentProps {
      ElInput: FormComponentProps<typeof import('element-plus')['ElInput']> & InputFieldAttrs
      ElSelect: FormComponentProps<typeof import('element-plus')['ElSelect']>
      ElSwitch: FormComponentProps<typeof import('element-plus')['ElSwitch']> & SwitchFieldAttrs
    }

    interface UIFormComponentOptionExtensions {
      ElInput: InputFieldOption
      ElSelect: SelectFieldOption
      ElSwitch: SwitchFieldOption
    }
  }
}

export {}
