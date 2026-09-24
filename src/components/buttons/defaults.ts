import type { ButtonItem } from '../../exaTypes'
import { builtInIcons } from '../../icons'
import { toValue } from 'vue'

export const buttonText = { confirm: '确定', cancel: '取消', more: '更多' }

/** Core 提供动作语义与框架无关图标；UI 补充原生外观，宿主绑定执行。 */
export const builtInButtons = {
  add: { label: '新增', icon: builtInIcons.add },
  delete: {
    label: '删除', icon: builtInIcons.delete, confirmText: '确定要删除吗？',
    disabled: (param) => !param.record && !(param.selectedRows?.length > 0),
  },
  edit: { label: '修改', icon: builtInIcons.edit, disabled: (param) => !param.record && param.selectedRows?.length !== 1 },
  detail: { label: '查看', icon: builtInIcons.detail, disabled: (param) => !param.record && param.selectedRows?.length !== 1 },
  submit: { label: '提交', icon: builtInIcons.submit },
  search: { label: '查询', icon: builtInIcons.search },
  reset: { label: '重置', icon: builtInIcons.reset },
  save: { label: '保存' },
  cancel: { label: '取消' },
  expand: {
    label: (context) => context.expanded ? '收起' : '展开',
    icon: (context) => toValue(context?.expanded) ? builtInIcons.collapse() : builtInIcons.expand(),
  },
} satisfies Record<string, Omit<ButtonItem, 'name'>>

export type BuiltInButtonName = keyof typeof builtInButtons
