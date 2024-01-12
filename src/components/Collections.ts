import { computed, defineComponent, h, inject, type PropType, provide, reactive, toRef, toRefs, mergeProps } from 'vue'
import { Col, Row } from 'ant-design-vue'
import { defaults } from 'lodash-es'
import Controls, { containers, formItemTypes } from './index'
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
    effectData: Object,
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
      const { parent, refData } = toRefs(subData)
      const effectData = getEffectData({
        ...props.effectData,
        current: parent.value === refData.value ? toRef(props.model, 'parent') : parent,
        value: refData,
      })
      const { attrs, hidden } = useControl({
        option,
        effectData,
        inheritDisabled: inheritOptions.disabled,
      })

      const innerNode = buildInnerNode(option, subData, effectData, attrs)
      if (!innerNode) return

      if (parentType === 'InputGroup' && parentAttrs?.compact !== false) {
        const width = (100 / (24 / colProps.span)).toFixed(2) + '%'
        nodes.push(() => h(innerNode, { style: `width:${width};` }))
        return
      }

      let node = innerNode
      // 容器组件转递继承属性
      const independent = [...containers, 'InputList', 'InputGroup'].includes(type)
      if (independent) {
        const inheritOptions: Obj = {
          disabled: attrs.disabled,
          subSpan: option.subSpan ?? presetSpan,
        }
        node = () => h(DataProvider, { name: 'inheritOptions', data: inheritOptions }, innerNode)
      }
      const isListFormItem = type === 'InputList' && (labelSlot || label)
      if (isListFormItem || (!independent && (option.field || !isBlock))) {
        // 非容器组件带field,或者非block的元素，生成FormItem，如infoSlot, button独立一行显示
        const rules = computed(() => (attrs.disabled.value ? undefined : subData.rules))
        const formItemAttrs = mergeProps(globalProps.FormItem, option.formItemProps)
        const _label = labelSlot || label
        const _slots: Obj = { default: innerNode }
        _label !== undefined && (_slots.label = () => toNode(_label, effectData))
        node = () =>
          h(base.FormItem, reactive({ ...formItemAttrs, name: subData.propChain, rules, colon: !!_label, }), _slots)
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
        if (type === 'InputList') {
          currentGroup = undefined
          colProps.span = option.span
          colProps.flex = 'auto'
        }
        if (!currentGroup) {
          nodes.push((currentGroup = []))
        }
        currentGroup.push(() => !hidden.value && h(Col, mergeProps({ style: alignStyle, key: idx }, colProps), node))
        if (option.isWrap || type === 'InputList') currentGroup = undefined
      }
    })

    let hasWrap = false
    const content = () =>
      nodes.map((item, idx) => {
        if (Array.isArray(item)) {
          hasWrap = true
          return h(Row, rowProps, () => item.map((node) => node()))
        } else {
          return item()
        }
      })

    // 根容器下如有表单组件，则使用group包裹
    return () =>
      props.option.isContainer && hasWrap
        ? h(Controls.Group, { class: 'sup-form-section', ...ctx.attrs, ...props }, { innerContent: content })
        : content()
  },
})

export function buildInnerNode(option, model: ModelData, effectData: Obj, attrs: Obj) {
  const { type, render } = option
  const rootSlots = inject<Obj>('rootSlots', {})
  const { default: _, ...slots } = rootSlots
  if (option.slots) {
    Object.entries(option.slots).forEach(([key, value]) => {
      slots[key] = typeof value === 'string' ? rootSlots[value] : value
    })
  }

  const renderSlot = render ? (typeof render === 'function' ? render : slots[render]) : Controls[type]
  let node
  if (type === 'Text' || type === 'InfoSlot') {
    node = renderSlot ? () => renderSlot({ props: attrs, ...effectData }) : () => h('span', attrs, model.refData)
  } else if (type === 'Buttons') {
    node = () => h(ButtonGroup, { config: option, param: effectData })
  } else if (containers.includes(type) || type === 'InputList') {
    // 容器组件不绑定value
    const viewProps = type === 'Descriptions' && { isView: true, class: 'sup-detail' }
    node = () => h(Controls[type], reactive({ option, model, effectData, ...attrs, ...viewProps }), slots)
  } else {
    // 表单输入组件
    const valueProps = useVModel({ option, model, effectData })
    const allAttrs = { ...attrs, ...valueProps }
    if (!renderSlot) {
      console.error(`组件 '${type}' 配置错误，请检查名称或'render'是否正确！`)
    } else if (type === 'InputSlot') {
      node = () => renderSlot?.(reactive({ props: allAttrs, ...effectData }))
    } else if (type.startsWith('Ext')) {
      node = () => h(renderSlot, reactive({ option, effectData, ...allAttrs }), slots)
    } else {
      node = () => h(renderSlot, reactive({ option, model, effectData, ...allAttrs }), slots)
    }
  }
  return node
}
