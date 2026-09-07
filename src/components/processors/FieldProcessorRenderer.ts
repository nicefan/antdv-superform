import { defineComponent, reactive, type PropType } from 'vue'
import { renderUIField } from '../../adapter'
import useVModel from '../../utils/useVModel'
import { resolveFieldProcessors } from '../../processors'
import type { ExtFormItemOption } from '../../exaTypes'

/** 将 Core 处理器产生的标准绑定和属性交给当前 Adapter 组件。 */
export default defineComponent({
  name: 'FieldProcessorRenderer',
  inheritAttrs: false,
  props: {
    // 不能命名为 type，否则 Input 的 attrs.type 会覆盖 Schema 字段类型。
    fieldType: { type: String, required: true },
    processors: { type: Array as PropType<string[]>, required: true },
    option: { type: Object as PropType<ExtFormItemOption>, required: true },
    model: { type: Object as PropType<ModelData>, required: true },
    effectData: { type: Object, required: true },
  },
  setup(props, ctx) {
    const processorState = resolveFieldProcessors(props.processors, {
      option: props.option,
      effectData: props.effectData,
      attrs: ctx.attrs,
      model: props.model,
    })
    const valueProps = useVModel(
      {
        option: props.option,
        model: props.model,
        effectData: props.effectData,
      },
      undefined,
      processorState.modelBehavior
    )

    return () => {
      // 保留 attrs 的最新值，同时让 useVModel 返回的 Ref 在交给 UI 组件前自动解包。
      const processedProps = processorState.transformProps(reactive({ ...ctx.attrs, ...valueProps }))
      return renderUIField(
        props.fieldType,
        processedProps,
        {
          option: props.option,
          effectData: props.effectData,
        },
        ctx.slots
      )
    }
  },
})
