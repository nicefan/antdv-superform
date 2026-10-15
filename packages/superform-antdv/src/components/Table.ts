import { defineComponent, h, mergeProps, shallowReactive, watchEffect } from 'vue'
import { cloneDeep, isEqual, pick } from 'lodash-es'
import { Table, Card, Tabs, TabPane, Space } from 'antdv-next'
import type { UIRenderers, UITableParams, UITableSelectors, UITableSorter } from 'superform/sdk'
import { useTableView } from '../../../shared/tableTools'
import { renderTableToolbar } from './TableToolbar'

const queryKeys = ['sortOrder', 'defaultSortOrder', 'filteredValue', 'defaultFilteredValue']
// 用表格实例标识保留兼容状态；列重建可复用，表格释放后不留下全局强引用。
const queryResets = new WeakMap<object, { version: number; columns: Obj[] }>()
const getField = (column: Obj) => {
  const field = column.dataIndex ?? column.key
  return Array.isArray(field) ? field.join('.') : String(field ?? '')
}
const findResetColumn = (column: Obj, index: number, columns: Obj[]) =>
  column.key != null || getField(column)
    ? columns.find((item) => item.key === column.key && getField(item) === getField(column))
    : columns[index]
const captureQueryColumns = (columns: Obj[]): Obj[] =>
  columns.map((column) => ({
    ...cloneDeep(pick(column, ['key', 'dataIndex', ...queryKeys])),
    ...(column.children && { children: captureQueryColumns(column.children) }),
  }))
const updateQueryColumns = (columns: Obj[], resetColumns: Obj[]) =>
  columns.forEach((column, index) => {
    const resetColumn = findResetColumn(column, index, resetColumns)
    if (!resetColumn) return
    // 新属性交还业务控制，之后即使改回旧值也不重新屏蔽；渲染只读取此状态。
    for (const key of queryKeys) {
      if (key in resetColumn && !isEqual(column[key], resetColumn[key])) delete resetColumn[key]
    }
    if (column.children) updateQueryColumns(column.children, resetColumn.children || [])
  })

const TableRenderer = defineComponent({
  inheritAttrs: false,
  props: ['tableRef', 'columns', 'queryReset'],
  setup(props, { attrs, slots }) {
    const scope = props.queryReset || { version: 0 }
    let reset = queryResets.get(scope)
    if (!reset || reset.version !== scope.version) {
      reset = { version: scope.version, columns: scope.version ? captureQueryColumns(props.columns) : [] }
      queryResets.set(scope, reset)
    }
    const resetColumns = reset.columns
    watchEffect(() => updateQueryColumns(props.columns, resetColumns), { flush: 'sync' })
    // 排序取消事件可能不带列信息，保留上次状态才能识别取消的是本地还是远程排序。
    const tableParams: UITableParams = { filters: {}, sorters: [] }
    return () =>
      renderNativeTable(
        { ...attrs, columns: props.columns, ref: props.tableRef } as any,
        slots,
        tableParams,
        resetColumns
      )
  },
})
const TableView = defineComponent({
  inheritAttrs: false,
  props: ['tableInstance', 'tableRef', 'columns', 'tableTools', 'size', 'onRefresh', 'tabs', 'extraAlign'],
  setup(props, { attrs, slots }) {
    const view = useTableView(props)
    const columnWidths = shallowReactive(new Map<string, number>())
    const columnKey = (column: Obj) => String(column.key ?? getField(column))
    // 拖动宽度只作用于 UI 派生列，显隐及排序后仍按列标识保留。
    const resizeColumns = (columns: Obj[]): Obj[] => columns.map((column) => ({
      ...column,
      width: columnWidths.get(columnKey(column)) ?? column.width,
      ...(column.children && { children: resizeColumns(column.children) }),
    }))
    const onResizeColumn = (width: number, column: Obj) => {
      columnWidths.set(columnKey(column), width)
      callHandler(attrs.onResizeColumn, width, column)
    }
    return () => {
      const { title, extra, tableBody, tabExtra, tabBarExtra, rightExtra, tabBarExtraContent, ...nativeSlots } = slots
      const renderBody = () => h(TableRenderer, {
        ...attrs,
        key: view.queryReset.version,
        queryReset: view.queryReset,
        columns: resizeColumns(view.columns.value),
        onResizeColumn,
        size: view.density.value ?? props.size,
        tableRef: props.tableRef,
      }, nativeSlots)
      const content = () => tableBody ? tableBody({ render: renderBody }) : renderBody()
      const renderExtra = extra || view.tools.value.length ? () => h(Space, { size: 'small', align: 'center' }, {
        default: () => [extra?.(), view.tools.value.length ? renderTableToolbar(view.toolbar.value) : null],
      }) : undefined
      const titleBar = () => title || renderExtra ? h('div', {
        class: 'sup-titlebar', style: { display: 'flex', alignItems: 'center', gap: '16px' },
      }, [
        title && h('div', { class: 'sup-title', style: { flex: '0 1 auto' } }, title()),
        renderExtra && h('div', { class: 'sup-title-buttons', style: { flex: 1, textAlign: props.extraAlign || 'right' } }, [renderExtra()]),
      ]) : null
      if (!props.tabs) return [titleBar(), content()]
      const tabsExtra = tabBarExtra || rightExtra || tabBarExtraContent || tabExtra
      // 无标题的普通 Tabs 共用右侧操作区，保留自定义内容及工具栏。
      const tabActions = !props.tabs.bordered && !title && tabsExtra && renderExtra
        ? () => h(Space, { size: 'small' }, { default: () => [tabsExtra(), renderExtra()] })
        : tabsExtra || (!title ? renderExtra : undefined)
      return [
        !props.tabs.bordered && title ? titleBar() : null,
        renderTableTabs(props.tabs, {
          title,
          default: content,
          tabExtra: tabActions,
          cardExtra: tabsExtra || title ? renderExtra : undefined,
        }),
      ]
    }
  },
})

