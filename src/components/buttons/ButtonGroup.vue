<template>
  <component
    :is="
      () =>
        renderUIAction('group', {
          groupProps: attrs,
          buttons: btns,
          moreButtons: moreBtns,
          defaultButtonProps: defaultAttrs,
          divider: isDivider,
          labelOnly,
          iconOnly,
          moreLabel,
          effectData,
        })
    "
  />
</template>
<script setup lang="ts">
import { ref, watchEffect, reactive, toValue, inject, computed } from 'vue'
import { getComputedStatus, useDisabled } from '../../utils'
import { renderUIAction } from '../../adapter'
import { mergeActions } from './actions'
import { globalConfig } from '../../plugin'
import type { ExtButtonGroup, ExtButtons } from '../../exaTypes'
import { isPlainObject, uniq } from 'lodash-es'

const props = defineProps<{
  option: ExtButtons
  methods?: Obj
  effectData?: Obj
}>()
const { option, methods, effectData } = props

const __config = Array.isArray(option) ? { actions: option } : option
const { attrs, moreLabel, divider, buttonType } = __config
const iconOnly = __config.labelMode === 'icon'
const labelOnly = __config.labelMode === 'label'
const { btns, moreBtns, defaultAttrs } = useButton(__config, reactive(effectData || {}), methods || __config.methods)
const isDivider = divider ?? (attrs?.direction !== 'vertical' && ['link', 'text'].includes(buttonType || ''))
</script>

<script lang="ts">
function useButton(config: ExtButtonGroup, param: Obj, methods?: Obj) {
  const { size, buttonShape, buttonType, limit, hidden, disabled, actions } = config
  const groupUnauthorized =
    config.unauthorized ??
    (config.invalidDisabled ? 'disable' : config.roleMode === 'disable' ? 'disable' : config.roleMode && 'hide')
  const iconOnly = config.labelMode === 'icon'
  const defaultAttrs = { size, type: buttonType, shape: buttonShape }
  const dis = useDisabled(disabled, param)
  const isHide = getComputedStatus(hidden, param)

  let actionBtns = mergeActions(actions, methods, defaultAttrs)
  if (globalConfig.buttonRoles) {
    const roles = globalConfig.buttonRoles()
    actionBtns = actionBtns.filter((item) => {
      const isFree = !item.roleName || roles.includes(item.roleName)
      if (!isFree) {
        const unauthorized =
          item.unauthorized ??
          (item.invalidDisabled ? 'disable' : item.roleMode === 'disable' ? 'disable' : item.roleMode && 'hide') ??
          groupUnauthorized ??
          'hide'
        if (unauthorized === 'disable') {
          item.disabled = true
        } else {
          return false
        }
      }
      return true
    })
  }
  const rootSlots = inject('rootSlots', {})
  const allBtns = actionBtns.map((item) => {
    const isHide = getComputedStatus(item.hidden, param)
    const disabled = item.disabled !== undefined ? useDisabled(item.disabled, param) : dis
    const onClick = (e) => item.onClick?.({ ...param, e })
    const menu =
      item.dropdown &&
      computed(() => {
        const config = toValue(item.dropdown) as any
        if (isPlainObject(config)) {
          return Object.entries(config).map(([value, label]) => ({
            value,
            label,
          }))
        } else if (typeof config[0] !== 'object') {
          return uniq(config).map((txt) => ({ value: txt, label: txt }))
        }
        return config
      })
    const render = typeof item.customRender === 'string' ? rootSlots[item.customRender] : item.customRender
    const tooltipTitle = computed(() => {
      const tips =
        disabled.value && item.disabledTooltip
          ? item.disabledTooltip
          : item.tooltip || (iconOnly && item.icon ? item.label : undefined)
      return typeof tips === 'function' ? tips(param) : tips
    })
    return {
      isHide,
      render,
      menu,
      ...item,
      tooltipTitle,
      onClick,
      attrs: { ...defaultAttrs, ...item.attrs, disabled },
    }
  })

  const btns = ref<any[]>([])
  const moreBtns = ref<any[]>([])

  watchEffect(() => {
    const items = isHide.value ? [] : allBtns.filter(({ isHide }) => !isHide.value)
    btns.value = items
    if (limit !== undefined && limit !== null) {
      const count = iconOnly && items.length === limit + 1 ? limit + 1 : limit
      btns.value = items.slice(0, count)
      moreBtns.value = items.slice(count)
    }
  })
  return { btns, moreBtns, defaultAttrs }
}
</script>
