<script lang="ts">
import { type PropType, defineComponent, h, toRef, provide, reactive } from 'vue'
import { cloneModels } from '../../utils'
import Controls from '../index'

export default defineComponent({
  props: {
    option: {
      required: true,
      type: Object as PropType<MixWrapper>,
    },
    modelsMap: {
      type: Object as PropType<ModelsMap>,
      required: true,
    },
    source: {
      type: Object,
      required: true,
    },
  },
  setup(props, ctx) {
    // const { subSpan, title, label, descriptionsProps, formschema } = props.option || {}
    const source = toRef(props, 'source')
    const { modelsMap } = cloneModels(props.modelsMap, source)
    provide('exaProvider', { data: toRef(props, 'source') })

    return () =>
      h(
        'div',
        { class: ['sup-form sup-detail', ctx.attrs?.isContainer && 'sup-container'] },
        h(Controls.Descriptions, {
          option: props.option,
          model: { children: modelsMap },
          effectData: reactive({ current: source }),
          isView: true,
        })
      )
  },
})
</script>
