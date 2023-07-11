import { defineComponent, h, PropType, reactive } from 'vue'
import { Col, Row } from 'ant-design-vue'
import useControl from './useControl'
import Controls from './components'
import { RowProps } from 'ant-design-vue/es'

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
  setup({ option = {}, children }) {
    const rowProps = { gutter: option.gutter ?? 16, ...option.rowProps }

    const nodes = [...children].map(([subOption, subData]) => {
      const { type, label } = subOption
      const props = { option: subOption, ...subData }
      const { effectData, attrs, ruleName, hidden } = useControl(props)
      const isContainer = !!subData.children || !!subOption.columns
      const colProps = { ...(subOption.colProps || option.wrapperCol) }
      colProps.span = subOption.span ?? colProps.span ?? (isContainer ? 24 : 8)
      const slotAttrs = reactive({ ...props, attrs, effectData, name: ruleName, label })
      let slot = () => h(Controls[type], slotAttrs)
      if (sectionList.includes(type) && option.sectionClass) {
        slot = () => h('div', { class: option.sectionClass }, [h(Controls[type], slotAttrs)])
      }
      return () => !hidden.value && <Col {...colProps} v-slots={{ default: slot }} />
    })
    const slots = {
      default() {
        return nodes.map((node) => node())
      },
    }
    return () => <Row {...rowProps} v-slots={slots}></Row>
  },
})
