import { computed, h } from 'vue'
import ExaTable from './ExaTable.vue'
import { useGetRef } from '../utils'

type RegisterMethod = {
  (): () => VNode
  (actions?: Obj, _tableRef?: Obj): void
}

export const useTable = (option: RootTableOption, data?: any[] | Ref<any[]>) => {
  const [tableRef, getTable] = useGetRef()

  const register: RegisterMethod = (actions?: Obj): any => {
    if (actions) {
      if (!tableRef.value) {
        actions.setOption(option)
        data && actions.setData(data)
      }
      tableRef.value = actions
    } else if (actions === null) {
      tableRef.value = undefined
    } else {
      return (props, ctx) => h(ExaTable, { ...props, onRegister: register }, ctx?.slots)
    }
  }

  const dataSource = computed(() => {
    return tableRef.value?.dataRef.value
  })

  const asyncCall = async (key?: string, param?: any) => {
    const form = await getTable()
    if (key && key in form) {
      if (typeof form[key] === 'function') {
        return form[key](param)
      } else {
        return form[key]
      }
    }
  }
  type ModalMeta = {
    /** 弹窗标题 */
    title?: string
  }
  type AddParam = {
    /** 初始化数据 */
    resetData?: Obj
    /** 弹窗标题 */
    meta?: ModalMeta
  }
  return [
    register,
    {
      /** 异步获取表格引用 */
      getTable,
      dataSource,
      tableRef,
      setData(data: Obj[]) {
        asyncCall('setData', data)
      },
      /** 返回当前表格数据 */
      getData() {
        return dataSource.value
      },
      /** 跳转到指定页 */
      goPage(page: number) {
        tableRef.value?.goPage(page)
      },
      /** 刷新数据，不改动查询条件与当前页 */
      reload() {
        tableRef.value?.reload()
      },
      /** 增加条件刷新数据 */
      request(param: Obj) {
        tableRef.value?.reload(param)
      },
      /** 手动执行条件查询，覆盖搜索表单参数 */
      query(param?: Obj): Promise<any> {
        return tableRef.value?.query(param)
      },
      /** 查询完成，返回结果回调 */
      onLoaded(callback: (data: any) => void) {
        asyncCall('onLoaded', callback)
      },
      /** 重置查询表单，并重新查询 */
      resetSearchForm(param?: Obj) {
        tableRef.value?.resetSearchForm(param)
        tableRef.value?.query(param)
      },
      selectedRowKeys: computed(() => tableRef.value?.selectedRowKeys),
      selectedRows: computed(() => tableRef.value?.selectedRows),
      /** 新增行 */
      add: (param?: AddParam) => tableRef.value?.add(param),
      /** 修改行，须判断是否已有选中行 */
      edit: (param?: ModalMeta) => tableRef.value?.edit(param),
      /** 删除行，须判断是否已有选中行 */
      delete: () => tableRef.value?.delete(),
      /** 查看详情，须判断是否已有选中行 */
      detail: (param?: ModalMeta) => tableRef.value?.detail(param),
      asyncCall,
    },
  ] as const
}
