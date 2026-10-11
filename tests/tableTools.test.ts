import { computed, reactive } from 'vue'
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

describe('Table toolbar boundaries', () => {
  it('关闭列设置恢复业务列，重新启用保留偏好且不修改原列', () => {
    const columns = [{ key: 'name', fixed: 'left' as const }, { key: 'age' }]
    const state = createTableViewState()
    reconcileTableViewState(columns, state)
    const toolbar = createTableToolbarProps(columns, state, ['columnSetting'])
    toolbar.onColumnFixedChange('name', 'right')
    toolbar.onColumnOrderChange(['age', 'name'])
    toolbar.onVisibleKeysChange(['name'])
    expect(applyTableColumnState(columns, state, false)).toBe(columns)
    expect(applyTableColumnState(columns, state, true)).toEqual([{ key: 'name', fixed: 'right' }])
    expect(columns).toEqual([{ key: 'name', fixed: 'left' }, { key: 'age' }])
  })

  it('列重建不会覆盖用户密度，也不会恢复已删除列的偏好', () => {
    const state = createTableViewState()
    const columns = [{ key: 'name' }, { key: 'age' }]
    reconcileTableViewState(columns, state, 'default')
    const toolbar = createTableToolbarProps(columns, state, ['density', 'columnSetting'])
    toolbar.onDensityChange('large')
    toolbar.onVisibleKeysChange(['age'])
    reconcileTableViewState([{ key: 'age' }], state, 'small')
    reconcileTableViewState(columns, state, 'small')
    expect(state.density).toBe('large')
    expect(state.visibleKeys).toEqual(['age', 'name'])
    expect(state.order).toEqual(['age', 'name'])
  })
})


describe('Table toolbar reactivity', () => {
  it('首次固定列和取消固定立即更新表格列与工具栏状态', () => {
    const columns = [{ key: 'name' }]
    const state = reactive(createTableViewState())
    reconcileTableViewState(columns, state)
    const display = computed(() => applyTableColumnState(columns, state, true))
    const toolbar = computed(() => createTableToolbarProps(columns, state, ['columnSetting']))
    expect(display.value[0].fixed).toBeUndefined()
    expect(toolbar.value.columns[0].fixed).toBeUndefined()
    toolbar.value.onColumnFixedChange('name', 'left')
    expect(display.value[0].fixed).toBe('left')
    expect(toolbar.value.columns[0].fixed).toBe('left')
    toolbar.value.onColumnFixedChange('name', undefined)
    expect(display.value[0].fixed).toBeUndefined()
    expect(toolbar.value.columns[0].fixed).toBeUndefined()
  })
})
