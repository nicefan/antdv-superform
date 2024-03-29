import { computed, reactive, ref, unref, watch, mergeProps } from 'vue'

export function useQuery(option: Partial<RootTableOption>) {
  const queryApi = computed(() => {
    return typeof option.apis === 'function' ? apis : option.apis?.query
  })
  const pageParam = reactive<Obj>({})
  const searchParam = ref()
  const requestParams = computed(() => ({
    ...unref(option.params),
    ...searchParam.value,
  }))
  const loading = ref(false)
  const dataSource = ref()
  const callbacks: Fn[] = []
  const onLoaded = (cb: Fn) => callbacks.push(cb)

  const request = (params = {}) => {
    if (loading.value) return Promise.reject().finally(() => console.warn('跳过重复执行！'))
    const _params = {
      ...requestParams.value,
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

  const goPage = (current, size = pageParam.size) => {
    pageParam.current = current
    pageParam.size = size
    request()
  }
  const query = (param) => {
    searchParam.value = param
    pageParam.current = 1
    return request()
  }

  const pagination = ref<false | Obj>(false)
  watch(
    () => option.pagination || option.attrs?.pagination,
    (def) => {
      pagination.value =
        (def || def !== false) &&
        mergeProps(
          {
            // TODO 默认分页参数
            onChange: goPage,
            onShowSizeChange: goPage,
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
    return queryApi.value && { ...option.apis, query: request }
  })

  watch([apis, requestParams], () => queryApi.value && request(), { immediate: true })

  return {
    apis,
    goPage,
    reload: request,
    query,
    requestParams,
    pagination,
    dataSource,
    onLoaded,
  }
}
