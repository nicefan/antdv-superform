import { ref, h, inject, unref, toRaw, computed, watch, reactive } from 'vue'
import { nanoid } from 'nanoid'
import { merge } from 'lodash-es'
import { createModal, useModal } from '../../exaModal'
import { ButtonGroup } from '../buttons'
import inlineRender from './TableEdit'
import Controls from '../index'
import { getEffectData } from '../../utils'
import { globalProps } from '../../plugin'
import View from '../Detail'

function modalEdit({ listData, rowKey, option, listener }) {
  // 生成新增表单
  const { initialData } = listData as ModelChildren
  const source = ref({})
  const formRef = ref()

  const formOption: ExFormOption = { ...option.formSechma }
  // buttons: { actions: ['submit', 'reset'] },
  formOption.subItems = formOption.subItems || option.columns.filter((item) => !item.hideInForm)

  const editForm = () =>
    h(Controls.Form, {
      option: formOption,
      source: source.value,
      onRegister: (data) => (formRef.value = data),
    })

  const { modalSlot, openModal } = createModal(editForm, {
    ...globalProps.Modal,
    maskClosable: false,
    ...option.modalProps,
  })

  const methods = {
    add({ meta = {} }: Obj) {
      source.value = merge({}, initialData, { [rowKey]: nanoid(12) })
      openModal({
        title: meta.title || meta.label || '新增',
        onOk() {
          return formRef.value.submit().then((data) => {
            return listener.onSave(data)
          })
        },
      })
    },
    async edit({ record, selectedRows, meta }) {
      const data = record || selectedRows[0]
      if (option.apis?.info) {
        source.value = await option.apis.info(record[rowKey], record)
      } else {
        source.value = data
      }
      openModal({
        title: meta.title || meta.label || '修改',
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

function buildDetail(option, modelsMap, rowKey) {
  const source = ref({})
  const detail = () => h(View, { option, modelsMap, source })
  const { openModal, closeModal } = useModal(detail, {
    ...globalProps.Modal,
    ...option.modalProps,
    title: '查看详情',
    footer: false,
  })
  return async ({ record, selectedRows, meta }) => {
    const data = record || selectedRows[0]
    if (option.apis?.info) {
      source.value = await option.apis.info(record[rowKey], record)
    } else {
      source.value = data
    }
    openModal({ ...meta })
  }
}
interface BuildColumnsParam {
  childrenMap: ModelsMap
  methods?: Obj // 按钮组件绑定方法
  effectData?: Obj // 按钮组件绑定传参
  actionSlot?: Obj // 行操作按钮绑定到指定forSlot
  colEditMap?: Map<Obj, Fn> // 行内编辑render方法
}
function buildColumns({ childrenMap, methods, actionSlot, colEditMap, effectData }: BuildColumnsParam) {
  const rootSlots = { ...inject('rootSlots', {}), ...actionSlot }
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
      if (col.type === 'Hidden' || col.hideInTable) return
      if (model.children) {
        _columns.push({
          title: col.label,
          children: getConfig(model.children),
        })
      } else {
        const { type: colType, viewRender, render, options: colOptions, labelField, keepField } = col as any
        const colEditRender = colEditMap?.get(col)
        let textRender: Fn | undefined
        if (viewRender || colType === 'InfoSlot') {
          const _render = viewRender | render
          textRender = typeof _render === 'string' ? rootSlots[_render] : viewRender
        } else if (labelField) {
          textRender = ({ record }) => record[labelField as string]
        } else if (keepField) {
          textRender = ({ record, text }) => text + ' - ' + record[labelField as string]
        } else if (colOptions && typeof colOptions?.[0] !== 'string') {
          const options = ref<any[]>()
          if (typeof colOptions === 'function') {
            Promise.resolve(colOptions(getEffectData())).then((data) => (options.value = data))
          } else {
            options.value = unref(colOptions)
          }
          textRender = ({ text }) => {
            return options.value?.find(({ value }) => value === text)?.label
          }
        } else if (colType === 'Switch') {
          textRender = ({ text }) => (col.valueLabels || '否是')[text]
        } else if (colType === 'Buttons') {
          textRender = (param) => h(ButtonGroup, { config: col, param: reactive({ ...effectData, ...param }), methods })
        } else {
          // textRender为undefined将直接返回绑定的值
        }
        let customRender
        if (colEditRender || textRender) {
          const __render = (param) => colEditRender?.(param) || textRender?.(param) || param.text
          customRender = (param) => renderProduce(param, __render)
        }
        _columns.push({
          title: col.label,
          dataIndex: model.propChain.join('.'),
          ...(col.columnProps as Obj),
          customRender,
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
  listener: { onSave: AsyncFn; onUpdate: AsyncFn; onDelete: AsyncFn }
  isView?: boolean
}

function buildData({ option, listData, orgList, rowKey, listener, isView }: BuildDataParam) {
  const { modelsMap: childrenMap, initialData } = listData
  const context: {
    list: Ref
    columns: Obj[]
    methods: Obj
    modalSlot?: Fn
  } = { list: orgList, columns: [], methods: {} }

  if (isView) {
    context.columns = buildColumns({ childrenMap })
    return context
  }

  const effectData = { ...getEffectData(), current: orgList }
  const { editMode, addMode, rowButtons } = option

  let editActionSlot: Fn
  let colEditMap
  if (editMode === 'inline') {
    const { list, actionSlot, colRenderMap, methods } = inlineRender({ childrenMap, orgList, rowKey, listener })
    context.list = list
    context.methods = methods
    Object.assign(context, {
      list,
      methods,
    })
    editActionSlot = actionSlot
    colEditMap = colRenderMap
  }
  if (editMode === 'modal' || addMode === 'modal') {
    const { modalSlot, methods } = modalEdit({ listData, rowKey, option, listener })
    if (context.methods.edit) {
      // 编辑模式为行内编辑时，新增按钮使用弹窗模式
      context.methods.add = methods.add
    } else {
      context.methods = methods
    }
    context.modalSlot = modalSlot
  }
  context.methods.view = buildDetail(option, childrenMap, rowKey)

  let actionSlot
  let actionColumn
  if (rowButtons) {
    const buttonsConfig: Obj = {
      buttonType: 'link',
      size: 'small',
      ...(Array.isArray(rowButtons) ? { actions: rowButtons } : rowButtons),
    }
    const { columnProps, forSlot, ...config } = buttonsConfig
    const render = (param) => {
      return (
        editActionSlot?.(param) ||
        h(ButtonGroup, {
          config,
          param: reactive({ ...effectData, ...param }),
          methods: context.methods,
        })
      )
    }
    if (forSlot) {
      actionSlot = { [forSlot]: render }
    } else {
      actionColumn = {
        title: '操作',
        key: 'action',
        fixed: 'right',
        minWidth: '100',
        align: 'center',
        ...columnProps,
        customRender: render,
      }
    }
  }
  context.columns = buildColumns({ childrenMap, methods: context.methods, actionSlot, colEditMap, effectData })
  if (actionColumn) context.columns.push(actionColumn)
  return context
}

export { buildData }
