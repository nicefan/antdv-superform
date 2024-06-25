import { type PropType, defineComponent, h, inject, toRef, unref, toValue, toRefs, reactive } from 'vue'
import { Col, Row, Space } from 'ant-design-vue'
import { getEffectData, getViewNode, toNode, useControl, useInnerSlots} from '../../utils'
import Controls, { containers } from '../index'
import Descriptions from './Descriptions'
import { globalProps } from '../../plugin'
import { DataProvider } from '../../dataProvider'
import { defaults } from 'lodash-es'

const DetailLayouts = defineComponent({
  inheritAttrs: false,
  props: {
    option: { type: Object, required: true },
    modelsMap: {
      type: Object as PropType<ModelsMap>,
      required: true,
    },
    isRoot: Boolean,
  },
  setup({ option, modelsMap, isRoot }, ctx) {
    const formAttrs = inject<any>('exaProvider', {}).attrs
    const gridConfig: Obj = inject('gridConfig', formAttrs)

    const config = {
      ...globalProps.Descriptions,
      ...gridConfig,
    }
    const rowProps = defaults({ gutter: option.gutter }, option.rowProps || config.rowProps, globalProps.row, {
      gutter: 16,
    })

    const attrs = { subSpan: option.subSpan, ...option.descriptionsProps, ...ctx.attrs }

    /** 向下继承信息 */
    const provideData = {
      ...config,
      subSpan: option.subSpan ?? config.subSpan,
      rowProps,
      ...attrs,
    }

    const presetSpan = (provideData.subSpan ??= globalProps.Col?.span ?? 12)

    const nodes = buildNodes(modelsMap, option, config)

    const nodeGroup: any[] = []
    let rowGroup: any[] | undefined
    let section: any[] | undefined

    nodes.forEach((item, idx) => {
      item.node ??= () => h(Descriptions, { config: attrs, items: item.group, class: attrs.class })
      // if (nodes.length === 1) {
      //   nodeGroup.push(['block', item])
      //   return
      // }
      if (item.isBlock) {
        if (item.group || item.option.type === 'InputList') {
          if (!section) {
            section = []
            nodeGroup.push(['section', section])
          }
          section.push(item)
        } else {
          nodeGroup.push(['block', item])
          section = undefined
        }
        rowGroup = undefined
      } else {
        !rowGroup && nodeGroup.push(['row', (rowGroup = [])])
        rowGroup.push(item)
        section = undefined
      }
    })

    const content = () =>
      h(DataProvider, { name: 'gridConfig', data: provideData }, () =>
        nodeGroup.map(([type, items], idx) => {
          let slot = items.node
          if (type === 'row') {
            slot = () =>
              h(Row, rowProps, () =>
                items.map((item, idx) => {
                  const colProps = item.option.colProps || { span: item.option.span ?? presetSpan }
                  return !unref(item.hidden) && h(Col, { ...globalProps.Col, ...colProps, key: idx }, item.node)
                })
              )
          } else if (type === 'section') {
            slot = () => items.map((item) => !unref(item.hidden) && item.node())
          }
          return (
            !unref(items.hidden) &&
            (nodeGroup.length > 1 ? h('div', { class: 'sup-form-section', key: idx }, slot()) : slot())
          )
        })
      )

    if (isRoot && nodeGroup.length === 1) {
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
  let currentGroup: any[] | undefined
  const rootSlots = inject<Obj>('rootSlots', {})

  ;[...modelsMap].forEach(([option, model], idx) => {
    const { type, label, field, labelSlot = label, hideInDescription, viewRender } = option
    if (type === 'Hidden' || hideInDescription) return
    const effectData = getEffectData({
      current: toRef(model, 'parent'),
      index: idx,
      field,
      value: toRef(model, 'refData'),
      text: toRef(model, 'refData'),
    })
    const { attrs, hidden } = useControl({ option, effectData })
    const slots = useInnerSlots(option.slots)

    const __label = labelSlot && (() => toNode(labelSlot, effectData))
    let isBlock = option.blocked
    let wrapNode
    let node
    if (model.children || model.listData) {
      const __viewRender = typeof viewRender === 'string' ? rootSlots[viewRender as string] : viewRender
      wrapNode = __viewRender && (() => toNode(__viewRender, effectData))
      const modelsMap = model.children || (model.listData?.modelsMap as ModelsMap)
      if (type === 'InputGroup') {
        if (!viewRender) {
          let isBreak = option.wrapping
          const contents = [...modelsMap].map(([opt, model]) => {
            const labelSlot = opt.labelSlot || opt.label
            const showLabel = attrs?.compact === false && labelSlot
            const content = getContent(opt, model)
            isBreak = opt.wrapping || isBreak
            return () => h('span', [showLabel && toNode(labelSlot, effectData), showLabel && ': ', content?.()])
          })
          wrapNode = () =>
            h(Space, { direction: isBreak ? 'vertical' : 'horizontal' }, () => contents.map((node) => node()))
        }
        node = {
          option,
          label: __label,
          hidden,
          content: wrapNode,
        }
      } else {
        isBlock ??= !option.span // 未定义时默认为true
        const viewType = [...containers, 'InputList'].includes(type) ? type : 'Group'
        const Control = Controls[viewType]
        const defRender = () =>
          h(Control, reactive({ option, model, effectData, isView: true, ...globalProps[viewType], ...attrs }), slots)
        wrapNode ??= defRender
        if (type === 'InputList') {
          if (!isBlock || (labelSlot && !attrs?.labelIndex)) {
            node = {
              option: { ...option },
              label: __label,
              hidden,
              content: wrapNode,
            }
          } else {
            wrapNode = defRender
          }
        }
      }
    } else {
      const content = getContent(option, model)
      node = content && {
        option,
        label: __label,
        hidden,
        content,
      }
    }
    let blockNode
    if (node) {
      if (isBlock) {
        if (option.label) {
          blockNode = { option: preOption, isBlock, group: [node] }
        } else {
          const style = option.align && { textAlign: option.align }
          blockNode = { option: preOption, isBlock, node: () => h(node.content, { style }) }
        }
      } else {
        if (!currentGroup) {
          currentGroup = []
          nodes.push({ option: preOption, isBlock: true, group: currentGroup })
        }
        currentGroup.push(node)
      }
    } else if (wrapNode) {
      blockNode = { option, isBlock, node: wrapNode, hidden }
    }
    if (blockNode) {
      currentGroup = undefined
      nodes.push(blockNode)
    }
  })
  return nodes
}

function getContent(option, model: ModelData) {
  const { parent, refData } = toRefs(model)

  const value = model.refName ? refData : undefined
  const effectData = getEffectData({ current: parent, text: value, value, field: model.refName })

  const content = getViewNode(option, effectData)
  return content === false ? undefined : () => (content ? content() : String(model.refData ?? ''))
}

export default DetailLayouts
