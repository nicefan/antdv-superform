import { h, nextTick, unref } from 'vue'
import { ElTable, ElTableColumn, ElPagination, ElTabs, ElTabPane, ElCard } from 'element-plus'
import type { UIRenderers, UITableSelectors } from 'superform/sdk'
export const renderTable: UIRenderers['table'] = (props, slots = {}) => {
  const { data, columns = [], selection, expandedKeys, onExpandedChange, pagination, rowKey, scroll, ...rest } = props
  const getRowKey = (row: Obj) => (typeof rowKey === 'function' ? rowKey(row) : row[rowKey])
  const getCellValue = (record: Obj, path: string | string[]) =>
    (Array.isArray(path) ? path : String(path).split('.')).reduce((value, key) => value?.[key], record)
  const renderColumns = (items: Obj[]) =>
    items.map((column) => {
      const { dataIndex, title, children, customRender, key, ...columnAttrs } = column
      return h(
        ElTableColumn,
        {
          ...columnAttrs,
          key: key ?? (Array.isArray(dataIndex) ? dataIndex.join('.') : dataIndex),
          prop: Array.isArray(dataIndex) ? dataIndex.join('.') : dataIndex,
        },
        children?.length
          ? {
              header: () => slots.headerCell?.({ ...column, title }),
              default: () => renderColumns(children),
            }
          : {
              header: () => slots.headerCell?.({ ...column, title }),
              default: ({ row, $index }) =>
                customRender?.({
                  text: getCellValue(row, dataIndex),
                  record: row,
                  index: $index,
                  column,
                }) ?? getCellValue(row, dataIndex),
            }
      )
    })
  let syncingSelection = false
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
      visit(data)
      syncingSelection = false
    })
  }
  const table = h(
    ElTable as any,
    {
      ...rest,
      ref: syncSelection,
      data,
      rowKey: rowKey as any,
      maxHeight: unref(scroll)?.y ?? rest.maxHeight,
      expandRowKeys: expandedKeys as any,
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
      onSelectionChange: (rows) => !syncingSelection && selection?.onChange?.(rows.map(getRowKey), rows, {}),
    },
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
  return h('div', { class: 'sup-table-adapter' }, [
    table,
    h(ElPagination as any, {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      total: pagination.total,
      pageSizes: pagination.pageSizeOptions,
      layout: 'total, sizes, prev, pager, next, jumper',
      'onUpdate:currentPage': (page) => pagination.onChange?.(page, pagination.pageSize),
      'onUpdate:pageSize': (size) =>
        (pagination.onShowSizeChange || pagination.onChange)?.(pagination.current ?? 1, size),
      ...pagination.attrs,
    }),
  ])
}
export const renderTableFilter: UIRenderers['tableFilter'] = (props, slots = {}) => {
  const { bordered, items, value, onValueChange, attrs = {} } = props
  const { tabExtra, cardExtra, ...contentSlots } = slots
  const tabs = h(
    ElTabs as any,
    { ...attrs, modelValue: value, 'onUpdate:modelValue': onValueChange },
    {
      default: () => items.map((item: Obj) => h(ElTabPane, { ...item, label: item.tab, name: item.key })),
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
