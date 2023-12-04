<script lang="ts">
import { h, defineComponent, toRaw } from 'vue'
import Collections from './Collections'
import { DetailLayout } from './Detail'
import { toNode } from '../utils'
import { ButtonGroup } from './buttons'
export default defineComponent({
  props: {
    option: { type: Object, required: true },
    model: { type: Object as any, required: true },
    effectData: Object,
    disabled: Boolean,
    isView: Boolean,
  },
  setup({ option, model, effectData, isView }, ctx) {
    const { label, title = label, buttons } = option
    const slots = {
      ...ctx.slots,
      title: () => toNode(title, effectData),
      extra: () => buttons && !isView && h(ButtonGroup, { config: buttons, param: effectData }),
      default: () =>
        isView ? h(DetailLayout, { option, modelsMap: model.children }) : h(Collections, { option, model }),
    }
    const CustomComponent = option.component && toRaw(option.component)
    if (CustomComponent) {
      return () => h(CustomComponent, {}, slots)
    } else {
      return () =>
        h('div', {}, [
          title && h('div', { class: 'sup-title ant-descriptions-header' }, slots.title()),
          slots.default(),
        ])
    }
  },
})
</script>
