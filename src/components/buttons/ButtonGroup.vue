<template>
  <Space @click.stop="">
    <Button v-for="{ attrs, icon, label } of btns" :key="label" v-bind="attrs">
      <Tooltip v-if="__config.iconOnly && icon" :title="label"><component :is="useIcon(icon)" /></Tooltip>
      <span v-else><component v-if="icon" :is="useIcon(icon)" /> <component :is="() => toValue(label)" /></span>
    </Button>

    <Dropdown v-if="moreBtns.length">
      <Button v-bind="defaultAttrs"> <ellipsis-outlined /> </Button>
      <template #overlay>
        <Menu>
          <menu-item v-for="{ attrs, icon, label } of moreBtns" :key="label" :disabled="attrs.disabled">
            <Button block v-bind="attrs" shape="">
              <component v-if="icon" :is="useIcon(icon)" />
              {{ label }}
            </Button>
          </menu-item>
        </Menu>
      </template>
    </Dropdown>
  </Space>
</template>
<script setup lang="ts">
import { ref, watchEffect, PropType, reactive, toValue } from 'vue'
import { Space, Button, Tooltip, Dropdown, Menu, MenuItem } from 'ant-design-vue'
import { EllipsisOutlined } from '@ant-design/icons-vue'
import { getComputedStatus, useDisabled, useIcon } from '../../utils'
import { mergeActions } from './actions'
import { globalConfig } from '../../plugin'

const props = defineProps({
  config: {
    required: true,
    type: [Array, Object] as PropType<ExButtons>,
  },
  methods: Object,
  param: Object,
})

const { config, methods, param } = props
const __config = Array.isArray(config) ? { actions: config } : config
const { btns, moreBtns, defaultAttrs } = useButton(__config, reactive(param || {}), methods)
</script>

<script lang="ts">
function useButton(config: ExButtonGroup, param: Obj, methods?: Obj) {
  const { size, buttonShape, buttonType, roleMode, limit = 3, hidden, disabled, actions } = config
  const defaultAttrs = { size, type: buttonType, shape: buttonShape }
  const dis = useDisabled(disabled, param)
  const isHide = getComputedStatus(hidden, param)

  let actionBtns = mergeActions(actions, methods)
  if (globalConfig.buttonRoles) {
    const roles = globalConfig.buttonRoles()
    actionBtns = actionBtns.filter((item) => {
      const isFree = !item.roleName || !roles.includes(item.roleName)
      if (!isFree) {
        if ((item.roleMode || roleMode) === 'disable') {
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
      e.stopPropagation()
      item.onClick?.(param)
    }
    return { isHide, ...item, attrs: { ...defaultAttrs, ...item.attrs, disabled, onClick } }
  })

  const btns = ref<any[]>([])
  const moreBtns = ref<any[]>([])

  watchEffect(() => {
    const items = isHide.value ? [] : allBtns.filter(({ isHide }) => !isHide.value)
    const count = items.length === limit + 1 ? limit + 1 : limit
    btns.value = items.slice(0, count)
    moreBtns.value = items.slice(count)
  })
  return { btns, moreBtns, defaultAttrs }
}
</script>
