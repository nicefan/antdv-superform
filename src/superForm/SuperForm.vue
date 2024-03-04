<script lang="ts">
import { defineComponent, ref, h, mergeProps, watchEffect, onMounted, computed, shallowReactive } from 'vue'
import { merge } from 'lodash-es'
import Controls from '../components'
import { globalProps } from '../plugin'
import type { ExtFormOption } from '../exaTypes'
import type { FormProps } from 'ant-design-vue'

type SuperFormProps = FormProps & {
  /** 是否为容器包装 */
  isContainer?: boolean
  config?: ExtFormOption
  /** 减少行距 */
  compact?: boolean
  /** 不做校验 */
  ignoreRules?: boolean
  onRegister?: () => void
}
export default defineComponent<SuperFormProps, any, unknown>({
  name: 'SuperForm',
  props: {
    config: Object,
    model: Object,
    isContainer: Boolean,
  } as any,
  emits: ['register'],
  setup(props, ctx) {
    // const { config, model, ...others } = props
    // const { class: __class, ...attrs } = ctx.attrs
    const formData: Obj = ref({})
    const formRef = ref()
    const formOption = shallowReactive<any>({
      ...props.config,
      // ...others,
      attrs: mergeProps({ ...globalProps.Form }, { ...props.config?.attrs }),
    })
    const actions = {
      setOption: (_option: ExtFormOption) => {
        merge(formOption, props.config, _option)
        formOption.attrs = mergeProps({ ...globalProps.Form }, { ...formOption.attrs })
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

    const isContainer = computed(() => props.isContainer || formOption.isContainer)
    const formNode = () =>
      formOption.subItems &&
      h(
        Controls.Form,
        {
          option: formOption,
          source: formData.value,
          onRegister: register,
          class: { 'sup-container': isContainer.value },
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
