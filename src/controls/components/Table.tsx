/* eslint-disable vue/one-component-per-file */
import { ref, reactive, h, PropType, defineComponent, inject, onMounted, toRef, toRefs } from 'vue'
import { nanoid } from 'nanoid'
import { buildModelMaps, cloneModels } from '../../utils/util'
import { createModal } from '../../Modal'
import cloneDeep from 'lodash/cloneDeep'
import ButtonGroup from './ButtonGroup.vue'
import inlineRender from './TableEdit'
import Collections from '../Collections'
import Controls from './index'
import base from '../override'

function modalEdit({ parentModel, modelsMap, orgList, rowKey }, tableOption) {
  // 生成新增表单
  const { parent, rules } = parentModel
  const copyData = parent
  const modelRef = reactive(cloneDeep(parent))
  const children = cloneModels(modelsMap, modelRef)
  const formRef = ref()

  const editForm = () => (
    <base.Form
      ref={formRef}
      class="exa-form"
      model={modelRef}
      rules={rules}
      layout="vertical"
      {...tableOption.fromProps}
    >
      <Collections option={tableOption} children={children} />
    </base.Form>
  )

  const { modalSlot, openModal } = createModal(editForm, { maskClosable: false, ...tableOption.modalProps })

  const methods = {
    add() {
      Object.assign(modelRef, cloneDeep(copyData), { [rowKey]: nanoid(12) })
      openModal({
        title: '新增',
        onOk() {
          return formRef.value.validate().then(() => {
            orgList.value.push(cloneDeep(modelRef))
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
            const idx = orgList.value.indexOf(data)
            Object.assign(orgList.value[idx], cloneDeep(modelRef))
          })
        },
      })
    },
    del({ record, selectedRows }) {
      const items = record ? [record] : selectedRows
      items.forEach((item) => {
        orgList.value.splice(orgList.value.indexOf(item), 1)
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
          ...(col.attrs as Obj),
        }
      }
    })
  })(models)

  return columns
}

type BuildDataParam = { option: ExTableOption; listData: ListModels; orgList: Ref<Obj[]>; rowKey: string }

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
      } = modalEdit(_param, option)
      context.methods.add = add
      context.modalSlot = modalSlot
    }
  } else {
    const columns = buildColumns(modelsMap)
    const { modalSlot, methods } = modalEdit(_param, option)
    context = { modalSlot, methods, columns, list: orgList }
  }

  if (itemButtons) {
    context.columns.push({
      title: '操作',
      key: 'action',
      customRender: (param) => {
        return context.actionSlot?.(param) || h(ButtonGroup, { config: itemButtons, param, methods: context.methods })
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
    attrs: {
      default: () => ({}),
      type: Object as PropType<Obj>,
    },
    effectData: Object,
  },
  emits: ['register'],
  setup({ option, model, listData, attrs }, ctx) {
    const editInline = option.editMode === 'inline'
    const rowKey = attrs.rowKey || 'id'
    const orgList = toRef(model.parent, model.refName)

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
          disabled: !orgList.value.includes(record),
        }),
      }),
    })
    const searchForm = option.searchSechma && buildSearchForm(option)

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
        {searchForm?.()}
        <base.Table
          ref={getTable}
          dataSource={list.value}
          columns={columns}
          {...ctx.attrs}
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

function buildSearchForm({ searchSechma, columns }) {
  const formOption: FormOption = {
    buttons: { actions: ['submit', 'reset'] },
    compact: true,
    ignoreRules: true,
    ...searchSechma,
  }
  formOption.subItems = searchSechma.subItems.map((item) => {
    if (typeof item === 'string') {
      return columns.find((col) => col.field === item)
    } else {
      return item
    }
  })
  const formRef = ref()
  const formData: Obj = reactive({})

  const defaultAction = {
    submit() {
      console.log(formData)
    },
    reset() {},
  }

  const searchForm = () => <Controls.Form option={formOption} model={formData} ref={formRef} methods={defaultAction} />
  return searchForm
}
