import { h, watchEffect, computed, toValue } from 'vue'
import { SuperForm } from './'
import { useGetRef } from '../utils'
import type { ExtFormOption } from '../exaTypes'

type UseFormOption = ExtFormOption | (() => ExtFormOption) | (() => Promise<ExtFormOption>)
export function useForm(option: UseFormOption, data?: Obj) {
  const [formRef, getForm] = useGetRef()
  const register = (actions?: Obj, ref?: Obj): any => {
    if (actions) {
      if (!formRef.value) {
        if (typeof option === 'function') {
          Promise.resolve(option()).then((_option) => {
            actions.setOption(_option)
          })
        } else {
          actions.setOption(option)
        }
        if (data) {
          watchEffect(() => actions.setData(data))
        }
      }
      formRef.value = ref
    } else {
      return (props, ctx) => h(SuperForm, { ...props, onRegister: register }, ctx?.slots)
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
      getData() {
        return toValue(formRef.value?.dataSource)
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
