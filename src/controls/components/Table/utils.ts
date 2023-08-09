import { reactive, ref, h } from 'vue'
import { nanoid } from 'nanoid'
import { cloneDeep } from 'lodash-es'
import { createModal } from '../../../exaModal'
import { cloneModels, resetFields } from '../../../utils/util'
import { ButtonGroup, mergeActions } from '../../buttons'
import inlineRender from './TableEdit'
import Collections from '../../Collections'
import Controls from '../index'
import base from '../../override'

function modalEdit({ listModel, rowKey }, tableOption, listener) {
  // 生成新增表单
  const { parent, rules } = listModel
  const model = ref({})
  const formRef = ref()
  // const children = cloneModels(modelsMap, modelRef)

  // const editForm = () =>
  //   h(
  //     base.Form,
  //     {
  //       ref: formRef,
  //       class: 'exa-form',
  //       model: modelRef,
  //       rules: rules,
  //       layout: 'vertical',
  //       ...tableOption.fromProps,
  //     },
  //     h(Collections, { option: tableOption, children: children })
  //   )

  const formOption: ExFormOption = { ...tableOption.formSechma }
  // buttons: { actions: ['submit', 'reset'] },
  formOption.subItems = tableOption.columns.filter((item) => item.hideFor !== 'form')

  const editForm = () =>
    h(Controls.Form, {
      option: formOption,
      model: model.value,
      rules: rules,
      onRegister: (data) => (formRef.value = data),
    })

  const { modalSlot, openModal } = createModal(editForm, { maskClosable: false, ...tableOption.modalProps })

  const methods = {
    add() {
      model.value = { ...parent, [rowKey]: nanoid(12) }
      openModal({
        title: '新增',
        onOk() {
          return formRef.value.submit().then((data) => {
            return listener.onSave(data)
          })
        },
      })
    },
    edit({ record, selectedRows }) {
      const data = record || selectedRows[0]
      model.value = data
      openModal({
        title: '修改',
        onOk() {
          return formRef.value.submit().then((newData) => {
            return listener.onUpdate(data, newData)
          })
        },
      })
    },
    del({ record, selectedRows }) {
      const items = record ? [record] : selectedRows
      return listener.onDelete(items)
    },
  }
  return { modalSlot, methods }
}

function buildColumns(models: ModelsMap, colRenderMap?: Map<Obj, Fn>) {
  const columns = (function getConfig(_models: ModelsMap<MixOption>) {
    const _columns: any[] = []
    ;[..._models].forEach(([col, { model, children }]) => {
      if (col.type === 'Hidden' || col.applyTo === 'form') return
      if (children) {
        _columns.push({
          title: col.label,
          children: getConfig(children),
        })
      } else {
        const colRender = colRenderMap?.get(col)
        const customRender = ({ record, text }) => {
          let renderText = text
          if (col.labelField) {
            renderText = col.labelField
          } else if (Array.isArray(col.options)) {
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

        _columns.push({
          title: col.label,
          dataIndex: model.propChain.join('.'),
          customRender,
          ...(col.attrs as Obj),
        })
      }
    })
    return _columns
  })(models)

  return columns
}

type BuildDataParam = {
  option: RootTableOption
  listData: ListModels
  orgList: Ref<Obj[]>
  rowKey: string
  apis?: TableApis
}

function buildData({ option, listData, orgList, rowKey, apis = {} as any }: BuildDataParam) {
  const { rowButtons } = option

  const listModel = listData.model
  const modelsMap = listData.children

  const listener = {
    async onSave(data) {
      if (apis.save) {
        await apis.save(data)
        return apis.query()
      } else {
        orgList.value.push(data)
        const idx = orgList.value.indexOf(data)
        Object.assign(orgList.value[idx], data)
      }
    },
    async onUpdate(oldData, newData) {
      if (apis.update) {
        await apis.update(newData)
        return apis.query()
      } else {
        const idx = orgList.value.indexOf(oldData)
        Object.assign(orgList.value[idx], newData)
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
    },
  }

  let context: {
    list: Ref
    columns: Obj[]
    rowMethods?: Obj
    methods: Obj
    actionSlot?: Fn
    modalSlot?: Fn
  }
  const _param = { listModel, modelsMap, orgList, rowKey }

  if (option.editMode === 'inline') {
    const { list, actionSlot, colRenderMap, methods: rowMethods } = inlineRender(_param, listener)
    const columns = buildColumns(modelsMap, colRenderMap)

    context = { columns, list, rowMethods, methods: rowMethods, actionSlot }

    if (option.addMode === 'modal') {
      const {
        modalSlot,
        methods: { add, del },
      } = modalEdit(_param, option, listener)
      Object.assign(context.methods, { add, del })
      context.modalSlot = modalSlot
    }
  } else {
    const columns = buildColumns(modelsMap)
    const { modalSlot, methods } = modalEdit(_param, option, listener)
    context = { modalSlot, methods, columns, list: orgList }
  }

  if (rowButtons) {
    context.columns.push({
      title: '操作',
      key: 'action',
      customRender: (param) => {
        return context.actionSlot?.(param) || h(ButtonGroup, { config: rowButtons, param, methods: context.rowMethods })
      },
    })
  }

  return context
}

export { buildData }
