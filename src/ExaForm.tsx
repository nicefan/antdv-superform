import { defineComponent, PropType, provide, reactive, readonly, ref, h, toRaw } from 'vue'
import Collections from './controls/Collections'
import { useModal } from './Modal'
import { buildModelDeep } from './utils/util';

export function defineForm(option: FormOption) {
  return option
}
export function buildForm(optionData) {
  const formRef = ref()
  const FormComponent = () => h(ExaForm, { option: optionData, ref: formRef })
  const onSubmit = () => formRef.value.onSubmit()
  return {
    FormComponent,
    onSubmit,
  }
}
export function buildModel(optionData) {
  const formRef = ref()
  const FormComponent = () => h(ExaForm, { option: optionData, ref: formRef })
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
    option: {
      type: Object as PropType<{
        attr?: Obj
        gutter?: number
        subItems: UniOption[]
      }>,
      default: () => ({
        subItems: [],
      }),
    },
  },
  setup(props, { slots, expose }) {
    const formData: Obj = reactive({})
    const formRef = ref()
    const modelData = {
      rules: {},
      parent: formData,
    }
    const modelsMap = buildModelDeep(props.option.subItems, modelData)
    provide('formData', readonly(formData))

    expose({
      onSubmit: () => {
        return formRef.value.validate().then((...args) => {
          console.log(args)
          return toRaw(formData)
        })
      },
    })
    return () => (
      <a-form ref={formRef} class="exa-form" model={formData} rules={modelData.rules} layout="vertical">
        <Collections option={props.option} children={modelsMap} />
        {slots.default}
      </a-form>
    )
  },
})
