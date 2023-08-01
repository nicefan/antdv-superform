import { reactive, ref, h } from 'vue'
import { nanoid } from 'nanoid'
import cloneDeep from 'lodash/cloneDeep'
import { createModal } from '../../../Modal'
import { cloneModels } from '../../../utils/util'
import { ButtonGroup, mergeActions } from '../../buttons'
import inlineRender from './TableEdit'
import Collections from '../../Collections'
import Controls from '../index'
import base from '../../override'

function modalEdit({ parentModel, modelsMap, orgList, rowKey }, tableOption, listener) {
  // 生成新增表单
  const { parent, rules } = parentModel
  const model = cloneDeep(parent)
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

  const formOption: FormOption = { ...tableOption.formSechma }
  // buttons: { actions: ['submit', 'reset'] },
  formOption.subItems = tableOption.columns.filter((item) => item.hideFor !== 'form')

  const editForm = () =>
    h(Controls.Form, {
      option: formOption,
      model: model,
      rules: rules,
      onRegister: (data) => (formRef.value = data),
    })

  const { modalSlot, openModal } = createModal(editForm, { maskClosable: false, ...tableOption.modalProps })

  const methods = {
    add() {
      Object.assign(model, cloneDeep(parent), { [rowKey]: nanoid(12) })
      openModal({
        title: '新增',
        onOk() {
          return formRef.value.validate().then(() => {
            return listener.onSave(cloneDeep(model))
          })
        },
      })
    },
    edit({ record, selectedRows }) {
      const data = record || selectedRows[0]
      Object.assign(model, cloneDeep(data))
      openModal({
        title: '修改',
        onOk() {
          return formRef.value.validate().then(() => {
            return listener.onUpdate(data, cloneDeep(model))
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

type BuildDataParam = {
  option: RootTableOption
  listData: ListModels
  orgList: Ref<Obj[]>
  rowKey: string
  apis?: TableApis
}

function buildData({ option, listData, orgList, rowKey, apis = {} as any }: BuildDataParam) {
  const { rowButtons } = option

  const parentModel = listData.model
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
  const _param = { parentModel, modelsMap, orgList, rowKey }

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
