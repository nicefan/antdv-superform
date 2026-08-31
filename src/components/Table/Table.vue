<script lang="ts">
import { h, ref, reactive, type PropType, defineComponent, toRaw, toRef, watch } from 'vue'
import { nanoid } from 'nanoid'
import { createButtons } from '../buttons'
import base from '../../compat/antdv'
import { buildData } from './buildData'
import { Col, Row } from '../../compat/antdv'
import type { RootTableOption } from '../../exaTypes'
import { toNode, createLabelNode } from '../../utils'
import { globalProps } from '../../plugin'
import TabsFilter from './TabsFilter.vue'
import { buildColumns } from './buildColumns'

export default defineComponent({
  name: 'SuperTable',
  inheritAttrs: false,
  props: {
    option: {
      required: true,
      type: Object as PropType<GetOption<'Table'> & Pick<RootTableOption, 'apis'>>,
    },
    model: {
      required: true,
      type: Object as PropType<ModelDataGroup>,
    },
    effectData: {
      required: true,
      type: Object as PropType<Obj>,
    },
    isView: Boolean,
    reload: Function as PropType<(param?: Obj) => Promise<any>>,
    expandedRowKeys: Array,
    defaultExpandLevel: null as unknown as PropType<number | 'all'>,
  },
  emits: ['register', 'expandedRowsChange'],
  setup({ option, model, reload, effectData, isView, ...props }, ctx) {
    const editInline = option.rowEditor?.editMode === 'inline'
    const attrs: Obj = ctx.attrs
    const keyMap = new WeakMap<object, PropertyKey>()
    const rowKeyField = attrs.rowKey || 'id'
    const rowKey = (record) => {
      const key = record[rowKeyField]
      if (key) return key

      const raw = toRaw(record)
      if (!keyMap.has(raw)) {
        keyMap.set(raw, nanoid(12))
      }
      return keyMap.get(raw)
    }
    const setRowKey = (record, key) => keyMap.set(toRaw(record), key)
    const orgList = toRef(model, 'refData')
    const __rowSelection = option.attrs?.rowSelection || undefined //?? (editInline ? {} : undefined)
    const selectedRowKeys = ref<any[]>(__rowSelection?.selectedRowKeys || [])
    const selectedRows = ref<Obj[]>([])
    const rowSelection = __rowSelection && {
      fixed: true,
      ...__rowSelection,
      selectedRowKeys,
      onChange: (_selectedRowKeys, _selectedRows, info) => {
        selectedRowKeys.value = _selectedRowKeys
        selectedRows.value = _selectedRows
        __rowSelection?.onChange?.(_selectedRowKeys, _selectedRows, info)
      },
      ...(editInline && {
        getCheckboxProps: (record) => ({
          disabled: !orgList.value.includes(record),
          ...__rowSelection?.getCheckboxProps?.(record),
        }),
      }),
    }

    const childrenField = attrs.childrenColumnName || 'children'
    const getExpandKeys = (list, deep = 0, level = 1) => {
      const arr: any[] = []
      const isEnd = deep === level
      list.forEach((item) => {
        if (item[childrenField]) {
          arr.push(rowKey(item))
          if (!isEnd) {
            arr.push(...getExpandKeys(item[childrenField], deep, level + 1))
          }
        }
      })
      return arr
    }
    const expandedRowKeys = ref(option.attrs?.expandedRowKeys || [])
    const updateExpand = (val) => {
      expandedRowKeys.value = val
      ctx.emit('expandedRowsChange', val)
    }
    if (props.defaultExpandLevel || attrs.defaultExpandAllRows) {
      watch(
        orgList,
        (list, old) => {
          if (list.length && !old?.length) {
            updateExpand(getExpandKeys(list, Number(props.defaultExpandLevel)))
          }
        },
        { immediate: true }
      )
    }
    const listener = {
      async onSave(data, index?: number) {
        if (option.apis?.save) {
          await option.apis.save(data)
          if (data.parentId) {
            expandedRowKeys.value = [...expandedRowKeys.value, data.parentId]
          }
          return reload?.()
        } else {
          if (index !== undefined) {
            orgList.value.splice(index + 1, 0, data)
          } else {
            orgList.value.push(data)
          }
        }
      },
      async onUpdate(newData, oldData) {
        if (option.apis?.update) {
          await option.apis.update(newData)
        }
        Object.assign(oldData, newData)
        const key = rowKey(oldData)
        if (key) {
          // 原始对象是解构对象时，更新记录
          const idx = orgList.value.findIndex((item) => rowKey(item) === key)
          if (idx > -1) {
            orgList.value.splice(idx, 1, oldData)
          }
        }
        return reload?.()
      },
      async onDelete(items: any[]) {
        const keys = items.map((item) => rowKey(item))
        try {
          await option.apis?.delete?.(keys, items)
        } catch (error) {
          console.error(error)
          return error
        }
        if (rowSelection) {
          selectedRowKeys.value = selectedRowKeys.value.filter((key) => !keys.includes(key))
          selectedRows.value = selectedRows.value.filter((item) => !keys.includes(rowKey(item)))
        }
        items.forEach((item) => {
          orgList.value.splice(list.value.indexOf(item), 1)
        })
        return reload?.()
      },
    }

    const context = buildData({ option, model, orgList, rowKey, setRowKey, listener, isView, effectData })
    const columns = buildColumns({ childrenMap: model.listData.modelsMap, context, option, attrs, isView, effectData })

    const { list, methods, buttonMethods = methods, modalSlot } = context
    // TODO: 补充TS
    const actions = {
      selectedRowKeys,
      selectedRows,
      setSelectedRows: (arr: any[]) => {
        selectedRows.value = arr
        selectedRowKeys.value = arr.map((item) => rowKey(item))
        // selectedRows.value = []
      },
      expandedRowKeys,
      setExpandedRowKeys: updateExpand,
      expandAll: () => {
        updateExpand(getExpandKeys(orgList.value))
      },
      add: (param?: { resetData?: Obj } & ActionOuter) => methods.add?.(param),
      edit: (param?: ActionOuter) => methods.edit?.({ ...editParam, ...param }),
      delete: () => methods.delete?.(editParam),
      detail: (param?: ActionOuter) => methods.detail?.({ ...editParam, ...param }),
    }
    const exposed = reactive({ ...actions })

    const tableRef = ref()
    watch(
      tableRef,
      (table) => {
        Object.assign(exposed, table, actions)
        ctx.emit('register', exposed)
      },
      { flush: 'sync' }
    )

    const editParam = reactive({ ...effectData, selectedRows, selectedRowKeys, tableRef: exposed })

    const slots: Obj = { ...ctx.slots }

    const buttonsConfig = option.buttons as any
    const slotName = buttonsConfig?.targetSlot ?? buttonsConfig?.forSlot ?? 'extra'
    if (buttonsConfig) {
      const orgSlot = slots[slotName]
      const buttonsSlot = createButtons({
        config: buttonsConfig,
        effectData: editParam,
        methods: buttonMethods,
        isView,
      })
      if (orgSlot || buttonsSlot) {
        slots[slotName] = () => [orgSlot?.(), buttonsSlot?.()]
      }
    }

    const titleString = option.title || option.label
    const { title: titleSlot = titleString, extra: extraSlot, ...__slots } = slots
    const titleBar =
      (titleSlot || extraSlot) &&
      (() =>
        h(Row, { align: 'middle', class: 'sup-titlebar' }, () => [
          titleSlot &&
            h(
              Col,
              { class: 'sup-title' },
              createLabelNode({ labelSlot: titleSlot, tooltip: option.tooltip }, effectData)
            ),
          extraSlot &&
            h(
              Col,
              { class: 'sup-title-buttons', flex: 1, style: { textAlign: buttonsConfig?.align || 'right' } },
              extraSlot
            ),
        ]))
    __slots.headerCell = (col) => {
      return slots.headerCell?.(col) || toNode(col.title, effectData)
    }
    const render = () => [
      ...modalSlot.map((slot) => slot()),
      h(
        base.Table,
        {
          ...globalProps.Table,
          ref: tableRef,
          dataSource: list.value,
          columns: reactive(columns),
          tableLayout: 'fixed',
          pagination: false,
          ...attrs,
          // antdv-next 不会解包嵌套配置中的 Ref，需在组件边界传入实际数组。
          rowSelection: rowSelection && {
            ...rowSelection,
            selectedRowKeys: selectedRowKeys.value,
          },
          rowKey,
          expandedRowKeys: expandedRowKeys.value,
          'onUpdate:expandedRowKeys': updateExpand,
          class: ['sup-table-wrapper', option.editable && 'sup-table-editable'],
        },
        __slots
      ),
    ]
    if (option.tabs) {
      return () =>
        h(TabsFilter, { ...option.tabs, effectData } as any, {
          [slotName]: slots[slotName],
          title: titleSlot && (() => toNode(titleSlot, effectData)),
          extra: extraSlot,
          titleBar,
          default: render,
        })
    } else {
      return () => [titleBar?.(), render()]
    }
    /** 内置操作附加参数 */
    interface ActionOuter {
      meta: {
        /** 弹窗标题 */
        title?: string
      }
    }
  },
})
</script>
