import { ref, h, inject, unref, toRaw, computed, watch, reactive } from 'vue'
import { nanoid } from 'nanoid'
import { merge } from 'lodash-es'
import { createModal } from '../../../exaModal'
import { ButtonGroup } from '../../buttons'
import inlineRender from './TableEdit'
import Controls from '../index'
import { getEffectData } from '../../hooks/reactivity'

function modalEdit({ listData, rowKey, option, listener }) {
  // 生成新增表单
  const { initialData, rules } = listData as ModelChildren
  const source = ref({})
  const formRef = ref()

  const formOption: ExFormOption = { ...option.formSechma }
  // buttons: { actions: ['submit', 'reset'] },
  formOption.subItems = option.columns.filter((item) => item.hideFor !== 'form')

  const editForm = () =>
    h(Controls.Form, {
      option: formOption,
      source: source.value,
      onRegister: (data) => (formRef.value = data),
    })

  const { modalSlot, openModal } = createModal(editForm, { maskClosable: false, ...option.modalProps })

  const methods = {
    add() {
      source.value = merge({}, initialData, { [rowKey]: nanoid(12) })
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
      source.value = data
      openModal({
        title: '修改',
        onOk() {
          return formRef.value.submit().then((newData) => {
            return listener.onUpdate(newData, data)
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

function buildColumns(childrenMap: ModelsMap, colRenderMap?: Map<Obj, Fn>) {
  const rootSlots = inject('rootSlots', {})
  const renderMap = new WeakMap<Obj, Map<Obj, Obj>>()

  /** 阻止表格customRender无效的渲染 */
  const renderProduce = (param, render) => {
    const record = toRaw(param.record)
    const row = renderMap.get(record) || new Map()
    renderMap.set(record, row)
    if (!row.has(param.column)) {
      const activeParam = reactive(param)
      const node = computed(() => render(activeParam))
      row.set(param.column, { activeParam, node })
      return node.value
    } else {
      const { activeParam, node } = row.get(param.column)
      Object.assign(activeParam, param)
      return node.value
    }
  }

  const columns = (function getConfig(_models: ModelsMap<MixOption>) {
    const _columns: any[] = []
    ;[..._models].forEach(([col, model]) => {
      if (col.type === 'Hidden' || col.applyTo === 'form') return
      if (model.children) {
        _columns.push({
          title: col.label,
          children: getConfig(model.children),
        })
      } else {
        const colRender = colRenderMap?.get(col)
        let textRender: Fn | undefined
        if (col.customRender) {
          textRender = typeof col.customRender === 'string' ? rootSlots[col.customRender] : col.customRender
        } else if (col.labelField) {
          textRender = ({ record }) => record[col.labelField as string]
        } else if (col.options && typeof col.options?.[0] !== 'string') {
          let options: any[] | undefined
          if (typeof col.options === 'function') {
            Promise.resolve(col.options(getEffectData())).then((data) => (options = data))
          } else {
            options = unref(col.options)
          }
          textRender = ({ text }) => {
            return options?.find(({ value }) => value === text)?.label
          }
        } else if (col.type === 'Switch') {
          textRender = ({ text }) => (col.valueLabels || '否是')[text]
        } else {
          // textRender为undefined将直接返回绑定的值
        }
        let customRender
        if (colRender || textRender) {
          const __render = colRender ? (props) => colRender(props, textRender) : textRender
          customRender = (param) => renderProduce(param, __render)
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
  })(childrenMap)

  return columns
}

type BuildDataParam = {
  option: RootTableOption
  listData: ModelChildren
  orgList: Ref<Obj[]>
  rowKey: string
  apis?: TableApis
}

function buildData({ option, listData, orgList, rowKey, apis = {} as any }: BuildDataParam) {
  const { rowButtons } = option

  const { modelsMap: childrenMap, initialData } = listData

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
  const _param = { childrenMap, orgList, rowKey }

  if (option.editMode === 'inline') {
    const { list, actionSlot, colRenderMap, methods: rowMethods } = inlineRender(_param, listener)
    const columns = buildColumns(childrenMap, colRenderMap)

    context = { columns, list, rowMethods, methods: rowMethods, actionSlot }

    if (option.addMode === 'modal') {
      const {
        modalSlot,
        methods: { add, del },
      } = modalEdit({ listData, rowKey, option, listener })
      Object.assign(context.methods, { add, del })
      context.modalSlot = modalSlot
    }
  } else {
    const columns = buildColumns(childrenMap)
    const { modalSlot, methods } = modalEdit({ listData, rowKey, option, listener })
    context = { modalSlot, methods, rowMethods: { ...methods }, columns, list: orgList }
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
