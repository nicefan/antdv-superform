import { toRef, ref, h, useSlots } from 'vue'
import SuperDetail from './SuperDetail.vue'
import type { ExtDescriptionsOption, ExtFormOption } from '../exaTypes'

type DetailOption =
  | ExtDescriptionsOption
  | ExtFormOption
  | (() => ExtDescriptionsOption | ExtFormOption)
  | (() => Promise<ExtDescriptionsOption | ExtFormOption>)

export function useDetail(option: DetailOption, data = {}) {
  const source = toRef(data)
  const actionsRef = ref()

  const register = (actions?: Obj): any => {
    if (actions) {
      if (!actionsRef.value) {
        if (typeof option === 'function') {
          Promise.resolve(option()).then((_option) => {
            actions.setOption(_option)
          })
        } else {
          actions.setOption(option)
        }
        actions.setData(source.value)
      }
      actionsRef.value = actions
    } else {
      return (props) =>
        h(SuperDetail, { config: option, dataSource: source, ...props, onRegister: register }, useSlots())
    }
  }

  return [
    register,
    {
      setData(data) {
        if (actionsRef.value) {
          actionsRef.value.setData(data)
        } else {
          source.value = data
        }
      },
    },
  ] as const
}
