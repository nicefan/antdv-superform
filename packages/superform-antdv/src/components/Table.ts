import { defineComponent, h, mergeProps } from 'vue'
import { Table, Card, Tabs, TabPane } from 'antdv-next'
import type { UIRenderers, UITableParams, UITableSelectors, UITableSorter } from 'superform/sdk'

const TableRenderer = defineComponent({
  inheritAttrs: false,
  props: ['tableRef'],
  setup(props, { attrs, slots }) {
    // 排序取消事件可能不带列信息，保留上次状态才能识别取消的是本地还是远程排序。
    const tableParams: UITableParams = { filters: {}, sorters: [] }
    return () => renderNativeTable({ ...attrs, ref: props.tableRef } as any, slots, tableParams)
  },
})
export const renderTable: UIRenderers['table'] = ({ ref, ...props }, slots = {}) =>
  h(TableRenderer, { ...props, tableRef: ref }, slots)

const callHandler = (handler, ...args) => {
  const handlers = Array.isArray(handler) ? handler : [handler]
  handlers.forEach((fn) => fn?.(...args))
}
const renderNativeTable = (props: Parameters<UIRenderers['table']>[0], slots: Obj, tableParams: UITableParams) => {
  const { data, selection, expandedKeys, onExpandedChange, onTableChange, pagination, ...rest } = props
  const flatColumns: Obj[] = []
  const visitColumns = (columns: Obj[] = []) => columns.forEach((column) => {
    flatColumns.push(column)
    visitColumns(column.children)
  })
  visitColumns(rest.columns)
  const getField = (column: Obj) => {
    const field = column.dataIndex ?? column.key
    return Array.isArray(field) ? field.join('.') : String(field ?? '')
  }
  const findColumn = (key: string) => flatColumns.find((column) => String(column.key) === key || getField(column) === key)
  const onChange = (page, nativeFilters, sorter, extra) => {
    const filters: UITableParams['filters'] = {}
    Object.entries(nativeFilters || {}).forEach(([key, values]) => {
      if (Array.isArray(values) && values.length) filters[getField(findColumn(key) || { key })] = [...values]
    })
    const nativeSorters = Array.isArray(sorter) ? sorter : [sorter]
    const sorters = nativeSorters.flatMap((item): UITableSorter[] => {
      if (!item?.order) return []
      const field = getField(item.column || { dataIndex: item.field, key: item.columnKey })
      if (!field) return []
      return [{ field, order: item.order === 'ascend' ? 'asc' : 'desc' }]
    })
    const action = extra?.action || 'paginate'
    let remote = true
    if (action === 'sort') {
      remote = [...tableParams.sorters, ...sorters].some(({ field }) => {
        const previous = tableParams.sorters.findIndex((item) => item.field === field)
        const next = sorters.findIndex((item) => item.field === field)
        const changed = previous !== next || tableParams.sorters[previous]?.order !== sorters[next]?.order
        const sorter = findColumn(field)?.sorter
        return changed && !!sorter && typeof sorter !== 'function' && typeof sorter.compare !== 'function'
      })
    } else if (action === 'filter') {
      remote = [...new Set([...Object.keys(tableParams.filters), ...Object.keys(filters)])].some((field) => {
        const previous = tableParams.filters[field] || []
        const next = filters[field] || []
        const changed = previous.length !== next.length || previous.some((value, index) => value !== next[index])
        return changed && typeof findColumn(field)?.onFilter !== 'function'
      })
    }
    Object.assign(tableParams, { filters, sorters })
    callHandler(onTableChange, {
      action,
      filters: Object.fromEntries(Object.entries(filters).map(([field, values]) => [field, [...values]])),
      sorters: sorters.map((item) => ({ ...item })),
      // 本地条件只保留在统一事件中，不能在后续翻页或刷新时带入远程转换。
      remoteParams: {
        filters: Object.fromEntries(Object.entries(filters)
          .filter(([field]) => typeof findColumn(field)?.onFilter !== 'function')
          .map(([field, values]) => [field, [...values]])),
        sorters: sorters.filter(({ field }) => {
          const sorter = findColumn(field)?.sorter
          return !!sorter && typeof sorter !== 'function' && typeof sorter.compare !== 'function'
        }).map((item) => ({ ...item })),
      },
      pagination: pagination ? { current: page.current, pageSize: page.pageSize, total: page.total } : undefined,
      remote,
    })
  }
  const renderColumns = (columns: any[] = []) =>
    columns.map((column: any) => {
      const { customRender, children, ...attrs } = column
      return {
        ...attrs,
        ...(customRender
          ? {
              // antdv-next 使用 render，Core 的 customRender 参数需要在 Adapter 边界转换。
              render: (text, record, index) => customRender({ text, record, index, column }),
            }
          : {}),
        ...(children?.length ? { children: renderColumns(children) } : {}),
      }
    })
  return h(
    Table as any,
    mergeProps({
      ...rest,
      dataSource: data,
      columns: renderColumns(rest.columns),
      onChange,
      rowSelection: selection && {
        ...selection.attrs,
        selectedRowKeys: selection.selectedKeys,
        onChange: selection.onChange,
        getCheckboxProps: selection.isRowSelectable
          ? (row: Obj) => ({
              disabled: !selection.isRowSelectable?.(row),
            })
          : undefined,
      },
      pagination: pagination && {
        ...pagination.attrs,
        ...pagination,
        attrs: undefined,
      },
      expandedRowKeys: expandedKeys,
      'onUpdate:expandedRowKeys': onExpandedChange,
    }, { onChange: rest.onChange }),
    slots
  )
}
export const renderTableFilter: UIRenderers['tableFilter'] = (props, slots = {}) => {
  const { bordered, items, value, onValueChange, attrs = {} } = props
  const { tabExtra, cardExtra, ...contentSlots } = slots
  if (bordered) {
    return h(
      Card as any,
      {
        tabList: items as any,
        activeTabKey: value,
        onTabChange: onValueChange,
      },
      {
        ...contentSlots,
        customTab: ({ tab }) => tab,
        tabBarExtraContent: tabExtra,
        extra: cardExtra,
      }
    )
  }
  const { tabPosition, ...tabAttrs } = attrs
  const tabs = h(
    Tabs as any,
    {
      ...tabAttrs,
      ...(tabPosition === undefined ? {} : { tabPlacement: tabPosition }),
      activeKey: value,
      'onUpdate:activeKey': onValueChange,
    },
    {
      ...contentSlots,
      default: () => items.map((item: Obj) => h(TabPane, { ...item, tab: () => item.tab })),
      rightExtra: tabExtra,
    }
  )
  return [tabs, slots.default?.()]
}
export const tableSelectors: UITableSelectors = {
  table: '.ant-table',
  title: '.ant-table-title',
  header: '.ant-table-thead',
  footer: '.ant-table-footer',
  pagination: '.ant-pagination',
  wrapper: '.ant-table-wrapper',
  empty: '.ant-empty',
  emptyCell: '.ant-table-tbody .ant-table-cell',
  body: '.ant-table-body, .ant-table-content',
  bodyContent: '.ant-table-tbody',
}
