import { computed, defineComponent, h, nextTick, unref } from 'vue'
import { ElTable, ElTableColumn, ElPagination, ElTabs, ElTabPane, ElCard } from 'element-plus'
import type { UIRenderers, UITableSelectors } from 'superform/sdk'
const TableRenderer = defineComponent({
  inheritAttrs: false,
  props: ['data', 'pagination', 'tableRef'],
  setup(props, { attrs, slots }) {
    // 分页结果保持引用稳定，避免 ElTable 的数据监听与父级实例同步相互触发。
    const pageData = computed(() => {
      const { data, pagination } = props
      const size = pagination?.pageSize || 10
      const offset = ((pagination?.current || 1) - 1) * size
      return pagination && data.length > size ? data.slice(offset, offset + size) : data
    })
    return () => renderNativeTable({ ...attrs, data: props.data, pagination: props.pagination, ref: props.tableRef } as any, slots, pageData.value)
  },
})
export const renderTable: UIRenderers['table'] = ({ ref, ...props }, slots = {}) =>
  h(TableRenderer, { ...props, tableRef: ref }, slots)

const renderNativeTable = (props: Parameters<UIRenderers['table']>[0], slots: Obj, pageData: Obj[]) => {
  const { data, columns = [], selection, expandedKeys, onExpandedChange, pagination, rowKey, scroll, ref: tableRef, ...rest } = props
  // ElTable 不内置分页：全量本地数据由 Adapter 截取；接口已分页的数据不重复截取。
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
    {
      ...rest,
      ref: assignTableRef,
      data: pageData,
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
      onSelectionChange: (rows) => {
        if (syncingSelection || !selection) return
        // ElTable 只返回当前切片的选择；本地其它页仍属于同一数据源，应与 AntDV 保持一致。
        const pageKeys = new Set(pageData.map(getRowKey))
        const selectedKeys = new Set(selection.selectedKeys)
        const retained = data.filter(row => selectedKeys.has(getRowKey(row)) && !pageKeys.has(getRowKey(row)))
        const nextRows = [...retained, ...rows]
        selection.onChange?.(nextRows.map(getRowKey), nextRows, {})
      },
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
  const { small, ...paginationAttrs } = pagination.attrs || {}
  const paginationProps = {
    currentPage: pagination.current,
    pageSize: pagination.pageSize,
    // 查询结果异步返回前没有 total，Element Plus 会把分页判定为非法；本地数组模式则回退到当前数据量。
    total: pagination.total ?? data.length,
    pageSizes: pagination.pageSizeOptions,
    layout: 'total, sizes, prev, pager, next, jumper',
    onCurrentChange: (page) => pagination.onChange?.(page, pagination.pageSize),
    onSizeChange: (size) =>
      (pagination.onShowSizeChange || pagination.onChange)?.(pagination.current ?? 1, size),
    ...paginationAttrs,
    ...(small !== undefined ? { size: small ? 'small' : undefined } : {}),
    small: false,
  }
  return h('div', { class: 'sup-table-adapter' }, [
    table,
    h(ElPagination as any, paginationProps),
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
