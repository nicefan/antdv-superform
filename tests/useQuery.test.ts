import { afterEach, describe, expect, it, vi } from 'vitest'
import { useQuery } from '../src/superTable/useQuery'

describe('表格查询', () => {
  afterEach(() => vi.useRealTimers())

  it('reload 节流请求并保留当前页', async () => {
    vi.useFakeTimers()
    const api = vi.fn().mockResolvedValue({ current: 3, size: 20, total: 1, records: [{ id: 1 }] })
    const updateSource = vi.fn()
    const { reload } = useQuery({ pagination: { current: 3, pageSize: 20 }, apis: { query: api } }, updateSource)

    reload()
    expect(api).not.toHaveBeenCalled()
    await vi.advanceTimersByTimeAsync(300)

    expect(api).toHaveBeenCalledWith({ current: 3, size: 20 }, { signal: expect.any(AbortSignal) })
    expect(updateSource).toHaveBeenCalledWith([{ id: 1 }])
  })

  it('query 节流请求、合并参数并回到第一页', async () => {
    vi.useFakeTimers()
    const api = vi.fn().mockResolvedValue([])
    const { query } = useQuery({ pagination: { current: 4, pageSize: 10 }, apis: { query: api } }, vi.fn())

    query({ keyword: 'first' })
    query({ keyword: 'last' })
    await vi.advanceTimersByTimeAsync(300)

    expect(api).toHaveBeenCalledOnce()
    expect(api).toHaveBeenCalledWith({ current: 1, size: 10, keyword: 'last' }, { signal: expect.any(AbortSignal) })
  })

  it('新查询进入等待期时立即取消旧请求，并丢弃未消费 signal 的过期响应', async () => {
    vi.useFakeTimers()
    const requests: Array<{ resolve: (value: any) => void; signal: AbortSignal }> = []
    const api = vi.fn((_params, { signal }) => new Promise((resolve) => requests.push({ resolve, signal })))
    const updateSource = vi.fn()
    const { query } = useQuery({ apis: { query: api } }, updateSource)

    query({ keyword: 'first' })
    await vi.advanceTimersByTimeAsync(300)
    query({ keyword: 'last' })

    expect(requests[0].signal.aborted).toBe(true)
    await vi.advanceTimersByTimeAsync(300)
    requests[1].resolve([{ id: 2 }])
    await Promise.resolve()
    await Promise.resolve()
    requests[0].resolve([{ id: 1 }])
    await Promise.resolve()

    expect(updateSource).toHaveBeenCalledOnce()
    expect(updateSource).toHaveBeenCalledWith([{ id: 2 }])
  })

  it('初始化调度合并短时间内的调用，只使用最后一次参数', async () => {
    vi.useFakeTimers()
    const api = vi.fn().mockResolvedValue([])
    const { reload } = useQuery({ apis: { query: api } }, vi.fn())

    reload({ keyword: 'first' })
    reload({ keyword: 'last' })
    await vi.advanceTimersByTimeAsync(300)

    expect(api).toHaveBeenCalledTimes(1)
    expect(api).toHaveBeenCalledWith({ current: 1, size: 10, keyword: 'last' }, { signal: expect.any(AbortSignal) })
  })

  it('取消查询时同时取消等待中的调度', async () => {
    vi.useFakeTimers()
    const api = vi.fn().mockResolvedValue([])
    const { query, cancelQuery } = useQuery({ apis: { query: api } }, vi.fn())

    query()
    cancelQuery()
    await vi.advanceTimersByTimeAsync(300)

    expect(api).not.toHaveBeenCalled()
  })
})
