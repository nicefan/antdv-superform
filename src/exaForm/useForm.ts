import { ref, h, watch } from 'vue'
import { ExaForm } from './'

export function useForm(option: ExFormOption, data?: Obj) {
  const model = ref(data)
  const formRef = ref()

  const register = (actions?: Obj): any => {
    if (actions) {
      if (!formRef.value) {
        actions.setOption(option)
        actions.setData(model.value)
      }
      formRef.value = actions
    } else {
      return (props, ctx) =>
        h(ExaForm, { config: option, model: model.value, ...props, onRegister: register }, ctx?.slots)
    }
  }
  const _promise = new Promise((resolve) => {
    const unwatch = watch(formRef, (form) => {
      if (form) {
        resolve(formRef)
        unwatch()
      }
    })
  })
  const getForm = () => _promise.then(() => formRef.value)

  const asyncCall = async (key?: string, param?: any) => {
    const form = (await getForm()) as Obj
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
      /**
       * @deprecated 使用`resetFields`
       */
      setData(data) {
        asyncCall('resetFields', data)
      },
      getForm,
      asyncCall,
      getSource: () => {
        const source = ref()
        asyncCall('dataSource').then((data) => (source.value = data))
        return source
      },
      submit: () => asyncCall('submit'),
      resetFields: (rest?: Obj) => asyncCall('resetFields', rest),
      setFieldsValue: (data: Obj) => asyncCall('setFieldsValue', data),
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
