import { ref, h } from 'vue'
import { defaults } from 'lodash-es'
import { useModal } from '../../superModal'
import inlineRender from './editInline'
import modalRender from './editModal'
import useTableEdit from './TableEdit'
import { getEffectData } from '../../utils'
import { globalProps } from '../../plugin'
import View from '../Detail'
import { buildActionSlot, useColumns } from './buildColumns'
import type { RootTableOption } from '../../exaTypes'


function buildDetail(option, modelsMap, rowKey) {
  const source = ref({})
  const { title, modalProps, apis, ..._option } = option
  const detail = () => h(View, { option: _option, modelsMap, source })
  const { openModal, closeModal } = useModal(detail, {
    ...globalProps.Modal,
    ...modalProps,
    ..._option.modalProps,
    title: `${title ? title + ' - ' : ''}详情`,
    footer: null,
  })
  return async ({ record, selectedRows, meta }) => {
    const data = record || selectedRows[0]
    if (apis?.info) {
      source.value = await apis.info(record[rowKey], record)
    } else {
      source.value = data
    }
    openModal({ ...meta })
  }
}

type BuildDataParam = {
  option: RootTableOption
  model: ModelDataGroup
  orgList: Ref<Obj[]>
  rowKey: Fn<string>
  listener: { onSave: AsyncFn; onUpdate: AsyncFn; onDelete: AsyncFn }
  isView?: boolean
}

function buildData({ option, model, orgList, rowKey, listener, isView }: BuildDataParam) {
  const { modelsMap: childrenMap, initialData } = model.listData
  const context: {
    list: Ref
    columns: Obj[]
    methods: Obj
    modalSlot?: Fn
  } = {
    list: orgList,
    columns: [],
    methods: {
      delete({ record, selectedRows }) {
        const items = record ? [record] : selectedRows
        return listener.onDelete(items)
      },
    },
  }

  const { edit, editable = edit, rowButtons, rowEditor } = option
  const { editMode, addMode } = rowEditor || option // 兼容旧版

  let __getEditRender
  let __editButtonsSlot
  if (!isView && editable) {
    const { methods, getEditRender } = useTableEdit({ model, orgList, rowKey })
    Object.assign(context.methods, methods)
    __getEditRender = getEditRender
  } else if (editMode === 'inline') {
    const { list, methods, editButtonsSlot, getEditRender } = inlineRender({ childrenMap, orgList, listener, rowEditor })
    context.list = list
    Object.assign(context.methods, methods)
    __editButtonsSlot = editButtonsSlot
    __getEditRender = getEditRender
  }
  if (editMode === 'modal' || addMode === 'modal') {
    const { modalSlot, methods } = modalRender({ initialData, rowKey, option, listener })
    if (context.methods.edit) {
      // 编辑模式为行内编辑时，新增按钮使用弹窗模式
      context.methods.add = methods.add
    } else {
      Object.assign(context.methods, methods)
    }
    context.modalSlot = modalSlot
  }
  const effectData = getEffectData({ list: context.list })
  const actionColumn = buildActionSlot({
    defAttrs: globalProps.rowButtons,
    buttons: rowButtons,
    methods: context.methods,
    editSlot: __editButtonsSlot,
    isView,
  })

  context.columns = useColumns({ childrenMap, effectData, getEditRender: __getEditRender, actionColumn })
  ;(function mergeOption(columns = context.columns) {
    columns.forEach((item) => {
      defaults(item, option.columnProps, globalProps.Column)
      if (item.children) mergeOption(item.children)
    })
  })()

  context.methods.detail = buildDetail(option, childrenMap, rowKey)

  return context
}

export { buildData }
