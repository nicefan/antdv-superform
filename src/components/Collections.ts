import { computed, defineComponent, h, inject, type PropType, reactive, toRefs, mergeProps, unref } from 'vue'
import { Col, Row } from 'ant-design-vue'
import { defaults } from 'lodash-es'
import Controls, { containers } from './index'
import { ButtonGroup } from './buttons'
import base from './base'
import { getEffectData, useControl, useInnerSlots, useVModel } from '../utils'
import { globalProps } from '../plugin'
import { DataProvider } from '../dataProvider'
import { formatRule } from '../utils/buildModel'
import { createLabelNode } from '../utils/labelNode'

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
  },
  setup(props, ctx) {
    const { type: parentType, attrs: parentAttrs, gutter = 16, subSpan } = props.option
    const rowProps = { gutter, ...props.option.rowProps, ...ctx.attrs }
    const inheritOptions = inject<Obj>('inheritOptions', {})
    const presetSpan = subSpan ?? inheritOptions.subSpan

    const index = computed(() => props.model.index)
    const nodes: any[] = []
    let currentGroup: any[] | undefined
    ;[...props.model.children].forEach(([option, subData], idx) => {
      const { type, align, blocked, span, hideInForm, exclude } = option
      const { parent, refData } = toRefs(subData)
      const effectData = getEffectData({
        parent: props.effectData,
        current: parent,
        field: subData.refName,
        value: refData,
        ...(index.value !== undefined && {
          index,
          record: !subData.refName ? refData : parent,
        }),
      })
      if (type === 'Hidden' || hideInForm || exclude?.includes('form')) {
        useVModel({ option, model: subData, effectData })
        return
      }
      const { hidden, attrs } = useControl({
        option,
        effectData,
        inheritDisabled: inheritOptions.disabled,
      })

      const innerNode = buildInnerNode(option, subData, effectData, attrs)
      if (!innerNode) return

      const colProps: Obj = { ...option.colProps, span }
      defaults(colProps, { span: presetSpan }, globalProps.Col, { span: 8 })
      if (colProps.span === 0 || colProps.flex) {
        colProps.span = undefined
      }

      if (parentType === 'InputGroup' && parentAttrs?.compact !== false) {
        const width = Number(colProps.span) && (100 / (24 / colProps.span)).toFixed(2) + '%'
        // const _class = colProps.span && 'ant-col-' + colProps.span
        nodes.push(() => !hidden.value && h(innerNode, mergeProps({ style: { width } }, colProps)))
        return
      }

      let node = innerNode
      /** 容器组件 */
      const independent = [...containers, 'InputList', 'InputGroup'].includes(type)
      // const isListFormItem = type === 'InputList' && (labelSlot || label) && !option.attrs?.labelIndex
      if (!independent && (!blocked || (option.field && option.label))) {
        // 非容器组件带field,或者非block的元素，生成FormItem，如infoSlot, button独立一行显示
        const __rules = formatRule(subData.rules, effectData)
        const rules = computed(() => (unref(attrs.disabled) ? undefined : __rules))
        const formItemAttrs = mergeProps(globalProps.FormItem, option.formItemProps)
        const label = createLabelNode(option, effectData)

        node = () =>
          h(base.FormItem, reactive({ ...formItemAttrs, name: subData.propChain, rules, colon: !!label }), {
            default: innerNode,
            label,
          })
      }

      if (independent) {
        // 容器组件转递继承属性
        const inheritOptions: Obj = {
          disabled: attrs.disabled,
          subSpan: option.subSpan ?? presetSpan,
        }
        node = () => h(DataProvider, { name: 'inheritOptions', data: inheritOptions }, innerNode)
      }

      // 容器组件独行显示
      const __isBlock = blocked ?? (containers.includes(type) && !option.span)
      const alignStyle = align && `text-align: ${align}`
      if (__isBlock) {
        currentGroup = undefined
        nodes.push(
          () =>
            !hidden.value &&
            h(
              'div',
              {
                class: ['sup-form-section', type === 'Descriptions' && 'sup-detail'],
                style: alignStyle,
                key: idx,
                ...ctx.attrs,
              },
              node()
            )
        )
      } else {
        if (type === 'InputList') {
          // currentGroup = undefined
          colProps.span = 24
          // colProps.flex = 'auto'
        }
        if (!currentGroup) {
          nodes.push((currentGroup = []))
        }
        currentGroup.push(() => !hidden.value && h(Col, mergeProps({ style: alignStyle, key: idx }, colProps), node))
        if (option.wrapping) currentGroup = undefined
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
  if (!type) return

  const rootSlots = inject<Obj>('rootSlots', {})
  const slots = useInnerSlots(option.slots, effectData)
  const renderSlot = render ? (typeof render === 'function' ? render : rootSlots[render]) : Controls[type]

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
