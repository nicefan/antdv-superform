import { computed, defineComponent, h, inject, PropType, provide, reactive, toRef, toRefs } from 'vue'
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
        wrapperCol?: Obj
        isContainer?: boolean
        subItems: UniOption[]
      }>,
      default: () => ({}),
    },
    model: {
      required: true,
      type: Object as PropType<Partial<ModelData<any>> & { children: ModelsMap }>,
    },
    wrapperCol: Object,
    disabled: Object as PropType<Ref<boolean | undefined>>,
  },
  setup(props) {
    const rowProps = { gutter: props.option.gutter ?? 16, ...props.option.rowProps }
    const wrapperCol = props.option.wrapperCol || props.wrapperCol
    // provide('wrapperCol', wrapperCol)
    const effectData = getEffectData({ current: toRef(props.model, 'refData') })

    const nodes: any[] = []
    let currentGroup: any[] | undefined
    ;[...props.model.children].forEach(([option, subData], idx) => {
      const { type, align, isBlock, columns } = option
      if (type === 'Hidden') return
      // const isContainer = !!subData.children || !!columns || type === 'Buttons'
      const { attrs, hidden } = useControl({
        option,
        effectData: effectData,
        inheritDisabled: toRef(props, 'disabled') as Ref<boolean | undefined>,
      })

      const node = useBuildNode(option, subData, effectData, attrs, wrapperCol)
      if (sectionList.includes(type) || isBlock) {
        currentGroup = undefined
        nodes.push(() => !hidden.value && h('div', { class: 'exa-form-section', key: idx }, node()))
      } else {
        const colProps = { ...wrapperCol, ...option.colProps, key: idx }
        if (align) colProps.style = 'text-align: ' + align
        colProps.span = option.span ?? colProps.span ?? 8
        if (!currentGroup) {
          nodes.push((currentGroup = []))
        }
        currentGroup.push(() => !hidden.value && h(Col, colProps, { default: node }))
        if (option.isWrap) currentGroup = undefined
      }
    })

    return () =>
      nodes.map((item) => {
        if (Array.isArray(item)) {
          return h(Row, rowProps, { default: () => item.map((node) => node()) })
        } else {
          return item()
        }
      })
  },
})

export function useBuildNode(option, model: ModelData, effectData, attrs, wrapperCol) {
  const { type, label } = option
  const slots = inject<Obj>('rootSlots', {})
  const node = (() => {
    switch (type) {
      case 'InfoSlot': {
        const slot = slots[option.slotName] || option.render
        const node = () => (typeof slot === 'string' ? slot : slot?.({ effectData, attrs }))
        return option.isBlock ? node : () => h(base.FormItem, reactive({ label }), { default: node })
      }
      case 'Text':
        return () => h(base.FormItem, reactive({ label, ...attrs }), { default: () => model.refData })
      case 'Buttons':
        return () => h(ButtonGroup, { config: option, param: effectData })
      default: {
        let slotAttrs: Obj = { option, model, effectData }
        if (sectionList.includes(type)) {
          Object.assign(slotAttrs, { ...attrs, wrapperCol })
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
