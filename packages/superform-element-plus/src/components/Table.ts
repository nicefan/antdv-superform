import { computed, defineComponent, h, mergeProps, nextTick, reactive, unref, watch } from 'vue'
import { ElTable, ElTableColumn, ElPagination, ElTabs, ElTabPane, ElCard } from 'element-plus'
import type { UIRenderers, UITableChange, UITableParams, UITableSelectors } from 'superform/sdk'
type PaginationState = { current: number; pageSize: number; changed: boolean }
const TableRenderer = defineComponent({
  inheritAttrs: false,
  props: ['data', 'pagination', 'tableRef'],
  setup(props, { attrs, slots }) {
    // Element Plus 的 filter-change 只返回本次变化的列，需要实例级状态合成完整筛选。
    const tableParams: UITableParams = { filters: {}, sorters: [] }
    // 先同步受控值，原生 change 才能合并页码和条数变化；上下分页共享同一模型。
    const pageState = reactive<PaginationState>({ current: 1, pageSize: 10, changed: false })
    watch([
      () => props.pagination?.attrs?.currentPage ?? props.pagination?.current ?? props.pagination?.attrs?.defaultCurrentPage ?? 1,
      () => props.pagination?.attrs?.pageSize ?? props.pagination?.pageSize ?? props.pagination?.attrs?.defaultPageSize ?? 10,
    ], ([current, pageSize]) => {
      pageState.current = current
      pageState.pageSize = pageSize
    }, { immediate: true, flush: 'sync' })
    // 分页结果保持引用稳定，避免 ElTable 的数据监听与父级实例同步相互触发。
    const pageData = computed(() => {
      const { data, pagination } = props
      const size = pageState.pageSize
      const offset = (pageState.current - 1) * size
      return pagination && data.length > size ? data.slice(offset, offset + size) : data
    })
    return () => renderNativeTable({ ...attrs, data: props.data, pagination: props.pagination, ref: props.tableRef } as any, slots, pageData.value, tableParams, pageState)
  },
})
export const renderTable: UIRenderers['table'] = ({ ref, ...props }, slots = {}) =>
  h(TableRenderer, { ...props, key: props.queryResetKey, tableRef: ref }, slots)

