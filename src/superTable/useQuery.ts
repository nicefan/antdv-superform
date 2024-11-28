import type { RootTableOption } from '../exaTypes'
import { computed, reactive, ref, watch, mergeProps, nextTick, isRef } from 'vue'
import { merge, throttle } from 'lodash-es'

export function useQuery(option: Partial<RootTableOption>, updateSource: Fn) {
  let isInit = false
  nextTick(() => {
    isInit = true
    if (option.immediate !== false) {
      query()
    }
  })

  const searchParam = ref()
  const otherParam = {}
  const pageParam = reactive<Obj>({})
  const loading = ref(false)

  const callbacks: Fn[] = []
  const onLoaded = (cb: Fn) => callbacks.push(cb)

  const queryApi = computed(() => {
    return typeof option.apis === 'function' ? apis : option.apis?.query
  })

  const request = (param?: Obj) => {
    if (!queryApi.value) return
    if (loading.value) return Promise.reject(() => console.warn('跳过重复执行！')).finally()
    const _params = merge({}, otherParam, searchParam.value, param, pageParam)
    const _data = option.beforeQuery?.(_params) || _params

    loading.value = true
    return Promise.resolve(queryApi.value?.(_data).then(setPageData)).finally(() => {
      loading.value = false
    })
  }

  const setPageData = (data) => {
    const res = option.afterQuery?.(data) || data
    if (Array.isArray(res)) {
      updateSource(res)
      if (defPagination.value !== false) {
        pagination.value = { ...pagination.value, total: res.length, current: 1 }
      }
    } else if (res?.records) {
      updateSource(res.records)
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
      // 强制刷新，在新增修改后刷新数据
      return request()
    }
    if (isInit) {
      pageParam.current = 1
      return throttleRequest(param)
    }
  }

  const setQueryParams = (data?: Obj, target?: string) => {
    if (target === 'form') {
      searchParam.value = data
    } else {
      merge(otherParam, data)
    }
  }
  const getQueryParams = () => merge({}, otherParam, searchParam.value)

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
    return queryApi.value && { ...option.apis, query }
  })

  return {
    apis,
    goPage,
    reload: throttleRequest,
    setQueryParams,
    getQueryParams,
    query,
    pagination,
    setPageData,
    onLoaded,
    loading,
  }
}
