import { isRef, ref, toRaw, watch, type Ref } from 'vue'
import { nanoid } from 'nanoid'

/** 配置只在初始化时读取；行数据、选中键与展开键保留各自的响应式状态。 */
export function useTableRows(
  orgList: Ref<Obj[]>,
  attrs: Obj,
  editInline: boolean,
  onExpandedChange: (keys: any[]) => void
) {
  const keyMap = new WeakMap<object, PropertyKey>()
  const rowKeyField = attrs.rowKey || 'id'
  const rowKey = (record: Obj): PropertyKey => {
    const key = typeof rowKeyField === 'function' ? rowKeyField(record) : record[rowKeyField]
    if (key !== undefined && key !== null) return key
    const raw = toRaw(record)
    if (!keyMap.has(raw)) keyMap.set(raw, nanoid(12))
    return keyMap.get(raw)!
  }
  const selection = attrs.rowSelection || undefined
  // 上层 reactive 可能解包嵌套 Ref，取原对象保留选中键的双向绑定。
  const configuredKeys = toRaw(selection || {}).selectedRowKeys
  const selectedRowKeys: Ref<any[]> = isRef(configuredKeys) ? configuredKeys as Ref<any[]> : ref<any[]>(configuredKeys || [])
  const selectedRows = ref<Obj[]>([])
  const childrenField = attrs.childrenColumnName || 'children'
  const availableRows = () => {
    const rows = new Map<PropertyKey, Obj>()
    const visit = (items: Obj[]) => items.forEach((item) => {
      rows.set(rowKey(item), item)
      if (Array.isArray(item[childrenField])) visit(item[childrenField])
    })
    visit(orgList.value)
    return rows
  }
  const {
    selectedRowKeys: _selectedRowKeys,
    onChange: _onChange,
    getCheckboxProps: _getCheckboxProps,
    ...selectionAttrs
  } = selection || {}
  const rowSelection = selection && {
    attrs: { fixed: true, ...selectionAttrs },
    onChange: (keys: any[], rows: Obj[], info: Obj) => {
      if (selection.preserveSelectedRowKeys) {
        const currentRows = availableRows()
        const offPage = selectedRows.value.filter((row) => !currentRows.has(rowKey(row)))
        const merged = new Map([...offPage, ...rows].map((row) => [rowKey(row), row]))
        keys = [...new Set([...offPage.map(rowKey), ...keys])]
        rows = keys.map((key) => merged.get(key)).filter((row): row is Obj => !!row)
      }
      if (
        keys.length === selectedRowKeys.value.length &&
        keys.every((key, index) => key === selectedRowKeys.value[index]) &&
        rows.length === selectedRows.value.length &&
        rows.every((row, index) => row === selectedRows.value[index])
      ) return
      selectedRowKeys.value = keys
      selectedRows.value = rows
      selection.onChange?.(keys, rows, info)
    },
    isRowSelectable: (record: Obj) => {
      if (editInline && !orgList.value.includes(record)) return false
      return !selection.getCheckboxProps?.(record)?.disabled
    },
  }
  watch(
    () => [availableRows(), [...selectedRowKeys.value]] as const,
    ([rows, keys]) => {
      // 默认只保留当前数据的选择；跨页保留时，同键记录仍替换为最新对象。
      const retained = selection?.preserveSelectedRowKeys
      const nextKeys = retained ? [...keys] : keys.filter((key) => rows.has(key))
      const previous = new Map(selectedRows.value.map((row) => [rowKey(row), row]))
      const nextRows = nextKeys
        .map((key) => rows.get(key) ?? (retained ? previous.get(key) : undefined))
        .filter((row): row is Obj => !!row)
      if (
        nextKeys.length !== keys.length ||
        nextRows.length !== selectedRows.value.length ||
        nextRows.some((row, index) => row !== selectedRows.value[index])
      ) {
        selectedRows.value = nextRows
        if (nextKeys.length !== keys.length) selectedRowKeys.value = nextKeys
        selection?.onChange?.(nextKeys, nextRows, { type: 'none' })
      }
    },
    { immediate: true }
  )
  const getExpandKeys = (list: Obj[], depth = 0, level = 1): PropertyKey[] => list.flatMap((item) => {
    if (!item[childrenField]) return []
    return [rowKey(item), ...(depth === level ? [] : getExpandKeys(item[childrenField], depth, level + 1))]
  })
  const expandedRowKeys = ref<any[]>(attrs.expandedRowKeys ?? [])
  const setExpandedRowKeys = (keys: any[]) => {
    expandedRowKeys.value = keys
    onExpandedChange(keys)
  }
  if (attrs.defaultExpandLevel || attrs.defaultExpandAllRows) {
    watch(orgList, (list, old) => {
      if (list.length && !old?.length) setExpandedRowKeys(getExpandKeys(list, Number(attrs.defaultExpandLevel)))
    }, { immediate: true })
  }
  return {
    rowKey,
    rowSelection,
    selectedRowKeys,
    selectedRows,
    expandedRowKeys,
    setSelectedRows: (rows: Obj[]) => {
      selectedRows.value = rows
      selectedRowKeys.value = rows.map(rowKey)
    },
    setExpandedRowKeys,
    expandAll: () => setExpandedRowKeys(getExpandKeys(orgList.value)),
  }
}

export type TableRowState = ReturnType<typeof useTableRows>
