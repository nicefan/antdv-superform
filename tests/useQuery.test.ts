import { afterEach, describe, expect, it, vi } from 'vitest'
import { useQuery } from '../src/superTable/useQuery'

describe('表格查询', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('reload 立即请求、保留当前页，并返回可等待的 Promise', async () => {
    const api = vi.fn().mockResolvedValue({ current: 3, size: 20, total: 1, records: [{ id: 1 }] })
    const updateSource = vi.fn()
    const { reload } = useQuery({ pagination: { current: 3, pageSize: 20 }, apis: { query: api } }, updateSource)

    const task = reload()
    expect(task).toBeInstanceOf(Promise)
    await task

    expect(api).toHaveBeenCalledWith({ current: 3, size: 20 }, { signal: expect.any(AbortSignal) })
    expect(updateSource).toHaveBeenCalledWith([{ id: 1 }])
  })

  it('公开 query 不节流，新请求取消旧请求并回到第一页', async () => {
    const requests: Array<{ resolve: (value: any) => void; signal: AbortSignal }> = []
    const api = vi.fn(
      (_params, { signal }) =>
        new Promise((resolve, reject) => {
          signal.addEventListener(
            'abort',
            () => {
              const error = new Error('aborted')
              error.name = 'AbortError'
              reject(error)
            },
            { once: true }
          )
          requests.push({ resolve, signal })
        })
    )
    const updateSource = vi.fn()
    const { query } = useQuery({ pagination: { current: 4, pageSize: 10 }, apis: { query: api } }, updateSource)

    const first = query({ keyword: 'first' })
    const firstCanceled = expect(first).rejects.toMatchObject({ name: 'AbortError' })
    await Promise.resolve()
    const last = query({ keyword: 'last' })
    await Promise.resolve()

    expect(requests[0].signal.aborted).toBe(true)
    await firstCanceled
    requests[1].resolve({ current: 1, size: 10, total: 1, records: [{ id: 2 }] })
    await last

    expect(api).toHaveBeenCalledTimes(2)
    expect(api.mock.calls[0][0]).toEqual({ current: 1, size: 10, keyword: 'first' })
    expect(api.mock.calls[1][0]).toEqual({ current: 1, size: 10, keyword: 'last' })
    expect(updateSource).toHaveBeenCalledOnce()
    expect(updateSource).toHaveBeenCalledWith([{ id: 2 }])
  })

  it('请求未消费 signal 时也不会使用过期响应', async () => {
    const resolvers: Array<(value: any) => void> = []
    const api = vi.fn(() => new Promise((resolve) => resolvers.push(resolve)))
    const updateSource = vi.fn()
    const { query } = useQuery({ apis: { query: api } }, updateSource)

    const first = query({ keyword: 'first' })
    await Promise.resolve()
    const last = query({ keyword: 'last' })
    await Promise.resolve()

    resolvers[1]([{ id: 2 }])
    await last
    resolvers[0]([{ id: 1 }])
    await first

    expect(updateSource).toHaveBeenCalledOnce()
    expect(updateSource).toHaveBeenCalledWith([{ id: 2 }])
  })

  it('初始化调度合并短时间内的调用，只使用最后一次参数', async () => {
    vi.useFakeTimers()
    const api = vi.fn().mockResolvedValue([])
    const { throttleRequest } = useQuery({ apis: { query: api } }, vi.fn())

    throttleRequest({ keyword: 'first' })
    throttleRequest({ keyword: 'last' })
    await vi.advanceTimersByTimeAsync(300)

    expect(api).toHaveBeenCalledTimes(1)
    expect(api).toHaveBeenCalledWith({ current: 1, size: 10, keyword: 'last' }, { signal: expect.any(AbortSignal) })
  })
})
