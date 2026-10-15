import { computed, reactive, watch } from 'vue'
import type { UITableColumn, UITableToolName } from 'superform/sdk'

type UITableDensity = 'small' | 'middle' | 'large'
interface UITableToolbarColumn {
  key: string
  title?: unknown
  fixed?: 'left' | 'right'
  sortable?: boolean
}
export interface TableToolbarProps {
  tools: UITableToolName[]
  density: UITableDensity
  columns: UITableToolbarColumn[]
  visibleKeys: string[]
  onReload?: () => unknown
  onDensityChange: (density: UITableDensity) => void
  onVisibleKeysChange: (keys: string[]) => void
  onColumnOrderChange: (keys: string[]) => void
  onColumnFixedChange: (key: string, fixed: 'left' | 'right' | undefined) => void
  onResetColumns: () => void
}

type ColumnFixed = 'left' | 'right'

type ColumnEntry = {
  key: string
  column: UITableColumn
}

/** UI 私有偏好；只派生原生表格属性，不修改传入的业务列。 */
export interface TableViewState {
  density: UITableDensity
  densityInitialized: boolean
  visibleKeys: string[]
  order: string[]
  fixed: Record<string, ColumnFixed | null>
  knownKeys: string[]
}

export function createTableViewState(): TableViewState {
  return {
    density: 'small',
    densityInitialized: false,
    visibleKeys: [],
    order: [],
    fixed: {},
    knownKeys: [],
  }
}

export function normalizeTableTools(value?: false | UITableToolName[]): UITableToolName[] {
  return value === false || !value ? [] : [...new Set(value)]
}

function rawColumnKey(column: UITableColumn, index: number) {
  const field = column.key ?? column.dataIndex
  if (Array.isArray(field)) return field.join('.')
  return String(field ?? `__column_${index}`)
}

function getColumnEntries(columns: UITableColumn[]): ColumnEntry[] {
  const used = new Set<string>()
  return columns.map((column, index) => {
    const base = rawColumnKey(column, index)
    const key = used.has(base) ? `${base}#${index}` : base
    used.add(key)
    return { key, column }
  })
}

function normalizeDensity(size: unknown): UITableDensity {
  if (size === 'large') return 'large'
  if (size === 'middle' || size === 'default') return 'middle'
  return 'small'
}

/**
 * 保留仍存在列的用户偏好，新增列按 Schema 顺序追加，删除列不会被用户状态恢复。
 */
export function reconcileTableViewState(columns: UITableColumn[], state: TableViewState, nativeSize?: unknown) {
  const entries = getColumnEntries(columns)
  const keys = entries.map(({ key }) => key)
  const added = keys.filter((key) => !state.knownKeys.includes(key))
  state.visibleKeys = [...state.visibleKeys.filter((key) => keys.includes(key)), ...added]
  state.order = [...state.order.filter((key) => keys.includes(key)), ...added]
  for (const key of Object.keys(state.fixed)) {
    if (!keys.includes(key)) delete state.fixed[key]
  }
  state.knownKeys = keys
  if (!state.densityInitialized) {
    state.density = normalizeDensity(nativeSize)
    state.densityInitialized = true
  }
}

function currentFixed(entry: ColumnEntry, state: TableViewState): ColumnFixed | undefined {
  if (entry.column.isIndexColumn) return 'left'
  if (entry.key in state.fixed) {
    return state.fixed[entry.key] ?? undefined
  }
  return entry.column.fixed === true
    ? 'left'
    : entry.column.fixed === 'left' || entry.column.fixed === 'right'
    ? entry.column.fixed
    : undefined
}

