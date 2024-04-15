import { type PropType, defineComponent, h, inject, toRef, unref, toValue, toRefs, reactive } from 'vue'
import { Col, Row, Space } from 'ant-design-vue'
import { getComputedStatus, getEffectData, getViewNode, toNode, useControl, useVModel } from '../../utils'
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
  },
  setup({ option, modelsMap }, ctx) {
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
    // config.mode ??= config.bordered ? 'table' : undefined

    const presetSpan = (provideData.subSpan ??= globalProps.Col?.span ?? 12)

    const nodes = buildNodes(modelsMap, option, config)

    const nodeGroup: any[] = []
    let rowGroup: any[] | undefined
    let section: any[] | undefined
    // let isRoot = !option.type || option.type === 'Discriptions'

    nodes.forEach((item, idx) => {
      // isRoot = isRoot || !item.option.type || item.option.type === 'Discriptions'
      const node = item.node || (() => h(Descriptions, { config: attrs, items: item.group, class: attrs.class }))
      if (nodes.length === 1) {
        nodeGroup.push(['block', node])
        return
      }
      if (item.isBlock) {
        if (item.group || item.option.type === 'InputList') {
          if (!section) {
            section = []
            nodeGroup.push(['section', section])
          }
          section.push(() => !unref(item.hidden) && node())
        } else {
          nodeGroup.push([
            'block',
            () => !unref(item.hidden) && h('div', { class: 'sup-form-section', key: idx }, node()),
          ])
          section = undefined
        }
      } else {
        const colProps: Obj = defaults(
          { span: item.option.span },
          item.option.colProps,
          { span: presetSpan },
          globalProps.Col
        )

        !rowGroup && nodeGroup.push(['row', (rowGroup = [])])
        rowGroup.push(() => !unref(item.hidden) && h(Col, { ...colProps, key: idx }, node))
        section = undefined
      }
    })

    const content = () =>
      h(DataProvider, { name: 'gridConfig', data: provideData }, () =>
        nodeGroup.map(([type, items]) => {
          if (type === 'row') {
            return h(Row, rowProps, () => items.map((node) => node()))
          } else if (type === 'section') {
            return h(
              'div',
              { class: 'sup-form-section' },
              items.map((node) => node())
            )
          } else {
            return items()
          }
        })
      )
    return content
    // if (isRoot) {
    //   return () =>
    //     h(
    //       Controls.Group,
    //       {
    //         class: 'sup-form-section',
    //         option,
    //         model: {},
    //         effectData: getEffectData({}),
    //         isView: true,
    //       },
    //       { innerContent: content }
    //     )
    // } else {
    //   return content
    // }
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
    const slots = {}
    Object.entries(option.slots || {}).forEach(([key, value]) => {
      slots[key] = typeof value === 'string' ? rootSlots[value] : value
    })

    const __label = labelSlot && (() => toNode(labelSlot, effectData))
    let isBlock = option.isBlock
    let wrapNode
    let node
    if (model.children || model.listData) {
      wrapNode = viewRender && (() => toNode(viewRender, effectData))
      const modelsMap = model.children || (model.listData?.modelsMap as ModelsMap)
      if (type === 'InputGroup') {
        if (!viewRender) {
          let isBreak = option.isBreak
          const contents = [...modelsMap].map(([opt, model]) => {
            const labelSlot = opt.labelSlot || opt.label
            const showLabel = attrs?.compact === false && labelSlot
            const content = getContent(opt, model)
            isBreak = opt.isBreak || isBreak
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
  return content === false ? undefined : () => (content ? content() : model.refData)
}

export default DetailLayouts
