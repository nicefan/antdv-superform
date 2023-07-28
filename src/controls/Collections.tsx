import { defineComponent, h, inject, PropType, provide, reactive } from 'vue'
import { Col, Row } from 'ant-design-vue'
import useControl from './useControl'
import Controls from './components'
import { RowProps } from 'ant-design-vue/es'
import { ButtonGroup } from './buttons'

const sectionList = ['List', 'Group', 'Tabs', 'Table', 'Collapse', 'Card']

export default defineComponent({
  name: 'Collections',
  props: {
    option: {
      type: Object as PropType<{
        gutter?: number
        rowProps?: RowProps
        wrapperCol?: Obj
        isContainer?: boolean
        subItems: UniOption[]
      }>,
    },
    model: {
      type: Object as PropType<ParentModel>,
    },
    children: {
      required: true,
      type: Object as PropType<ModelsMap<any>>,
    },
  },
  setup({ option = {}, children }, ctx) {
    const rowProps = { gutter: option.gutter ?? 16, ...option.rowProps }
    const wrapperCol = option.wrapperCol || inject('wrapperCol')
    provide('wrapperCol', wrapperCol)
    const nodes = [...children].map(([subOption, subData], idx) => {
      const { node, hidden } = useBuildNode(subOption, subData)

      const { type, align } = subOption
      const colProps = { ...wrapperCol, ...subOption.colProps }
      let span = subOption.colProps?.span ?? subOption.span
      if (align) colProps.style = 'text-align: ' + align

      let slot = node
      if (sectionList.includes(type) || subOption.isBlock) {
        span ??= 24
        const end = idx + 1 === children.size
        slot = () => h('div', { class: ['exa-form-section', end && 'section-last'] }, node())
      }
      const isContainer = !!subData.children || !!subOption.columns || type === 'Buttons'
      span ??= colProps.span ?? (isContainer ? 24 : 8)
      return () => !hidden.value && <Col {...colProps} span={span} v-slots={{ default: slot }} />
    })

    const slots = {
      default() {
        return [...nodes.map((node) => node()), ctx.slots?.default?.()]
      },
    }
    return () => <Row {...rowProps} class={option.isContainer && 'exa-container'} v-slots={slots}></Row>
  },
})

export function useBuildNode(option, model) {
  const { type, label } = option
  const props = { option: option, ...model }
  const { effectData, attrs, ruleName, hidden } = useControl(props)
  const slotAttrs = reactive({ ...props, effectData, name: ruleName, label })
  if (sectionList.includes(type)) {
    Object.assign(slotAttrs, attrs)
  } else {
    slotAttrs.attrs = attrs
  }

  let node = () => h(Controls[type], slotAttrs)
  if (type === 'Buttons') node = () => h(ButtonGroup, { config: option, param: effectData })
  return { node, hidden }
}
