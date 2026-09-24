import { computed, toValue, unref } from 'vue'
import { uniq } from 'lodash-es'
import { getUIRender, type UIActionItem } from '../../adapter'
import { globalConfig, globalProps } from '../../plugin'
import type { ActionMenuOption, ExtButtonGroup } from '../../exaTypes'
import { mergeActions } from './actions'
import { toNode } from '../../utils'
import { builtInIcons } from '../../icons'

/** 统一合成按钮权限与执行状态；使用 computed，行缓存不额外建立侦听副作用。 */
export function useButtonState(
  config: ExtButtonGroup,
  param: Obj,
  methods?: Obj,
  rootSlots: Obj = {},
  enabled = () => true
) {
  const { buttonProps, limit, hidden, disabled, actions } = config
  const iconOnly = config.labelMode === 'icon'
  const labelOnly = config.labelMode === 'label'
  const defaultAttrs = { ...globalProps.Buttons?.buttonProps, ...buttonProps }
  const status = (value: any) => computed(() => !!(typeof value === 'function' ? value(param) : toValue(value)))
  const groupHidden = status(hidden)
  const groupDisabled = status(disabled)
  const unauthorized = (item: Pick<ExtButtonGroup, 'unauthorized' | 'invalidDisabled' | 'roleMode'>) =>
    item.unauthorized ??
    (item.invalidDisabled ? 'disable' : item.roleMode === 'disable' ? 'disable' : item.roleMode && 'hide')
  const roles = globalConfig.buttonRoles?.()
  const allButtons = mergeActions(actions, methods || config.methods, defaultAttrs).flatMap((item, index) => {
    const denied = roles && item.roleName && !roles.includes(item.roleName)
    const roleMode = unauthorized(item) ?? unauthorized(config) ?? 'hide'
    if (denied && roleMode === 'hide') return []
    const itemHidden = status(item.hidden)
    const itemDisabled = item.disabled === undefined ? groupDisabled : status(item.disabled)
    const nativeAttrs: Obj = item.attrs || {}
    const nativeDisabled = status(nativeAttrs.disabled)
    // 原生禁用属性与动作禁用共同约束执行，不能被内置动作的默认判断清掉。
    const isDisabled = computed(() => !!denied || groupDisabled.value || itemDisabled.value || nativeDisabled.value)
    const render = typeof item.customRender === 'string' ? rootSlots[item.customRender] : item.customRender
    const menu =
      item.dropdown &&
      computed<ActionMenuOption[]>(() => {
        const dropdown = typeof item.dropdown === 'function' ? item.dropdown(param) : toValue(item.dropdown)
        if (!dropdown) return []
        if (!Array.isArray(dropdown)) {
          return Object.entries(dropdown as Readonly<Record<string, string | number | Fn>>)
            .map(([value, label]) => ({ value, label }))
        }
        const values = dropdown as readonly (string | number | boolean | ActionMenuOption)[]
        return uniq(values).map((entry) =>
          typeof entry === 'object' && entry !== null ? entry : { value: entry, label: String(entry) }
        )
      })
    const action = {
      get visible() {
        return enabled() && !groupHidden.value && !itemHidden.value
      },
      get disabled() {
        return isDisabled.value
      },
      get loading() {
        return item.pending.value || !!toValue(nativeAttrs.loading)
      },
      async execute(event?: unknown, selection?: { value: unknown }) {
        if (!action.visible || action.disabled || action.loading) return
        return item.onClick?.({ ...param, ...selection, e: event })
      },
    }
    const tooltipTitle = computed(() => {
      const tips =
        isDisabled.value && item.disabledTooltip
          ? item.disabledTooltip
          : item.tooltip || (iconOnly && item.icon ? item.label : undefined)
      return toNode(tips, param)
    })
    const uiItem: UIActionItem = {
      key: index,
      name: item.name,
      label: () => toNode(item.label, param),
      icon: item.icon ? () => item.icon?.(param) : undefined,
      tooltip: () => tooltipTitle.value,
      get disabled() { return action.disabled || item.pending.value },
      get attrs() {
        return Object.fromEntries(Object.entries(nativeAttrs).map(([key, value]) => [key, unref(value)]))
      },
      get menu() {
        return menu ? menu.value.map((entry, menuIndex) => ({
          key: menuIndex,
          value: entry.value,
          label: () => toNode(entry.label, param),
          icon: entry.icon ? () => entry.icon?.(param) : undefined,
          disabled: !!(typeof entry.disabled === 'function' ? entry.disabled(param) : toValue(entry.disabled)),
        })) : undefined
      },
      dropdownProps: item.dropdownProps as Obj | undefined,
      render: render ? (attrs) => render({ ...param, props: attrs }) : undefined,
      onClick: (event) => action.execute(event),
      onSelect: (value, event) => {
        const entry = uiItem.menu?.find((entry) => Object.is(entry.value, value))
        if (!entry || entry.disabled) return
        return action.execute(event, { value })
      },
    }
    return [{ action, uiItem }]
  })
  return {
    render() {
      const buttons = allButtons.filter((item) => item.action.visible).map((item) => item.uiItem)
      if (!buttons.length) return null
      const maximum = limit == null || !Number.isFinite(limit) ? buttons.length : Math.max(0, Math.floor(limit))
      const count = iconOnly && buttons.length === maximum + 1 ? maximum + 1 : maximum
      return getUIRender('actionGroup')({
        groupProps: config.attrs,
        buttons: buttons.slice(0, count),
        moreButtons: buttons.slice(count),
        defaultButtonProps: defaultAttrs,
        divider: config.divider,
        labelOnly,
        iconOnly,
        moreLabel: () => config.moreLabel === undefined ? builtInIcons.more() : toNode(config.moreLabel, param),
      })
    },
  }
}
