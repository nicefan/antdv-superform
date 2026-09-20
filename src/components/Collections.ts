import { defineComponent, h, inject, type PropType, reactive } from 'vue'
import Controls, { containers, getFormComponent, mapFormComponentModel } from './index'
import { ButtonGroup } from './buttons'
import { useInnerSlots, useVModel } from '../utils'
import { resolveUIField } from '../adapter'
import FieldProcessorRenderer from './processors/FieldProcessorRenderer'
import { useCollectionNodes } from './useCollectionNodes'
import { createCollectionLayout, type CollectionLayoutMode } from './CollectionLayout'

export default defineComponent({
  inheritAttrs: false,
  name: 'Collections',
  props: {
    option: { type: Object, default: () => ({}) },
    model: {
      required: true,
      type: Object as PropType<Partial<ModelData<any>> & { children: ModelsMap }>,
    },
    effectData: Object,
    layout: { type: String as PropType<CollectionLayoutMode>, default: 'grid' },
    layoutAttrs: Object,
    fieldWrapper: { type: String as PropType<'formItem' | 'none'>, default: 'formItem' },
  },
  setup(props, { slots }) {
    const nodes = useCollectionNodes(props, buildInnerNode)
    const layout = createCollectionLayout(nodes, props)
    return () => {
      // 保持现有插槽参数为 VNode 数组，紧凑布局的消费者仍能直接取得字段节点。
      if (slots.default) return slots.default({ nodes: layout.renderNodes().filter(Boolean) })
      return props.option.isContainer && layout.hasWrap
        ? h(
            Controls.Group,
            {
              class: 'sup-form-section',
              option: props.option,
              model: props.model,
              effectData: props.effectData,
            },
            { innerContent: layout.render }
          )
        : layout.render()
    }
  },
})

export function buildInnerNode(
  option,
  model: ModelData,
  effectData: Obj,
  attrs: Obj,
  control?: { attrs: Obj; disabled?: Ref<boolean | undefined> }
) {
  const { type, render } = option
  if (!type) return

  const rootSlots = inject<Obj>('rootSlots', {})
  const slots = useInnerSlots(option.slots, effectData)
  const field = !render ? resolveUIField(type) : undefined
  const processors = field?.processors
  const fieldAttrs = control?.attrs ?? attrs
  const state = reactive({ disabled: control?.disabled })
  // Adapter 声明的字段始终使用其协议；自动导入只提供实际组件，不能绕过字段适配。
  const definition = field ? undefined : getFormComponent(type)
  const renderSlot = render
    ? typeof render === 'function'
      ? render
      : rootSlots[render]
    : definition?.component || Controls[type] || field?.component

  let node
  if (type === 'InfoSlot') {
    node = renderSlot && (() => renderSlot({ props: attrs, ...effectData }))
  } else if (type === 'Text') {
    node = () => h('span', attrs, model.refData)
  } else if (type === 'HTML') {
    node = () => h('span', { ...attrs, innerHTML: model.refData })
  } else if (type === 'Buttons') {
    node = () => h(ButtonGroup, { option, effectData, ...attrs })
  } else if (containers.includes(type) || type === 'InputList') {
    // 容器组件不绑定value
    node = () => h(Controls[type], reactive({ option, model, effectData, ...attrs }), slots)
  } else {
    // 表单输入组件
    if (!renderSlot) {
      console.error(`组件 '${type}' 配置错误，请检查名称或'render'是否正确！`)
    } else if (field && processors?.length) {
      node = () => h(FieldProcessorRenderer, { inputAttrs: fieldAttrs, state, field, option, model, effectData }, slots)
    } else {
      const valueProps = useVModel({ option, model, effectData })
      const allAttrs = { ...attrs, ...valueProps }
      if (type === 'InputSlot') {
        node = () => renderSlot?.(reactive({ props: allAttrs, ...effectData }))
      } else if (field) {
        node = () => {
          const context = { type, option, model, effectData, binding: reactive(valueProps), state }
          const native = reactive(field.getAttrs(fieldAttrs, option, context.state))
          return field.adapted
            ? h(field.component, { ...context, attrs: native }, slots)
            : h(field.component, field.adaptProps(native, context), field.adaptSlots?.(slots, context) ?? slots)
        }
      } else if (definition?.source === 'custom' || definition?.source === 'auto') {
        node = () => h(renderSlot, reactive(mapFormComponentModel(definition, allAttrs)), slots)
      } else {
        node = () => h(renderSlot, reactive({ option, model, effectData, ...allAttrs }), slots)
      }
    }
  }
  return node
}
