<script lang="ts">
import { type PropType, computed, defineComponent, h, reactive, watch } from 'vue'
import base from './base'
import { useOptions } from '../utils/useOptions'

export default defineComponent({
  props: {
    option: {
      required: true,
      type: Object as PropType<GetOption<'Switch'>>,
    },
    model: {
      required: true,
      type: Object as PropType<ModelData>,
    },
    effectData: {
      required: true,
      type: Object,
    },
    value: {
      type: [Number, String, Boolean],
    },
    options: Object,

    /** 字典名称 */
    dictName: String,
    /** 选项中的value转成number类型 */
    valueToNumber: Boolean,
    /** 选项中的value使用label */
    valueToLabel: Boolean,
    /** 第一个选项为选中值 */
    firstIsChecked: Boolean,
    /** 默认是否选中 */
    defaultChecked: Boolean,
  },
  emits: ['update:value'],
  setup(props, ctx) {
    const [falseName, trueName] = props.option.valueLabels || []
    const { optionsRef } = useOptions(props.option, props.options, props.effectData)

    const defTrueValue = props.valueToNumber ? 1 : true
    const defFalseValue = props.valueToNumber ? 0 : false
    const attrs = computed(() => {
      const [first, scond] = optionsRef.value
      if (props.firstIsChecked) {
        return {
          checkedChildren: first?.label ?? trueName,
          unCheckedChildren: scond?.label ?? falseName,
          checkedValue: first?.value ?? defTrueValue,
          unCheckedValue: scond?.value ?? defFalseValue,
        }
      } else {
        return {
          checkedChildren: scond?.label ?? trueName,
          unCheckedChildren: first?.label ?? falseName,
          checkedValue: scond?.value ?? defTrueValue,
          unCheckedValue: first?.value ?? defFalseValue,
        }
      }
    })

    watch(
      () => [props.value, optionsRef.value] as const,
      ([val, options]) => {
        if (val === undefined && options.length) {
          ctx.emit('update:value', props.defaultChecked ? attrs.value.checkedValue : attrs.value.unCheckedValue)
        }
      },
      { immediate: true }
    )
    return () =>
      h(
        base.Switch,
        reactive({
          ...attrs.value,
          checked: props.value,
          'onUpdate:checked': (val) => ctx.emit('update:value', val),
        })
      )
  },
})
</script>
