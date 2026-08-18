import { describe, expect, it } from 'vitest'
import { findRowIndex } from '../src/components/Table/rowUtils'

describe('表格行定位', () => {
  it('目标记录不在列表时返回 -1，不应删除任何行', () => {
    const list = [{ id: 1 }, { id: 2 }]
    const target = { id: 3 }

    const index = findRowIndex(list, target, (record) => record.id)
    if (index > -1) list.splice(index, 1)

    expect(index).toBe(-1)
    expect(list).toEqual([{ id: 1 }, { id: 2 }])
  })

  it('优先按稳定 rowKey 找到不同引用的记录', () => {
    const list = [{ id: 1 }, { id: 2 }]

    expect(findRowIndex(list, { id: 2 }, (record) => record.id)).toBe(1)
  })
})