export const renderTable: UIRenderers['table'] = ({ ref, ...props }, slots = {}) =>
  h(TableView, { ...props, tableRef: ref }, slots)

const callHandler = (handler, ...args) => {
  const handlers = Array.isArray(handler) ? handler : [handler]
  handlers.forEach((fn) => fn?.(...args))
}
const renderNativeTable = (
  props: Parameters<UIRenderers['table']>[0],
  slots: Obj,
  tableParams: UITableParams,
  resetColumns: Obj[]
) => {
  const { data, selection, expandedKeys, onExpandedChange, onTableChange, pagination, ...rest } = props
  const flatColumns: Obj[] = []
  const visitColumns = (columns: Obj[] = []) =>
    columns.forEach((column) => {
      flatColumns.push(column)
      visitColumns(column.children)
    })
  visitColumns(rest.columns)
  const findColumn = (key: string) =>
    flatColumns.find((column) => String(column.key) === key || getField(column) === key)
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
        filters: Object.fromEntries(
          Object.entries(filters)
            .filter(([field]) => typeof findColumn(field)?.onFilter !== 'function')
            .map(([field, values]) => [field, [...values]])
        ),
        sorters: sorters
          .filter(({ field }) => {
            const sorter = findColumn(field)?.sorter
            return !!sorter && typeof sorter !== 'function' && typeof sorter.compare !== 'function'
          })
          .map((item) => ({ ...item })),
      },
      pagination: pagination ? { current: page.current, pageSize: page.pageSize, total: page.total } : undefined,
      remote,
    })
  }
  const renderColumns = (columns: any[] = [], resetColumns: Obj[] = []) =>
    columns.map((column: any, index) => {
      const { customRender, children, isIndexColumn: _isIndexColumn, ...attrs } = column
      const resetColumn = findResetColumn(column, index, resetColumns)
      if (resetColumn) {
        for (const key of queryKeys) {
          if (!(key in resetColumn)) continue
          if (key === 'sortOrder') attrs[key] = null
          else if (key === 'filteredValue') attrs[key] = []
          else delete attrs[key]
        }
      }
      return {
        ...attrs,
        ...(customRender
          ? {
              // antdv-next 使用 render，Core 的 customRender 参数需要在 Adapter 边界转换。
              render: (text, record, index) => customRender({ text, record, index, column }),
            }
          : {}),
        ...(children?.length ? { children: renderColumns(children, resetColumn?.children) } : {}),
      }
    })
  return h(
    Table as any,
    mergeProps(
      {
        ...rest,
        dataSource: data,
        columns: renderColumns(rest.columns, resetColumns),
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
      },
      { onChange: rest.onChange }
    ),
    slots
  )
}
const renderTableTabs = (props: NonNullable<Parameters<UIRenderers['table']>[0]['tabs']>, slots: Obj = {}) => {
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
