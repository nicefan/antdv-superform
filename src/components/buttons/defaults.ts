import { translate } from '../../locale'
import type { ButtonItem } from '../../exaTypes'
import { builtInIcons } from '../../icons'
import { toValue } from 'vue'

/** Core 提供动作语义与框架无关图标；UI 补充原生外观，宿主绑定执行。 */
export const builtInButtons = {
  add: { label: () => translate('add'), icon: builtInIcons.add },
  delete: {
    label: () => translate('delete'), icon: builtInIcons.delete, confirmText: () => translate('deleteConfirm'),
    disabled: (param) => !param.record && !(param.selectedRows?.length > 0),
  },
  edit: { label: () => translate('edit'), icon: builtInIcons.edit, disabled: (param) => !param.record && param.selectedRows?.length !== 1 },
  detail: { label: () => translate('detail'), icon: builtInIcons.detail, disabled: (param) => !param.record && param.selectedRows?.length !== 1 },
  submit: { label: () => translate('submit'), icon: builtInIcons.submit },
  search: { label: () => translate('search'), icon: builtInIcons.search },
  reset: { label: () => translate('reset'), icon: builtInIcons.reset },
  save: { label: () => translate('save') },
  cancel: { label: () => translate('cancel') },
  expand: {
    label: (context) => translate(context.expanded ? 'collapse' : 'expand'),
    icon: (context) => toValue(context?.expanded) ? builtInIcons.collapse() : builtInIcons.expand(),
  },
} satisfies Record<string, Omit<ButtonItem, 'name'>>

export type BuiltInButtonName = keyof typeof builtInButtons
