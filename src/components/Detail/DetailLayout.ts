import { type PropType, defineComponent, h, inject, provide, ref, toRef, unref } from 'vue'
import { Col, Row } from 'ant-design-vue'
import { getEffectData } from '../../utils'
import Controls, { ButtonGroup, containers } from '../index'
import Descriptions from './Descriptions'
import { globalConfig, globalProps } from '../../plugin'
import TableView from '../Table/TableView.vue'
import { merge } from 'lodash-es'
import { DataProvider } from '../../dataProvider'

const DetailLayouts = defineComponent({
  props: {
    option: Object,
    modelsMap: {
      type: Object as PropType<ModelsMap>,
      required: true,
    },
  },
  setup(props) {
    const { subSpan, gutter, rowProps, type, attrs = {}, descriptionsProps = attrs } = props.option || {}
    const __rowProps = { ...globalProps.Row, gutter, ...rowProps }
    __rowProps.gutter ??= 16
    const formAttrs = inject<any>('exaProvider', {}).attrs

    let gridConfig: Obj = inject('gridConfig', { descriptionsProps: formAttrs })
    const presetSpan = subSpan ?? descriptionsProps.subSpan ?? (gridConfig.subSpan || 12)
    gridConfig = { subSpan: presetSpan, descriptionsProps: { ...gridConfig.descriptionsProps, ...descriptionsProps } }

    const items = buildNodes(props.modelsMap, props.option)

    const nodeGroup: any[] = []
    let current: any[] | undefined
    if (type === 'Card') {
      nodeGroup.push(...items.map((item) => item.node))
    } else {
      items.forEach((item, idx) => {
        if (item.isBlock) {
          nodeGroup.push(() => h('div', { class: 'sup-form-section', key: idx }, item.node()))
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
    }

    return () =>
      h(DataProvider, { name: 'gridConfig', data: gridConfig }, () =>
        nodeGroup.map((item) => {
          if (Array.isArray(item)) {
            return h(Row, __rowProps, () => item.map((node) => node()))
          } else {
            return item()
          }
        })
      )
  },
})

function buildNodes(modelsMap: ModelsMap, preOption) {
  const nodes: any[] = []
  let currentGroup: any[] = []
  ;[...modelsMap].forEach(([option, model], idx) => {
    const { type, label, labelSlot, attrs, span, hideInDescription } = option
    if (type === 'Hidden' || hideInDescription) return
    const effectData = getEffectData({ current: toRef(model, model.refData ? 'refData' : 'parent') })
    let isBlock = option.isBlock
    let wrapNode
    if (model.children || model.listData) {
      isBlock ??= !option.span // 未定义时默认为true
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
        const viewType = ['Tabs', 'Collapse', 'Card', 'Table', 'Group'].includes(type)
          ? type
          : type === 'List'
          ? 'Table'
          : 'Group'
        const Control = viewType === 'Table' ? TableView : Controls[viewType]
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

    if (isBlock || wrapNode || idx === modelsMap.size - 1) {
      if (currentGroup?.length) {
        const props = { option: preOption, items: currentGroup, effectData }
        const preBlock = preOption.isBlock ?? !preOption.span
        nodes.push({ option: preOption, isBlock: preBlock, node: () => h(Descriptions, props) })
        currentGroup = []
      }
      wrapNode && nodes.push({ option, isBlock, node: wrapNode })
    }
  })
  return nodes
}

function getContent(option, model: ModelData) {
  const rootSlots = inject<Obj>('rootSlots', {})
  const value = toRef(model, 'refData')
  const effectData = getEffectData({ current: model.parent, value, text: value })
  const {
    type: colType,
    viewRender,
    render,
    options: colOptions,
    dictName,
    labelField,
    keepField,
    valueToNumber,
    valueToLabel,
  } = option

  if (viewRender || colType === 'InfoSlot') {
    const _render = viewRender || render
    return () => (typeof _render === 'function' ? _render?.(effectData) : rootSlots[_render]?.(effectData))
  } else if (labelField) {
    return () => model.parent[labelField]
  } else if (keepField) {
    return () => `${model.refData ?? ''} - ${model.parent[keepField] ?? ''}`
  } else if (dictName || (colOptions && typeof colOptions[0] !== 'string')) {
    if (valueToLabel) return // 绑定值为Label时直接返回原值
    const options = ref<any[]>()
    if (dictName && globalConfig.dictApi) {
      globalConfig.dictApi(dictName).then((data) => (options.value = data))
    } else if (typeof colOptions === 'function') {
      Promise.resolve(colOptions(effectData)).then((data) => (options.value = data))
    } else {
      options.value = unref(colOptions)
    }
    return () => options.value?.find(({ value }) => (valueToNumber ? Number(value) : value) === model.refData)?.label
  } else if (colType === 'Switch') {
    return () => (option.valueLabels || '否是')[model.refData]
  } else if (colType === 'Buttons') {
    return () => h(ButtonGroup, { config: option, param: effectData })
  } else {
    return () => model.refData
  }
}

export default DetailLayouts
