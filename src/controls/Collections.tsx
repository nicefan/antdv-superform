import { defineComponent, h, inject, PropType, provide, reactive, toRefs } from 'vue'
import { Col, Row } from 'ant-design-vue'
import useControl from './useControl'
import Controls from './components'
import { ButtonGroup } from './buttons'
import base from './override'

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
    },
    children: {
      required: true,
      type: Object as PropType<ModelsMap<any>>,
    },
  },
  setup({ option = {}, children }) {
    const rowProps = { gutter: option.gutter ?? 16, ...option.rowProps }
    const wrapperCol = option.wrapperCol || inject('wrapperCol', undefined)
    provide('wrapperCol', wrapperCol)

    const nodes: any[] = []
    let currentGroup: any[] | undefined
    ;[...children].forEach(([subOption, subData], idx) => {
      const { type, align, isBlock, columns } = subOption
      if (type === 'Hidden') return
      // const isContainer = !!subData.children || !!columns || type === 'Buttons'
      const { node, hidden } = useBuildNode(subOption, subData)
      if (sectionList.includes(type) || isBlock) {
        currentGroup = undefined
        nodes.push(() => !hidden.value && h('div', { class: 'exa-form-section', key: idx }, node()))
      } else {
        const colProps = { ...wrapperCol, ...subOption.colProps, key: idx }
        if (align) colProps.style = 'text-align: ' + align
        colProps.span = subOption.span ?? colProps.span ?? 8
        if (!currentGroup) {
          nodes.push((currentGroup = []))
        }
        currentGroup.push(() => !hidden.value && h(Col, colProps, { default: node }))
        if (subOption.isWrap) currentGroup = undefined
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

export function useBuildNode(option, model: ModelData) {
  const { type, label } = option
  const { effectData, attrs, rules, hidden } = useControl({ option, model })
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
        const slotAttrs: Obj = reactive({ option, model, effectData })
        if (sectionList.includes(type)) {
          Object.assign(slotAttrs, attrs)
        } else {
          Object.assign(slotAttrs, { attrs, name: model.propChain, label, rules })
        }
        return () => h(Controls[type], slotAttrs)
      }
    }
  })()

  return { node, hidden }
}
