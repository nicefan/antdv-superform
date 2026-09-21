import { h, unref, type VNodeChild } from 'vue'
import { Button, Divider, Dropdown, Menu, MenuItem, Space, Tooltip } from 'antdv-next'
import { builtInIcons, toNode, type UIActionGroupProps } from 'superform/sdk'

function stopActionEvent(event: any) {
  ;(event?.domEvent || event)?.stopPropagation?.()
}

function renderActionContent(button: Obj, effectData: Obj, labelOnly: boolean, iconOnly: boolean) {
  return [
    button.icon && !labelOnly ? button.icon() : undefined,
    !button.icon || !iconOnly ? toNode(button.label, effectData) : undefined,
  ]
}

function renderActionButton(button: Obj, effectData: Obj, labelOnly: boolean, iconOnly: boolean) {
  const attrs = { ...button.attrs, disabled: unref(button.attrs?.disabled), loading: unref(button.attrs?.loading) }
  const callAction = (event: any) => {
    stopActionEvent(event)
    return button.onClick?.(event)
  }
  const menu = unref(button.menu)
  let content: VNodeChild
  if (menu) {
    content = h(
      Dropdown,
      { disabled: attrs.disabled, ...button.dropdownProps },
      {
        popupRender: () =>
          h(Menu, { onClick: callAction }, () =>
            menu.map((item: Obj) =>
              h(
                MenuItem,
                { key: item.value, disabled: item.disabled },
                {
                  icon: item.icon,
                  default: () => toNode(item.label, effectData),
                }
              )
            )
          ),
        default: () =>
          h(Button, attrs, () => [
            ...renderActionContent(button, effectData, labelOnly, iconOnly),
            builtInIcons.expand(),
          ]),
      }
    )
  } else if (button.render) {
    content = button.render({ props: attrs, ...effectData })
  } else {
    content = h(Button, { ...attrs, onClick: callAction }, () =>
      renderActionContent(button, effectData, labelOnly, iconOnly)
    )
  }
  return h(Tooltip, { title: unref(button.tooltipTitle) }, { default: () => content })
}

export function renderActionGroup(props: UIActionGroupProps) {
  const { groupProps, buttons, moreButtons, defaultButtonProps, labelOnly, iconOnly, moreLabel, effectData } = props
  const divider =
    props.divider ??
    (groupProps?.direction !== 'vertical' &&
      ['link', 'text'].includes(String(defaultButtonProps?.variant ?? defaultButtonProps?.type ?? '')))
  const content = buttons.flatMap((button: Obj, index: number) => [
    renderActionButton(button, effectData, !!labelOnly, !!iconOnly),
    divider && index < buttons.length - 1 ? h(Divider, { type: 'vertical', class: 'sup-buttons-divider' }) : undefined,
  ])
  if (moreButtons.length) {
    content.push(
      h(
        Dropdown,
        {},
        {
          default: () =>
            h(Button, defaultButtonProps, () => (moreLabel ? toNode(moreLabel, effectData) : builtInIcons.more())),
          popupRender: () =>
            h(Menu, {}, () =>
              moreButtons.map((button: Obj) =>
                h(
                  MenuItem,
                  {
                    key: button.label,
                    disabled: unref(button.attrs?.disabled),
                    onClick: (event) => {
                      stopActionEvent(event)
                      return button.onClick?.(event)
                    },
                  },
                  {
                    icon: button.icon,
                    default: () => toNode(button.label, effectData),
                  }
                )
              )
            ),
        }
      )
    )
  }
  return h(
    Space,
    {
      size: divider ? 0 : 'small',
      ...groupProps,
      class: ['sup-buttons', groupProps?.class],
    },
    () => content
  )
}
