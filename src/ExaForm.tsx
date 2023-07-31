import { defineComponent, PropType, provide, reactive, readonly, ref, h, inject, watch, onMounted, toRefs } from 'vue'

import { useModal } from './Modal'
import { ConfigProvider, ModalFuncProps } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import Controls from './controls/components'

export function defineForm(option: FormOption) {
  return option
}

export function useForm(option: FormOption, data: Obj = {}) {
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
      return () => h(ExaForm, { config: option, model: model.value, onRegister: register })
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
      // resetFields: () => formRef.value.getExpose().resetFields(),
      // setFieldsValue: (data) => getForm('setFieldsValue', data),
    },
  ] as const
}

export function useFormModal(optionData: FormOption, config?: ModalFuncProps) {
  const [register, form] = useForm(optionData)
  const modal = useModal(register() as Fn, config)

  return {
    openModal: (option?: ModalFuncProps) => {
      return modal.openModal(option).then(() => form.getForm())
    },
    ...form,
  }
}

export const ExaForm = defineComponent({
  name: 'ExaForm',
  props: {
    config: Object as PropType<FormOption>,
    model: Object,
  },
  emits: ['register'],
  setup(props, { slots, expose, attrs, emit }) {
    const formData: Obj = ref(props.model || {})
    const formRef = ref()
    const formOption = reactive<any>({ ...props.config, attrs: { ...props.config?.attrs, ...attrs } })

    const actions = {
      setOption: (_option: FormOption) => {
        Object.assign(formOption, _option, { attrs: { ...formOption.attrs, ..._option.attrs } })
      },
      setData: (data) => {
        //TODO formData重置，Form组件重新生成modalsMap
        formData.value = data
      },
    }

    watch(() => props.model, actions.setData)

    expose(actions)

    const register = (compRef) => {
      formRef.value = compRef
      emit('register', actions, reactive({ ...toRefs(compRef), ...actions }))
    }
    emit('register', actions)

    const formNode = () =>
      formOption.subItems && (
        <Controls.Form option={formOption} model={formData.value} onRegister={register} v-slots={slots} />
      )

    let locale = inject<any>('configProvider')?.locale
    if (!locale) {
      locale = inject<any>('localeData')?.locale || zhCN
      dayjs.locale(locale.locale)
      return () => <ConfigProvider locale={locale}>{formNode()}</ConfigProvider>
    } else {
      return formNode
    }
  },
})
