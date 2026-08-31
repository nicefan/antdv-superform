<script lang="ts">
import { type PropType, defineComponent, h } from 'vue'
import base from '../compat/antdv'
import { useOptions } from '../utils/useOptions'
import { Radio, RadioButton } from '../compat/antdv'
import { toNode } from '../utils'

export default defineComponent({
  props: {
    option: {
      required: true,
      type: Object as PropType<GetOption<'Radio'>>,
    },
    model: {
      required: true,
      type: Object as PropType<ModelData>,
    },
    effectData: {
      required: true,
      type: Object,
    },
    options: null as any,
    onChange: Function,
  },
  emits: ['update:labelValue'],
  setup(props, { attrs, emit }) {
    const { optionsRef } = useOptions(props.option, props.options, props.effectData)

    const optionType = attrs.optionType || (attrs.buttonStyle && 'button')
    let onChange = props.onChange
    if (props.option.labelField) {
      onChange = (e) => {
        const labels = optionsRef.value.find((item) => item.value === e.target.value)?.label
        emit('update:labelValue', labels)
        props.onChange?.(e)
      }
    }

    return () =>
      h(base.RadioGroup, { name: props.option.field, optionType, onChange } as any, () =>
        optionsRef.value.map((item) =>
          h(optionType === 'button' ? RadioButton : Radio, { value: item.value, disabled: item.disabled }, () =>
            toNode(item.label, props.effectData)
          )
        )
      )
  },
})
</script>
