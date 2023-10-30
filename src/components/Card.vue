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
    disabled: Boolean,
    isView: Boolean,
  },
  setup({ option, model, effectData, isView }) {
    const { label, title = label, buttons } = option
    return () =>
      h(
        base.Card,
        {},
        {
          title: () => toNode(title, effectData),
          extra: buttons && (() => h(ButtonGroup, { config: buttons, param: effectData })),
          default: () =>
            isView ? h(DetailLayout, { option, modelsMap: model.children }) : h(Collections, { option, model }),
        }
      )
  },
})
</script>
