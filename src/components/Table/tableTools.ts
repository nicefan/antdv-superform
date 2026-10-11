import type { UITableColumn } from '../../adapter'
import type {
  UITableDensity,
  UITableToolName,
  UITableToolbarColumn,
  UITableToolbarProps,
} from '../../adapter'

type ColumnFixed = 'left' | 'right'

type ColumnEntry = {
  key: string
  column: UITableColumn
}

/** 跨 Table 子实例保留的视图偏好；Schema columns 始终是业务来源。 */
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
  if (entry.key in state.fixed) {
    return state.fixed[entry.key] ?? undefined
  }
  return entry.column.fixed === 'left' || entry.column.fixed === 'right' ? entry.column.fixed : undefined
}

export function applyTableColumnState(
  columns: UITableColumn[],
  state: TableViewState,
  enabled: boolean
): UITableColumn[] {
  if (!enabled) return columns
  const entries = getColumnEntries(columns)
  const byKey = new Map(entries.map((entry) => [entry.key, entry]))
  return state.order.flatMap((key) => {
    if (!state.visibleKeys.includes(key)) return []
    const entry = byKey.get(key)
    if (!entry) return []
    if (!(key in state.fixed)) return [entry.column]
    return [{ ...entry.column, fixed: state.fixed[key] ?? undefined }]
  })
}

export function createTableToolbarProps(
  columns: UITableColumn[],
  state: TableViewState,
  tools: UITableToolName[],
  reload?: () => unknown
): UITableToolbarProps {
  const entries = getColumnEntries(columns)
  const byKey = new Map(entries.map((entry) => [entry.key, entry]))
  const knownKeys = entries.map(({ key }) => key)
  const toolbarColumns: UITableToolbarColumn[] = state.order.flatMap((key) => {
    const entry = byKey.get(key)
    return entry
      ? [{ key, title: entry.column.title, fixed: currentFixed(entry, state) }]
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
      state.order = [...next, ...knownKeys.filter((key) => !next.includes(key))]
    },
    onColumnFixedChange: (key, fixed) => {
      if (!knownKeys.includes(key)) return
      state.fixed[key] = fixed ?? null
    },
    onResetColumns: () => {
      state.visibleKeys = [...knownKeys]
      state.order = [...knownKeys]
      state.fixed = {}
    },
  }
}
