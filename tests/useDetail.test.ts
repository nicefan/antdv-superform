import { describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { useDetail } from '../src/superDetail/useDetail'

describe('详情异步注册', () => {
  it.each(['before', 'after'] as const)('保留 %s 注册时写入的最新数据，随后仍可更新', async (timing) => {
    let resolveSchema!: (schema: any) => void
    const schemaTask = new Promise<any>((resolve) => { resolveSchema = resolve })
    const [register, detail] = useDetail(() => schemaTask)
    let renderedData: any
    const instance = {
      setOption: vi.fn((schema) => {
        // 模拟 SuperDetail 在下次更新中监听 Schema.dataSource。
        nextTick(() => { renderedData = schema.dataSource })
      }),
      setData: vi.fn((data) => { renderedData = data }),
    }
    if (timing === 'before') detail.setData({ name: 'first' })
    register(instance)
    if (timing === 'after') detail.setData({ name: 'first' })
    detail.setData({ name: 'latest' })
    resolveSchema({ dataSource: { name: 'schema' }, subItems: [] })
    await schemaTask
    await nextTick()
    await nextTick()
    expect(instance.setOption).toHaveBeenCalledOnce()
    expect(renderedData).toEqual({ name: 'latest' })
    detail.setData({ name: 'updated' })
    expect(renderedData).toEqual({ name: 'updated' })
  })
})
