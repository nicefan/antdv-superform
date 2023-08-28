<script lang="ts">
import { h, ref, reactive, PropType, defineComponent, toRef, mergeProps, inject } from 'vue'
import { ButtonGroup } from '../buttons'
import base from '../base'
import { buildData } from './buildData'
import { Row } from 'ant-design-vue'

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
    const listData = model.listData
    const selectedRowKeys = ref<string[]>([])
    const selectedRows = ref<Obj[]>([])
    const rowSelection =
      isView || (!attrs.rowSelection && attrs.rowSelection !== undefined)
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

    const { list, columns, methods, modalSlot } = buildData({ option, listData, orgList, rowKey, listener, isView })


    const tableRef = ref()
    const getTable = (el) => {
      if (!el) return
      Object.assign(exposed, el)
      if (!tableRef.value) {
        tableRef.value = el
        ctx.emit('register', exposed)
      }
    }

    const editParam = reactive({ ...effectData, current: orgList, selectedRows, selectedRowKeys, tableRef })
    const rootSlots = inject('rootSlot', {})
    const slots: Obj = {  ...ctx.slots }
    if (option.slots) {
      Object.entries(option.slots).forEach(([key, value]) => {
        slots[key] = typeof value === 'string' ? rootSlots[value] : value
      })
    }
    slots.title ||= () => (isView && option.descriptionsProps?.title) || option.label
    const buttonsConfig = option.buttons as any
    if (!isView && buttonsConfig) {
      const slotName = buttonsConfig.forSlot || 'extra'
      const orgSlot = slots[slotName]
      slots[slotName] = () => [
        orgSlot?.(),
        h(ButtonGroup, {
          config: buttonsConfig,
          param: editParam,
          methods,
        }),
      ]
    }

    const { title: titleSlot, extra: extraSlot, ...__slots } = slots
    if (titleSlot || extraSlot) {
      __slots.title = () =>
        h(Row, { justify: 'space-between', align: 'middle' }, () => [
          h('div', { class: 'exa-title' }, titleSlot?.()),
          extraSlot?.(),
        ])
    }

    const exposed = reactive({
      selectedRowKeys,
      selectedRows,
      reload: (param) => apis.query?.(param),
      add: (meta) => methods.add?.({ meta }),
      edit: (meta) => methods.edit?.({ ...editParam, meta }),
      delete: () => methods.delete?.(editParam),
      view: (meta) => methods.view?.({ ...editParam, meta }),
    })

    return () => [
      modalSlot?.(),
      h(
        base.Table,
        {
          ref: getTable,
          dataSource: list.value,
          columns,
          tableLayout: 'fixed',
          pagination: isView ? false : undefined,
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
