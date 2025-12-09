import { ref, h, inject } from 'vue'
import { useModal } from '../../superModal'
import inlineRender from './editInline'
import modalRender from './editModal'
import useTableEdit from './TableEdit'
import { globalProps } from '../../plugin'
import View from '../Detail'
import type { RootTableOption } from '../../exaTypes'
import { toNode } from '../../utils'

function buildDetail(option, modelsMap, rowKey) {
  const source = ref({})
  const { title, apis } = option
  const { modalProps, ...descriptionsProps } = option.descriptionsProps || {}
  const detail = () => h(View, { option: { descriptionsProps }, modelsMap, source })
  const modalConfig = {
    ...globalProps.Modal,
    footer: null,
    ...option.modalProps,
    ...modalProps,
  }
  const getTitle = (param) => {
    return toNode(modalConfig.title, { target: 'detail', ...param }) || `${title ? title + ' - ' : ''}详情`
  }
  const { openModal, modalSlot } = useModal(detail, modalConfig)

  return {
    detailSlot: modalSlot,
    openDetail: async ({ record, selectedRows, meta, ...params }) => {
      const data = record || selectedRows[0]
      if (apis?.info) {
        source.value = await apis.info(rowKey(data), data)
      } else {
        source.value = data
      }
      openModal({ ...meta, title: getTitle({ ...params, source: source.value }) })
    }
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
  const { modelsMap: childrenMap } = model.listData
  const context: {
    list: Ref
    methods: Obj
    modalSlot: Fn[]
    getEditRender?: Fn
    editButtonsSlot?: Fn
  } = {
    list: orgList,
    modalSlot: [],
    methods: {
      delete({ record, selectedRows }) {
        const items = record ? [record] : selectedRows
        return listener.onDelete(items)
      },
    },
  }

  const { edit, editable = edit, rowEditor } = option
  const { editMode, addMode } = rowEditor || option // 兼容旧版

  if (!isView && editable) {
    const { methods, getEditRender } = useTableEdit({ model, orgList, rowKey })
    Object.assign(context.methods, methods)
    context.getEditRender = getEditRender
  } else if (editMode === 'inline') {
    const { list, methods, editButtonsSlot, getEditRender } = inlineRender({
      childrenMap,
      orgList,
      listener,
      rowEditor,
    })
    context.list = list
    Object.assign(context.methods, methods)
    Object.assign(context, { editButtonsSlot, getEditRender })
  }
  if (editMode === 'modal' || addMode === 'modal') {
    const { modalSlot, methods } = modalRender({ rowKey, option, listener })
    if (context.methods.edit) {
      // 编辑模式为行内编辑时，新增按钮使用弹窗模式
      context.methods.add = methods.add
    } else {
      Object.assign(context.methods, methods)
    }
    context.modalSlot.push(modalSlot)
  }
  const { detailSlot, openDetail } = buildDetail(option, childrenMap, rowKey)
  context.modalSlot.push(detailSlot)
  context.methods.detail = openDetail

  return context
}

export { buildData }
