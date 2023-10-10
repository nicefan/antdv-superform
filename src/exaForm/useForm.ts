import { h, watchEffect, computed, toValue } from 'vue'
import { ExaForm } from './'
import { useGetRef } from '../utils'

export function useForm(option: ExFormOption, data?: Obj) {
  const [formRef, getForm] = useGetRef()
  const register = (actions?: Obj, ref?: Obj): any => {
    if (actions) {
      if (!formRef.value) {
        actions.setOption(option)
        if (data) {
          watchEffect(() => actions.setData(data))
        }
      }
      formRef.value = ref
    } else {
      return (props, ctx) => h(ExaForm, { ...props, onRegister: register }, ctx?.slots)
    }
  }

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
      dataSource: computed(() => formRef.value?.dataSource),
      getForm,
      asyncCall,
      getSource() {
        return asyncCall('dataSource').then((data) => toValue(data))
      },
      submit: () => asyncCall('submit'),
      resetFields: (rest?: Obj) => asyncCall('resetFields', rest),
      setFieldsValue: (data: Obj) => asyncCall('setFieldsValue', data),
      /**
       * @deprecated 使用`resetFields`
       */
      setData(data) {
        asyncCall('resetFields', data)
      },
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
