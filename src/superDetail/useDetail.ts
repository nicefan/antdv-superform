import { ref, h, useSlots, watch } from 'vue'
import SuperDetail from './SuperDetail.vue'
import type { ExtDescriptionsOption, ExtFormOption } from '../exaTypes'

type DetailOption =
  | ExtDescriptionsOption
  | ExtFormOption
  | (() => ExtDescriptionsOption | ExtFormOption)
  | (() => Promise<ExtDescriptionsOption | ExtFormOption>)

export function useDetail(option: DetailOption) {
  // 注册前通过 setData 传入的数据暂存，初始数据统一由 Schema.dataSource 提供。
  const source = ref<Obj>()
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
      return (props) => h(SuperDetail, { ...props, onRegister: register }, useSlots())
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
