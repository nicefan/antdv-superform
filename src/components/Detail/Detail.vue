<script lang="ts">
import { PropType, defineComponent, h, inject, provide, reactive, toRef, unref } from 'vue'
import { ButtonGroup } from 'ant-design-vue'
import { cloneModels, getEffectData } from '../../utils'
import Layout from './DetailLayout'

export default defineComponent({
  props: {
    option: {
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
    // const { subSpan, title, label, descriptionsProps, formSechma } = props.option || {}
    const { modelsMap } = cloneModels(props.modelsMap, toRef(props, 'source'))

    return () =>
      h(
        'div',
        { class: ['exa-form exa-detail', ctx.attrs?.isContainer && 'exa-container'] },
        h(Layout, { option: props.option, modelsMap })
      )
  },
})
</script>
