/* eslint-disable vue/one-component-per-file */
import { ref, reactive, h, PropType, defineComponent, inject } from 'vue'
import { nanoid } from 'nanoid'
import { buildModelDeep } from '../utils/util'
import { useModal } from '../Modal'
import cloneDeep from 'lodash/cloneDeep'
import BottonGroup from './ButtonGroup.vue'
import inlineRender from './TableEdit'
import Collections from './Collections'

function modalEdit({ parentModel, modelsMap, orgList, rowKey }) {
  // 生成新增表单
  const { parent, rules } = parentModel
  const copyData = cloneDeep(parent)
  const modelRef = parent
  const formData = inject('formData')
  const formRef = ref()

  const editForm = defineComponent({
    provide: {
      formData,
    },
    setup() {
      return () => (
        <a-form ref={formRef} class="exa-form" model={modelRef} rules={rules} layout="vertical">
          <Collections children={modelsMap} />
        </a-form>
      )
    },
  })
  const { openModal } = useModal(editForm)

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
  return { methods }
}

function buildColumns(models: ModelsMap, colRenderMap?: Map<Obj, Fn>) {
  const columns = (function getConfig(_models: ModelsMap) {
    return [..._models].map(([col, { model, children }]) => {
      if (children) {
        return {
          title: col.label,
          children: getConfig(children),
        }
      } else {
        const colRender = colRenderMap?.get(col)
        return {
          title: col.label,
          dataIndex: model.propChain.join('.'),
          ...(colRender && { customRender: colRender }),
          ...col.attr,
        }
      }
    })
  })(models)

  return columns
}

function buildData(option: ExTableOption, orgList: Obj[], rowKey: string) {
  const { columns: cols, itemButtons } = option
  const parentModel = { parent: reactive({}), rules: {} }
  const modelsMap = buildModelDeep(cols, parentModel)

  let context: {
    list: Ref
    columns: Obj[]
    methods: Obj
    actionSlot?: Fn
  }
  const _param = { parentModel, modelsMap, orgList, rowKey }

  if (option.editMode === 'inline') {
    const ctx = inlineRender(_param)

    if (option.addMode === 'modal') {
      const modalInfo = modalEdit(_param)
      ctx.methods = { ...ctx.methods, add: modalInfo.methods.add }
    }
    const { list, actionSlot, colRenderMap, methods } = ctx
    const columns = buildColumns(modelsMap, colRenderMap)

    context = { columns, list, methods, actionSlot }
  } else {
    const columns = buildColumns(modelsMap)
    const { methods } = modalEdit(_param)
    context = { methods, columns, list: ref(orgList) }
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
  },
  setup({ option, model }) {
    const editInline = option.editMode === 'inline'
    const rowKey = option.attr?.rowKey || 'id'
    const orgList = model.parent[model.refName]

    const { list, columns, methods } = buildData(option, orgList as Obj[], rowKey)

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
          disabled: !orgList.includes(record),
        }),
      }),
    }
    const btnProps = { config: option.buttons, param: { selectedRows, selectedRowKeys }, methods }

    return () => (
      <>
        {option.buttons && (
          <a-row class="ant-list-header">
            <BottonGroup {...btnProps} />
          </a-row>
        )}
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
