<script lang="ts">
import { defineComponent, h } from 'vue'
import baseComps from './base'
import { useOptions } from '../utils/useOptions'

export default defineComponent({
  props: {
    option: { type: Object, required: true },
    model: Object,
    effectData: Object,
    options: null as any,
    /** 字典名称 */
    dictName: String,
  },

  setup(props, ctx) {
    const { optionsRef } = useOptions({ ...props.option, valueToLabel: true }, props.options, props.effectData)
    return () =>
      h(
        baseComps.AutoComplete,
        { placeholder: `请输入${props.option.label}`, options: optionsRef.value, filterOption: true },
        ctx.slots
      )
  },
})
</script>