export function applyTableColumnState(
  columns: UITableColumn[],
  state: TableViewState,
  enabled: boolean
): UITableColumn[] {
  if (!enabled) return columns
  const entries = getColumnEntries(columns)
  const byKey = new Map(entries.map((entry) => [entry.key, entry]))
  const displayed = state.order.flatMap((key) => {
    if (!state.visibleKeys.includes(key)) return []
    const entry = byKey.get(key)
    if (!entry) return []
    if (entry.column.isIndexColumn) return [{ ...entry.column, fixed: 'left' }]
    if (!(key in state.fixed)) return [entry.column]
    return [{ ...entry.column, fixed: state.fixed[key] ?? undefined }]
  })
  // 两套原生表格都按左右固定区域布局；先分区，避免固定列留在中间时偏移错误。
  return [
    ...displayed.filter((column) => column.isIndexColumn),
    ...displayed.filter((column) => !column.isIndexColumn && (column.fixed === 'left' || column.fixed === true)),
    ...displayed.filter(
      (column) => !column.isIndexColumn && column.fixed !== true && column.fixed !== 'left' && column.fixed !== 'right'
    ),
    ...displayed.filter((column) => !column.isIndexColumn && column.fixed === 'right'),
  ]
}

export function createTableToolbarProps(
  columns: UITableColumn[],
  state: TableViewState,
  tools: UITableToolName[],
  reload?: () => unknown
): TableToolbarProps {
  const entries = getColumnEntries(columns)
  const byKey = new Map(entries.map((entry) => [entry.key, entry]))
  const knownKeys = entries.map(({ key }) => key)
  const indexKeys = entries.filter(({ column }) => column.isIndexColumn).map(({ key }) => key)
  const orderedKeys = [...indexKeys, ...state.order.filter((key) => !indexKeys.includes(key))]
  const toolbarColumns: UITableToolbarColumn[] = orderedKeys.flatMap((key) => {
    const entry = byKey.get(key)
    return entry
      ? [
          {
            key,
            title: entry.column.title,
            fixed: currentFixed(entry, state),
            sortable: !entry.column.isIndexColumn,
          },
        ]
      : []
  })

  return {
    tools,
    density: state.density,
    columns: toolbarColumns,
    visibleKeys: [...state.visibleKeys],
    onReload: reload,
    onDensityChange: (density) => {
      state.density = density
    },
    onVisibleKeysChange: (keys) => {
      state.visibleKeys = [...new Set(keys)].filter((key) => knownKeys.includes(key))
    },
    onColumnOrderChange: (keys) => {
      const next = [...new Set(keys)].filter((key) => knownKeys.includes(key))
      state.order = [
        ...indexKeys,
        ...next.filter((key) => !indexKeys.includes(key)),
        ...knownKeys.filter((key) => !indexKeys.includes(key) && !next.includes(key)),
      ]
    },
    onColumnFixedChange: (key, fixed) => {
      if (!knownKeys.includes(key) || indexKeys.includes(key)) return
      state.fixed[key] = fixed ?? null
    },
    onResetColumns: () => {
      state.visibleKeys = [...knownKeys]
      state.order = [...indexKeys, ...knownKeys.filter((key) => !indexKeys.includes(key))]
      state.fixed = {}
    },
  }
}

// Core 仅传稳定实例标识；列模型重建时，偏好和原生重置状态仍由 UI 自行保存。
const tableViews = new WeakMap<object, { view: TableViewState; queryReset: { version: number } }>()

export function useTableView(props: {
  tableInstance?: object
  columns: UITableColumn[]
  tableTools?: false | UITableToolName[]
  size?: unknown
  onRefresh?: () => unknown
}) {
  const identity = props.tableInstance || {}
  let state = tableViews.get(identity)
  if (!state) {
    state = { view: reactive(createTableViewState()), queryReset: reactive({ version: 0 }) }
    tableViews.set(identity, state)
  }
  const { view, queryReset } = state
  watch(() => props.columns, (columns) => reconcileTableViewState(columns, view, props.size), { immediate: true, flush: 'sync' })
  const tools = computed(() => normalizeTableTools(props.tableTools).filter((tool) => tool !== 'refresh' || props.onRefresh))
  return {
    queryReset,
    tools,
    columns: computed(() => applyTableColumnState(props.columns, view, tools.value.includes('columnSetting'))),
    density: computed(() => tools.value.includes('density') ? view.density : undefined),
    toolbar: computed(() => createTableToolbarProps(props.columns, view, tools.value, props.onRefresh ? () => {
      queryReset.version += 1
      return props.onRefresh?.()
    } : undefined)),
  }
}
