import { h, type VNodeChild } from 'vue'
import { ElButton, ElDivider, ElDropdown, ElDropdownMenu, ElDropdownItem, ElSpace, ElTooltip } from 'element-plus'
import { builtInIcons, type UIActionGroupProps, type UIActionItem } from 'superform/sdk'

function stop(event: any) { event?.stopPropagation?.() }

function dropdown(button: UIActionItem, trigger: VNodeChild) {
  return h(ElDropdown, { ...button.dropdownProps, disabled: button.disabled,
    onCommand: (value, _instance, event) => { stop(event); return button.onSelect(value, event) },
  }, {
    default: () => trigger,
    dropdown: () => h(ElDropdownMenu, {}, () => button.menu?.map((item) =>
      h(ElDropdownItem, { key: item.key, command: item.value, disabled: button.disabled || item.disabled },
        () => [item.icon?.(), item.label()]))),
  })
}

function renderButton(button: UIActionItem, props: UIActionGroupProps) {
  const attrs = { ...button.attrs, disabled: button.disabled, loading: button.loading,
    onClick: (event) => { stop(event); if (!button.menu) return button.onClick(event) },
  }
  let content: VNodeChild = button.render ? button.render(attrs) : h(ElButton, attrs, () => [
    !props.labelOnly && button.icon?.(),
    (!props.iconOnly || !button.icon) && button.label(),
    button.menu && builtInIcons.expand(),
  ])
  if (button.menu) content = dropdown(button, content)
  const tooltip = button.tooltip?.()
  return h(ElTooltip, { disabled: !tooltip }, {
    content: () => tooltip,
    default: () => h('span', { onClick: stop }, [content]),
  })
}

export function renderActionGroup(props: UIActionGroupProps) {
  const { buttons, moreButtons, groupProps, defaultButtonProps } = props
  const divider = props.divider ?? (groupProps?.direction !== 'vertical' &&
    (!!defaultButtonProps?.link || defaultButtonProps?.text === true))
  const content = buttons.flatMap((button, index) => [
    h('span', { key: button.key }, [renderButton(button, props)]),
    divider && index < buttons.length - 1 ? h(ElDivider, { direction: 'vertical' }) : undefined,
  ])
  if (moreButtons.length) content.push(h(ElDropdown, {
    onCommand: (key, _instance, event) => {
      stop(event)
      return moreButtons.find((button) => button.key === key)?.onClick(event)
    },
  }, {
    default: () => h(ElButton, { ...defaultButtonProps, onClick: stop }, props.moreLabel),
    dropdown: () => h(ElDropdownMenu, {}, () => moreButtons.map((button) => button.menu
      // 有下拉的折叠动作保留独立菜单，不能把父动作当作普通点击执行。
      ? h('li', { key: button.key, role: 'none', onClick: stop }, [dropdown(button,
          h(ElButton, { text: true, disabled: button.disabled }, () => [button.label(), builtInIcons.expand()]))])
      : h(ElDropdownItem, { key: button.key, command: button.key, disabled: button.disabled },
          () => [button.icon?.(), button.label()]))),
  }))
  return h(ElSpace, { ...groupProps, size: divider ? 0 : groupProps?.size, class: ['sup-buttons', groupProps?.class] }, () => content)
}
