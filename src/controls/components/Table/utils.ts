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

function modalEdit({ parentModel, modelsMap, orgList, rowKey }, tableOption) {
  // 生成新增表单
  const { parent, rules } = parentModel
  const modelRef = reactive(cloneDeep(parent))
  const formRef = ref()
  const children = cloneModels(modelsMap, modelRef)

  const editForm = () =>
    h(
      base.Form,
      {
        ref: formRef,
        class: 'exa-form',
        model: modelRef,
        rules: rules,
        layout: 'vertical',
        ...tableOption.fromProps,
      },
      h(Collections, { option: tableOption, children: children })
    )

  // const formOption: FormOption = {
  //   buttons: { actions: ['submit', 'reset'] },
  //   attrs: tableOption.formProps,
  //   subItems: tableOption.columns,
  // }
  // const editForm = () => <Controls.Form option={formOption} model={modelRef} rules={rules} ref={formRef} />

  const { modalSlot, openModal } = createModal(editForm, { maskClosable: false, ...tableOption.modalProps })

  const methods = {
    add() {
      Object.assign(modelRef, cloneDeep(parent), { [rowKey]: nanoid(12) })
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

export { buildData }
