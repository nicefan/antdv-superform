import { translate } from '../../locale'
import { ref, h, inject, computed } from 'vue'
import { useModal } from '../../superModal'
import inlineRender from './editInline'
import modalRender from './editModal'
import useTableEdit from './TableEdit'
import { globalProps } from '../../plugin'
import View from '../Detail'
import SuperDetail from '../../superDetail/SuperDetail.vue'
import type { RootTableOption } from '../../exaTypes'
import { toNode } from '../../utils'
import { isFunction } from 'lodash-es'

function buildDetail(option, modelsMap, rowKey) {
  const source = ref({})
  const { title, apis } = option
  const rootSlots = inject<Obj>('rootSlots', {})
  // 独立详情使用自己的字段与布局；缺省时只复用表格列，数据始终来自当前记录。
  const { modalProps, ...detailOption } = option.detailOption || {}
  const detail = () => option.detailOption
    ? h(SuperDetail, { schema: detailOption, dataSource: source.value }, rootSlots)
    : h(View, { option: {}, modelsMap, source })
  const modalConfig = {
    ...globalProps.Modal,
    footer: null,
    ...option.modalProps,
    ...modalProps,
  }
  const getTitle = (param) => {
    return toNode(modalConfig.title, param) || `${title ? title + ' - ' : ''}${translate('detailTitle')}`
  }
  const { openModal, modalSlot } = useModal(detail, modalConfig)

  return {
    detailSlot: modalSlot,
    openDetail: async ({ record, selectedRows, meta = {} as Obj, ...params }) => {
      const data = record || selectedRows[0]
      if (apis?.info) {
        const res = await apis.info(rowKey(data), data)
        source.value = Object.assign({}, data, res)
      } else {
        source.value = data
      }
      meta.name = 'detail'
      openModal({ ...meta, title: () => getTitle({ ...params, source: source.value, meta }) })
    }
  }
}

type BuildDataParam = {
  option: RootTableOption
  model: ModelDataGroup
  orgList: Ref<Obj[]>
  rowKey: Fn<PropertyKey>
  listener: { onSave: AsyncFn; onUpdate: AsyncFn; onDelete: AsyncFn }
  isView?: boolean
  effectData?: Obj
}

function buildData({ option, model, orgList, rowKey, listener, isView, effectData }: BuildDataParam) {
  const { modelsMap: childrenMap } = model.listData
  const context: {
    list: Ref
    methods: Obj
    buttonMethods?: Obj
    modalSlot: Fn[]
    getEditRender?: Fn
    editButtonsSlot?: Fn
    wrapTable?: Fn
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

  const { editable, rowEditor } = option
  const { editMode, addMode } = rowEditor || {}

  if (!isView && editable) {
    const editableRef = computed(() => (isFunction(editable) ? editable(effectData) : editable))

    const { methods, ..._context } = useTableEdit({ model, orgList, editableRef, rowKey })
    Object.assign(context.methods, methods)
    Object.assign(context, _context)
  } else if (editMode === 'inline') {
    const { list, methods, buttonMethods, editButtonsSlot, getEditRender, wrapTable } = inlineRender({
      childrenMap,
      orgList,
      listener,
      rowEditor,
      rowKey,
    })
    context.list = list
    Object.assign(context.methods, methods)
    Object.assign(context, { buttonMethods, editButtonsSlot, getEditRender, wrapTable })
  }
  if (editMode === 'modal' || addMode === 'modal') {
    const { modalSlot, methods } = modalRender({ rowKey, option, listener, orgList })
    if (context.methods.edit) {
      // 编辑模式为行内编辑时，新增按钮使用弹窗模式
      context.methods.add = methods.add
      context.buttonMethods ||= {}
      context.buttonMethods.add = methods.add
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
