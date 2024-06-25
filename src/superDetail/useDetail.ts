import { toRef, ref, h, useSlots, watch, unref } from 'vue'
import SuperDetail from './SuperDetail.vue'
import type { ExtDescriptionsOption, ExtFormOption } from '../exaTypes'

type DetailOption =
  | ExtDescriptionsOption
  | ExtFormOption
  | (() => ExtDescriptionsOption | ExtFormOption)
  | (() => Promise<ExtDescriptionsOption | ExtFormOption>)

export function useDetail(option: DetailOption, data?: Obj) {
  const source = toRef(data)
  const actionsRef = ref()
  const syncOption = Promise.resolve(typeof option === 'function' ? option() : option)
  const register = (actions?: Obj): any => {
    if (actions) {
      if (!actionsRef.value) {
        syncOption.then(actions.setOption)
        if (source.value) {
          watch(
            source,
            (_d) => {
              actions.setData(_d)
            },
            { immediate: true }
          )
        }
      }
      actionsRef.value = actions
    } else {
      return (props) => h(SuperDetail, { config: option, ...props, onRegister: register }, useSlots())
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
