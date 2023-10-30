import { ref, h } from 'vue'
import { nanoid } from 'nanoid'
import { merge, cloneDeep } from 'lodash-es'
import { createModal, useModal } from '../../superModal'
import inlineRender from './TableEdit'
import Controls from '../index'
import { getEffectData } from '../../utils'
import { globalProps } from '../../plugin'
import View from '../Detail'
import { buildActionSlot, createProducer, useColumns } from './buildColumns'
import type { RootTableOption } from '../../exaTypes'

function modalEdit({ initialData, rowKey, option, listener }) {
  const source = ref({})
  const formRef = ref()

  const formOption: GetOption<'Form'> = { ...option.formSechma }
  // buttons: { actions: ['submit', 'reset'] },
  formOption.subItems = formOption.subItems || option.columns.filter((item) => !item.hideInForm)

  // 生成新增表单
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
    add({ meta = {}, resetData }: Obj = {}) {
      source.value = merge({}, initialData, { [rowKey]: nanoid(12), ...resetData })
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
        source.value = cloneDeep(data)
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
    delete({ record, selectedRows }) {
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
    footer: null,
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

type BuildDataParam = {
  option: RootTableOption
  listData: ModelChildren
  orgList: Ref<Obj[]>
  rowKey: string
  listener: { onSave: AsyncFn; onUpdate: AsyncFn; onDelete: AsyncFn }
}

function buildData({ option, listData, orgList, rowKey, listener }: BuildDataParam) {
  const { modelsMap: childrenMap, initialData } = listData
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

  const { editMode, addMode, rowButtons } = option

  let __getEditRender
  let __getEditActions
  if (editMode === 'inline') {
    const { list, methods, getEditActions, getEditRender } = inlineRender({ childrenMap, orgList, rowKey, listener })
    context.list = list
    Object.assign(context.methods, methods)
    __getEditActions = getEditActions
    __getEditRender = getEditRender
  }
  if (editMode === 'modal' || addMode === 'modal') {
    const { modalSlot, methods } = modalEdit({ initialData, rowKey, option, listener })
    if (context.methods.edit) {
      // 编辑模式为行内编辑时，新增按钮使用弹窗模式
      context.methods.add = methods.add
    } else {
      Object.assign(context.methods, methods)
    }
    context.modalSlot = modalSlot
  }
  const effectData = getEffectData({ current: context.list })
  const actionColumn = rowButtons && buildActionSlot(rowButtons, context.methods, __getEditActions)

  context.columns = useColumns({ childrenMap, effectData, getEditRender: __getEditRender, actionColumn })
  context.methods.detail = buildDetail(option, childrenMap, rowKey)

  return context
}

export { buildData }
