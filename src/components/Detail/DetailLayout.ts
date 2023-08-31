import { PropType, defineComponent, h, inject, provide, ref, toRef, unref } from 'vue'
import { Col, Row } from 'ant-design-vue'
import { getEffectData } from '../../utils'
import Controls, { ButtonGroup } from '../index'
import Descriptions from './Descriptions'
import { globalProps } from '../../plugin'

export default defineComponent({
  props: {
    option: Object,
    modelsMap: {
      type: Object as PropType<ModelsMap>,
      required: true,
    },
  },
  setup(props) {
    const { subSpan, gutter, rowProps } = props.option || {}
    const __rowProps = { ...globalProps.Row, gutter, ...rowProps }
    __rowProps.gutter ??= 16
    const presetSpan = subSpan ?? inject('subSpan', 12)
    provide('subSpan', presetSpan)

    const items = buildNodes(props.modelsMap, props.option)

    const nodeGroup: any[] = []
    let current: any[] | undefined
    items.forEach((item, idx) => {
      if (item.isBlock) {
        nodeGroup.push(() => h('div', { class: 'exa-form-section', key: idx }, item.node()))
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

    return () =>
      nodeGroup.map((item) => {
        if (Array.isArray(item)) {
          return h(Row, rowProps, () => item.map((node) => node()))
        } else {
          return item()
        }
      })
  },
})

function buildNodes(modelsMap: ModelsMap, preOption) {
  const nodes: any[] = []
  let currentGroup: any[] = []

  ;[...modelsMap].forEach(([option, model], idx) => {
    const { type, label, span = 0, hideInDescription } = option
    if (type === 'Hidden' || hideInDescription) return
    let isBlock = option.isBlock
    let node
    if (model.children || model.listData) {
      isBlock ??= !option.span // 未定义时默认为true
      const modelsMap = model.children || (model.listData?.modelsMap as ModelsMap)
      if (['Table', 'Tabs', 'Collapse', 'List'].includes(type)) {
        const effectData = getEffectData({ current: toRef(model, 'refData') })
        const component = Controls[type === 'List' ? 'Table' : type]
        node = () => h(component, { option, model, effectData, isView: true })
      } else if (type === 'InputGroup') {
        const contents = [...modelsMap].map((ent) => getContent(...ent))
        currentGroup.push({
          label,
          span,
          content: () => contents.map((node) => node()),
        })
      } else {
        nodes.push(...buildNodes(modelsMap, option))
      }
    } else {
      currentGroup.push({
        label,
        span,
        content: getContent(option, model),
      })
    }

    if (isBlock || node || idx === modelsMap.size - 1) {
      if (currentGroup?.length) {
        const props = { option: preOption, items: currentGroup }
        const preBlock = preOption.isBlock ?? !preOption.span
        nodes.push({ option: preOption, isBlock: preBlock, node: () => h(Descriptions, props) })
        currentGroup = []
      }
      node && nodes.push({ option, isBlock, node })
    }
  })
  return nodes
}

function getContent(option, model: ModelData) {
  const rootSlots = inject<Obj>('rootSlots', {})
  const effectData = getEffectData({ current: model.parent, text: model.refData })
  const { type: colType, viewRender, render, options: colOptions, labelField, keepField } = option
  if (viewRender || colType === 'InfoSlot') {
    const _render = viewRender || render
    return () => (typeof _render === 'string' ? rootSlots[_render]?.(effectData) : _render?.(effectData))
  } else if (labelField) {
    return () => model.parent[labelField]
  } else if (keepField) {
    return () => `${model.refData ?? ''} - ${model.parent[keepField] ?? ''}`
  } else if (colOptions && typeof colOptions?.[0] !== 'string') {
    const options = ref<any[]>()
    if (typeof colOptions === 'function') {
      Promise.resolve(colOptions(effectData)).then((data) => (options.value = data))
    } else {
      options.value = unref(colOptions)
    }
    return () => options.value?.find(({ value }) => value === model.refData)?.label
  } else if (colType === 'Switch') {
    return () => (option.valueLabels || '否是')[model.refData]
  } else if (colType === 'Buttons') {
    return () => h(ButtonGroup, { config: option, param: effectData })
  } else {
    return () => model.refData
  }
}
