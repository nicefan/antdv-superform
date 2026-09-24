import { h, type VNodeChild } from 'vue'
import { ElButton, ElDivider, ElDropdown, ElDropdownMenu, ElDropdownItem, ElSpace, ElTooltip } from 'element-plus'
import { builtInIcons, type UIActionGroupProps, type UIActionItem } from 'superform/sdk'

function stop(event: any) { event?.stopPropagation?.() }

function dropdown(button: UIActionItem, trigger: VNodeChild) {
  return h(ElDropdown, { ...button.dropdownProps, disabled: button.disabled,
    onCommand: (command: { value: unknown }) => button.onSelect(command.value),
  }, {
    default: () => trigger,
    dropdown: () => h(ElDropdownMenu, {}, () => button.menu?.map((item) =>
      h(ElDropdownItem, { key: item.key, command: { value: item.value }, disabled: button.disabled || item.disabled, onClick: stop },
        () => [item.icon?.(), item.label()]))),
  })
}

function renderButton(button: UIActionItem, props: UIActionGroupProps) {
  const attrs = { ...button.attrs, disabled: button.disabled,
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
    onCommand: (command: { button: UIActionItem; value?: unknown; selected: boolean }) =>
      command.selected ? command.button.onSelect(command.value) : command.button.onClick(),
  }, {
    default: () => h(ElButton, { ...defaultButtonProps, onClick: stop }, props.moreLabel),
    // Element Plus 的 DropdownMenu 只接收 DropdownItem；折叠动作的菜单选项直接列为条目。
    dropdown: () => h(ElDropdownMenu, {}, () => moreButtons.flatMap((button) => button.menu
      ? button.menu.map((item) => h(ElDropdownItem, {
          key: `${button.key}:${item.key}`,
          command: { button, value: item.value, selected: true },
          disabled: button.disabled || item.disabled,
          onClick: stop,
        }, () => [button.label(), ' / ', item.icon?.(), item.label()]))
      : [h(ElDropdownItem, {
          key: button.key,
          command: { button, selected: false },
          disabled: button.disabled,
          onClick: stop,
        }, () => [button.icon?.(), button.label()])])),
  }))
  return h(ElSpace, { ...groupProps, size: divider ? 0 : groupProps?.size, class: ['sup-buttons', groupProps?.class] }, () => content)
}
