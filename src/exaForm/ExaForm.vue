<script lang="ts">
import { defineComponent, PropType, ref, reactive, watch, toRefs, h, mergeProps } from 'vue'
import { merge } from 'lodash-es'
import Controls from '../components'
import { globalProps } from '../plugin'

export default defineComponent({
  name: 'ExaForm',
  props: {
    config: Object as PropType<ExFormOption>,
    model: Object,
  },
  emits: ['register'],
  setup(props, { slots, expose, attrs, emit }) {
    const formData: Obj = ref(props.model)
    const formRef = ref()
    const formOption = reactive<any>({
      ...props.config,
      attrs: mergeProps({ ...globalProps.Form }, { ...props.config?.attrs }, attrs),
    })

    const actions = {
      setOption: (_option: ExFormOption) => {
        merge(formOption, _option, { attrs: { ...formOption.attrs, ..._option.attrs } })
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

    // const modelsMap = computed(() => buildModelMaps(formOption.subItems, { parent: formData }))

    // const defaultSlot = () => (
    //   <>
    //     <Collections option={formOption} children={modelsMap} v-slots={slots} />
    //     <slot />
    //   </>
    // )

    const formNode = () =>
      formOption.subItems &&
      h(
        Controls.Form,
        {
          option: formOption,
          source: formData.value,
          class: formOption.isContainer && 'exa-container',
          onRegister: register,
        },
        slots
      )

    return formNode

    // let locale = inject<any>('configProvider', {}).locale
    // if (!locale) {
    //   locale = inject<any>('localeData')?.locale || zhCN
    //   dayjs.locale(locale.locale)
    //   return () => h(ConfigProvider {locale}, {default:formNode})
    // } else {
    //   return formNode
    // }
  },
})
</script>
