import { ref, h, useSlots, nextTick } from 'vue'
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
        syncOption.then(async (schema) => {
          actions.setOption(schema)
          // 等 Schema 数据源的监听完成后，恢复加载期间最后一次显式写入。
          await nextTick()
          if (source.value !== undefined) actions.setData(source.value)
        })
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
        source.value = data
        if (actionsRef.value) {
          actionsRef.value.setData(data)
        }
      },
    },
  ] as const
}
