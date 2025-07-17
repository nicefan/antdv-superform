<template>
  <Space class="sup-buttons" @click.stop="" :size="isDivider ? 0 : 'small'" v-bind="attrs">
    <template v-for="({ attrs, icon, label, tooltip, dropdown, menu, onClick }, index) of btns" :key="label">
      <Dropdown v-if="dropdown" :disabled="attrs.disabled">
        <template #overlay>
          <Menu @click="onClick">
            <menu-item v-for="item of menu" :key="item.value">
              <component :is="() => toNode(item.label, effectData)" />
            </menu-item>
          </Menu>
        </template>
        <Button v-bind="attrs">
          <component v-if="icon" :is="useIcon(icon)" />
          <component :is="() => toNode(label, effectData)" /><DownOutlined />
        </Button>
      </Dropdown>
      <Tooltip v-else-if="tooltip || (iconOnly && icon)" :title="tooltip || label">
        <Button v-bind="attrs"
          ><component v-if="icon && !labelOnly" :is="useIcon(icon)" />
          <component v-if="!icon || !iconOnly" :is="() => toNode(label, effectData)"
        /></Button>
      </Tooltip>
      <Button v-else v-bind="attrs">
        <component v-if="icon && !labelOnly" :is="useIcon(icon)" /> <component :is="() => toNode(label, effectData)" />
      </Button>
      <Divider type="vertical" class="buttons-divider" v-if="isDivider && index < btns.length - 1" />
    </template>

    <Dropdown v-if="moreBtns.length">
      <Button v-bind="defaultAttrs">
        <component v-if="moreLabel" :is="() => toNode(moreLabel, effectData)" /><ellipsis-outlined v-else />
      </Button>
      <template #overlay>
        <Menu>
          <menu-item v-for="{ attrs, icon, label } of moreBtns" :key="label" :disabled="attrs.disabled">
            <Button block v-bind="attrs" shape="">
              <component v-if="icon" :is="useIcon(icon)" />
              <component :is="() => toNode(label, effectData)" />
            </Button>
          </menu-item>
        </Menu>
      </template>
    </Dropdown>
  </Space>
</template>
<script setup lang="ts">
import { ref, watchEffect, reactive, toValue } from 'vue'
import { Space, Button, Tooltip, Dropdown, Menu, MenuItem, Divider } from 'ant-design-vue'
import { EllipsisOutlined, DownOutlined } from '@ant-design/icons-vue'
import { getComputedStatus, useDisabled, useIcon, toNode } from '../../utils'
import { mergeActions } from './actions'
import { globalConfig } from '../../plugin'
import type { ExtButtonGroup, ExtButtons } from '../../exaTypes'
import { isArray, isPlainObject, uniq } from 'lodash-es'

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
  const { size, buttonShape, buttonType, roleMode, limit, hidden, disabled, actions, invalidDisabled } = config
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
        if (item.invalidDisabled || invalidDisabled || (item.roleMode || roleMode) === 'disable') {
          item.disabled = true
        } else {
          return false
        }
      }
      return true
    })
  }
  const allBtns = actionBtns.map((item) => {
    const isHide = getComputedStatus(item.hidden, param)
    const disabled = item.disabled !== undefined ? useDisabled(item.disabled, param) : dis
    const onClick = (e) => {
      !(e.domEvent || e).stopPropagation()
      item.onClick?.({ ...param, e })
    }
    const _class = item.color && `ant-btn-${item.color}`
    if (item.dropdown) {
      let menu = isArray(item.dropdown) ? item.dropdown : []
      if (isPlainObject(item.dropdown)) {
        menu = Object.entries(item.dropdown).map(([value, label]) => ({ value, label }))
      } else if (typeof menu[0] !== 'object') {
        menu = uniq(menu).map((txt) => ({ value: txt, label: txt }))
      }
      return { isHide, ...item, menu, onClick, attrs: { ...defaultAttrs, class: _class, ...item.attrs, disabled } }
    }
    return { isHide, ...item, attrs: { ...defaultAttrs, class: _class, ...item.attrs, disabled, onClick } }
  })

  const btns = ref<any[]>([])
  const moreBtns = ref<any[]>([])

  watchEffect(() => {
    const items = isHide.value ? [] : allBtns.filter(({ isHide }) => !isHide.value)
    btns.value = items
    if (limit) {
      const count = iconOnly && items.length === limit + 1 ? limit + 1 : limit
      btns.value = items.slice(0, count)
      moreBtns.value = items.slice(count)
    }
  })
  return { btns, moreBtns, defaultAttrs }
}
</script>