const callHandler = (handler, ...args) => {
  const handlers = Array.isArray(handler) ? handler : [handler]
  handlers.forEach((fn) => fn?.(...args))
}
const renderNativeTable = (props: Parameters<UIRenderers['table']>[0], slots: Obj, pageData: Obj[], tableParams: UITableParams, pageState: PaginationState) => {
  const { data, columns = [], selection, expandedKeys, onExpandedChange, onTableChange, pagination, rowKey, scroll, ref: tableRef, queryResetKey, ...rest } = props
  const flatColumns: Obj[] = []
  const visitColumns = (items: Obj[]) => items.forEach((column) => {
    flatColumns.push(column)
    if (column.children) visitColumns(column.children)
  })
  visitColumns(columns)
  const getField = (column: Obj) => {
    const field = column.dataIndex ?? column.key
    return Array.isArray(field) ? field.join('.') : String(field ?? '')
  }
  const findColumn = (key: string) => flatColumns.find((column) => String(column.columnKey ?? column.key) === key || getField(column) === key)
  const emitChange = (action: UITableChange['action'], remote: boolean, page = pagination || undefined) => {
    callHandler(onTableChange, {
      action,
      filters: Object.fromEntries(Object.entries(tableParams.filters).map(([field, values]) => [field, [...values]])),
      sorters: tableParams.sorters.map((sorter) => ({ ...sorter })),
      // 本地条件只保留在统一事件中，不能在后续翻页或刷新时带入远程转换。
      remoteParams: {
        filters: Object.fromEntries(Object.entries(tableParams.filters)
          .filter(([field]) => typeof findColumn(field)?.filterMethod !== 'function')
          .map(([field, values]) => [field, [...values]])),
        sorters: tableParams.sorters.filter(({ field }) => findColumn(field)?.sortable === 'custom')
          .map((sorter) => ({ ...sorter })),
      },
      pagination: page && { current: page.current, pageSize: page.pageSize, total: page.total },
      remote,
    })
  }
  // ElTable 不内置分页：全量本地数据由 Adapter 截取；接口已分页的数据不重复截取。
  const getRowKey = (row: Obj) => (typeof rowKey === 'function' ? rowKey(row) : row[rowKey])
  const getCellValue = (record: Obj, path: string | string[]) =>
    (Array.isArray(path) ? path : String(path).split('.')).reduce((value, key) => value?.[key], record)
  const renderColumns = (items: Obj[]) =>
    items.map((column) => {
      const { dataIndex, title, children, customRender, key, ...columnAttrs } = column
      if (queryResetKey) delete columnAttrs.filteredValue
      return h(
        ElTableColumn,
        {
          ...columnAttrs,
          key: key ?? (Array.isArray(dataIndex) ? dataIndex.join('.') : dataIndex),
          prop: Array.isArray(dataIndex) ? dataIndex.join('.') : dataIndex,
          columnKey: String(columnAttrs.columnKey ?? key ?? getField(column)),
        },
        children?.length
          ? {
              header: () => slots.headerCell?.({ ...column, title }),
              default: () => renderColumns(children),
            }
          : {
              header: () => slots.headerCell?.({ ...column, title }),
              default: ({ row, $index }) => {
                const cell =
                  customRender?.({
                    text: getCellValue(row, dataIndex),
                    record: row,
                    index: $index,
                    column,
                  }) ?? getCellValue(row, dataIndex)
                // Element Plus 会对默认插槽结果调用 some；统一返回数组才能保留编辑节点等单个 VNode。
                return cell == null ? [] : Array.isArray(cell) ? cell : [cell]
              },
            }
      )
    })
  let syncingSelection = true
  const syncSelection = (instance: any) => {
    if (!instance || !selection) return
    nextTick(() => {
      syncingSelection = true
      instance.clearSelection?.()
      const keys = new Set(selection.selectedKeys)
      const visit = (rows: Obj[]) =>
        rows.forEach((row) => {
          if (keys.has(getRowKey(row))) instance.toggleRowSelection?.(row, true)
          if (Array.isArray(row.children)) visit(row.children)
        })
      visit(pageData)
      syncingSelection = false
    })
  }
  const assignTableRef = (instance: any) => {
    syncSelection(instance)
    // Element Plus 需要自己的 ref 同步选中行，同时必须把实例转交给 Core，保留表格公开方法。
    if (typeof tableRef === 'function') tableRef(instance)
    else if (tableRef && typeof tableRef === 'object') tableRef.value = instance
  }
  const table = h(
    ElTable as any,
    mergeProps({
      ...rest,
      ...(queryResetKey ? { defaultSort: {} } : {}),
      ref: assignTableRef,
      data: pageData,
      rowKey: rowKey as any,
      // ElTable 只在收到字符串时重置内联高度，undefined/null 会留下旧约束。
      height: rest.height ?? '',
      maxHeight: unref(scroll)?.y ?? rest.maxHeight ?? '',
      // 原生树形状态使用对象的字符串键；数字键须统一后才能受控展开。
      expandRowKeys: expandedKeys?.map(String),
      onSortChange: (sort) => {
        const previous = tableParams.sorters[0]?.field
        const field = sort.prop || sort.column?.property || previous
        const column = findColumn(field)
        tableParams.sorters = sort.order && field
          ? [{ field, order: sort.order === 'ascending' ? 'asc' : 'desc' }]
          : []
        const remote = (sort.column?.sortable ?? column?.sortable) === 'custom'
          || (previous !== undefined && previous !== field && findColumn(previous)?.sortable === 'custom')
        emitChange('sort', remote)
      },
      onFilterChange: (changes) => {
        let remote = false
        Object.entries(changes).forEach(([key, values]) => {
          const column = findColumn(key)
          const field = getField(column || { key })
          if (Array.isArray(values) && values.length) tableParams.filters[field] = [...values]
          else delete tableParams.filters[field]
          remote ||= typeof column?.filterMethod !== 'function'
        })
        emitChange('filter', remote)
      },
      onExpandChange: (row, rowsOrExpanded) => {
        if (Array.isArray(rowsOrExpanded)) {
          onExpandedChange?.(rowsOrExpanded.map(getRowKey))
          return
        }
        const keys = new Set(expandedKeys || [])
        const key = getRowKey(row)
        rowsOrExpanded ? keys.add(key) : keys.delete(key)
        onExpandedChange?.([...keys])
      },
      onSelectionChange: (rows) => {
        if (syncingSelection || !selection) return
        // ElTable 只返回当前切片的选择；本地其它页仍属于同一数据源，应与 AntDV 保持一致。
        const pageKeys = new Set(pageData.map(getRowKey))
        const selectedKeys = new Set(selection.selectedKeys)
        const retained = data.filter(row => selectedKeys.has(getRowKey(row)) && !pageKeys.has(getRowKey(row)))
        const nextRows = [...retained, ...rows]
        selection.onChange?.(nextRows.map(getRowKey), nextRows, {})
      },
    }, { onSortChange: rest.onSortChange, onFilterChange: rest.onFilterChange }),
    {
      ...slots,
      default: () => [
        selection &&
          h(ElTableColumn, {
            type: 'selection',
            fixed: selection.attrs?.fixed ?? true,
            selectable: selection.isRowSelectable,
            ...selection.attrs,
          }),
        ...renderColumns(columns),
      ],
    }
  )
  if (!pagination) return table
  const {
    small,
    placement = (pagination as Obj).placement ?? ['bottomEnd'],
    onCurrentChange,
    onSizeChange,
    onChange,
    ...paginationAttrs
  } = pagination.attrs || {}
  const paginationProps = mergeProps({
    // 查询结果异步返回前没有 total，Element Plus 会把分页判定为非法；本地数组模式则回退到当前数据量。
    total: pagination.total ?? data.length,
    pageSizes: pagination.pageSizeOptions,
    layout: 'total, sizes, prev, pager, next, jumper',
    ...paginationAttrs,
    currentPage: pageState.current,
    pageSize: pageState.pageSize,
    onCurrentChange: (page) => {
      if (page === pageState.current) return
      pageState.current = page
      pageState.changed = true
    },
    onSizeChange: (size) => {
      if (size === pageState.pageSize) return
      pageState.current = 1
      pageState.pageSize = size
      pageState.changed = true
      pagination.onShowSizeChange?.(pageState.current, size)
    },
    onChange: (page, size) => {
      // 只消费一次交互变化，外部回写及另一组分页的被动同步不再次发出查询事件。
      if (!pageState.changed) return
      pageState.changed = false
      emitChange('paginate', true, { ...pagination, current: page, pageSize: size })
      pagination.onChange?.(page, size)
    },
    ...(small !== undefined ? { size: small ? 'small' : undefined } : {}),
    small: false,
  }, { onCurrentChange, onSizeChange, onChange })
  // 每个方向最多展示一组分页，与 AntDV 的 placement 数组语义保持一致。
  const renderPagination = (position?: string) => position && h('div', {
    class: ['sup-table-pagination', position.startsWith('top') ? 'sup-table-pagination-top' : 'sup-table-pagination-bottom'],
    style: { justifyContent: position.endsWith('Start') ? 'flex-start' : position.endsWith('Center') ? 'center' : 'flex-end' },
  }, [h(ElPagination as any, paginationProps)])
  return h('div', { class: 'sup-table-adapter' }, [
    renderPagination(placement.find((position: string) => position.startsWith('top'))),
    table,
    renderPagination(placement.find((position: string) => position.startsWith('bottom'))),
  ])
}
export const renderTableFilter: UIRenderers['tableFilter'] = (props, slots = {}) => {
  const { bordered, items, value, onValueChange, attrs = {} } = props
  const { tabExtra, cardExtra, ...contentSlots } = slots
  const tabs = h(
    ElTabs as any,
    { ...attrs, modelValue: value, 'onUpdate:modelValue': onValueChange },
    {
      default: () =>
        items.map((item: Obj) => {
          const { tab, key, ...attrs } = item
          return h(ElTabPane, { ...attrs, key, name: key }, { label: () => tab })
        }),
    }
  )
  const tabsRow = h('div', { class: 'sup-table-tabs' }, [tabs, tabExtra?.()])
  const content = [tabsRow, contentSlots.default?.()]
  return bordered
    ? h(
        ElCard,
        {},
        {
          default: () => content,
          header: contentSlots.title || cardExtra ? () => [contentSlots.title?.(), cardExtra?.()] : undefined,
        }
      )
    : content
}
export const tableSelectors: UITableSelectors = {
  table: '.el-table',
  header: '.el-table__header-wrapper',
  footer: '.el-table__footer-wrapper',
  pagination: '.el-pagination',
  empty: '.el-table__empty-block',
  emptyCell: '.el-table__empty-block',
  body: '.el-table__body-wrapper .el-scrollbar__wrap',
}
