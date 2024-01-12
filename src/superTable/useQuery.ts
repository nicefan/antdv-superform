import type { RootTableOption } from '../exaTypes'
import { computed, reactive, ref, unref, watch, mergeProps } from 'vue'
import { throttle } from 'lodash-es'

export function useQuery(option: Partial<RootTableOption>) {
  const queryApi = computed(() => {
    return typeof option.apis === 'function' ? apis : option.apis?.query
  })
  const pageParam = reactive<Obj>({})
  const searchParam = ref()
  const loading = ref(false)
  const dataSource = ref()
  const callbacks: Fn[] = []
  const onLoaded = (cb: Fn) => callbacks.push(cb)

  const request = (params = {}) => {
    if (!queryApi.value) return
    if (loading.value) return Promise.reject(() => console.warn('跳过重复执行！')).finally()
    const _params = {
      ...unref(option.params),
      ...searchParam.value,
      ...pageParam,
      ...params,
    }
    loading.value = true
    return Promise.resolve(
      queryApi.value?.(_params).then((res) => {
        if (Array.isArray(res)) {
          dataSource.value = res
          pagination.value = false
        } else if (res?.records) {
          dataSource.value = res.records
          pagination.value &&= { ...pagination.value, total: res.total, pageSize: res.size, current: res.current }
        }
        callbacks.forEach((cb) => cb(res))
      })
    ).finally(() => {
      loading.value = false
    })
  }

  const throttleRequest = throttle(request, 200, { 'trailing': true })

  const goPage = (current, size = pageParam.size) => {
    pageParam.current = current
    pageParam.size = size
    throttleRequest()
  }
  const query = (param) => {
    searchParam.value = { ...param }
    pageParam.current = 1
    return throttleRequest()
  }

  const pagination = ref<false | Obj>(false)
  watch(
    () => option.pagination || option.attrs?.pagination,
    (def) => {
      pagination.value =
        (def || def !== false) &&
        mergeProps(
          {
            onChange: goPage,
            // onShowSizeChange: goPage,
          },
          def
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

  watch(
    () => [apis.value, option.params],
    () => queryApi.value && throttleRequest(),
    { immediate: true, deep: true }
  )

  return {
    apis,
    goPage,
    reload: request,
    query,
    pagination,
    dataSource,
    onLoaded,
    loading,
  }
}
