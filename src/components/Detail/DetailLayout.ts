import { type PropType, defineComponent, h, inject, unref, toRefs, reactive, toRaw, mergeProps } from 'vue'
import { getEffectData, getViewNode, toNode, useControl, useInnerSlots } from '../../utils'
import Controls, { containers } from '../index'
import { globalProps } from '../../plugin'
import { DataProvider } from '../../dataProvider'
import { defaults } from 'lodash-es'
import { createLabelNode } from '../../utils/labelNode'
import { getUIRender, type UIDescriptionItem, type UIDescriptionsProps } from '../../adapter'

const DetailLayouts = defineComponent({
  inheritAttrs: false,
  props: {
    option: { type: Object, required: true },
    modelsMap: {
      type: Object as PropType<ModelsMap>,
      required: true,
    },
    isRoot: Boolean,
    effectData: Object,
  },
  setup({ option, modelsMap, isRoot, effectData }, ctx) {
    const formAttrs = inject<any>('exaProvider', {}).attrs
    const gridConfig: Obj = inject('gridConfig', formAttrs)

    const config = {
      ...globalProps.Descriptions,
      ...gridConfig,
    }
    const rowProps = defaults({ gutter: option.gutter }, option.rowProps || config.rowProps, globalProps.row, {
      gutter: 16,
    })

    const attrs = {
      subSpan: option.subSpan,
      ...option.descriptionsProps,
      ...ctx.attrs,
    }

    /** 向下继承信息 */
    const provideData = defaults(
      {
        subSpan: option.subSpan ?? config.subSpan,
        rowProps,
        ...attrs,
      },
      config
    )

    const presetSpan = (provideData.subSpan ??= globalProps.Col?.span ?? 12)

    const nodes = buildNodes(modelsMap, option, effectData)

    const nodeGroup: any[] = []
    let rowGroup: any[] | undefined
    let section: any[] | undefined

    nodes.forEach((item, idx) => {
      item.node ??= () => getUIRender('descriptions')(buildDescriptionsState(item.group!, provideData))
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
              getUIRender('row')(rowProps, {
                default: () =>
                  items.map((item, idx) => {
                    const colProps = item.option.colProps || {
                      span: item.option.span ?? presetSpan,
                    }
                    return (
                      !unref(item.hidden) &&
                      getUIRender('col')({ ...globalProps.Col, ...colProps, key: idx }, { default: item.node })
                    )
                  }),
              })
          } else if (type === 'section') {
            slot = () => items.map((item) => !unref(item.hidden) && item.node())
          }
          return (
            !unref(items.hidden) &&
            (nodeGroup.length > 1 ? h('div', { class: 'sup-form-section', key: idx }, slot()) : slot())
          )
        })
      )

    if (isRoot) {
      return () =>
        h(
          Controls.Group,
          mergeProps(
            { class: 'sup-form-section' },
            {
              option,
              model: {},
              effectData: getEffectData({}),
              isView: true,
              ...attrs,
            }
          ),
          { innerContent: content }
        )
    } else {
      return content
    }
  },
})

type NodeItem = { option: Obj; hidden: Ref<boolean>; label?: Fn; content: Fn }
type BlockNode = {
  option: Obj
  isBlock?: boolean
  hidden?: Ref<boolean>
  node?: Fn
  group?: NodeItem[]
}

/** Core 统一详情字段过滤、配置继承、分组与逻辑跨度，Adapter 只转换原生结构。 */
function buildDescriptionsState(items: NodeItem[], inherited: Obj): UIDescriptionsProps {
  const {
    subSpan,
    column: configuredColumn,
    layout,
    bordered,
    mode = bordered ? 'table' : 'default',
    rowProps,
    colon,
    size = 'middle',
    tableLayout,
    labelCol: inheritedLabelCol,
    wrapperCol: inheritedWrapperCol,
    ...attrs
  } = inherited
  const column = Math.max(1, Math.floor(Number(configuredColumn) || (Number(subSpan) ? 24 / Number(subSpan) : 2)))
  const rows: UIDescriptionItem[][] = []
  let current: UIDescriptionItem[] = []
  let occupied = 0
  const flushRow = () => {
    if (!current.length) return
    // 补齐当前逻辑行，保证原生自动布局不会把下一组内容回填到上一行。
    if (occupied < column) current[current.length - 1].colspan += column - occupied
    rows.push(current)
    current = []
    occupied = 0
  }

  items.forEach(({ option, label, content, hidden }, key) => {
    if (unref(hidden)) return
    const itemAttrs = { ...attrs, ...option.formItemProps, ...option.descriptionsProps }
    const span = Number(itemAttrs.span ?? option.span)
    let colspan = span ? Math.ceil(span / (24 / column)) : 1
    colspan = Math.max(1, Math.min(column, colspan))
    const labelStyle = {
      ...(itemAttrs.labelAlign && { textAlign: itemAttrs.labelAlign }),
      ...itemAttrs.labelStyle,
    }
    const colProps = { span: itemAttrs.span ?? option.span, ...(itemAttrs.colProps || option.colProps) }
    if (colProps.span === 0 || colProps.flex) colProps.span = undefined
    else if (!Number(colProps.span)) colProps.span = 24 / column
    const item: UIDescriptionItem = {
      key,
      attrs: itemAttrs,
      colProps,
      labelCol: mergeProps(inheritedLabelCol, itemAttrs.labelCol, {
        style: labelStyle,
        class: { 'sup-label-no-colon': itemAttrs.noColon },
      }),
      wrapperCol: mergeProps(
        inheritedWrapperCol,
        { style: layout === 'vertical' && { textAlign: itemAttrs.labelAlign } },
        { style: itemAttrs.contentStyle },
        itemAttrs.wrapperCol
      ),
      label,
      content,
      colspan,
    }
    if (occupied + colspan > column) flushRow()
    current.push(item)
    occupied += colspan
    if (option.breakAfter ?? option.wrapping) {
      flushRow()
    }
  })
  // 最后一项隐藏时也必须提交此前已积累的行。
  flushRow()

  return { attrs, mode, layout, rowProps, colon, size, tableLayout, column, rows }
}

