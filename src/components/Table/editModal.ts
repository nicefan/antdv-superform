import { merge, cloneDeep } from 'lodash-es'
import { nanoid } from 'nanoid'
import { globalProps } from '../../plugin'
import { createModal } from '../../superModal'
import { ref, h, nextTick } from 'vue'
import Controls from '../index'
import { toNode } from '../../utils'

export default function editModal({ initialData, rowKey, option, listener }) {
  const source = ref({})
  const formRef = ref()
  const rowEditor = option.rowEditor
  const formOption = rowEditor?.form || option.editForm || option.formSchema || {}
  // buttons: { actions: ['submit', 'reset'] },
  formOption.subItems = formOption.subItems || option.columns.filter((item) => !item.hideInForm || !item.exclude?.includes('form'))

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
      toNode(modalProps.title, { target: 'edit', ...param }) ||
      `${formOption.title ? formOption.title + ' - ' : ''}  ${meta.title || meta.label}`
    )
  }
  const methods = {
    add(args: Obj = {}) {
      const { meta = {}, resetData } = args
      source.value = merge({}, initialData, { '_ID_': nanoid(12), ...resetData })
      nextTick(() => {
        formRef.value?.clearValidate()
      })

      return openModal({
        ...meta,
        title: getTitle({ ...args, source: source.value, isNew: true }),
        onOk: async () => {
          return formRef.value.submit().then(async (data) => {
            const custom = await rowEditor?.onSave?.({ ...args, source: data, isNew: true })
            if (custom === false) return
            return listener.onSave(data)
          })
        },
        onCancel: async () => {
          await rowEditor?.onCancel?.({ ...args, isNew: true })
          return closeModal()
        },
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
        title: getTitle({ ...args, source: source.value }),
        onOk: async () => {
          return formRef.value.submit().then(async (newData) => {
            const custom = await rowEditor?.onSave?.({ ...args, source: newData, isNew: false })
            if (custom === false) return
            return listener.onUpdate(newData, data)
          })
        },
        onCancel: async () => {
          await rowEditor?.onCancel?.({ ...args, isNew: false })
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
