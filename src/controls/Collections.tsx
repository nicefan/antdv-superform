import { defineComponent, h, PropType, reactive } from 'vue'
import { Col, Row } from 'ant-design-vue'
import useControl from './useControl'
import Controls from './components'

export default defineComponent({
  name: 'Collections',
  props: {
    option: {
      type: Object as PropType<{
        gutter?: number
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
  setup({ option, children }) {
    const { gutter = 16 } = option || {}
    // if (!subItems?.length) return

    const nodes = [...children].map(([subOption, subData]) => {
      const span = subOption.span ?? (subData.children || subOption.columns ? 24 : 8)
      const props = { option: subOption, ...subData }
      const { effectData, attrs, ruleName, hidden } = useControl(props)
      const { type, label } = subOption
      const slot = () => h(Controls[type], reactive({ ...props, attrs, effectData, name: ruleName, label }))
      return () => !hidden.value && <Col span={span} v-slots={{ default: slot }} />
    })
    const slots = {
      default() {
        return nodes.map((node) => node())
      },
    }
    return () => <Row gutter={gutter} v-slots={slots}></Row>
  },
})
