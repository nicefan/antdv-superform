<script lang="ts">
import { h, ref, reactive, type PropType, defineComponent, toRef, mergeProps, inject, watch } from 'vue'
import { ButtonGroup, createButtons } from '../buttons'
import base from '../base'
import { buildData } from './buildData'
import { Col, Row } from 'ant-design-vue'
import type { TableApis } from '../../exaTypes'
import { toNode } from '../../utils'

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
    disabled: Boolean,
    effectData: Object,
    apis: Object as PropType<TableApis>,
  },
  emits: ['register'],
  setup({ option, model, apis = {} as TableApis, effectData, isView }, ctx) {
    const editInline = option.editMode === 'inline'
    const attrs: Obj = ctx.attrs
    const rowKey = attrs.rowKey || 'id'
    const orgList = toRef(model, 'refData')
    const listData = model.listData
    const selectedRowKeys = ref<string[]>([])
    const selectedRows = ref<Obj[]>([])
    const rowSelection =
      !attrs.rowSelection && attrs.rowSelection !== undefined
        ? undefined
        : reactive(
            mergeProps(attrs.rowSelection, {
              fixed: true,
              selectedRowKeys,
              onChange: (_selectedRowKeys, _selectedRows) => {
                selectedRowKeys.value = _selectedRowKeys
                selectedRows.value = _selectedRows
              },
              ...(editInline && {
                getCheckboxProps: (record) => ({
                  disabled: !orgList.value.includes(record),
                }),
              }),
            })
          )

    const listener = {
      async onSave(data) {
        orgList.value.push(data)
        if (apis.save) {
          await apis.save(data)
          return apis.query(true)
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

    const { list, columns, methods, modalSlot } = buildData({ option, listData, orgList, rowKey, listener, isView })
    const tableRef = ref()

    // TODO: 补充TS
    const actions = {
      selectedRowKeys,
      selectedRows,
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
    const rootSlots = inject('rootSlots', { ...ctx.slots })
    const slots: Obj = { ...rootSlots }
    if (option.slots) {
      Object.entries(option.slots).forEach(([key, value]) => {
        slots[key] = typeof value === 'string' ? rootSlots[value] : (value as any)
      })
    }

    const buttonsConfig = option.buttons as any
    if (buttonsConfig) {
      const slotName = buttonsConfig.forSlot || 'extra'
      const orgSlot = slots[slotName]
      const buttonsSlot = createButtons({
        config: buttonsConfig,
        params: editParam,
        methods,
        isView,
      })
      if (orgSlot || buttonsSlot) {
        slots[slotName] = () => [orgSlot?.(), buttonsSlot?.()]
      }
    }

    const titleString = option.title || option.label
    const { title: titleSlot, extra: extraSlot, ...__slots } = slots
    if (titleString || titleSlot || extraSlot) {
      __slots.title = () =>
        h(Row, { align: 'middle' }, () => [
          h(Col, { class: 'sup-title' }, () => toNode(titleSlot || titleString, effectData)),
          extraSlot &&
            h(Col, { class: 'sup-title-buttons', flex: 1, style: { textAlign: buttonsConfig?.align } }, extraSlot),
        ])
    }
    /** 内置操作附加参数 */
    interface ActionOuter {
      meta: {
        /** 弹窗标题 */
        title?: string
      }
    }

    return () => [
      modalSlot?.(),
      h(
        base.Table,
        {
          ref: tableRef,
          dataSource: list.value,
          columns: reactive(columns),
          tableLayout: 'fixed',
          pagination: false,
          ...attrs,
          rowSelection,
          rowKey,
        },
        __slots
      ),
    ]
  },
})
</script>
