import { defineComponent, PropType, provide, reactive, readonly, ref, h, toRaw, inject } from 'vue'

import { useModal } from './Modal'
import { buildModelDeep, setFieldsValue } from './utils/util'
import { ConfigProvider, Form } from 'ant-design-vue'
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { Collections } from './controls'

export function defineForm(option: FormOption) {
  return option
}

export function buildForm(optionData) {
  const formRef = ref()
  const FormComponent = () => h(ExaForm, { ...optionData, ref: formRef })
  const onSubmit = () => formRef.value.onSubmit()
  return {
    FormComponent,
    onSubmit,
    resetFields: () => formRef.value.getExpose().resetFields(),
    setFieldsValue: (data) => formRef.value.setFieldsValue(data),
  }
}

export function buildModal(optionData) {
  const formRef = ref()
  const FormComponent = () => h(ExaForm, { ...optionData, ref: formRef })
  const { openModal } = useModal(FormComponent)
  const onSubmit = () => formRef.value.onSubmit()
  return {
    openModal,
    onSubmit,
  }
}

const ExaForm = defineComponent({
  name: 'ExaForm',
  props: {
    attrs: Object,
    subItems: {
      type: Array as PropType<UniOption[]>,
      default: () => [],
    },
    sectionClass: String,
    wrapperCol: Object,
    rowProps: Object,
  },
  setup(props, { slots, expose, attrs }) {
    const formData: Obj = reactive({})
    const formRef = ref()
    const modelData = {
      rules: {},
      parent: formData,
    }
    const modelsMap = buildModelDeep(props.subItems, modelData)
    provide('formData', readonly(formData))
    // provide('ExConfig', readonly({ sectional: props.sectional }))
    expose({
      getExpose() {
        return formRef.value
      },
      onSubmit: () => {
        return formRef.value.validate().then((...args) => {
          console.log(args)
          return toRaw(formData)
        })
      },
      setFieldsValue(data) {
        return setFieldsValue(modelsMap, data)
      },
    })
    let locale = inject<any>('configProvider')?.locale
    const formNode = () => (
      <Form
        ref={formRef}
        class="exa-form"
        model={formData}
        rules={modelData.rules}
        layout="vertical"
        {...props.attrs}
        {...attrs}
      >
        <Collections option={props} children={modelsMap} />
        {slots.default}
      </Form>
    )
    if (!locale) {
      locale = inject<any>('localeData')?.locale || zhCN
      dayjs.locale(locale.locale)
      return () => <ConfigProvider locale={locale}>{formNode()}</ConfigProvider>
    } else {
      return formNode
    }
  },
})
