import { ref, h, useSlots } from 'vue'
import ExaDetail from './ExaDetail.vue'

export function useDetail(option: ExFormOption, data?: Obj) {
  const source = ref(data)
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
        h(ExaDetail, { config: option, dataSource: source.value, ...props, onRegister: register }, useSlots())
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
