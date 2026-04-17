import { cloneDeep, defaults } from 'lodash-es'
import { nanoid } from 'nanoid'
import { globalProps } from '../../plugin'
import { createModal } from '../../superModal'
import { ref, h, nextTick } from 'vue'
import Controls from '../index'
import { toNode } from '../../utils'
import { merge } from '../../utils/merge'

export default function editModal({ rowKey, option, listener }) {
  const formRef = ref()
  const rowEditor = option.rowEditor
  const formOption = rowEditor?.form || option.editForm || option.formSchema || {}
  // buttons: { actions: ['submit', 'reset'] },
  formOption.subItems = formOption.subItems || option.columns.filter((item) => !item.hideInForm || !item.exclude?.includes('form'))
  const source = ref(formOption.dataSource || {})

  // 生成新增表单
  const editForm = () =>
    h(Controls.Form, {
      option: formOption,
      dataSource: source,
      onRegister: (data) => (formRef.value = data),
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
      source.value = { '_ID_': nanoid(12), ...resetData }
      nextTick(() => {
        formRef.value?.clearValidate()
      })
      meta.title ??= '新增'
      meta.name = 'add'
      meta.isNew = true
      return openModal({
        ...meta,
        title: getTitle({ ...args, source: source.value, meta }),
        onOk: async () => {
          return formRef.value.submit().then(async (data) => {
            const custom = await rowEditor?.onSave?.({ ...args, source: data, meta })
            if (custom === false) return
            return listener.onSave(data, index)
          })
        },
        onCancel: async () => {
          await rowEditor?.onCancel?.({ ...args, meta })
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
      if (option.apis?.info) {
        source.value = await option.apis.info(rowKey(data), data)
      } else {
        source.value = cloneDeep(data)
      }
      defaults(meta, { name: 'edit', title: '编辑', isNew: false })
      merge(source.value, resetData)
      formRef.value?.clearValidate()
      return openModal({
        ...meta,
        title: getTitle({ ...args, source: source.value, meta }),
        onOk: async () => {
          return formRef.value.submit().then(async (newData) => {
            const custom = await rowEditor?.onSave?.({ ...args, source: newData, meta })
            if (custom === false) return
            return listener.onUpdate(newData, data)
          })
        },
        onCancel: async () => {
          await rowEditor?.onCancel?.({ ...args, meta })
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
