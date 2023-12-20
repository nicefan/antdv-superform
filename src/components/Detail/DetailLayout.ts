import { type PropType, defineComponent, h, inject, toRef } from 'vue'
import { Col, Row } from 'ant-design-vue'
import { getEffectData, getViewNode } from '../../utils'
import Controls from '../index'
import Descriptions from './Descriptions'
import { globalProps } from '../../plugin'
import TableView from '../Table/TableView.vue'
import { DataProvider } from '../../dataProvider'

const DetailLayouts = defineComponent({
  inheritAttrs: false,
  props: {
    option: { type: Object, required: true },
    modelsMap: {
      type: Object as PropType<ModelsMap>,
      required: true,
    },
  },
  setup({ option, modelsMap }, ctx) {
    const formAttrs = inject<any>('exaProvider', {}).attrs
    const gridConfig: Obj = inject('gridConfig', formAttrs)

    const config = {
      ...globalProps.Descriptions,
      ...gridConfig,
      subSpan: option.subSpan,
      gutter: option.gutter,
      rowProps: option.rowProps,
      ...ctx.attrs,
      ...option.attrs,
      ...option.descriptionsProps,
    }
    const rowProps = { ...globalProps.Row, gutter: config.gutter, ...config.rowProps }
    rowProps.gutter ??= 16

    const presetSpan = (config.subSpan ??= 12)

    const items = buildNodes(modelsMap, option)

    const nodeGroup: any[] = []
    let current: any[] | undefined
    let isRoot

    items.forEach((item, idx) => {
      isRoot = isRoot || !item.option.type || item.option.type === 'Discriptions'
      if (item.isBlock) {
        if (items.length === 1) {
          nodeGroup.push(item.node)
        } else {
          nodeGroup.push(() => h('div', { class: 'sup-form-section', key: idx }, item.node()))
        }
        current = undefined
      } else {
        let colProps: Obj = item.option.colProps
        if (!colProps) {
          colProps = { ...globalProps.Col }
          colProps.span = item.option.span ?? presetSpan ?? colProps.span ?? 8
        }
        nodeGroup.push((current = []))
        current.push(() => h(Col, { ...colProps, key: idx }, item.node))
      }
    })

    const content = () =>
      h(DataProvider, { name: 'gridConfig', data: config }, () =>
        nodeGroup.map((item, idx) => {
          if (Array.isArray(item)) {
            return h(Row, rowProps, () => item.map((node) => node()))
          } else {
            return item()
          }
        })
      )
    if (isRoot) {
      return () =>
        h(
          Controls.Group,
          {
            class: 'sup-form-section',
            option,
            model: {},
            effectData: getEffectData({}),
            isView: true,
          },
          { innerContent: content }
        )
    } else {
      return content
    }
  },
})

function buildNodes(modelsMap: ModelsMap, preOption) {
  const nodes: any[] = []
  let currentGroup: any[] = []
  const rootSlots = inject<Obj>('rootSlots', {})

  ;[...modelsMap].forEach(([option, model], idx) => {
    const { type, label, labelSlot, attrs, span, hideInDescription } = option
    if (type === 'Hidden' || hideInDescription) return
    const effectData = getEffectData({ current: toRef(model, 'parent'), text: toRef(model, 'refData') })
    let isBlock = option.isBlock
    let wrapNode
    if (model.children || model.listData) {
      const modelsMap = model.children || (model.listData?.modelsMap as ModelsMap)
      if (type === 'InputGroup') {
        const contents = [...modelsMap].map((ent) => getContent(...ent))
        currentGroup.push({
          option,
          label: labelSlot || label,
          span,
          content: () => contents.map((node) => node?.()),
        })
      } else {
        isBlock ??= !option.span // 未定义时默认为true
        const viewType = ['Tabs', 'Collapse', 'Card', 'Table', 'Group', 'List'].includes(type)
          ? type
          : 'Group'
        const Control = Controls[viewType]
        wrapNode = () => h(Control, { option, model, effectData, isView: true, ...globalProps[viewType], ...attrs })
      }
    } else {
      currentGroup.push({
        option,
        label: labelSlot || label,
        span,
        content: getContent(option, model),
      })
    }
    if (option.isBreak || isBlock || wrapNode || idx === modelsMap.size - 1) {
      // 如果当前元素是独立元素或是最后一个，则将之前字段包装
      let blockNode
      if (isBlock && !wrapNode) {
        const last = currentGroup.splice(-1)[0]
        const style = option.align && { textAlign: option.align }
        blockNode = () => h('div', { style }, last.content())
      }
      if (currentGroup?.length) {
        const props = { option: preOption, items: currentGroup, effectData }
        nodes.push({ option: preOption, isBlock: true, node: () => h(Descriptions, props) })
        currentGroup = []
      }
      blockNode && nodes.push({ option: preOption, isBlock, node: blockNode })
    }
    if (wrapNode) {
      nodes.push({ option, isBlock, node: wrapNode })
    }
  })
  return nodes
}

function getContent(option, model: ModelData) {
  const rootSlots = inject<Obj>('rootSlots', {})
  const value = toRef(model, 'refData')
  const effectData = getEffectData({ current: toRef(model, 'parent'), value, text: value })
  const content = getViewNode(option)
  return () =>
    !content ? effectData.text : typeof content === 'string' ? rootSlots[content]?.(effectData) : content(effectData)
}

export default DetailLayouts
