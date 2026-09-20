<script lang="ts">
import { h, defineComponent, toRaw } from 'vue'
import Collections from './Collections'
import { DetailLayout } from './Detail'
import { createButtons } from './buttons'
import { createLabelNode } from '../utils/labelNode'
import { getUIRender } from '../adapter'
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
        _buttons.visibleIn ??= _buttons.validOn ?? 'detail'
      }
      buttonsSlot = createButtons({
        config: _buttons,
        effectData,
        isView: _isView,
      })
    }

    // 分组还被详情和数组复用：内容上下文留在 Core，Adapter 只消费准备好的插槽。
    return () => {
      const { style, class: className, ...attrs } = ctx.attrs
      const titleSlot = ctx.slots.title || (title ? createLabelNode(option, effectData) : undefined)
      const extra = ctx.slots.extra || ctx.slots.actions || buttonsSlot
      const extraPlacement = buttons?.placement === 'bottom' ? 'bottom' : 'title'
      return getUIRender('group')({
        attrs: { class: className, style },
        contentAttrs,
        component: option.component && toRaw(option.component),
        slots: ctx.slots,
        title: titleSlot,
        extra,
        extraPlacement,
        extraAlign: buttons?.align || (extraPlacement === 'bottom' ? 'center' : titleSlot ? 'right' : undefined),
        content: () => {
          if (ctx.slots.innerContent) return ctx.slots.innerContent(attrs)
          if (ctx.slots.default) return ctx.slots.default()
          return _isView
            ? h(DetailLayout, {
                option: { descriptionsProps: attrs, ...option },
                modelsMap: model.children,
                effectData,
              })
            : h(Collections, { option, model, effectData })
        },
      })
    }
  },
})
</script>
