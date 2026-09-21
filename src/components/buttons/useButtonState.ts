import { computed, toValue } from 'vue'
import { isPlainObject, uniq } from 'lodash-es'
import { getUIRender } from '../../adapter'
import { globalConfig, globalProps } from '../../plugin'
import type { ExtButtonGroup } from '../../exaTypes'
import { mergeActions } from './actions'

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
  const allButtons = mergeActions(actions, methods || config.methods, defaultAttrs).flatMap((item) => {
    const denied = roles && item.roleName && !roles.includes(item.roleName)
    const roleMode = unauthorized(item) ?? unauthorized(config) ?? 'hide'
    if (denied && roleMode === 'hide') return []
    const itemHidden = status(item.hidden)
    const itemDisabled = item.disabled === undefined ? groupDisabled : status(item.disabled)
    const nativeAttrs: Obj = item.attrs || {}
    const nativeDisabled = status(nativeAttrs.disabled)
    // 原生禁用属性与动作禁用共同约束执行，不能被内置动作的默认判断清掉。
    const isDisabled = computed(() => !!denied || itemDisabled.value || nativeDisabled.value)
    const render = typeof item.customRender === 'string' ? rootSlots[item.customRender] : item.customRender
    const menu =
      item.dropdown &&
      computed(() => {
        const dropdown = toValue(item.dropdown) as any
        if (isPlainObject(dropdown)) return Object.entries(dropdown).map(([value, label]) => ({ value, label }))
        if (typeof dropdown?.[0] !== 'object') return uniq(dropdown || []).map((value) => ({ value, label: value }))
        return dropdown
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
      async execute(event) {
        if (!action.visible || action.disabled || action.loading) return
        return item.onClick?.({ ...param, e: event })
      },
    }
    const tooltipTitle = computed(() => {
      const tips =
        isDisabled.value && item.disabledTooltip
          ? item.disabledTooltip
          : item.tooltip || (iconOnly && item.icon ? item.label : undefined)
      return typeof tips === 'function' ? tips(param) : tips
    })
    return [
      {
        ...item,
        action,
        render,
        menu,
        tooltipTitle,
        onClick: action.execute,
        attrs: { ...defaultAttrs, ...item.attrs, disabled: computed(() => action.disabled || item.pending.value) },
      },
    ]
  })
  return {
    render() {
      const buttons = allButtons.filter((item) => item.action.visible)
      if (!buttons.length) return null
      const count = limit == null ? buttons.length : iconOnly && buttons.length === limit + 1 ? limit + 1 : limit
      return getUIRender('actionGroup')({
        groupProps: config.attrs,
        buttons: buttons.slice(0, count),
        moreButtons: buttons.slice(count),
        defaultButtonProps: defaultAttrs,
        divider: config.divider,
        labelOnly,
        iconOnly,
        moreLabel: config.moreLabel,
        effectData: param,
      })
    },
  }
}
