import { computed, defineComponent, h, inject, type PropType, provide, reactive, toRef, toRefs, mergeProps } from 'vue'
import { Col, Row } from 'ant-design-vue'
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
    const { type: ParentType, attrs: parentAttrs, gutter = 16, subSpan } = props.option
    const rowProps = { gutter, ...props.option.rowProps, ...ctx.attrs }
    const presetSpan = subSpan ?? inject('subSpan', undefined)
    if ('subSpan' in props.option) provide('subSpan', subSpan)

    const nodes: any[] = []
    let currentGroup: any[] | undefined
    ;[...props.model.children].forEach(([option, subData], idx) => {
      const { type, align, isBlock, columns, hideInForm } = option
      if (type === 'Hidden' || hideInForm) return
      const effectData = getEffectData({ current: toRef(props.model, 'refData'), value: toRef(subData, 'refData') })
      // const isContainer = !!subData.children || !!columns || type === 'Buttons'
      const { attrs, hidden } = useControl({
        option,
        effectData,
        inheritDisabled: inject('disabled', undefined),
      })
      if (ParentType === 'InputGroup' && parentAttrs?.compact !== false) {
        const span = option.span ?? presetSpan ?? option.colProps.span ?? 8
        const width = (100 / (24 / span)).toFixed(2) + '%'
        const __attrs = mergeProps(attrs, { style: `width:${width};` })
        nodes.push(buildInnerNode(option, subData, effectData, __attrs))
        return
      }
      const __node = useBuildNode(option, subData, effectData, attrs)
      const node = subData.children ? () => h(DataProvider, { name: 'disabled', data: attrs.disabled }, __node) : __node
      const alignStyle = align && 'text-align: ' + align
      const __isBlock = isBlock ?? (containers.includes(type) && type !== 'InputGroup' && !option.span)
      if (__isBlock) {
        currentGroup = undefined
        nodes.push(
          () =>
            !hidden.value && h('div', { class: 'sup-form-section', style: alignStyle, key: idx, ...ctx.attrs }, node())
        )
      } else {
        let colProps: Obj = option.colProps
        if (!colProps) {
          colProps = { ...globalProps.Col }
          colProps.span = option.span ?? presetSpan ?? colProps.span ?? 8
        }
        if (align) colProps.style = alignStyle

        if (!currentGroup) {
          nodes.push((currentGroup = []))
        }
        currentGroup.push(() => !hidden.value && h(Col, { ...colProps, key: idx }, node))
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
  return useBuildNode(option, model, effectData, attrs, true)
}

export function useBuildNode(option, model: ModelData, effectData: Obj, attrs: Obj, isInner?: boolean) {
  const { type, label, render, labelSlot } = option
  const slots = inject<Obj>('rootSlots', {})

  const renderSlot = render ? (typeof render === 'function' ? render : slots[render]) : Controls[type]
  let node
  if (type === 'Text' || type === 'InfoSlot') {
    node = renderSlot ? () => renderSlot({ attrs, ...effectData }) : () => h('span', attrs, model.refData)
    if (option.isBlock) {
      return node
    }
  } else if (type === 'Buttons') {
    node = () => h(ButtonGroup, { config: option, param: effectData })
    if (option.isBlock) {
      return node
    }
  } else if (containers.includes(type)) {
    // 容器组件不绑定value
    node = () => h(Controls[type], reactive({ option, model, effectData, ...attrs }), slots)
  } else {
    // 表单输入组件
    const valueProps = useVModel({ option, model, effectData })
    const allAttrs = { ...attrs, ...toRefs(valueProps) }
    if (type === 'InputSlot' || type.startsWith('Ext')) {
      if (!renderSlot) {
        console.error(`组件 '${type}' 配置错误，请检查名称或'render'是否正确！`)
      }
      node = () => renderSlot?.(reactive({ attrs: allAttrs, ...toRefs(effectData) }))
    } else {
      node = () => h(Controls[type], reactive({ option, model, effectData, ...allAttrs }), slots)
    }
  }

  // 容器组件及指定参数，不套FormItem
  if (isInner || containers.includes(type)) {
    return node
  }

  // 生成FormItem
  const rules = computed(() => (attrs.disabled.value ? undefined : model.rules))
  const formItemAttrs = mergeProps(globalProps.FormItem, option.formItemProps)
  return () =>
    h(
      base.FormItem,
      { ...formItemAttrs, name: model.propChain, rules: rules.value },
      {
        label: label && (() => labelSlot?.({ ...effectData, label }) || label),
        default: node,
      }
    )
}
