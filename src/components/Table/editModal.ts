import { merge, cloneDeep } from 'lodash-es'
import { nanoid } from 'nanoid'
import { globalProps } from '../../plugin'
import { createModal } from '../../superModal'
import { ref, h } from 'vue'
import Controls from '../index'

export default function editModal({ initialData, rowKey, option, listener }) {
  const source = ref({})
  const formRef = ref()

  const formOption: GetOption<'Form'> = { ...(option.editForm || option.formSchema) }
  // buttons: { actions: ['submit', 'reset'] },
  formOption.subItems = formOption.subItems || option.columns.filter((item) => !item.hideInForm)

  // 生成新增表单
  const editForm = () =>
    h(Controls.Form, {
      option: formOption,
      dataSource: source,
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
      formRef.value?.clearValidate()

      return openModal({
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
      formRef.value?.clearValidate()
      return openModal({
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
