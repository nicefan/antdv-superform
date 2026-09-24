import { h, type VNodeChild } from 'vue'
import { Button, Divider, Dropdown, Menu, MenuItem, SubMenu, Space, Tooltip } from 'antdv-next'
import { builtInIcons, type UIActionGroupProps, type UIActionItem } from 'superform/sdk'

function stop(event: any) {
  ;(event?.domEvent || event)?.stopPropagation?.()
}

function menuItems(button: UIActionItem) {
  return button.menu?.map((item) => h(MenuItem, {
    key: `${button.key}:${item.key}`, disabled: button.disabled || item.disabled,
    onClick: (event) => { stop(event); return button.onSelect(item.value, event.domEvent || event) },
  }, { icon: item.icon, default: item.label }))
}

function renderButton(button: UIActionItem, props: UIActionGroupProps) {
  const attrs = { ...button.attrs, disabled: button.disabled, loading: button.loading,
    onClick: (event) => { stop(event); if (!button.menu) return button.onClick(event) },
  }
  let content: VNodeChild = button.render ? button.render(attrs) : h(Button, attrs, () => [
    !props.labelOnly && button.icon?.(),
    (!props.iconOnly || !button.icon) && button.label(),
    button.menu && builtInIcons.expand(),
  ])
  if (button.menu) {
    const trigger = content
    content = h(Dropdown, { ...button.dropdownProps, disabled: button.disabled }, {
      default: () => trigger,
      popupRender: () => h(Menu, {}, () => menuItems(button)),
    })
  }
  return h(Tooltip, {}, { title: button.tooltip, default: () => h('span', { onClick: stop }, [content]) })
}

export function renderActionGroup(props: UIActionGroupProps) {
  const { groupProps, buttons, moreButtons, defaultButtonProps } = props
  const divider = props.divider ?? (groupProps?.direction !== 'vertical' &&
    ['link', 'text'].includes(String(defaultButtonProps?.variant ?? defaultButtonProps?.type ?? '')))
  const content = buttons.flatMap((button, index) => [
    h('span', { key: button.key }, [renderButton(button, props)]),
    divider && index < buttons.length - 1 ? h(Divider, { type: 'vertical', class: 'sup-buttons-divider' }) : undefined,
  ])
  if (moreButtons.length) content.push(h(Dropdown, {}, {
    default: () => h(Button, { ...defaultButtonProps, onClick: stop }, props.moreLabel),
    popupRender: () => h(Menu, {}, () => moreButtons.map((button) => button.menu
      ? h(SubMenu, { key: button.key, disabled: button.disabled }, {
          title: button.label, icon: button.icon, default: () => menuItems(button),
        })
      : h(MenuItem, { key: button.key, disabled: button.disabled,
          onClick: (event) => { stop(event); return button.onClick(event.domEvent || event) },
        }, { icon: button.icon, default: button.label }))),
  }))
  return h(Space, { size: divider ? 0 : 'small', ...groupProps, class: ['sup-buttons', groupProps?.class] }, () => content)
}
