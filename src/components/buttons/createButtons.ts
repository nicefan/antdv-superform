import { h } from 'vue'
import { ButtonGroup } from './'
import type { ExtButtons } from '../../exaTypes'

type UseButtonsParams = { config: ExtButtons; methods?: Obj; effectData?: Obj; isView?: boolean }

export default function createButtons({ config, methods, effectData, isView }: UseButtonsParams) {
  const buttons = Array.isArray(config) ? { actions: config } : config
  const visibleIn = buttons?.visibleIn ?? buttons?.validOn

  if (!buttons || (isView && visibleIn === 'form') || (!isView && visibleIn === 'detail')) return

  let actions = buttons.actions || []
  if (!visibleIn) {
    actions = actions.filter((item) => {
      if (typeof item === 'string') {
        return !isView
      } else {
        const itemVisibleIn = item.visibleIn ?? item.validOn
        if (isView) {
          return itemVisibleIn !== 'form'
        } else {
          return itemVisibleIn !== 'detail'
        }
      }
    })
  }
  if (actions.length === 0) return

  return (props = {}) => h(ButtonGroup, { option: { ...buttons, actions }, methods, effectData, ...props })
}
