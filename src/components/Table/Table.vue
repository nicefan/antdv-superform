<script lang="ts">
import { h, ref, reactive, type PropType, defineComponent, toRef, watch } from 'vue'
import { createButtons } from '../buttons'
import base from '../base'
import { buildData } from './buildData'
import { Col, Row } from 'ant-design-vue'
import type { TableApis } from '../../exaTypes'
import { toNode } from '../../utils'
import { globalProps } from '../../plugin'
import TabsFilter from './TabsFilter.vue'

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
  },
  emits: ['register'],
  setup({ option, model, apis = {} as TableApis, effectData, isView }, ctx) {
    const editInline = option.editMode === 'inline'
    const attrs: Obj = ctx.attrs
    const rowKey = attrs.rowKey || 'id'
    const orgList = toRef(model, 'refData')
    const __rowSelection = option.attrs?.rowSelection // === true ? {} : attrs.rowSelection
    const selectedRowKeys = ref<string[]>(__rowSelection?.selectedRowKeys || [])
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

    const listener = {
      async onSave(data) {
        if (apis.save) {
          await apis.save(data)
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
            selectedRowKeys.value = selectedRowKeys.value.filter((key) => key !== items[0][rowKey])
            selectedRows.value = selectedRows.value.filter((item) => item[rowKey] !== items[0][rowKey])
          } else {
            selectedRowKeys.value = []
            selectedRows.value = []
          }
        }
      },
    }

    const { list, columns, methods, modalSlot } = buildData({ option, model, orgList, rowKey, listener, isView })
    const tableRef = ref()

    // TODO: 补充TS
    const actions = {
      selectedRowKeys,
      selectedRows,
      setSelectedRows: (arr: any[]) => {
        selectedRows.value = arr
        selectedRowKeys.value = arr.map((item) => item[rowKey])
        // selectedRows.value = []
      },
      reload: () => apis.query?.(true),
      add: (param?: { resetData?: Obj } & ActionOuter) => methods.add?.(param),
      edit: (param?: ActionOuter) => methods.edit?.({ ...editParam, ...param }),
      delete: () => methods.delete?.(editParam),
      detail: (param?: ActionOuter) => methods.detail?.({ ...editParam, ...param }),
    }
    const exposed = reactive({ ...actions })

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
          class:'sup-table-wrapper',
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
