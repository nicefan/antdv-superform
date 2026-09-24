import { computed, h, inject, reactive, toRefs, mergeProps, unref, toRaw, type Ref, type VNodeChild } from 'vue'
import { defaults, isFunction } from 'lodash-es'
import { containers, hasFormComponent } from './index'
import type { buildInnerNode } from './Collections'
import { getEffectData, getViewNode, useControl, useVModel } from '../utils'
import { globalProps } from '../plugin'
import { DataProvider } from '../dataProvider'
import { formatRule } from '../utils/buildModel'
import { createLabelNode } from '../utils/labelNode'
import { resolveUIComponent, getUIRender } from '../adapter'

export interface CollectionNode {
  key: number
  hidden: Ref<boolean>
  content: () => VNodeChild
  layout: {
    block: boolean
    breakAfter?: boolean
    align?: string
    colProps: Obj
    compactProps: Obj
    detail: boolean
  }
}

export interface CollectionNodeProps {
  option: Obj
  model: Partial<ModelData<any>> & { children: ModelsMap }
  effectData?: Obj
  fieldWrapper?: 'formItem' | 'none'
}

/** 必须在所属组件 setup 中调用，让字段绑定与监听跟随该实例释放。 */
export function useCollectionNodes(props: CollectionNodeProps, buildNode: typeof buildInnerNode) {
  const inheritOptions = inject<Obj>('inheritOptions', {})
  const presetSpan = props.option.subSpan ?? inheritOptions.subSpan
  const index = computed(() => props.model.index)
  const nodes: CollectionNode[] = []
  const childrenArr = [...props.model.children]
  for (let idx = 0; idx < childrenArr.length; idx++) {
    const [option, subData] = childrenArr[idx]
    const { type, align, span, hideInForm, exclude, editable } = option
    const block = option.block ?? option.blocked
    const breakAfter = option.breakAfter ?? option.wrapping
    const { parent, refData } = toRaw(subData)
    const effectData = getEffectData({
      parent: props.effectData,
      current: parent,
      field: subData.refName,
      value: refData,
      ...(index.value !== undefined && {
        index,
        record: !subData.refName ? refData : parent,
      }),
    })
    if (type === 'Hidden' || (exclude ? exclude.includes('form') : hideInForm)) {
      useVModel({ option, model: subData, effectData })
      continue
    }
    const { hidden, required, attrs, nativeAttrs, disabled } = useControl({
      option,
      effectData,
      inheritDisabled: inheritOptions.disabled,
    })
    if (type === 'Fragment') {
      subData.children &&
        childrenArr.splice(
          idx + 1,
          0,
          ...[...subData.children].map(([o, d]) => [{ ...o, hidden, disabled: attrs.disabled }, d] as any)
        )
      continue
    }
    let innerNode = buildNode(option, subData, effectData, attrs, { attrs: nativeAttrs, disabled })
    if (!innerNode) continue
    if ((hasFormComponent(type) || resolveUIComponent(type)) && editable !== undefined && editable !== true) {
      const inputNode = innerNode
      const editableRef = computed(() => (isFunction(editable) ? editable(effectData) : editable))
      const viewNode = getViewNode(option, reactive({ ...toRefs(effectData), isView: true }))
      innerNode = () => (editableRef.value ? inputNode() : viewNode ? viewNode() : refData.value)
    }
    const colProps: Obj = { ...option.colProps, ...(span !== undefined && { span }) }
    defaults(colProps, { span: presetSpan }, globalProps.Col, { span: 8 })
    if (colProps.span === 0 || colProps.flex) {
      colProps.span = undefined
    }

    let node = innerNode
    /** 容器组件 */
    const independent = [...containers, 'InputList', 'InputGroup'].includes(type)
    if (props.fieldWrapper !== 'none' && !independent && (!block || (option.field && option.label))) {
      // 非容器组件带field,或者非block的元素，生成FormItem，如infoSlot, button独立一行显示
      const __rules = formatRule(subData.rules, effectData)
      // 保留规则供显式 validate/submit 使用，只屏蔽输入时的自动触发。
      const rules = computed(() =>
        unref(attrs.disabled)
          ? undefined
          : (!option.required || required.value ? __rules : __rules.slice(1))?.map((rule) =>
              inheritOptions.ignoreRules ? { ...rule, trigger: 'none', validateTrigger: false } : rule
            )
      )
      const formItemAttrs = mergeProps(globalProps.FormItem, option.formItemProps)
      const label = createLabelNode(option, effectData)

      node = () =>
        getUIRender('formItem')(
          reactive({
            ...formItemAttrs,
            name: subData.propChain,
            rules,
            colon: !!label,
          }),
          {
            default: innerNode,
            label,
          }
        )
    }
    // 紧凑组沿用外层上下文，不新增原先被紧凑分支跳过的继承包装。
    if (independent && props.fieldWrapper !== 'none') {
      // 容器组件转递继承属性
      const inheritData: Obj = {
        required,
        disabled: attrs.disabled,
        subSpan: option.subSpan ?? presetSpan,
        ignoreRules: inheritOptions.ignoreRules,
      }
      node = () => h(DataProvider, { name: 'inheritOptions', data: inheritData }, innerNode)
    }

    const isBlock = block ?? (containers.includes(type) && !option.span)
    // InputList 在标准栅格中默认占满一行，紧凑布局仍使用字段自身宽度。
    const gridColProps = !isBlock && type === 'InputList' ? { ...colProps, span: span ?? 24 } : colProps
    nodes.push({
      key: idx,
      hidden,
      content: node,
      layout: {
        block: isBlock,
        breakAfter,
        align,
        colProps: gridColProps,
        compactProps: colProps,
        detail: type === 'Descriptions',
      },
    })
  }
  return nodes
}
