import { toRef, ref, h, useSlots } from 'vue'
import SuperDetail from './SuperDetail.vue'
import type { ExtFormOption } from '../exaTypes'

export function useDetail(option: ExtFormOption, data = {}) {
  const source = toRef(data)
  const actionsRef = ref()

  const register = (actions?: Obj): any => {
    if (actions) {
      if (!actionsRef.value) {
        actions.setOption(option)
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
