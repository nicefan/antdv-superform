import { defineComponent, h, PropType, reactive } from 'vue'
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
        sectionClass?: string
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

    const nodes = [...children].map(([subOption, subData]) => {
      const { type, label } = subOption
      const props = { option: subOption, ...subData }
      const { effectData, attrs, ruleName, hidden } = useControl(props)

      const isContainer = !!subData.children || !!subOption.columns || type === 'Buttons'
      const colProps = { ...option.wrapperCol, ...subOption.colProps }
      if (subOption.align) colProps.style = 'text-align: ' + subOption.align

      const slotAttrs = reactive({ ...props, attrs, effectData, name: ruleName, label })
      let slot = () => h(Controls[type], slotAttrs)
      if (type === 'Buttons') slot = () => h(ButtonGroup, { config: subOption, param: effectData })
      let content = slot
      if (sectionList.includes(type) || subOption.isBlock) {
        colProps.span ??= subOption.span ?? 24
        content = () => h('div', { class: 'exa-form-section' }, slot())
      }
      colProps.span = subOption.span ?? colProps.span ?? (isContainer ? 24 : 8)
      return () => !hidden.value && <Col {...colProps} v-slots={{ default: content }} />
    })
    const slots = {
      default() {
        return [...nodes.map((node) => node()), ctx.slots?.default?.()]
      },
    }
    return () => <Row {...rowProps} v-slots={slots}></Row>
  },
})
