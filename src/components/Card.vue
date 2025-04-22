<script lang="tsx">
import Collections from './Collections'
import { ButtonGroup } from './buttons'
import { DetailLayout } from './Detail'
import { defineComponent, h } from 'vue'
import base from './base'
import { toNode } from '../utils'

export default defineComponent({
  props: {
    option: { type: Object, required: true },
    model: { type: Object as any, required: true },
    effectData: Object,
    isView: Boolean,
  },
  setup({ option, model, effectData, isView }) {
    const { label, title = label, buttons } = option
    return () =>
      h(
        base.Card,
        {},
        {
          title: title && (() => h('div', { class: 'sup-title' }, toNode(title, effectData))),
          extra: () => buttons && !isView && h(ButtonGroup, { option: buttons, effectData }),
          default: () =>
            isView ? h(DetailLayout, { option, modelsMap: model.children, effectData }) : h(Collections, { option, model, effectData }),
        }
      )
  },
})
</script>
