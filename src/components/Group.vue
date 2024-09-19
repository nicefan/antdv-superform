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
    isView: Boolean,
  },
  setup({ option, model, effectData, isView }, ctx) {
    const { type, label, title = label, buttons } = option
    const _isView = type === 'Descriptions' || isView
    let buttonsSlot
    if (buttons) {
      const _buttons = Array.isArray(buttons) ? { actions: buttons } : buttons
      if (type === 'Descriptions') {
        _buttons.validOn ??= 'detail'
      }
      buttonsSlot = createButtons({ config: _buttons, effectData, isView: _isView })
    }

    const slots = {
      ...ctx.slots,
      title: title ? () => toNode(title, effectData) : undefined,
      actions: buttonsSlot,
      default:
        ctx.slots.innerContent ||
        (_isView
          ? () => h(DetailLayout, { option: { descriptionsProps: option.attrs, ...option }, modelsMap: model.children })
          : () => h(Collections, { option, model, effectData })),
    }

    const CustomComponent = option.component && toRaw(option.component)

    let titleButton, bottomButton
    const buttonAlign = buttons?.align
    if (buttonsSlot) {
      if (buttons.placement === 'bottom') {
        bottomButton = () =>
          h('div', { class: 'sup-bottom-buttons', style: { textAlign: buttonAlign || 'center' } }, buttonsSlot())
      } else {
        titleButton = () =>
          h(
            Col,
            { class: 'sup-title-buttons', flex: 1, style: { textAlign: buttonAlign || (title ? 'right' : undefined) } },
            buttonsSlot
          )
      }
    }
    if (CustomComponent) {
      return () => h(CustomComponent, {}, slots)
    } else if (title || buttonsSlot) {
      return () =>
        h('div', {}, [
          (title || titleButton) &&
            h(Row, { align: 'middle', class: 'sup-titlebar' }, () => [
              title && h(Col, { class: 'sup-title' }, slots.title),
              titleButton?.(),
            ]),
          slots.default(),
          bottomButton && bottomButton(),
        ])
    } else if (ctx.slots.innerContent) {
      return () => h('div', slots.default())
    } else {
      return slots.default
    }
  },
})
</script>
