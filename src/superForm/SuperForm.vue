<script lang="ts">
import { defineComponent, ref, h, mergeProps, watchEffect, onMounted, computed, shallowReactive, provide } from 'vue'
import { merge, defaults } from 'lodash-es'
import Controls from '../components'
import { globalProps } from '../plugin'
import type { ExtFormOption } from '../exaTypes'
import type { FormProps } from 'ant-design-vue'
import { getEffectData, useInnerSlots } from '../utils'

type SuperFormProps = FormProps & {
  /** 是否为容器包装 */
  isContainer?: boolean
  schema?: ExtFormOption
  /** 减少行距 */
  compact?: boolean
  /** 不做校验 */
  ignoreRules?: boolean
  dataSource?: Obj
  onRegister?: () => void
}
export default defineComponent<SuperFormProps, any, unknown>({
  name: 'SuperForm',
  props: {
    schema: Object,
    model: Object,
    dataSource: Object,
    isContainer: Boolean,
  } as any,
  emits: ['register'],
  setup(props, ctx) {
    const formRef = ref()
    const formOption = shallowReactive<any>({
      ...props.schema,
      dataSource: props.dataSource || props.model || props.schema?.dataSource,
      attrs: mergeProps({ ...globalProps.Form }, { ...props.schema?.attrs }),
    })
    const actions = {
      setOption: (_option: ExtFormOption) => {
        defaults(formOption, _option)
        formOption.attrs = mergeProps(formOption.attrs, { ..._option.attrs }, { ...props.schema?.attrs })
        // if (formOption.dataSource) {
        //   formData.value = formOption.dataSource
        //   // delete formOption.model
        // }
      },
      setData: (data) => {
        data && (formOption.dataSource = data)
      },
    }

    provide('rootSlots', ctx.slots)
    // watchEffect(() => actions.setData(props.model))

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
          // dataSource: formData.value,
          onRegister: register,
          class: { 'sup-container': isContainer.value },
        },
        useInnerSlots(formOption.slots, getEffectData(), ctx.slots)
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
