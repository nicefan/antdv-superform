import { h, unref } from 'vue'
import { ElButton, ElDivider, ElSpace, ElTooltip } from 'element-plus'
import { toNode, type UIActionGroupProps } from 'superform/sdk'
function renderButton(button: Obj, effectData: Obj, iconOnly: boolean, labelOnly: boolean) {
  const attrs = { ...button.attrs, disabled: unref(button.attrs?.disabled), loading: unref(button.attrs?.loading) }
  if (button.render) return button.render({ props: attrs, ...effectData })
  return h(
    ElTooltip,
    {
      content: unref(button.tooltipTitle),
      disabled: !unref(button.tooltipTitle),
    },
    {
      default: () =>
        h(ElButton, { ...attrs, onClick: (event) => button.onClick?.(event) }, () => [
          button.icon && !labelOnly ? button.icon() : undefined,
          !button.icon || !iconOnly ? toNode(button.label, effectData) : undefined,
        ]),
    }
  )
}

export function renderActionGroup(props: UIActionGroupProps) {
  const { buttons, moreButtons, groupProps, effectData, iconOnly, labelOnly, defaultButtonProps } = props
  const divider =
    props.divider ??
    (groupProps?.direction !== 'vertical' && (!!defaultButtonProps?.link || defaultButtonProps?.text === true))
  const allButtons = [...buttons, ...moreButtons]
  const content = allButtons.flatMap((button, index) => [
    renderButton(button, effectData, !!iconOnly, !!labelOnly),
    divider && index < allButtons.length - 1 ? h(ElDivider, { direction: 'vertical' }) : undefined,
  ])
  return h(ElSpace, { ...groupProps, size: divider ? 0 : groupProps?.size }, () => content)
}
