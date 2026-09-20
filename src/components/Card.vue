<script lang="ts">
import Collections from './Collections'
import { ButtonGroup } from './buttons'
import { DetailLayout } from './Detail'
import { defineComponent, h } from 'vue'
import { toNode } from '../utils'
import { getUIRender } from '../adapter'

export default defineComponent({
  inheritAttrs: false,
  props: {
    option: { type: Object, required: true },
    model: { type: Object as any, required: true },
    effectData: Object,
    isView: Boolean,
  },
  setup(props, { attrs, slots }) {
    return () => {
      const { option, model, effectData, isView } = props
      const { title = option.label, buttons } = option
      return getUIRender('card')({
        attrs,
        slots,
        title: slots.title || (title ? () => toNode(title, effectData) : undefined),
        extra: slots.extra || (buttons && !isView ? () => h(ButtonGroup, { option: buttons, effectData }) : undefined),
        content:
          slots.default ||
          (() =>
            isView
              ? h(DetailLayout, { option, modelsMap: model.children, effectData })
              : h(Collections, { option, model, effectData })),
      })
    }
  },
})
</script>
