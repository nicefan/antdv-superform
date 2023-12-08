import { computed, defineComponent, h, inject, type PropType, provide, reactive, toRef, toRefs, mergeProps } from 'vue'
import { Col, Row } from 'ant-design-vue'
import { defaults } from 'lodash-es'
import Controls, { containers } from './index'
import { ButtonGroup } from './buttons'
import base from './base'
import { getEffectData, toNode, useControl, useVModel } from '../utils'
import { globalProps } from '../plugin'
import { DataProvider } from '../dataProvider'

export default defineComponent({
  inheritAttrs: false,
  name: 'Collections',
  props: {
    option: {
      type: Object,
      default: () => ({}),
    },
    model: {
      required: true,
      type: Object as PropType<Partial<ModelData<any>> & { children: ModelsMap }>,
    },
    disabled: [Boolean, Object],
  },
  setup(props, ctx) {
    const { type: parentType, attrs: parentAttrs, gutter = 16, subSpan } = props.option
    const rowProps = { gutter, ...props.option.rowProps, ...ctx.attrs }
    const inheritOptions = inject<Obj>('inheritOptions', {})
    const presetSpan = subSpan ?? inheritOptions.subSpan

    const nodes: any[] = []
    let currentGroup: any[] | undefined
    ;[...props.model.children].forEach(([option, subData], idx) => {
      const { type, label, align, isBlock, span, hideInForm, labelSlot } = option
      if (type === 'Hidden' || hideInForm) return

      const colProps: Obj = { ...option.colProps, span }

      if (span === 'auto' || (presetSpan === 0 && span === undefined)) {
        colProps.span = undefined
        if (span === 'auto') colProps.flex = 'auto'
      } else {
        defaults(colProps, { span: presetSpan }, globalProps.Col, { span: 8 })
      }
      const effectData = getEffectData({ current: toRef(subData, 'parent'), value: toRef(subData, 'refData') })
      const { attrs, hidden } = useControl({
        option,
        effectData,
        inheritDisabled: inheritOptions.disabled,
      })

      const __node = buildInnerNode(option, subData, effectData, attrs)

      if (parentType === 'InputGroup' && parentAttrs?.compact !== false) {
        const width = (100 / (24 / colProps.span)).toFixed(2) + '%'
        nodes.push(() => h(__node, { style: `width:${width};` }))
        return
      }
      let node = __node
      // 容器组件转递继承属性
      if (containers.includes(type) || type === 'InputGroup') {
        const inheritOptions: Obj = {
          disabled: attrs.disabled,
          subSpan: option.subSpan ?? presetSpan,
        }
        node = () => h(DataProvider, { name: 'inheritOptions', data: inheritOptions }, __node)
      } else if (!(isBlock && !option.field)) {
        // 生成FormItem
        const rules = computed(() => (attrs.disabled.value ? undefined : subData.rules))
        const formItemAttrs = mergeProps(globalProps.FormItem, option.formItemProps)
        const _label = labelSlot || label
        const _slots: Obj = { default: node }
        _label !== undefined && (_slots.label = () => labelSlot?.({ ...effectData, label }) || label)
        node = () =>
          h(base.FormItem, { ...formItemAttrs, name: subData.propChain, rules: rules.value, colon: !!_label }, _slots)
      }

      // 容器组件独行显示
      const __isBlock = isBlock ?? (containers.includes(type) && !option.span)
      const alignStyle = align && `text-align: ${align}`
      if (__isBlock) {
        currentGroup = undefined
        nodes.push(
          () =>
            !hidden.value && h('div', { class: 'sup-form-section', style: alignStyle, key: idx, ...ctx.attrs }, node())
        )
      } else {
        if (!currentGroup) {
          nodes.push((currentGroup = []))
        }
        currentGroup.push(() => !hidden.value && h(Col, mergeProps({ style: alignStyle, key: idx }, colProps), node))

        if (option.isWrap) currentGroup = undefined
      }
    })

    return () =>
      nodes.map((item) => {
        if (Array.isArray(item)) {
          return h(Row, rowProps, () => item.map((node) => node()))
        } else {
          return item()
        }
      })
  },
})

export function buildInnerNode(option, model: ModelData, effectData: Obj, attrs: Obj) {
  const { type, render } = option
  const slots = inject<Obj>('rootSlots', {})

  const renderSlot = render ? (typeof render === 'function' ? render : slots[render]) : Controls[type]
  let node
  if (type === 'Text' || type === 'InfoSlot') {
    node = renderSlot ? () => renderSlot({ attrs, ...effectData }) : () => h('span', attrs, model.refData)
  } else if (type === 'Buttons') {
    node = () => h(ButtonGroup, { config: option, param: effectData })
  } else if (containers.includes(type)) {
    // 容器组件不绑定value
    const viewProps = type === 'Descriptions' && { isView: true, class: 'sup-detail' }
    node = () => h(Controls[type], reactive({ option, model, effectData, ...attrs, ...viewProps }), slots)
  } else {
    // 表单输入组件
    const valueProps = useVModel({ option, model, effectData })
    const allAttrs = { ...attrs, ...valueProps }
    if (type === 'InputSlot' || type.startsWith('Ext')) {
      if (!renderSlot) {
        console.error(`组件 '${type}' 配置错误，请检查名称或'render'是否正确！`)
      }
      node = () => renderSlot?.(reactive({ attrs: allAttrs, ...toRefs(effectData) }))
    } else {
      node = () => h(Controls[type], reactive({ option, model, effectData, ...allAttrs }), slots)
    }
  }
  return node
}
