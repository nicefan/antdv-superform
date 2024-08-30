import { h } from 'vue'
import { ButtonGroup } from './'
import type { ExtButtons } from '../../exaTypes'

type UseButtonsParams = { config: ExtButtons; methods?: Obj; effectData?: Obj; isView?: boolean }

export default function createButtons({ config, methods, effectData, isView }: UseButtonsParams) {
  const buttons = Array.isArray(config) ? { actions: config } : config

  if (!buttons || (isView && buttons.validOn === 'form') || (!isView && buttons.validOn === 'detail')) return

  let actions = buttons.actions || []
  if (!buttons.validOn) {
    buttons.actions = actions = actions.filter((item) => {
      if (typeof item === 'string') {
        return !isView
      } else {
        const validOn = item.validOn
        if (isView) {
          return validOn === 'both' || validOn === 'detail'
        } else {
          return validOn !== 'detail'
        }
      }
    })
  }
  if (actions.length === 0) return

  return (props = {}) => h(ButtonGroup, { option: buttons, methods, effectData, ...props })
}
