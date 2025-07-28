<script lang="ts">
import { h, type PropType, defineComponent, toRef } from 'vue'
import base from './base'
import { useOptions } from '../utils/useOptions'

const { CheckboxGroup } = base

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
  emits: ['update:labelField'],
  setup(props, ctx) {
    const { optionsRef } = useOptions(props.option, props.options, props.effectData)
    // 同步保存label字段
    let onChange = props.onChange as Fn
    const labelField = props.option.labelField
    if (labelField) {
      onChange = (items) => {
        const labels = items.map((key) => optionsRef.value.find(({ value }) => value == key)?.label)
        ctx.emit('update:labelField', labels)
        props.onChange?.(items)
      }
    }

    return () => h(CheckboxGroup, { options: optionsRef.value, name: props.option.field, onChange })
  },
})
</script>
