/* eslint-disable vue/one-component-per-file */
import { ref, reactive, h, PropType, defineComponent, inject } from 'vue'
import { nanoid } from 'nanoid'
import { cloneModels } from '../utils/util'
import { createModal } from '../Modal'
import cloneDeep from 'lodash/cloneDeep'
import BottonGroup from './ButtonGroup.vue'
import inlineRender from './TableEdit'
import Collections from './Collections'
import { innerComps } from '../components'

const { Form, Table } = innerComps

function modalEdit({ parentModel, modelsMap, orgList, rowKey }) {
  // 生成新增表单
  const { parent, rules } = parentModel
  const copyData = parent
  const modelRef = reactive(cloneDeep(parent))
  const children = cloneModels(modelsMap, modelRef)
  const formData = inject('formData')
  const formRef = ref()

  const editForm = () => (
    <Form ref={formRef} class="exa-form" model={modelRef} rules={rules} layout="vertical">
      <Collections children={children} />
    </Form>
  )

  const { modalSlot, openModal } = createModal(editForm)

  const methods = {
    add() {
      Object.assign(modelRef, cloneDeep(copyData), { [rowKey]: nanoid(12) })
      openModal({
        title: '新增',
        onOk() {
          return formRef.value.validate().then(() => {
            orgList.push(cloneDeep(modelRef))
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
            const idx = orgList.indexOf(data)
            Object.assign(orgList[idx], cloneDeep(modelRef))
          })
        },
      })
    },
    del({ record, selectedRows }) {
      const items = record ? [record] : selectedRows
      items.forEach((item) => {
        orgList.splice(orgList.indexOf(item), 1)
      })
    },
  }
  return { modalSlot, methods }
}

function buildColumns(models: ModelsMap, colRenderMap?: Map<Obj, Fn>) {
  const columns = (function getConfig(_models: ModelsMap) {
    return [...(_models as ModelsMap<MixOption>)].map(([col, { model, children }]) => {
      if (children) {
        return {
          title: col.label,
          children: getConfig(children),
        }
      } else {
        const colRender = colRenderMap?.get(col)
        const customRender = ({ record, text }) => {
          let renderText = text
          if (Array.isArray(col.options)) {
            col.options.find(({ value, label }) => {
              if (value === text) {
                renderText = label
                return true
              }
            })
          } else if (col.type === 'Switch') {
            renderText = (col.valueLabels || '否是')[text]
          }
          return colRender ? colRender({ record, text: renderText }) : renderText
        }

        return {
          title: col.label,
          dataIndex: model.propChain.join('.'),
          customRender,
          ...col.attr,
        }
      }
    })
  })(models)

  return columns
}

type BuildDataParam = { option: ExTableOption; listData: ListModels; orgList: Obj[]; rowKey: string }

function buildData({ option, listData, orgList, rowKey }: BuildDataParam) {
  const { itemButtons } = option
  const parentModel = listData.model
  const modelsMap = listData.children

  let context: {
    list: Ref
    columns: Obj[]
    methods: Obj
    actionSlot?: Fn
    modalSlot?: Fn
  }
  const _param = { parentModel, modelsMap, orgList, rowKey }

  if (option.editMode === 'inline') {
    const { list, actionSlot, colRenderMap, methods } = inlineRender(_param)
    const columns = buildColumns(modelsMap, colRenderMap)

    context = { columns, list, methods, actionSlot }

    if (option.addMode === 'modal') {
      const {
        modalSlot,
        methods: { add },
      } = modalEdit(_param)
      context.methods.add = add
      context.modalSlot = modalSlot
    }
  } else {
    const columns = buildColumns(modelsMap)
    const { modalSlot, methods } = modalEdit(_param)
    context = { modalSlot, methods, columns, list: ref(orgList) }
  }

  if (itemButtons) {
    context.columns.push({
      title: '操作',
      key: 'action',
      customRender: (param) => {
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
    model: {
      required: true,
      type: Object as PropType<ModelData>,
    },
    listData: {
      required: true,
      type: Object as PropType<ListModels>,
    },
  },
  setup({ option, model, listData }) {
    const editInline = option.editMode === 'inline'
    const rowKey = option.attr?.rowKey || 'id'
    const orgList = model.parent[model.refName]

    const { list, columns, methods, modalSlot } = buildData({ option, listData, orgList, rowKey })

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
    const rowSelection = reactive({
      fixed: true,
      selectedRowKeys,
      onChange: (_selectedRowKeys, _selectedRows) => {
        selectedRowKeys.value = _selectedRowKeys
        selectedRows.value = _selectedRows
      },
      ...(editInline && {
        getCheckboxProps: (record) => ({
          disabled: !orgList.includes(record),
        }),
      }),
    })
    const actions =
      option.buttons &&
      (() =>
        option.buttons && (
          <BottonGroup config={option.buttons} param={{ selectedRows, selectedRowKeys }} methods={methods} />
        ))

    return () => (
      <>
        {modalSlot?.()}
        <Table
          dataSource={list.value}
          columns={columns}
          {...option.attr}
          rowSelection={rowSelection}
          rowKey={rowKey}
          tableLayout="fixed"
          title={actions}
        >
          {{ tableTitle: actions }}
        </Table>
      </>
    )
  },
})
