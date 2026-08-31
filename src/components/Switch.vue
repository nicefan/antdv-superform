<script lang="ts">
import { type PropType, computed, defineComponent, h, watch } from 'vue'
import base from '../compat/antdv'
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
    options: null as any,
    labelValue: null as any,

    /** 字典名称 */
    dictName: String,
    /** 选项中的value转成number类型 */
    valueToNumber: Boolean,
    /** 使用选项 label 作为字段值 */
    labelAsValue: Boolean,
    /** @deprecated 使用 `labelAsValue` */
    valueToLabel: Boolean,
    /** 第一个选项为选中值 */
    firstIsChecked: Boolean,
    /** 默认是否选中 */
    defaultChecked: Boolean,
  },
  emits: ['update:value', 'update:labelValue'],
  setup(props, { attrs: inheritAttrs, emit }) {
    const [falseName, trueName] = props.option.valueLabels || []
    const { optionsRef } = useOptions(props.option, props.options, props.effectData)

    const valueToNumber = props.option.valueToNumber ?? props.valueToNumber
    const defTrueValue = valueToNumber ? 1 : true
    const defFalseValue = valueToNumber ? 0 : false
    const stateProps = computed(() => {
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

    const syncLabel = (value, options = optionsRef.value) => {
      if (!props.option.labelField) return
      const item = options.find((option) => Object.is(option.value, value))
      const state = stateProps.value
      const label =
        item?.label ??
        (Object.is(value, state.checkedValue)
          ? state.checkedChildren
          : Object.is(value, state.unCheckedValue)
          ? state.unCheckedChildren
          : undefined)
      emit('update:labelValue', label)
    }

    const hasOptionsSource = computed(
      () => props.options !== undefined || props.option.options !== undefined || Boolean(props.option.dictName)
    )

    watch(
      () => [props.value, optionsRef.value] as const,
      ([val, options]) => {
        if (val === undefined) {
          if (hasOptionsSource.value && !options.length) return
          const initialValue = props.defaultChecked
            ? stateProps.value.checkedValue
            : stateProps.value.unCheckedValue
          emit('update:value', initialValue)
          syncLabel(initialValue, options)
        } else {
          syncLabel(val, options)
        }
      },
      { immediate: true }
    )

    const updateValue = (value) => {
      emit('update:value', value)
      syncLabel(value)
    }

    return () =>
      h(
        base.Switch as any,
        {
          ...inheritAttrs,
          ...stateProps.value,
          checked: props.value,
          'onUpdate:checked': updateValue,
        }
      )
  },
})
</script>
