<script lang="ts">
import { h, defineComponent, toRaw, mergeProps } from 'vue'
import Collections from './Collections'
import { DetailLayout } from './Detail'
import { toNode } from '../utils'
import { createButtons } from './buttons'
import { Row, Col } from 'ant-design-vue'
export default defineComponent({
  inheritAttrs: false,
  props: {
    option: { type: Object, required: true },
    model: { type: Object as any, required: true },
    effectData: Object,
    isView: Boolean,
  },
  setup({ option, model, effectData, isView }, ctx) {
    const { type, label, title = label, buttons, contentAttrs } = option
    const _isView = type === 'Descriptions' || isView
    let buttonsSlot
    if (buttons) {
      const _buttons = Array.isArray(buttons) ? { actions: buttons } : buttons
      if (type === 'Descriptions') {
        _buttons.validOn ??= 'detail'
      }
      buttonsSlot = createButtons({ config: _buttons, effectData, isView: _isView })
    }

    const { style, class: _class, ...attrs } = ctx.attrs
    const slots = {
      ...ctx.slots,
      title: title ? () => toNode(title, effectData) : undefined,
      actions: buttonsSlot,
      default: () =>
        h(
          'div',
          contentAttrs,
          ctx.slots.innerContent
            ? ctx.slots.innerContent(attrs)
            : _isView
            ? h(DetailLayout, {
                option: { descriptionsProps: attrs, ...option },
                modelsMap: model.children,
                effectData,
                ...attrs,
              })
            : h(Collections, { option, model, effectData, ...attrs })
        ),
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
    } else {
      return () =>
        h('div', mergeProps({ class: _class, style }, { class: 'sup-group' }), [
          (title || titleButton) &&
            h(Row, { align: 'middle', class: 'sup-titlebar' }, () => [
              title && h(Col, { class: 'sup-title' }, slots.title),
              titleButton?.(),
            ]),
          slots.default(),
          bottomButton && bottomButton(),
        ])
      // } else if (ctx.slots.innerContent) {
      //   return () => h('div', slots.default())
    }
  },
})
</script>
