<template>
  <a-space @click.stop="">
    <a-button v-for="{ attrs, icon, label } of btns" :key="label" v-bind="attrs">
      <a-tooltip v-if="$props.config.iconOnly && icon" :title="label"><v-icon :type="icon" /></a-tooltip>
      <span v-else><v-icon v-if="icon" :type="icon" /> {{ label }}</span>
    </a-button>

    <a-dropdown v-if="moreBtns.length">
      <a-button v-bind="defaultAttrs"> 更多 <v-icon type="down" /> </a-button>
      <template #overlay>
        <a-menu v-for="{ attrs, icon, label } of moreBtns" :key="label">
          <a-menu-item :disabled="attrs.disabled">
            <a-button block v-bind="attrs" shape=""> <v-icon v-if="icon" :type="icon" />{{ label }} </a-button>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </a-space>
</template>
<script lang="ts">
import { ref, watchEffect, defineComponent, inject, PropType, readonly, reactive } from 'vue'
import { Space, Button, Tooltip, Dropdown, Menu, MenuItem, Modal } from 'ant-design-vue'
import VIcon from '../../icon/VIcon'
import { useDisabled, useShow } from '../../utils/util'
import { mergeActions } from './actions'

export default defineComponent({
  components: {
    VIcon,
    ASpace: Space,
    AButton: Button,
    ATooltip: Tooltip,
    ADropdown: Dropdown,
    AMenu: Menu,
    AMenuItem: MenuItem,
  },
  props: {
    config: {
      required: true,
      type: Object as PropType<ExButtonGroup>,
    },
    methods: Object,
    param: Object,
  },
  setup(props) {
    const { config, methods, param } = props
    // const formData = inject('formData')
    const { btns, moreBtns, defaultAttrs } = useButton(config, reactive(param || {}), methods)
    return {
      btns,
      moreBtns,
      defaultAttrs,
    }
  },
})

function useButton(config: ExButtonGroup, param: Obj, methods?: Obj) {
  const { defaultAttrs, limit = 3, hidden, disabled, actions } = config
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
