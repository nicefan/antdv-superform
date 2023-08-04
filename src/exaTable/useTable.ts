import { h, ref, watch } from 'vue'
import ExaTable from './ExaTable.vue'

type RegisterMethod = {
  (): () => VNode
  (actions?: Obj, _tableRef?: Obj): void
}

export const useTable = (option: RootTableOption, data?: any[]) => {
  const tableRef = ref()
  const dataSource = ref(data || [])
  const actionsRef = ref<Obj>()

  const register: RegisterMethod = (actions?: Obj, _tableRef?: Obj): any => {
    if (actions) {
      if (!actionsRef.value) {
        actions.setOption(option)
        actions.setData(dataSource.value)
      }
      tableRef.value = _tableRef
      actionsRef.value = actions
    } else {
      return () => h(ExaTable, { dataSource: dataSource.value, onRegister: register })
    }
  }
  const _promise = new Promise((resolve) => watch(tableRef, resolve))

  const getTable = async (key?: string, param?: any) => {
    const form = (await _promise) as Obj
    if (key && key in form) {
      if (typeof form[key] === 'function') {
        return form[key](param)
      } else {
        return form[key]
      }
    } else if (!key) {
      return form
    }
  }
  return [
    register,
    {
      setData(data) {
        if (actionsRef.value) {
          actionsRef.value.setData(data)
        } else {
          dataSource.value = data
        }
      },
      tableRef,
      getTable,
    },
  ] as const
}
