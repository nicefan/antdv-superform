import { defaults } from 'lodash-es'
import { globalProps } from '../../plugin'
import { createModal } from '../../superModal'
import { useForm } from '../../superForm'
import { toNode } from '../../utils'
import { merge } from '../../utils/merge'

export default function editModal({ rowKey, option, listener, orgList }) {
  const rowEditor = option.rowEditor
  const formOption = rowEditor?.form || option.editForm || option.formSchema || {}
  // buttons: { actions: ['submit', 'reset'] },
  formOption.subItems =
    formOption.subItems || option.columns.filter((item) => !(item.hideInForm || item.exclude?.includes('form')))

  // 生成新增表单
  const [register, formActions] = useForm(formOption)

  const modalProps = {
    ...globalProps.Modal,
    maskClosable: false,
    destroyOnClose: true,
    ...option.modalProps,
    ...rowEditor?.modalProps,
  }
  const { modalSlot, openModal, closeModal } = createModal(register(), modalProps)

  const getTitle = ({ meta, ...param }: Obj) => {
    return (
      toNode(modalProps.title, { meta, ...param }) ||
      `${formOption.title ? formOption.title + ' - ' : ''}  ${meta.title || meta.label}`
    )
  }
  const methods = {
    add(args: Obj = {}) {
      const { meta = {}, resetData, index } = args
      // 行按钮的 index 是当前页下标，打开弹窗时按当前记录确定源数组位置。
      const position = args.record ? orgList.value.findIndex(row => rowKey(row) === rowKey(args.record)) : index
      meta.title ??= '新增'
      meta.name = 'add'
      meta.isNew = true
      formActions.resetFields(resetData)
      return openModal({
        ...meta,
        title: getTitle({ ...args, resetData, meta }),
        onOk: async () => {
          return formActions.submit().then(async (data) => {
            const custom = await rowEditor?.onSave?.({ ...args, source: data, meta })
            if (custom === false) return false

            return listener.onSave(data, position === -1 ? undefined : position)
          })
        },
        onCancel: async () => {
          if ((await rowEditor?.onCancel?.({ ...args, meta })) === false) return false
          return closeModal()
        },
      })
    },
    async edit(args) {
      const { record, selectedRows, resetData, meta = {} } = args
      const data = record || selectedRows[0]
      if (!data) {
        return Promise.reject(new Error('未选择记录'))
      }
      const res = await option.apis?.info?.(rowKey(data), data)
      const source = merge({}, data, res, resetData)
      formActions.resetFields(source)
      defaults(meta, { name: 'edit', title: '编辑', isNew: false })
      return openModal({
        ...meta,
        title: getTitle({ ...args, source, meta }),

        onOk: async () => {
          return formActions.submit().then(async (newData) => {
            const custom = await rowEditor?.onSave?.({ ...args, source: newData, meta })
            if (custom === false) return false
            return listener.onUpdate(newData, data)
          })
        },
        onCancel: async () => {
          if ((await rowEditor?.onCancel?.({ ...args, meta })) === false) return false
          return closeModal()
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
