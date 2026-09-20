import { h } from 'vue'
import { Table, Card, Tabs, TabPane } from 'antdv-next'
import type { UIRenderers, UITableSelectors } from 'superform/sdk'
export const renderTable: UIRenderers['table'] = (props, slots = {}) => {
  const { data, selection, expandedKeys, onExpandedChange, pagination, ...rest } = props
  return h(
    Table as any,
    {
      ...rest,
      dataSource: data,
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
  const tabs = h(
    Tabs as any,
    { ...attrs, activeKey: value, 'onUpdate:activeKey': onValueChange },
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
  body: '.ant-table-body',
}
