import { computed, defineComponent, h, inject, PropType, provide, reactive, toRef, toValue } from 'vue'
import { Col, Row } from 'ant-design-vue'
import Controls from './index'
import { ButtonGroup } from './buttons'
import base from './base'
import { getEffectData, useControl } from '../utils'
import { globalProps } from '../plugin'
import { DataProvider } from '../dataProvider'

const sectionList = ['List', 'Group', 'Tabs', 'Table', 'Collapse', 'Card']

export default defineComponent({
  inheritAttrs: false,
  name: 'Collections',
  props: {
    option: {
      type: Object as PropType<{
        gutter?: number
        rowProps?: Obj
        subSpan?: number
        isContainer?: boolean
        subItems: UniOption[]
      }>,
      default: () => ({}),
    },
    model: {
      required: true,
      type: Object as PropType<Partial<ModelData<any>> & { children: ModelsMap }>,
    },
  },
  setup(props) {
    const rowProps = { gutter: props.option.gutter ?? 16, ...props.option.rowProps }
    const presetSpan = props.option.subSpan ?? inject('subSpan', undefined)
    if ('subSpan' in props.option) provide('subSpan', props.option.subSpan)

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
      const __node = useBuildNode(option, subData, effectData, attrs)
      const node = subData.children ? () => h(DataProvider, { name: 'disabled', data: attrs.disabled }, __node) : __node
      const alignStyle = align && 'text-align: ' + align
      const __isBlock = isBlock ?? (sectionList.includes(type) && !option.span)
      if (__isBlock) {
        currentGroup = undefined
        nodes.push(() => !hidden.value && h('div', { class: 'exa-form-section', style: alignStyle, key: idx }, node()))
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

export function useBuildNode(option, model: ModelData, effectData, attrs) {
  const { type, label, render } = option
  const slots = inject<Obj>('rootSlots', {})
  const getWrapperNode = (node, isBlock) =>
    isBlock ? node : () => h(base.FormItem, reactive({ label, ...globalProps.formItem, ...option.formItemProps }), node)
  const node = (() => {
    const slot = typeof render === 'function' ? render : slots[render]
    switch (type) {
      case 'InfoSlot': {
        const node = () => slot?.({ attrs, ...effectData })
        return getWrapperNode(node, option.isBlock)
      }
      case 'Text':
        return getWrapperNode(() => h('span', attrs, model.refData), option.isBlock)
      case 'Buttons':
        return getWrapperNode(() => h(ButtonGroup, { config: option, param: effectData }), option.isBlock)
      default: {
        let slotAttrs: Obj = reactive({ option, model, effectData })
        if (sectionList.includes(type)) {
          Object.assign(slotAttrs, attrs)
        } else {
          const ignoreRules = inject<Obj>('exaProvider', {}).ignoreRules
          const rules = computed(() => (ignoreRules || attrs.disabled.value ? undefined : model.rules))
          slotAttrs = reactive({
            ...slotAttrs,
            attrs,
            ...globalProps.formItem,
            ...option.formItemProps,
            name: model.propChain,
            label: toValue(label),
            rules,
          })
        }
        return () => h(Controls[type], slotAttrs, slot)
      }
    }
  })()

  return node
}
