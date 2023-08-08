import { ref, h, useSlots, watch } from 'vue'
import { ExaForm } from './'

export function useForm(option: ExFormOption, data?: Obj) {
  const model = ref(data)
  const formRef = ref()
  const actionsRef = ref()

  const register = (actions?: Obj, _ref?: Obj): any => {
    if (actions) {
      if (!actionsRef.value) {
        actions.setOption(option)
        actions.setData(model.value)
      }
      actionsRef.value = actions
      formRef.value = _ref
    } else {
      return (props) => h(ExaForm, { config: option, model: model.value, ...props, onRegister: register }, useSlots())
    }
  }
  const _promise = new Promise((resolve) => watch(formRef, resolve))

  const getForm = async (key?: string, param?: any) => {
    const form = (await _promise) as Obj
    if (key && key in form) {
      if (typeof form[key] === 'function') {
        return form[key](param)
      } else {
        return form[key]
      }
    } else if (!key) {
      return form
    }
  }

  return [
    register,
    {
      setData(data) {
        if (actionsRef.value) {
          actionsRef.value.setData(data)
        } else {
          model.value = data
        }
      },
      getForm,
      submit: () => getForm('submit'),
      resetFields: (rest?: Obj) => getForm('resetFields', rest),
      setFieldsValue: (data: Obj) => getForm('setFieldsValue', data),
    },
  ] as const
}

// export function useFormModal(optionData: FormOption, config?: ModalFuncProps) {
//   const [register, form] = useForm(optionData)
//   const modal = useModal(register() as Fn, config)

//   return {
//     openModal: (option?: ModalFuncProps) => {
//       return modal.openModal(option).then(() => form.getForm())
//     },
//     ...form,
//   }
// }
