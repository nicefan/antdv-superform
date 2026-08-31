<script lang="ts">
import { defineComponent, ref, h, mergeProps, onMounted, computed, shallowReactive, provide, type PropType } from 'vue'
import { defaults } from 'lodash-es'
import Controls from '../components'
import { globalConfig, globalProps } from '../plugin'
import type { ExtFormOption } from '../exaTypes'
import { getEffectData, reportSchemaDiagnostics, useInnerSlots } from '../utils'
export default defineComponent({
  name: 'SuperForm',
  props: {
    schema: Object as PropType<ExtFormOption>,
    model: Object as PropType<Obj>,
    dataSource: Object as PropType<Obj>,
    isContainer: Boolean,
    compact: { type: Boolean, default: undefined },
    ignoreRules: { type: Boolean, default: undefined },
  },
  emits: ['register'],
  setup(props, ctx) {
    const formRef = ref()
    const formOption = shallowReactive<any>({
      ...props.schema,
      dataSource: props.dataSource || props.model || props.schema?.dataSource,
      attrs: mergeProps({ ...globalProps.Form }, { ...props.schema?.attrs }),
    })
    if (globalConfig.schemaDiagnostics && props.schema) reportSchemaDiagnostics(props.schema, 'form', 'SuperForm')
    const actions = {
      setOption: (_option: ExtFormOption) => {
        if (globalConfig.schemaDiagnostics) reportSchemaDiagnostics(_option, 'form', 'SuperForm')
        defaults(formOption, _option)
        formOption.attrs = mergeProps(formOption.attrs, { ..._option.attrs }, { ...props.schema?.attrs })
        // if (formOption.dataSource) {
        //   formData.value = formOption.dataSource
        //   // delete formOption.model
        // }
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
          compact: props.compact,
          ignoreRules: props.ignoreRules,
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
