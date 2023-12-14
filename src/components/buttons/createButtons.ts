import { h } from 'vue'
import { ButtonGroup } from './'
import type { ExtButtons } from '../../exaTypes'

type UseButtonsParams = { config: ExtButtons; methods?: Obj; params?: Obj; isView?: boolean }

export default function createButtons({ config, methods, params, isView }: UseButtonsParams) {
  const buttons = Array.isArray(config) ? { actions: config } : config

  if (!buttons || (isView && buttons.vaildIn === 'form') || (!isView && buttons.vaildIn === 'detail')) return

  let actions = buttons.actions || []
  if (!buttons.vaildIn) {
    buttons.actions = actions = actions.filter((item) => {
      if (typeof item === 'string') {
        return !isView
      } else {
        const vaildIn = item.vaildIn
        if (isView) {
          return vaildIn === 'both' || vaildIn === 'detail'
        } else {
          return vaildIn !== 'detail'
        }
      }
    })
  }
  if (actions.length === 0) return

  return (props) => h(ButtonGroup, { config: buttons, methods, param: params, ...props })
}
