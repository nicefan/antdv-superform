<script lang="ts">
import { h, ref, reactive, unref, type PropType, defineComponent, toRef, watch } from 'vue'
import { createButtons } from '../buttons'
import base from '../base'
import { buildData } from './buildData'
import { Col, Row } from 'ant-design-vue'
import type { TableApis } from '../../exaTypes'
import { toNode } from '../../utils'
import { globalProps } from '../../plugin'
import TabsFilter from './TabsFilter.vue'
import { isPlainObject } from 'lodash-es'

export default defineComponent({
  name: 'SuperTable',
  inheritAttrs: false,
  props: {
    option: {
      required: true,
      type: Object as PropType<GetOption<'Table'>>,
    },
    model: {
      required: true,
      type: Object as PropType<ModelDataGroup>,
    },
    isView: Boolean,
    effectData: Object,
    apis: Object as PropType<TableApis>,
    indexColumn: [Boolean, Object],
    expandedRowKeys: Array,
    defaultExpandLevel: null as unknown  as PropType<number | 'all'>
  },
  emits: ['register', 'expandedRowChange'],
  setup({ option, model, apis = {} as TableApis, effectData, isView, ...props }, ctx) {
    const editInline = option.rowEditor?.editMode === 'inline'
    const attrs: Obj = ctx.attrs
    const rowKey = (record) => record[attrs.rowKey] || record['_ID_']
    const orgList = toRef(model, 'refData')
    const __rowSelection = option.attrs?.rowSelection // === true ? {} : attrs.rowSelection
    const selectedRowKeys = ref<any[]>(__rowSelection?.selectedRowKeys || [])
    const selectedRows = ref<Obj[]>([])
    const rowSelection =
      __rowSelection || (__rowSelection === undefined && editInline)
        ? {
            fixed: true,
            ...__rowSelection,
            selectedRowKeys,
            onChange: (_selectedRowKeys, _selectedRows) => {
              selectedRowKeys.value = _selectedRowKeys
              selectedRows.value = _selectedRows
              __rowSelection?.onChange?.(_selectedRowKeys, _selectedRows)
            },
            ...(editInline && {
              getCheckboxProps: (record) => ({
                disabled: !orgList.value.includes(record),
                ...__rowSelection?.getCheckboxProps?.(record),
              }),
            }),
          }
        : undefined

    const getExpandKeys = (list, deep=0, level =1) => {
      const arr: any[] = []
      const isEnd = deep === level
      list.forEach(item => {
        if (item.children) {
          arr.push(rowKey(item))
          if (!isEnd) {
            arr.push(...getExpandKeys(item.children, deep, level+1))
          }
        }
      })
      return arr
    }
    const expandedRowKeys = ref(option.attrs?.expandedRowKeys || []);
    const updateExpand = (val) => {
      expandedRowKeys.value = val
      ctx.emit('expandedRowChange', val)
    }
    if (props.defaultExpandLevel || attrs.defaultExpandAllRows) {
      watch(orgList, (list, old) => {
        if (!old.length) {
          updateExpand(getExpandKeys(list, Number(props.defaultExpandLevel)))
        }
      })
    }
    const listener = {
      async onSave(data) {
        if (apis.save) {
          const { _ID_, ...rest } = data
          await apis.save(rest)
          if (rest.parentId) {
            expandedRowKeys.value = [...expandedRowKeys.value, rest.parentId]
          }
          return apis.query(true)
        } else {
          orgList.value.push(data)
        }
      },
      async onUpdate(newData, oldData) {
        if (apis.update) {
          await apis.update(newData)
          return apis.query(true)
        } else {
          Object.assign(oldData, newData)
        }
      },
      async onDelete(items) {
        if (apis.delete) {
          await apis.delete(items)
          return apis.query(true)
        } else {
          items.forEach((item) => {
            orgList.value.splice(orgList.value.indexOf(item), 1)
          })
        }
        if (rowSelection) {
          if (items.length === 1) {
            selectedRowKeys.value = selectedRowKeys.value.filter((key) => key !== rowKey(items[0]))
            selectedRows.value = selectedRows.value.filter((item) => rowKey(item) !== rowKey(items[0]))
          } else {
            selectedRowKeys.value = []
            selectedRows.value = []
          }
        }
      },
    }

    const { list, columns, methods, modalSlot } = buildData({ option, model, orgList, rowKey, listener, isView })
    const indexColumn = props.indexColumn ?? globalProps.Table?.indexColumn
    if (indexColumn) {
      columns.unshift({
        dataIndex: 'INDEX',
        title: '序号',
        width: 60,
        align: 'center',
        customRender: ({ index }) => {
          return ((attrs.pagination?.current || 1) - 1) * (attrs.pagination?.pageSize || 10) + index + 1
        },
        ...(isPlainObject(indexColumn) && indexColumn),
      })
    }
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
      setExpandedRowKeys:updateExpand,
      expandAll:() => {
         updateExpand(getExpandKeys(orgList.value))
      },
      reload: () => apis.query?.(true),
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

    const editParam = reactive({ ...effectData, current: orgList, selectedRows, selectedRowKeys, tableRef: exposed })

    const slots: Obj = { ...ctx.slots }

    const buttonsConfig = option.buttons as any
    const slotName = buttonsConfig?.forSlot || 'extra'
    if (buttonsConfig) {
      const orgSlot = slots[slotName]
      const buttonsSlot = createButtons({
        config: buttonsConfig,
        effectData: editParam,
        methods,
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
          titleSlot && h(Col, { class: 'sup-title' }, () => toNode(titleSlot, effectData)),
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
      modalSlot?.(),
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
          rowSelection,
          rowKey,
          expandedRowKeys: expandedRowKeys.value,
          'onUpdate:expandedRowKeys':updateExpand,
          class: 'sup-table-wrapper',
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
