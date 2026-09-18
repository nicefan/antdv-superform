import { defineComponent, h, reactive, type PropType } from 'vue'
import type { FieldState, ResolvedField } from '../../adapter'
import useVModel from '../../utils/useVModel'
import { resolveFieldProcessors } from '../../processors'
import type { ExtFormItemOption } from '../../exaTypes'

/** 将 Core 处理器产生的标准绑定和属性交给当前 Adapter 组件。 */
export default defineComponent({
  name: 'FieldProcessorRenderer',
  inheritAttrs: false,
  props: {
    // 直接接收已经解析的配置，渲染阶段不再按类型查询 Adapter。
    field: { type: Object as PropType<ResolvedField>, required: true },
    inputAttrs: { type: Object, required: true },
    state: { type: Object as PropType<FieldState>, required: true },
    option: { type: Object as PropType<ExtFormItemOption>, required: true },
    model: { type: Object as PropType<ModelData>, required: true },
    effectData: { type: Object, required: true },
  },
  setup(props, ctx) {
    const processorState = resolveFieldProcessors(props.field.processors || [], {
      option: props.option,
      attrs: reactive(props.inputAttrs),
      effectData: props.effectData,
      model: props.model,
    })
    const valueProps = useVModel({
      option: props.option,
      model: props.model,
      effectData: props.effectData,
    })
    processorState.bindModel(valueProps)

    return () => {
      const field = props.field
      const context = {
        type: field.type,
        option: props.option,
        model: props.model,
        effectData: props.effectData,
        binding: reactive(valueProps),
        state: { ...props.state, ...processorState.state.value },
      }
      const attrs = reactive(field.getAttrs(props.inputAttrs, props.option, context.state))
      return field.adapted
        ? h(field.component, { ...context, attrs }, ctx.slots)
        : h(field.component, field.adaptProps(attrs, context), field.adaptSlots?.(ctx.slots, context) ?? ctx.slots)
    }
  },
})
