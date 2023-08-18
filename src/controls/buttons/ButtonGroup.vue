<template>
  <Space @click.stop="">
    <Button v-for="{ attrs, icon, label } of btns" :key="label" v-bind="attrs">
      <Tooltip v-if="$props.config.iconOnly && icon" :title="label"><component :is="useIcon(icon)" /></Tooltip>
      <span v-else><component v-if="icon" :is="useIcon(icon)" /> {{ label }}</span>
    </Button>

    <Dropdown v-if="moreBtns.length">
      <Button v-bind="defaultAttrs"> <ellipsis-outlined /> </Button>
      <template #overlay>
        <Menu v-for="{ attrs, icon, label } of moreBtns" :key="label">
          <menu-item :disabled="attrs.disabled">
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
import { ref, watchEffect, PropType, reactive } from 'vue'
import { Space, Button, Tooltip, Dropdown, Menu, MenuItem } from 'ant-design-vue'
import { EllipsisOutlined } from '@ant-design/icons-vue'
import { useDisabled, useShow } from '../hooks/reactivity'
import { useIcon } from '../hooks/useIcon'
import { mergeActions } from './actions'

const props = defineProps({
  config: {
    required: true,
    type: Object as PropType<ExButtonGroup>,
  },
  methods: Object,
  param: Object,
})

const { config, methods, param } = props
const { btns, moreBtns, defaultAttrs } = useButton(config, reactive(param || {}), methods)
</script>

<script lang="ts">
function useButton(config: ExButtonGroup, param: Obj, methods?: Obj) {
  const { size, buttonShape, buttonType, limit = 3, hidden, disabled, actions } = config
  const defaultAttrs = { size, type: buttonType, shape: buttonShape }
  const dis = useDisabled(disabled, param)
  const show = useShow(hidden, param)

  const actionBtns = mergeActions(actions, methods)

  const allBtns = actionBtns.map((item) => {
    const show = useShow(item.hidden, param)
    const disabled = item.disabled !== undefined ? useDisabled(item.disabled, param) : dis
    const onClick = (e) => {
      e.stopPropagation()
      item.onClick?.(param)
    }
    return { show, ...item, attrs: { ...defaultAttrs, ...item.attrs, disabled, onClick } }
  })

  const btns = ref<any[]>([])
  const moreBtns = ref<any[]>([])

  watchEffect(() => {
    const items = !show.value ? [] : allBtns.filter(({ show }) => show.value)
    const count = items.length === limit + 1 ? limit + 1 : limit
    btns.value = items.slice(0, count)
    moreBtns.value = items.slice(count)
  })
  return { btns, moreBtns, defaultAttrs }
}
</script>