function buildNodes(modelsMap: ModelsMap, preOption, parentEffect) {
  const nodes: BlockNode[] = []
  let currentGroup: NodeItem[] | undefined
  const rootSlots = inject<Obj>('rootSlots', {})

  ;[...modelsMap].forEach(([option, model], idx) => {
    const { type = '', field, hideInDescription, viewRender, exclude } = option
    if (type === 'Hidden' || hideInDescription || exclude?.includes('description')) return
    const { parent, refData } = toRefs(reactive(model))
    const effectData = getEffectData({
      parent: parentEffect,
      current: parent,
      isView: true,
      field: model.refName,
      value: refData,
      text: refData,
      ...('index' in model && {
        index: model.index,
        record: field ? refData : parent,
      }),
    })
    const { attrs, hidden } = useControl({ option, effectData })
    const slots = useInnerSlots(option.slots, effectData)

    const label = createLabelNode(option, effectData)
    let isBlock = option.block ?? option.blocked
    let render
    const nodeItems: NodeItem[] = []
    const __viewRender = typeof viewRender === 'string' ? rootSlots[viewRender as string] : viewRender
    render = __viewRender && (() => toNode(__viewRender, effectData))
    const modelsMap = model.children || (model.listData?.modelsMap as ModelsMap)
    if (type === 'InputGroup') {
      if (!viewRender) {
        let isBreak = option.breakAfter ?? option.wrapping
        const subNodes = buildNodes(modelsMap, option, effectData)
        const contents = subNodes[0].group?.map(({ option: opt, content }) => {
          const labelSlot = opt.labelSlot || opt.label
          const showLabel = attrs?.compact === false && labelSlot
          isBreak = (opt.breakAfter ?? opt.wrapping) || isBreak
          return () => h('span', [showLabel && toNode(labelSlot, effectData), showLabel && ': ', content?.()])
        })
        render = () =>
          getUIRender('space')(
            { direction: isBreak ? 'vertical' : 'horizontal' },
            {
              default: () => contents?.map((node) => node()),
            }
          )
      }
      nodeItems.push({ option, label, hidden, content: render })
    } else if (type === 'Fragment') {
      const subNodes = buildNodes(modelsMap, option, effectData)
      const subItems = subNodes[0].group
      if (subItems) {
        subNodes.shift()
        nodeItems.push(...subItems.map((item) => ({ ...item, hidden })))
      }
      if (subNodes.length) {
        currentGroup = undefined
        nodes.push(...subNodes)
      }
    } else if (model.children || model.listData || containers.includes(type)) {
      isBlock ??= !option.span // 未定义时默认为true
      const viewType = [...containers, 'InputList'].includes(type) ? type : 'Group'
      const Control = Controls[viewType]
      const defRender = () =>
        h(
          Control,
          reactive({
            option,
            model,
            effectData,
            isView: true,
            ...globalProps[viewType],
            ...attrs,
          }),
          slots
        )
      render ??= defRender
      if (type === 'InputList') {
        if (!isBlock || (label && !attrs?.labelIndex)) {
          nodeItems.push({
            option: { ...option },
            label,
            hidden,
            content: render,
          })
        } else {
          render = defRender
        }
      }
    } else {
      const content = getContent(option, model, effectData)
      content && nodeItems.push({ option, label, hidden, content })
    }
    if (!nodeItems.length && !render) return
    if (nodeItems.length && !isBlock) {
      if (!currentGroup) {
        currentGroup = []
        nodes.push({ option: preOption, isBlock: true, group: currentGroup })
      }
      currentGroup.push(...nodeItems) // 加入分组
    } else {
      if (nodeItems.length && label) {
        nodes.push({ option: preOption, isBlock, group: nodeItems }) // 独立分组
      } else {
        const style = option.align && { textAlign: option.align }
        render = nodeItems[0]?.content || render
        nodes.push({
          option,
          isBlock,
          node: () => h(render, { style }),
          hidden,
        }) // 自定义render,直接渲染
      }
      currentGroup = undefined // 隔断分组
    }
  })
  return nodes
}

function getContent(option, model: ModelData, parentEffect) {
  const { parent, refData } = toRefs(reactive(model))
  const value = model.refName ? refData : undefined
  const effectData =
    toRaw(parent.value) === toRaw(parentEffect.current)
      ? parentEffect
      : getEffectData({
          parent: parentEffect,
          current: parent,
          text: value,
          value,
          field: model.refName,
          isView: true,
        })

  const content = getViewNode(option, effectData)
  return content === false ? undefined : () => (content ? content() : String(model.refData ?? ''))
}

export default DetailLayouts
