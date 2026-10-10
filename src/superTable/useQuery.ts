import type { RootTableOption } from '../exaTypes'
import type { UITableChange, UITableParams } from '../adapter'
import { reactive, ref, watch, unref, type Ref } from 'vue'
import { cloneDeep, isEqual, throttle } from 'lodash-es'
import { merge } from '../utils/merge'

export function useQuery(option: Partial<RootTableOption>, updateSource: Fn, source?: Ref<any[]>) {
  const pageParam = reactive({ current: 1, size: 10 })
  const dataPagination = ref<{ current: number; pageSize: number }>()
  const loading = ref(false)
  // 每个来源独立替换快照，动态参数和空筛选不会把旧字段留在其它来源中。
  const params = reactive({
    form: {} as Obj,
    tabs: {} as Obj,
    dynamic: {} as Obj,
    table: {} as Obj,
  })
  const tableState = ref<UITableParams>({ filters: {}, sorters: [] })
  let latestRequestId = 0
  let activeController: AbortController | undefined

  const callbacks = new Set<Fn>()
  const onLoaded = (cb: Fn) => {
    callbacks.add(cb)
    return () => callbacks.delete(cb)
  }

  const getQueryParams = () => cloneDeep(merge({}, params.form, params.tabs, params.dynamic, params.table))
  watch(
    [() => option.attrs?.filterSortTransform, () => tableState.value],
    ([transform, state]) => {
      // 固定保存转换后的条件，查询和导出共用；配置关闭时立即移除表格条件。
      const snapshot = cloneDeep(state)
      params.table = typeof transform === 'function' ? cloneDeep(transform(snapshot) ?? snapshot) : {}
    },
    { immediate: true, flush: 'sync' }
  )
  const setQueryParams = (data?: Obj, target: 'form' | 'tabs' | 'dynamic' = 'form') => {
    params[target] = merge({}, data)
  }
  const transformPage = () => {
    if (!pagination.value) return {}
    const page = { ...pageParam }
    const transform = option.attrs?.pageTransform
    return transform ? transform(page) : page
  }
  const request = async (param?: Obj, correctPage = false) => {
    // 明确的查询操作接管待执行的自动查询，避免旧的响应式调度随后再发一次。
    throttleRequest.cancel()
    const requestedPage = { ...pageParam }
    const page = transformPage()
    const requestParams = merge(
      {}, page, getQueryParams(), param, correctPage ? page : {}
    )
    const data = option.beforeQuery?.(requestParams) ?? requestParams
    const queryApi = option.apis?.query

    activeController?.abort()
    const requestId = ++latestRequestId
    if (!queryApi) {
      activeController = undefined
      loading.value = false
      return
    }

    const controller = new AbortController()
    activeController = controller
    loading.value = true
    try {
      const res = await queryApi(data, { signal: controller.signal })
      if (requestId !== latestRequestId || controller.signal.aborted) return

      const transformed = option.attrs?.resultTransform?.(res) ?? res
      const result = option.afterQuery?.(transformed) ?? transformed
      if (
        pagination.value &&
        !Array.isArray(result) &&
        result?.records?.length === 0 &&
        Number.isFinite(result.total)
      ) {
        const last = Math.max(1, Math.ceil(result.total / (result.size || pageParam.size)))
        if (pageParam.current > last) {
          // 删除末页后重新取最后一页；转换器仍只接收标准分页，不能把旧的临时页码带回去。
          pageParam.current = last
          return request(param, true)
        }
      }
      return setPageData(result, requestedPage)
    } finally {
      if (requestId === latestRequestId) {
        activeController = undefined
        loading.value = false
      }
    }
  }

  const setPageData = (res, requestedPage = { ...pageParam }) => {
    if (Array.isArray(res)) {
      dataPagination.value = { current: 1, pageSize: requestedPage.size }
      updateSource(res)
      if (pagination.value !== false) {
        pageParam.current = 1
        pagination.value = { ...pagination.value, total: res.length }
      }
    } else if (res?.records) {
      // 索引使用已回写数据所属的分页，等待新请求时不能跟随分页控件提前换号。
      dataPagination.value = {
        current: res.current ?? requestedPage.current,
        pageSize: res.size ?? requestedPage.size,
      }
      updateSource(res.records)
      if (pagination.value !== false) {
        pageParam.current = dataPagination.value.current
        pageParam.size = dataPagination.value.pageSize
        pagination.value = { ...pagination.value, total: res.total }
      }
    }
    // Schema 可能在注册后异步设置，加载完成时读取，避免初始化时漏掉回调。
    const handlers = option.onLoaded ? [option.onLoaded, ...callbacks] : [...callbacks]
    return Promise.all(handlers.map((cb) => cb(res)))
  }

  const goPage = (current: number, size = pageParam.size) => {
    pageParam.current = size !== pageParam.size ? 1 : current
    pageParam.size = size
    return request()
  }
  const query = (param?: Obj) => {
    if (pagination.value) pageParam.current = 1
    return request(param)
  }
  const reportQueryError = (error) => {
    // 内部调度没有调用者接收拒绝；公开 query/reload 仍透传原始异常。
    if (error?.name !== 'AbortError') console.error(error)
  }
  const throttleRequest = throttle((param?: Obj) => query(param).catch(reportQueryError), 300, { leading: false })
  const handleTableChange = (change: UITableChange) => {
    const previous = params.table
    // 本地 UI 状态不进入远程查询条件；分页通知中的相同状态不重复执行转换。
    const state = change.remoteParams ?? (change.remote !== false ? { filters: change.filters, sorters: change.sorters } : undefined)
    if (state && !isEqual(tableState.value, state)) tableState.value = cloneDeep(state)
    if (change.action === 'paginate') {
      if (!pagination.value || change.pagination?.current === undefined) return
      const size = change.pagination.pageSize ?? pageParam.size
      const current = size !== pageParam.size ? 1 : change.pagination.current
      if (current === pageParam.current && size === pageParam.size) return
      pageParam.current = current
      pageParam.size = size
      if (option.apis?.query) return request().catch(reportQueryError)
      return
    }
    if (change.remote === false) {
      // 本地筛选仍遵循原生分页复位，但不向远程接口重新查询。
      if (change.action === 'filter' && pagination.value && change.pagination?.current !== undefined) {
        pageParam.current = change.pagination.current
      }
      return
    }
    if (!option.apis?.query || isEqual(previous, params.table)) return
    return query().catch(reportQueryError)
  }
  const cancelQuery = () => {
    throttleRequest.cancel()
    activeController?.abort()
    activeController = undefined
    latestRequestId += 1
    loading.value = false
  }

  const pagination = ref<false | Obj>(false)
  watch(
    () => option.attrs?.pagination,
    (def) => {
      if (def === false) {
        pagination.value = false
        return
      }
      // 保留传入的 Ref，reactive 在读取时归一化为数值，切页与外部受控状态仍双向同步。
      Object.assign(pageParam, { size: def?.pageSize || 10, current: def?.current || 1 })
      pagination.value = {
        ...def,
        pageSize: pageParam.size,
        current: pageParam.current,
      }
    },
    { immediate: true, flush: 'sync' }
  )
  watch(
    pageParam,
    (page) => {
      if (pagination.value) pagination.value = { ...pagination.value, pageSize: page.size, current: page.current }
    },
    { flush: 'sync' }
  )
  watch(
    () =>
      [
        option.apis?.query,
        source?.value.length ?? unref(option.dataSource)?.length,
        pageParam.current,
        pageParam.size,
        pagination.value === false,
      ] as const,
    ([queryApi, total]) => {
      if (queryApi || !pagination.value || total === undefined) return
      const current = Math.min(Math.max(1, pageParam.current), Math.max(1, Math.ceil(total / pageParam.size)))
      pageParam.current = current
      if (pagination.value.total !== total || pagination.value.current !== current) {
        pagination.value = { ...pagination.value, total, current }
      }
    },
    { immediate: true }
  )

  return {
    goPage,
    reload: request,
    throttleRequest,
    cancelQuery,
    setQueryParams,
    getQueryParams,
    handleTableChange,
    query,
    pagination,
    dataPagination,
    setPageData,
    onLoaded,
    loading,
  }
}
