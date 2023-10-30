<script lang="ts">
import { type PropType, defineComponent, h, reactive } from 'vue'
import baseComps from './base'

const { Switch } = baseComps
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
      type: Number,
    },
  },
  emits: ['update:value'],
  setup(props, ctx) {
    const [falseName, trueName] = props.option.valueLabels || []
    ctx.emit('update:value', props.value ?? 0)
    return () =>
      h(
        Switch,
        reactive({
          checkedChildren: trueName,
          unCheckedChildren: falseName,
          checkedValue: 1,
          unCheckedValue: 0,
          checked: props.value,
          'onUpdate:checked': (val) => ctx.emit('update:value', val),
        })
      )
  },
})
</script>
