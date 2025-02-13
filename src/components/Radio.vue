<script lang="ts">
import { type PropType, defineComponent, h, reactive } from 'vue'
import baseComps from './base'
import { useOptions } from '../utils/useOptions'
import { Radio, RadioButton } from 'ant-design-vue'
import { toNode } from '../utils'
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

    const optionType = attrs.optionType || (attrs.buttonStyle && 'button')

    return () =>
      h(RadioGroup, { name: props.option.field, optionType } as any, () =>
        optionsRef.value.map((item) =>
          h(optionType === 'button' ? RadioButton : Radio, { value: item.value, disabled: item.disabled }, () =>
            toNode(item.label, props.effectData)
          )
        )
      )
  },
})
</script>
