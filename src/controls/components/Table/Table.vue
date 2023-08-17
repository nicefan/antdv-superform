<script lang="ts">
import { h, ref, reactive, PropType, defineComponent, toRef, mergeProps, toRefs, inject } from 'vue'
import { ButtonGroup, mergeActions } from '../../buttons'
import base from '../../override'
import { buildData } from './buildData'

export default defineComponent({
  name: 'ExaTable',
  inheritAttrs: false,
  props: {
    option: {
      required: true,
      type: Object as PropType<ExTableOption>,
    },
    model: {
      required: true,
      type: Object as PropType<ModelDataGroup>,
    },
    effectData: Object,
    apis: Object as PropType<TableApis>,
  },
  emits: ['register'],
  setup({ option, model, apis = {} as TableApis, effectData }, ctx) {
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
        if (apis.save) {
          await apis.save(data)
          return apis.query()
        } else {
          orgList.value.push(data)
        }
      },
      async onUpdate(newData, oldData) {
        if (apis.update) {
          await apis.update(newData)
          return apis.query()
        } else {
          Object.assign(oldData, newData)
        }
      },
      async onDelete(items) {
        if (apis.delete) {
          await apis.delete(items)
          return apis.query()
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

    const { list, columns, methods, modalSlot } = buildData({ option, listData, orgList, rowKey, listener })

    const actions =
      option.buttons &&
      (() =>
        option.buttons &&
        h(ButtonGroup, {
          config: option.buttons,
          param: reactive({ ...effectData, current: orgList, selectedRows, selectedRowKeys }),
          methods,
        }))
    const compRef = ref()

    const getTable = (el) => {
      if (!el) return
      if (compRef.value) {
        Object.assign(compRef.value, el)
      } else {
        compRef.value = reactive(el)
        ctx.emit('register', compRef.value)
      }
    }
    const rootSlots = inject('rootSlot', {})
    const slots: Obj = { ...ctx.slots }
    if (option.slots) {
      Object.entries(option.slots).forEach(([key, value]) => {
        slots[key] = typeof value === 'string' ? rootSlots[value] : value
      })
    }
    slots[option.buttons?.forSlot || 'title'] = actions

    return () => [
      modalSlot?.(),
      h(
        base.Table,
        {
          ref: getTable,
          dataSource: list.value,
          columns,
          tableLayout: 'fixed',
          ...attrs,
          rowSelection,
          rowKey,
        },
        slots
      ),
    ]
  },
})
</script>
