import type { RootTableOption } from '../exaTypes'
import { computed, reactive, ref, watch, mergeProps } from 'vue'
import { throttle } from 'lodash-es'

export function useQuery(option: Partial<RootTableOption>, dataSource: Ref) {
  const queryApi = computed(() => {
    return typeof option.apis === 'function' ? apis : option.apis?.query
  })
  const pageParam = reactive<Obj>({})
  const searchParam = ref()
  const loading = ref(false)
  const callbacks: Fn[] = []
  const onLoaded = (cb: Fn) => callbacks.push(cb)

  const request = (param?: Obj) => {
    if (!queryApi.value) return
    if (loading.value) return Promise.reject(() => console.warn('跳过重复执行！')).finally()
    const _params = {
      ...ref(option.params).value,
      ...searchParam.value,
      ...param,
      ...pageParam,
    }
    loading.value = true
    return Promise.resolve(queryApi.value?.(_params).then(setPageData)).finally(() => {
      loading.value = false
    })
  }

  const setPageData = (res) => {
    if (Array.isArray(res)) {
      dataSource.value = res
      if (defPagination.value !== false) {
        pagination.value = { ...pagination.value, total: res.length, current: 1 }
      }
    } else if (res?.records) {
      dataSource.value = res.records
      if (defPagination.value !== false) {
        pagination.value = { ...pagination.value, total: res.total, pageSize: res.size, current: res.current }
      }
    }
    return Promise.all(callbacks.map((cb) => cb(res)))
  }
  const throttleRequest = throttle(request, 300, { 'leading': false })

  const goPage = (current, size = pageParam.size) => {
    pageParam.current = current
    pageParam.size = size
    throttleRequest()
  }
  const query = (param?: true | Obj) => {
    if (param === true) {
      return request()
    }
    pageParam.current = 1
    return throttleRequest(param)
  }
  const setSearchParam = (param?: Obj) => {
    searchParam.value = param
  }

  const pagination = ref<false | Obj>(false)
  const defPagination = computed(() => option.pagination || (option.attrs as Obj)?.pagination)
  watch(
    defPagination,
    (def) => {
      if (def === false) return
      pagination.value = mergeProps(
        {
          onChange: goPage,
          // onShowSizeChange: goPage,
        },
        { ...def }
      )
      if (def?.pageSize) pageParam.size = def.pageSize
    },
    {
      immediate: true,
      flush: 'sync',
    }
  )
  const apis = computed(() => {
    return queryApi.value && { ...option.apis, query: throttleRequest }
  })

  return {
    apis,
    goPage,
    reload: throttleRequest,
    setSearchParam,
    query,
    pagination,
    setPageData,
    onLoaded,
    loading,
  }
}
