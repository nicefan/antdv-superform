import { globalConfig } from '../config'
import { h, reactive, inject, computed, mergeProps, toValue } from 'vue'
import { createButtons } from '../components/buttons'
import Controls, { getFormComponent, mapFormComponentModel } from '../components'
import { isPlainObject, get as objectGet } from 'lodash-es'
import useControl from './useControl'
import { useInnerSlots } from './useInnerSlots'
import { getComputedAttr } from './reactivity'
import { renderUIPresentation } from '../adapter'
import { findOption, useOptions } from './useOptions'

const getVModelProps = (options, parent: Obj) => {
  const vModels = {}
  if (options.vModelFields) {
    Object.entries(options.vModelFields as Obj).forEach(([name, field]) => {
      vModels[name] = parent[field]
    })
  }
  return vModels
}

const buildTagRender = ({ value, label = value, color, icon, tagViewer = true }: Obj) => {
  const item: Obj = { color, label, icon }
  if (tagViewer !== true || !color) {
    const tagOption = tagViewer === true ? globalConfig.tagViewer : tagViewer
    if (typeof tagOption === 'function') {
      const res = tagOption(value)
      if (isPlainObject(res)) {
        Object.assign(item, res)
      } else {
        item.color = res
      }
    } else if (Array.isArray(tagOption) && isPlainObject(tagOption[0])) {
      const tag = tagOption.find((item) => item.value == value) // 字符串数字都匹配
      Object.assign(item, tag)
    }
    item.color ??=
      color || tagOption[value] || (value === true && 'success') || (value === false && 'error') || 'default'
  }
  return renderUIPresentation(
    'tag',
    { color: item.color },
    {
      default: () => item.label || value,
      icon: item.icon,
    }
  )
}

export function getViewNode(option, effectData: Obj = {}) {
  const {
    type: colType = '',
    viewRender,
    render,
    labelField,
    tagViewer,
    initialValue,
  } = option as any
  const colOptions = option.options
  const endField = option.endField

  const rootSlots = inject<Obj>('rootSlots', {})
  const __render = viewRender || (colType === 'InfoSlot' && render)
  const colRender = typeof __render === 'string' ? rootSlots[__render] : __render
  if (__render && !colRender) return false
  let autoTag = false
  const content = (() => {
    if (labelField) {
      return ({ current } = effectData) => String(objectGet(current, labelField) ?? '')
    } else if (endField) {
      return ({ current, text } = effectData) => (text || '') + ' - ' + (objectGet(current, endField) || '')
    } else if (colOptions !== undefined) {
      autoTag = !(tagViewer === false || (!tagViewer && globalConfig.tagViewer === false))
      // 编辑与展示共用顶层选项配置和子节点查找规则。
      const { optionsRef, load } = useOptions(colOptions, effectData, false)
      let loaded = false
      return (param = effectData, inner?: boolean) => {
        // 表格列的行上下文在调用展示函数时才可用，保留首次展示时加载的时机。
        if (!loaded) {
          loaded = true
          void load(param)
        }
        const text = param.text ?? param.value ?? toValue(initialValue) ?? ''
        if (text === '') return ''
        const values = Array.isArray(text) ? text : option.stringifyValue && typeof text === 'string' ? text.split(',') : [text]
        const labels = values.map(value => {
          const item = findOption(optionsRef.value, value, option.stringifyValue)
          const label = item?.label ?? value
          return !inner && autoTag ? buildTagRender({ ...item, value, label, tagViewer }) : label
        })
        return !inner && autoTag ? labels : labels.join(',')
      }
    } else if (colType === 'Switch') {
      return ({ text, value } = effectData) => {
        const current = text ?? value ?? toValue(initialValue)
        return current === true ? '是' : current === false ? '否' : current
      }
    }
  })() //as false | undefined | ((param?: Obj) => VNode)

  const ISINNER = true as const
  if (colRender) {
    return (param: Obj = effectData) => {
      const vModels = getVModelProps(option, param.current)
      const { attrs: controlledAttrs } = useControl({ option, effectData: param })
      const attrs = { ...controlledAttrs }
      delete attrs.disabled

      const props: Obj = reactive({
        props: { ...attrs, ...vModels },
        ...param,
        ...(content && { text: computed(() => content(param, ISINNER)) }),
        isView: true,
      })
      return colRender(props)
    }
  } else if (tagViewer && !autoTag) {
    return (param: Obj = effectData) => {
      const text = param.text ?? toValue(initialValue)
      if (typeof text === 'boolean' && tagViewer === true) {
        return buildTagRender({
          label: text ? '是' : '否',
          color: text ? 'success' : 'error',
        })
      }
      const arr = Array.isArray(text) ? text : typeof text === 'string' ? text.split(',') : [text]
      const tags = arr.map((value) => buildTagRender({ value, tagViewer }))
      return tags
    }
  } else if (colType === 'Text' && (option.attrs || option.dynamicAttrs)) {
    return (param: Obj = effectData) => {
      const text = content?.(param) || (param.value ?? toValue(initialValue))
      const dynamicAttrs = getComputedAttr(option.dynamicAttrs, param)
      const attrs = mergeProps({ ...option.attrs, title: text }, dynamicAttrs)
      return h('span', attrs, text)
    }
  } else if (colType === 'HTML') {
    return (param = effectData) => {
      const dynamicAttrs = getComputedAttr(option.dynamicAttrs, param)
      const attrs = mergeProps({ ...option.attrs, innerHTML: param.value }, dynamicAttrs)
      return h('span', attrs)
    }
  } else if (colType === 'TextArea') {
    return (param: Obj = effectData) => {
      return h('pre', { style: 'white-space: break-spaces;' }, param.value ?? toValue(initialValue))
    }
  } else if (!content && (colType === 'Upload' || getFormComponent(colType))) {
    return (param: Obj = effectData) => {
      const vModels = getVModelProps(option, param.current)
      const slots = useInnerSlots(option.slots, param, rootSlots)
      const {
        attrs: { disabled, ...attrs },
      } = useControl({ option, effectData: param })

      if (colType === 'Upload') {
        return h(
          Controls.Upload,
          reactive({ option, effectData: param, ...attrs, ...vModels, value: param.value, isView: true, disabled }),
          slots
        )
      }
      const definition = getFormComponent(colType)
      return (
        definition &&
        h(
          definition.component,
          reactive(
            mapFormComponentModel(definition, {
              ...attrs,
              ...vModels,
              value: param.value,
              disabled,
            })
          ),
          slots
        )
      )
    }
  } else if (colType === 'Buttons') {
    const buttonsSlot = createButtons({ config: option, isView: true })
    return !!buttonsSlot && ((param = effectData) => buttonsSlot({ param }))
  } else {
    return content
  }
}
