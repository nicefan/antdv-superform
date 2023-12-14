<script lang="ts">
import { h, defineComponent, toRaw } from 'vue'
import Collections from './Collections'
import { DetailLayout } from './Detail'
import { toNode } from '../utils'
import { createButtons } from './buttons'
import { Row, Col } from 'ant-design-vue'
export default defineComponent({
  props: {
    option: { type: Object, required: true },
    model: { type: Object as any, required: true },
    effectData: Object,
    disabled: Boolean,
    isView: Boolean,
  },
  setup({ option, model, effectData, isView }, ctx) {
    const { type, label, title = label, buttons } = option

    let buttonsSlot
    if (buttons) {
      const _buttons = Array.isArray(buttons) ? { actions: buttons } : buttons
      if (type === 'Discriptions') {
        _buttons.vaildIn ??= 'detail'
      }
      buttonsSlot = createButtons({ config: _buttons, params: effectData, isView })
    }

    const slots = {
      ...ctx.slots,
      title: title ? () => toNode(title, effectData) : undefined,
      actions: buttonsSlot,
      default:
        ctx.slots.innerContent ||
        (isView
          ? () => h(DetailLayout, { option, modelsMap: model.children })
          : () => h(Collections, { option, model })),
    }

    const CustomComponent = option.component && toRaw(option.component)

    let titleButton, bottomButton
    if (buttonsSlot) {
      if (buttons.placement === 'bottom') {
        bottomButton = () =>
          h('div', { class: 'sup-bottom-buttons', style: { textAlign: buttons.align } }, buttonsSlot())
      } else {
        titleButton = () =>
          h(Col, { class: 'sup-title-buttons', flex: 1, style: { textAlign: buttons.align } }, buttonsSlot)
      }
    }
    if (CustomComponent) {
      return () => h(CustomComponent, {}, slots)
    } else {
      return () =>
        h('div', {}, [
          (title || buttonsSlot) &&
            h(Row, { align: 'middle', class: 'ant-descriptions-header' }, () => [
              h(Col, { class: 'sup-title' }, slots.title),
              titleButton && titleButton(),
            ]),
          slots.default(),
          bottomButton && bottomButton(),
        ])
    }
  },
})
</script>
