<script lang="ts">
import { type PropType, defineComponent, h, reactive } from 'vue'
import baseComps from './base'
import { useOptions } from '../utils/useOptions'

const { RadioGroup } = baseComps

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
    options: Array,
  },
  setup(props, { attrs }) {
    const { optionsRef } = useOptions(props.option, props.options, props.effectData)

    const allAttrs: Obj = reactive({ name: props.option.field, options: optionsRef })
    if (attrs.buttonStyle) {
      allAttrs.optionType = 'button'
    }
    return () => h(RadioGroup, allAttrs)
  },
})
</script>
