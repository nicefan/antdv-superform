import { useDisabled, useShow, getListener } from '../util'
import Modal from 'ant-design-vue/es/modal'
import 'ant-design-vue/es/modal/style'
import { computed, ref, watchEffect } from 'vue'

export default function renderButtons(buttons: ExButtonGroup, formData, methods: Obj = {}) {
  // if (!buttons) return
  const { type: _type, limit = 3, hide, disabled, size, iconOnly, actions } = buttons
  const dis = useDisabled(disabled, formData)
  const show = useShow(hide, formData)
  const shape = _type && ['circle', 'round'].includes(_type) ? _type : undefined
  const type = !shape ? _type : undefined
  const actionBtns: Obj[] = []
  if (actions) {
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
          break
        case 'edit':
          label = '修改'
      }
      actionBtns.push(Object.assign(obj, { label, ...actions[key] }))
    })
  }

  let eventParam: Obj | undefined
  const allBtns = actionBtns.concat(buttons.items || []).map((item) => {
    const show = useShow(item.hide, formData)
    const disabled = item.disabled !== undefined ? useDisabled(item.disabled, formData) : dis
    const onClick = (e) => {
      if (item.confirmText) {
        Modal.confirm({
          title: item.confirmText,
          okText: '确定',
          cancelText: '取消',
          onOk() {
            item.method?.(eventParam)
            item.onClick?.(formData, eventParam)
          },
        })
      } else {
        e.stopPropagation()
        item.method?.(eventParam)
        item.onClick?.(formData, eventParam)
      }
    }
    return { show, disabled, item, onClick }
  })

  // const items = computed(() => (!show.value ? [] : _items.filter(({ show }) => show.value)))
  const btns = ref<any[]>([])
  const moreBtns = ref<any[]>([])

  watchEffect(() => {
    const items = !show.value ? [] : allBtns.filter(({ show }) => show.value)
    const count = items.length === limit + 1 ? limit + 1 : limit
    btns.value = items.slice(0, count)
    moreBtns.value = items.slice(count)
  })

  const slots = computed(() =>
    btns.value.map(({ item: { attr, label, icon, confirmText }, disabled, onClick }) => {
      const attrs = { size, type, shape, disabled, onClick, ...attr }
      const btn = (
        <a-button {...attrs}>
          {icon && <a-icon type={icon} />}
          {!(iconOnly && icon) && label}
        </a-button>
      )
      return iconOnly && icon ? <a-tooltip title={label}> {btn}</a-tooltip> : btn
      // return confirmText ? confirm(btntip, confirmText, onClick) : btn
    })
  )
  const moreMenu = computed(() =>
    moreBtns.value.map(({ item: { attr, label, icon, confirmText }, disabled, onClick }) => (
      <a-menu-item disabled={disabled}>
        <a-button block {...{ size, type, onClick, disabled, ...attr }}>
          {icon && <a-icon type={icon} />}
          {label}
        </a-button>
      </a-menu-item>
    ))
  )
  const slotsMore = () =>
    !!moreMenu.value.length && (
      <a-dropdown v-slots={{ overlay: () => <a-menu>{moreMenu.value}</a-menu> }}>
        <a-button {...{ size, type, shape }}>
          更多 <a-icon type="down" />
        </a-button>
      </a-dropdown>
    )

  return (arg?: Obj) => {
    eventParam = arg
    return (
      <a-space onClick={(e) => e.stopPropagation()}>
        {slots.value}
        {slotsMore()}
      </a-space>
    )
  }
}
