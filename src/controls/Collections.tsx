import { computed, defineComponent, h, inject, mergeProps, PropType, provide, reactive, toRef, toRefs } from 'vue'
import { Col, Row } from 'ant-design-vue'
import useControl from './useControl'
import Controls from './components'
import { ButtonGroup } from './buttons'
import base from './override'
import { getEffectData } from './hooks/reactivity'
import { globalProps } from '../plugin'

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
    disabled: Object as PropType<Ref<boolean | undefined>>,
  },
  setup(props) {
    const rowProps = { gutter: props.option.gutter ?? 16, ...props.option.rowProps }
    const presetSpan = props.option.subSpan ?? inject('subSpan', undefined)
    if ('subSpan' in props.option) provide('subSpan', props.option.subSpan)

    const nodes: any[] = []
    let currentGroup: any[] | undefined
    ;[...props.model.children].forEach(([option, subData], idx) => {
      const { type, align, isBlock, columns } = option
      if (type === 'Hidden') return
      const effectData = getEffectData({ current: toRef(props.model, 'refData'), value: toRef(subData, 'refData') })
      // const isContainer = !!subData.children || !!columns || type === 'Buttons'
      const { attrs, hidden } = useControl({
        option,
        effectData,
        inheritDisabled: toRef(props, 'disabled') as Ref<boolean | undefined>,
      })
      const _attrs = mergeProps(globalProps[type], attrs)
      const node = useBuildNode(option, subData, effectData, _attrs)

      if (isBlock || (sectionList.includes(type) && isBlock !== false)) {
        currentGroup = undefined
        nodes.push(() => !hidden.value && h('div', { class: 'exa-form-section', key: idx }, node()))
      } else {
        let colProps: Obj = option.colProps
        if (!colProps) {
          colProps = { ...globalProps.Col }
          colProps.span = option.span ?? presetSpan ?? colProps.span ?? 8
        }
        if (align) colProps.style = 'text-align: ' + align

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
  const { type, label } = option
  const slots = inject<Obj>('rootSlots', {})
  const getWrapperNode = (node, isBlock) =>
    isBlock ? node : () => h(base.FormItem, reactive({ label, ...globalProps.formItem, ...option.formItemProps }), node)
  const node = (() => {
    switch (type) {
      case 'InfoSlot': {
        const slot = slots[option.slotName] || option.render
        const node = () => (typeof slot === 'string' ? slot : slot?.({ effectData, attrs }))
        return getWrapperNode(node, option.isBlock)
      }
      case 'Text':
        return getWrapperNode(() => h('span', attrs, model.refData), option.isBlock)
      case 'Buttons':
        return getWrapperNode(() => h(ButtonGroup, { config: option, param: effectData }), option.isBlock)
      default: {
        let slotAttrs: Obj = { option, model, effectData }
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
            label,
            rules,
          })
        }
        return () => h(Controls[type], slotAttrs)
      }
    }
  })()

  return node
}
