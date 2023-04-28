import { defineComponent, h, inject, PropType, readonly } from 'vue';
import { buildModel, useShow } from '../utils/util'
import Controls from './index'
import { innerComps } from '../components'

const { Col, Row } = innerComps

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

    const nodes = [...children].map(([col, data]) => {
      const span = col.span ?? (data.children || col.columns ? 24 : 8)
      const subModel = data.model
      // 元素隐藏控制
      const show = useShow(col.hide, { current: subModel.parent })
      const slot = () => h(Controls[col.type], { option: col, ...data })
      return () => show.value && <Col span={span} v-slots={{ default: slot }} />
    })
    const slots = {
      default() {
        return nodes.map((node) => node())
      },
    }
    return () => <Row gutter={gutter} v-slots={slots}></Row>
  },
})
