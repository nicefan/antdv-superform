import { type PropType, defineComponent, h, inject, toRef, unref } from 'vue'
import { Col, Row } from 'ant-design-vue'
import { getComputedStatus, getEffectData, getViewNode, useVModel } from '../../utils'
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
    config.mode ??= config.bordered ? 'table' : undefined
    const rowProps = { ...globalProps.Row, gutter: config.gutter, ...config.rowProps }
    rowProps.gutter ??= 16

    const presetSpan = (config.subSpan ??= 12)

    const items = buildNodes(modelsMap, option, config)

    const nodeGroup: any[] = []
    let current: any[] | undefined
    let isRoot

    items.forEach((item, idx) => {
      isRoot = isRoot || !item.option.type || item.option.type === 'Discriptions'
      if (item.isBlock) {
        if (items.length === 1) {
          nodeGroup.push(item.node)
        } else {
          nodeGroup.push(() => !unref(item.hidden) && h('div', { class: 'sup-form-section', key: idx }, item.node()))
        }
        current = undefined
      } else {
        let colProps: Obj = item.option.colProps
        if (!colProps) {
          colProps = { ...globalProps.Col }
          colProps.span = item.option.span ?? presetSpan ?? colProps.span ?? 8
        }
        nodeGroup.push((current = []))
        current.push(() => !unref(item.hidden) && h(Col, { ...colProps, key: idx }, item.node))
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

function buildNodes(modelsMap: ModelsMap, preOption, config) {
  const nodes: any[] = []
  let currentGroup: any[] = []
  const rootSlots = inject<Obj>('rootSlots', {})

  ;[...modelsMap].forEach(([option, model], idx) => {
    const { type, label, labelSlot, attrs, span, hideInDescription } = option
    if (type === 'Hidden' || hideInDescription) return
    const effectData = getEffectData({ current: toRef(model, 'parent'), text: toRef(model, 'refData') })
    const hidden = getComputedStatus(option.hidden, effectData)

    const __label = labelSlot || label
    let isBlock = option.isBlock
    let wrapNode
    let node
    if (model.children || model.listData) {
      const modelsMap = model.children || (model.listData?.modelsMap as ModelsMap)
      if (type === 'InputGroup') {
        const contents = [...modelsMap].map((ent) => getContent(...ent))
        node = {
          option,
          label: __label,
          span,
          hidden,
          content: () => contents.map((node) => node?.()),
        }
      } else {
        isBlock ??= !option.span // 未定义时默认为true
        const viewType = ['Tabs', 'Collapse', 'Card', 'Table', 'Group', 'List', 'InputList'].includes(type)
          ? type
          : 'Group'
        const Control = Controls[viewType]
        wrapNode = () =>
          h(Control, { option, model, effectData, isView: true, ...globalProps[viewType], ...attrs }, rootSlots)
        if (type === 'InputList') {
          if (__label || config.mode !== 'table') {
            isBlock = false
            node = {
              option: { ...option, descriptionsProps: { noInput: true } },
              label: __label,
              span: 24,
              hidden,
              content: wrapNode,
            }
          }
        }
      }
    } else {
      const content = getContent(option, model)

      node = content && {
        option,
        label: __label,
        span,
        hidden,
        content,
      }
    }
    let blockNode
    if (node) {
      if (isBlock) {
        const last = currentGroup.splice(-1)[0]
        const style = option.align && { textAlign: option.align }
        blockNode = { option: preOption, isBlock, node: () => h('div', { style }, last.content()) }
      } else {
        currentGroup.push(node)
      }
    } else if (wrapNode) {
      blockNode = { option, isBlock, node: wrapNode, hidden }
    }
    if (blockNode || idx === modelsMap.size - 1) {
      // 如果当前元素是独立元素或是最后一个，则将之前字段包装
      if (currentGroup?.length) {
        const props = { option: preOption, items: currentGroup, effectData, class: config.class }
        nodes.push({ option: preOption, isBlock: true, node: () => h(Descriptions, props) })
        currentGroup = []
      }
      blockNode && nodes.push(blockNode)
    }
  })
  return nodes
}

function getContent(option, model: ModelData) {
  const rootSlots = inject<Obj>('rootSlots', {})
  const value = toRef(model, 'refData')
  const effectData = getEffectData({ current: toRef(model, 'parent'), value, text: value })

  const content = getViewNode(option, model, rootSlots)
  return content === false ? undefined : () => (!content ? effectData.text : content(effectData))
}

export default DetailLayouts
