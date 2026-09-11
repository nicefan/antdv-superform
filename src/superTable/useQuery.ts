import type { RootTableOption } from '../exaTypes'
import { computed, reactive, ref, watch, mergeProps } from 'vue'
import { throttle } from 'lodash-es'
import { globalConfig } from '../plugin'
import { merge } from '../utils/merge'

const resultTransform = (res) => {
  return globalConfig.tableApiSetting?.resultTransform?.(res) || res
}
const pageTransform = (param) => {
  const { currentField, sizeField } = globalConfig.tableApiSetting || {}
  if (currentField || sizeField) {
    return {
      [currentField || 'current']: param.current,
      [sizeField || 'size']: param.size,
    }
  }
  return param
}
export function useQuery(option: Partial<RootTableOption>, updateSource: Fn) {
  // const otherParam = {}
  const pageParam = reactive<Obj>({})
  const loading = ref(false)
  let searchParam = {}
  let latestRequestId = 0
  let activeController: AbortController | undefined

  const callbacks: Fn[] = []
  const onLoaded = (cb: Fn) => callbacks.push(cb)
  if (option.onLoaded) {
    callbacks.push(option.onLoaded)
  }

  const invalidateRequest = () => {
    activeController?.abort()
    activeController = undefined
    latestRequestId += 1
  }

  const request = async (param?: Obj) => {
    const _params = merge({}, pageTransform(pageParam), searchParam, param)
    const _data = option.beforeQuery?.(_params) || _params
    const queryApi = option.apis?.query

    invalidateRequest()
    const requestId = latestRequestId
    if (!queryApi) {
      activeController = undefined
      loading.value = false
      return
    }

    const controller = new AbortController()
    activeController = controller
    loading.value = true
    try {
      const res = await queryApi(_data, { signal: controller.signal })
      if (requestId !== latestRequestId || controller.signal.aborted) return

      const _res = option.afterQuery?.(res) || res
      return setPageData(resultTransform(_res))
    } finally {
      if (requestId === latestRequestId) {
        activeController = undefined
        loading.value = false
      }
    }
  }

  const setPageData = (res) => {
    if (Array.isArray(res)) {
      updateSource(res)
      if (pagination.value !== false) {
        pageParam.current = 1
        pagination.value = { ...pagination.value, total: res.length }
      }
    } else if (res?.records) {
      updateSource(res.records)
      if (pagination.value !== false) {
        pageParam.current = res.current
        pageParam.size = res.size
        pagination.value = { ...pagination.value, total: res.total }
      }
    }
    return Promise.all(callbacks.map((cb) => cb(res)))
  }

  const requestThrottle = throttle(request, 300, { leading: false })
  const throttleRequest = (param?: Obj) => {
    // 新查询进入等待期时立即使旧请求失效，不能等到节流结束后再取消。
    invalidateRequest()
    return requestThrottle(param)
  }

  const goPage = (current, size = pageParam.size) => {
    requestThrottle.cancel()
    pageParam.current = current
    pageParam.size = size
    return request()
  }

  const query = (param?: Obj) => {
    if (pagination.value) pageParam.current = 1
    return throttleRequest(param)
  }

  const cancelQuery = () => {
    requestThrottle.cancel()
    invalidateRequest()
    loading.value = false
  }

  // let dynamicParams: Obj = {}
  const formParams: Obj = {}
  const setQueryParams = (data?: Obj, target?: string) => {
    if (target === 'dynamic') {
      // 动态参数结构会变化，不能直接合并
      // dynamicParams = data || {}
      searchParam = merge({}, formParams, data)
    } else {
      Object.assign(formParams, data)
      merge(searchParam, data)
    }
  }
  const getQueryParams = () => searchParam

  const pagination = ref<false | Obj>(false)
  watch(
    () => option.pagination ?? (option.attrs as Obj)?.pagination,
    (def) => {
      if (def === false) {
        pagination.value = false
        return
      }
      // 提取可响应属性绑定，
      Object.assign(pageParam, { size: def?.pageSize || 10, current: def?.current || 1 })
      pagination.value = mergeProps(
        {
          onChange: goPage,
          // onShowSizeChange: goPage,
        },
        {
          ...def,
          pageSize: pageParam.size,
          current: pageParam.current,
        }
      )
    },
    {
      immediate: true,
      flush: 'sync',
    }
  )
  watch(pageParam, (p) => {
    pagination.value && (pagination.value = { ...pagination.value, pageSize: p.size, current: p.current })
  })

  return {
    goPage,
    reload: throttleRequest,
    cancelQuery,
    setQueryParams,
    getQueryParams,
    query,
    pagination,
    setPageData,
    onLoaded,
    loading,
  }
}
