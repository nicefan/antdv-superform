<template>
  <a-space @click.stop="">
    <a-button v-for="{ attrs, icon, label } of btns" :key="label" v-bind="attrs">
      <a-tooltip v-if="$props.config.iconOnly && icon" :title="label"><v-icon :type="icon" /></a-tooltip>
      <span v-else><v-icon v-if="icon" :type="icon" /> {{ label }}</span>
    </a-button>

    <a-dropdown v-if="moreBtns.length">
      <a-button v-bind="defAttr"> 更多 <v-icon type="down" /> </a-button>
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
    const { btns, moreBtns, defAttr } = useButton(config, param, methods)
    return {
      btns,
      moreBtns,
      defAttr,
    }
  },
})
const _defaultActions = {
  add: {
    label: '新增',
    attrs: {
      type: 'primary',
    },
  },
  del: {
    label: '删除',
    attrs: {
      danger: true,
    },
    confirmText: '确定要删除吗？',
    disabled: (param) => !param.record && !(param.selectedRowKeys?.length > 0),
  },
  edit: {
    label: '修改',
    disabled: (param) => !param.record && !(param.selectedRowKeys?.length === 1),
  },
  submit: {
    label: '确定',
    attrs: {
      type: 'primary',
    },
    onClick(param) {
      console.log(param)
    },
  },
  reset: {
    label: '重置',
  },
}

function buildDefaultActions(methods) {
  const actions: Obj = { ..._defaultActions }
  Object.keys(methods).forEach((key) => {
    if (typeof methods[key] === 'function') {
      actions[key] && (actions[key].onClick = methods[key])
    } else {
      actions[key] = { ..._defaultActions[key], ...methods[key] }
    }
  })
  return actions
}

function useButton(config: ExButtonGroup, param, methods = {}) {
  const { type, shape, limit = 3, hidden, disabled, size, actions } = config
  const dis = useDisabled(disabled, param)
  const show = useShow(hidden, param)

  const defaultActions = buildDefaultActions(methods)

  const actionBtns: ButtonItem[] = []

  if (Array.isArray(actions)) {
    actions.forEach((item) => {
      const name = typeof item === 'string' ? item : item.name
      const button = { ...defaultActions[name] }
      if (typeof item === 'object') {
        const method = button.onClick
        Object.assign(button, item, { attrs: { ...button.attrs, ...item.attrs } })
        if (method && item.onClick) {
          button.onClick = (param) => {
            method(param)
            button.onClick(param)
          }
        }
      }
      button.onClick && actionBtns.push(button)
    })
  }

  const allBtns = actionBtns.map((item) => {
    const show = useShow(item.hidden, param)
    const disabled = item.disabled !== undefined ? useDisabled(item.disabled, param) : dis
    const onClick = (e) => {
      if (item.confirmText) {
        Modal.confirm({
          title: item.confirmText,
          okText: '确定',
          cancelText: '取消',
          onOk() {
            item.onClick?.(param)
          },
        })
      } else {
        e.stopPropagation()
        item.onClick?.(reactive(param))
      }
    }
    return { show, ...item, attrs: { size, type, shape, ...item.attrs, disabled, onClick } }
  })

  const btns = ref<any[]>([])
  const moreBtns = ref<any[]>([])

  watchEffect(() => {
    const items = !show.value ? [] : allBtns.filter(({ show }) => show.value)
    const count = items.length === limit + 1 ? limit + 1 : limit
    btns.value = items.slice(0, count)
    moreBtns.value = items.slice(count)
  })
  return { btns, moreBtns, defAttr: { size, type, shape } }
}
</script>
