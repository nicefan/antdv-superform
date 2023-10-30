<script lang="ts">
import { h, type PropType, defineComponent } from 'vue'
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
    options: Array
  },
  setup(props) {
    const { optionsRef } = useOptions(props.option, props.options, props.effectData)

    return () => h(CheckboxGroup, { options: optionsRef.value, name: props.option.field })
  },
})
</script>
