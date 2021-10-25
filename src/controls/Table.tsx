/* eslint-disable vue/one-component-per-file */
import { ref, reactive, h, PropType, defineComponent, inject } from 'vue'
import { nanoid } from 'nanoid'
import { buildModel } from '../util'
import { useModal } from '../Modal'
import cloneDeep from 'lodash/cloneDeep'
import BottonGroup from './ButtonGroup.vue'
import inlineRender from './TableEdit'
import Collections from './Collections'

function modalEdit(cols: any[], list, rowKey) {
  // 生成新增表单
  const modelRef = reactive<Obj>({})
  const rules = {}
  const editModels = cols.map((col) => ({ option: col, modelData: buildModel(col, { parent: modelRef, rules }) }))

  const defData = cloneDeep(modelRef)
  const formData = inject('formData')
  const formRef = ref()
  const editForm = defineComponent({
    provide: {
      formData,
    },
    setup() {
      return () => (
        <a-form ref={formRef} class="exa-form" model={modelRef} rules={rules} layout="vertical">
          <Collections option={{ columns: cols }} modelData={{ parent: modelRef }} />
        </a-form>
      )
    },
  })
  const { openModal } = useModal(editForm)

  const methods = {
    add() {
      Object.assign(modelRef, cloneDeep(defData), { [rowKey]: nanoid(12) })
      openModal({
        title: '新增',
        onOk() {
          return formRef.value.validate().then(() => {
            list.push(cloneDeep(modelRef))
          })
        },
      })
    },
    edit({ record, selectedRows }) {
      const data = record || selectedRows[0]
      Object.assign(modelRef, cloneDeep(data))
      openModal({
        title: '修改',
        onOk() {
          return formRef.value.validate().then(() => {
            const idx = list.indexOf(data)
            Object.assign(list[idx], cloneDeep(modelRef))
          })
        },
      })
    },
    del({ record, selectedRows }) {
      const items = record ? [record] : selectedRows
      items.forEach((item) => {
        list.splice(list.indexOf(item), 1)
      })
    },
  }
  return { methods }
}

function buildData(option: ExTableOption, orgList: Obj[], rowKey: string) {
  const { columns, itemButtons, buttons } = option

  let context: {
    list: Ref
    columns: Obj[]
    methods: Obj
    actionSlot?: Fn
  }

  if (option.editMode === 'inline') {
    context = inlineRender(columns, orgList, rowKey)
    if (option.addMode === 'modal') {
      const modalInfo = modalEdit(columns, orgList, rowKey)
      context.methods.add = modalInfo.methods.add
    }
  } else {
    const cols: Obj[] = columns.map((item) => {
      return {
        title: item.label,
        dataIndex: item.prop,
        ...item.attr,
      }
    })
    const { methods } = modalEdit(columns, orgList, rowKey)
    context = {
      list: ref(orgList),
      columns: cols,
      methods,
    }
  }
  if (itemButtons) {
    context.columns.push({
      title: '操作',
      key: 'action',
      customRender: (param) => {
        console.log('table')
        return context.actionSlot?.(param) || h(BottonGroup, { config: itemButtons, param, methods: context.methods })
      },
    })
  }

  return context
}

export default defineComponent({
  name: 'ExaTable',
  props: {
    option: {
      required: true,
      type: Object as PropType<ExTableOption>,
    },
    modelData: {
      required: true,
      type: Object as PropType<ModelData>,
    },
  },
  setup({ option, modelData }) {
    const editInline = option.editMode === 'inline'
    const rowKey = option.attr?.rowKey || 'id'

    const { list, columns, methods } = buildData(option, modelData.parent as Obj[], rowKey)

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
    const rowSelection = {
      fixed: true,
      selectedRowKeys,
      onChange: (_selectedRowKeys, _selectedRows) => {
        selectedRowKeys.value = _selectedRowKeys
        selectedRows.value = _selectedRows
      },
      ...(editInline && {
        getCheckboxProps: (record) => ({
          disabled: !modelData.parent.includes(record),
        }),
      }),
    }
    const btns =
      option.buttons && h(BottonGroup, { config: option.buttons, param: { selectedRows, selectedRowKeys }, methods })
    return () => (
      <>
        {btns}
        <a-table
          dataSource={list.value}
          columns={columns}
          {...option.attr}
          rowSelection={rowSelection}
          rowKey={rowKey}
          tableLayout="fixed"
        />
      </>
    )
  },
})
