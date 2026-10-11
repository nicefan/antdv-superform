import { describe, expect, it, vi } from 'vitest'
import {
  applyTableColumnState,
  createTableToolbarProps,
  createTableViewState,
  reconcileTableViewState,
} from '../src/components/Table/tableTools'

describe('Table toolbar state', () => {
  it('列变化时只保留仍存在的用户偏好并追加新列', () => {
    const state = createTableViewState()
    const first = [
      { key: 'name', title: 'Name', fixed: 'left' as const },
      { key: 'age', title: 'Age' },
    ]

    reconcileTableViewState(first, state, 'middle')
    const toolbar = createTableToolbarProps(first, state, ['columnSetting'])
    toolbar.onColumnOrderChange(['age', 'name'])
    toolbar.onVisibleKeysChange(['age'])
    toolbar.onColumnFixedChange('name', undefined)

    expect(state.density).toBe('middle')
    expect(applyTableColumnState(first, state, true).map((column) => column.key)).toEqual(['age'])

    const next = [
      { key: 'age', title: 'Age' },
      { key: 'email', title: 'Email' },
    ]
    reconcileTableViewState(next, state)

    expect(state.order).toEqual(['age', 'email'])
    expect(state.visibleKeys).toEqual(['age', 'email'])
    expect(state.fixed).toEqual({})
  })

  it('重置恢复 Schema 顺序、可见列和原始固定状态', () => {
    const state = createTableViewState()
    const columns = [
      { key: 'name', title: 'Name', fixed: 'left' as const },
      { key: 'age', title: 'Age' },
    ]
    reconcileTableViewState(columns, state, 'small')
    const toolbar = createTableToolbarProps(columns, state, ['refresh', 'density', 'columnSetting'])

    toolbar.onColumnOrderChange(['age', 'name'])
    toolbar.onVisibleKeysChange(['age'])
    toolbar.onColumnFixedChange('name', 'right')
    toolbar.onDensityChange('large')
    toolbar.onResetColumns()

    expect(state.order).toEqual(['name', 'age'])
    expect(state.visibleKeys).toEqual(['name', 'age'])
    expect(state.density).toBe('large')
    expect(applyTableColumnState(columns, state, true).map((column) => [column.key, column.fixed])).toEqual([
      ['name', 'left'],
      ['age', undefined],
    ])
  })

  it('refresh 只调用 Core 注入的 reload', () => {
    const reload = vi.fn()
    const state = createTableViewState()
    const columns = [{ key: 'name', title: 'Name' }]
    reconcileTableViewState(columns, state)

    const toolbar = createTableToolbarProps(columns, state, ['refresh'], reload)
    toolbar.onReload?.()

    expect(reload).toHaveBeenCalledTimes(1)
  })
})
