import { merge, cloneDeep } from 'lodash-es'
import { nanoid } from 'nanoid'
import { globalProps } from '../../plugin'
import { createModal } from '../../superModal'
import { ref, h } from 'vue'
import Controls from '../index'

export default function editModal({ initialData, rowKey, option, listener }) {
  const source = ref({})
  const formRef = ref()
  const rowEditor = option.rowEditor
  const { modalProps: formModal, ...formOption } = rowEditor?.form || option.editForm || option.formSchema || {}
  // buttons: { actions: ['submit', 'reset'] },
  formOption.subItems = formOption.subItems || option.columns.filter((item) => !item.hideInForm)

  // 生成新增表单
  const editForm = () =>
    h(Controls.Form, {
      option: formOption,
      dataSource: source,
      onRegister: (data) => (formRef.value = data),
    })

  const { modalSlot, openModal, closeModal } = createModal(editForm, {
    ...globalProps.Modal,
    maskClosable: false,
    ...option.modalProps,
    ...formModal,
  })

  const methods = {
    add(args: Obj = {}) {
      const { meta = {}, resetData } = args
      source.value = merge({}, initialData, { '_ID_': nanoid(12), ...resetData })
      formRef.value?.clearValidate()

      return openModal({
        ...meta,
        title: meta.title || meta.label || '新增',
        onOk: async () => {
          const custom = await rowEditor?.onSave?.({ ...args, isNew: true }) 
          if (custom === false) return
          return formRef.value.submit().then((data) => {
            return listener.onSave(data)
          })
        },
        onCancel: async () => {
          const custom = await rowEditor?.onSave?.({ ...args, isNew: true })
          if (custom === false) return
          return closeModal()
        }
      })
    },
    async edit(args) {
      const { record, selectedRows, meta } = args
      const data = record || selectedRows[0]
      if (!data) {
        return Promise.reject(new Error('未选择记录'))
      }
      if (option.apis?.info) {
        source.value = await option.apis.info(rowKey(record), record)
      } else {
        source.value = cloneDeep(data)
      }
      formRef.value?.clearValidate()
      return openModal({
        ...meta,
        title: meta.title || meta.label || '修改',
        onOk: async () => {
          const custom = await rowEditor?.onCancel?.({ ...args, isNew: false }) 
          if (custom === false) return
          return formRef.value.submit().then((newData) => {
            return listener.onUpdate(newData, data)
          })
        },
        onCancel: async () => {
          const custom = await rowEditor?.onCancel?.({ ...args, isNew: false })
          if (custom === false) return
          return closeModal()
        }
      })
    },
    delete({ record, selectedRows }) {
      const items = record ? [record] : selectedRows
      return listener.onDelete(items)
    },
  }
  return { modalSlot, methods }
}
