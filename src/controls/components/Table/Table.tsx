/* eslint-disable vue/one-component-per-file */
import { ref, reactive, PropType, defineComponent, toRef, mergeProps } from 'vue'
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
      type: Object as PropType<ModelData>,
    },
    listData: {
      required: true,
      type: Object as PropType<ListModels>,
    },
    // attrs: {
    //   default: () => ({}),
    //   type: Object as PropType<Obj>,
    // },
    effectData: Object,
    apis: Object as PropType<TableApis>,
  },
  emits: ['register'],
  setup({ option, model, listData, apis }, ctx) {
    const editInline = option.editMode === 'inline'
    const attrs: Obj = ctx.attrs
    const rowKey = attrs.rowKey || 'id'
    const orgList = model.refName ? toRef(model.parent, model.refName) : toRef(model, 'parent')

    const { list, columns, methods, modalSlot } = buildData({ option, listData, orgList, rowKey, apis })

    const selectedRowKeys = ref<string[]>([])
    const selectedRows = ref<Obj[]>([])
    const _del = methods.del
    methods.del = (param) => {
      _del(param)
      if (param.record) {
        selectedRowKeys.value = selectedRowKeys.value.filter((key) => key !== param.record[rowKey])
        selectedRows.value = selectedRows.value.filter((item) => item[rowKey] !== param.record[rowKey])
      } else {
        selectedRowKeys.value = []
        selectedRows.value = []
      }
    }

    // watch(selectedRowKeys, (keys) => {
    //   selectedRows.value = listItems.value.filter((item) => keys.includes(item.hash))
    // },{flush:'sync'})
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

    const actions =
      option.buttons &&
      (() =>
        option.buttons && (
          <ButtonGroup config={option.buttons} param={{ selectedRows, selectedRowKeys }} methods={methods} />
        ))
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
    return () => (
      <>
        {modalSlot?.()}
        <base.Table
          ref={getTable}
          dataSource={list.value}
          columns={columns}
          {...attrs}
          rowSelection={rowSelection}
          rowKey={rowKey}
          tableLayout="fixed"
          title={actions}
        >
          {{ tableTitle: actions }}
        </base.Table>
      </>
    )
  },
})
