<template>
  <a-space @click.stop="">
    <a-button v-for="{ attr, icon, label } of btns" :key="label" v-bind="attr">
      <a-tooltip v-if="$props.config.iconOnly && icon" :title="label"><v-icon :type="icon" /></a-tooltip>
      <span v-else><v-icon v-if="icon" :type="icon" /> {{ label }}</span>
    </a-button>

    <a-dropdown v-if="moreBtns.length">
      <a-button v-bind="defAttr"> 更多 <v-icon type="down" /> </a-button>
      <template #overlay>
        <a-menu v-for="{ attr, icon, label } of moreBtns" :key="label">
          <a-menu-item :disabled="attr.disabled">
            <a-button block v-bind="attr" shape=""> <v-icon v-if="icon" :type="icon" />{{ label }} </a-button>
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </a-space>
</template>
<script lang="ts">
import { ref, watchEffect, defineComponent, inject, PropType, readonly } from 'vue'
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
    const { config, methods } = props
    const formData = inject('formData')
    const param = readonly({ formData, ...props.param })
    const { btns, moreBtns, defAttr } = useButton(config, param, methods)
    return {
      btns,
      moreBtns,
      defAttr,
    }
  },
})

function useButton(config: ExButtonGroup, param, methods) {
  const { type, shape, limit = 3, hidden, disabled, size, actions } = config
  const dis = useDisabled(disabled, param)
  const show = useShow(hidden, param)

  const actionBtns: Obj[] = []
  if (actions && methods) {
    const actionsKeys = Array.isArray(actions) ? actions : Object.keys(actions)
    actionsKeys.forEach((key) => {
      const obj: Obj = { method: methods[key] }
      let label
      switch (key) {
        case 'add':
          label = '新增'
          break
        case 'del':
          label = '删除'
          obj.danger = true
          obj.confirmText = '确定要删除吗？'
          obj.disabled = (param) => !param.record && !(param.selectedRowKeys?.length > 0)
          break
        case 'edit':
          label = '修改'
          obj.disabled = (param) => !param.record && !(param.selectedRowKeys?.length === 1)
      }
      actionBtns.push(Object.assign(obj, { label, ...actions[key] }))
    })
  }

  const allBtns = actionBtns.concat(config.subItems || []).map((item) => {
    const show = useShow(item.hide, param)
    const disabled = item.disabled !== undefined ? useDisabled(item.disabled, param) : dis
    const onClick = (e) => {
      if (item.confirmText) {
        Modal.confirm({
          title: item.confirmText,
          okText: '确定',
          cancelText: '取消',
          onOk() {
            item.method?.(param)
            item.onClick?.(param)
          },
        })
      } else {
        e.stopPropagation()
        item.method?.(param)
        item.onClick?.(param)
      }
    }
    return { show, ...item, attr: { size, type, shape, ...item.attr, disabled, onClick } }
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
