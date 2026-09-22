import { defaults } from 'lodash-es'
import { globalProps } from '../../plugin'
import { createModal } from '../../superModal'
import { shallowRef, h } from 'vue'
import Controls from '../index'
import { toNode } from '../../utils'
import { merge } from '../../utils/merge'

export default function editModal({ rowKey, option, listener, orgList }) {
  const formRef = shallowRef()
  const rowEditor = option.rowEditor
  const formOption = rowEditor?.form || option.editForm || option.formSchema || {}
  // buttons: { actions: ['submit', 'reset'] },
  formOption.subItems =
    formOption.subItems || option.columns.filter((item) => !(item.hideInForm || item.exclude?.includes('form')))
  let pendingData: Obj | undefined
  const resetForm = (data: Obj) => {
    if (formRef.value) formRef.value.resetFields(data)
    else pendingData = data
  }

  // 生成新增表单
  const editForm = () =>
    h(Controls.Form, {
      option: formOption,
      onRegister: (form) => {
        formRef.value = form
        // 首次打开或 destroyOnClose 后表单延迟挂载，注册后只消费一次待重置草稿。
        if (form && pendingData) {
          const data = pendingData
          pendingData = undefined
          form.resetFields(data)
        }
      },
    })

  const modalProps = {
    ...globalProps.Modal,
    maskClosable: false,
    ...option.modalProps,
    ...rowEditor?.modalProps,
  }
  const { modalSlot, openModal, closeModal } = createModal(editForm, modalProps)

  const getTitle = ({ meta, ...param }: Obj) => {
    return (
      toNode(modalProps.title, { meta, ...param }) ||
      `${formOption.title ? formOption.title + ' - ' : ''}  ${meta.title || meta.label}`
    )
  }
  const methods = {
    add(args: Obj = {}) {
      const { meta = {}, resetData, index } = args
      let anchor = args.record ?? (index === undefined ? undefined : orgList.value[index])
      if ((index !== undefined || args.record) && (!anchor || !orgList.value.some(row => rowKey(row) === rowKey(anchor)))) {
        console.warn('[SuperForm] 新增位置已失效，将追加到末尾')
        anchor = undefined
      }
      const anchorKey = anchor && rowKey(anchor)
      const source = { ...resetData }
      resetForm(source)
      meta.title ??= '新增'
      meta.name = 'add'
      meta.isNew = true
      return openModal({
        ...meta,
        title: getTitle({ ...args, source, meta }),
        onOk: async () => {
          return formRef.value.submit().then(async (data) => {
            const custom = await rowEditor?.onSave?.({ ...args, source: data, meta })
            if (custom === false) return false
            let position = anchorKey === undefined ? undefined : orgList.value.findIndex(row => rowKey(row) === anchorKey)
            // 打开弹窗后源数据可能变化；锚点丢失时保留用户输入，降级为末尾追加。
            if (position === -1) {
              console.warn('[SuperForm] 新增锚点已不存在，将追加到末尾')
              position = undefined
            }
            return listener.onSave(data, position)
          })
        },
        onCancel: async () => {
          if (await rowEditor?.onCancel?.({ ...args, meta }) === false) return false
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
      resetForm(source)
      defaults(meta, { name: 'edit', title: '编辑', isNew: false })
      return openModal({
        ...meta,
        title: getTitle({ ...args, source, meta }),
        onOk: async () => {
          return formRef.value.submit().then(async (newData) => {
            const custom = await rowEditor?.onSave?.({ ...args, source: newData, meta })
            if (custom === false) return false
            return listener.onUpdate(newData, data)
          })
        },
        onCancel: async () => {
          if (await rowEditor?.onCancel?.({ ...args, meta }) === false) return false
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
