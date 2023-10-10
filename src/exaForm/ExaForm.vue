<script lang="ts">
import { defineComponent, PropType, ref, reactive, toRefs, h, mergeProps, watchEffect, onMounted } from 'vue'
import { merge } from 'lodash-es'
import Controls from '../components'
import { globalProps } from '../plugin'

export default defineComponent({
  inheritAttrs: false,
  name: 'ExaForm',
  props: {
    config: Object as PropType<ExFormOption>,
    model: Object,
    isContainer: Boolean,
    /** 减少行距 */
    compact: Boolean,
    /** 不做校验 */
    ignoreRules: Boolean,
  },
  emits: ['register'],
  setup(props, ctx) {
    const { config, model, ...others } = props
    const { class: __class, ...attrs } = ctx.attrs
    const formData: Obj = ref({})
    const formRef = ref()
    const formOption = reactive<any>({
      ...config,
      ...others,
      attrs: mergeProps({ ...globalProps.Form }, { ...props.config?.attrs }, attrs),
    })
    const actions = {
      setOption: (_option: ExFormOption) => {
        merge(formOption, _option, formOption)
        if (formOption.model) {
          formData.value = formOption.model
          delete formOption.model
        }
      },
      setData: (data) => {
        data && (formData.value = data)
      },
    }

    watchEffect(() => actions.setData(props.model))

    ctx.emit('register', actions)
    const register = (compRef) => {
      // if (compRef === null) {
      //   ctx.emit('register', null)
      // }
      formRef.value = compRef
      ctx.emit('register', actions, compRef)
    }
    onMounted(() => ctx.expose(formRef.value))

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
          onRegister: register,
          ...mergeProps({ class: __class }, { class: formOption.isContainer && 'exa-container' }),
        },
        ctx.slots
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
