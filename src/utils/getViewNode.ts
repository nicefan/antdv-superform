import { globalConfig } from '../plugin'
import { ref, unref, h, reactive, inject, computed, mergeProps, toValue } from 'vue'
import { createButtons } from '../components/buttons'
import Controls from '../components'
import { isPlainObject, get as objectGet } from 'lodash-es'
import useControl from './useControl'
import { useInnerSlots } from './useInnerSlots'
import { getComputedAttr } from './reactivity'
import { Tag } from 'ant-design-vue'
import { getIconNode } from './'

const getVModelProps = (options, parent: Obj) => {
  const vModels = {}
  if (options.vModelFields) {
    Object.entries(options.vModelFields as Obj).forEach(([name, field]) => {
      vModels[name] = parent[field]
    })
  }
  return vModels
}

const formatOptions = (opt, labelName, valueName) => {
  if (isPlainObject(opt) || !isPlainObject(opt?.[0])) {
    return Object.entries(opt).map(([key, label]) => ({ value: key, label }))
  } else {
    return Array.isArray(opt) ? opt.map((item) => ({ label: item[labelName], value: item[valueName] })) : []
  }
}
const getOptions = (option, _effectData, optionsArr) => {
  const { options, dictName } = option as any
  const labelName = option.attrs?.fieldNames?.label || 'label'
  const valueName = option.attrs?.fieldNames?.value || 'value'
  const __options = unref(options)
  if (dictName && globalConfig.dictApi) {
    globalConfig.dictApi(dictName).then((data) => (optionsArr.value = data))
  } else if (typeof options === 'function') {
    Promise.resolve(options(_effectData))
      .then((data) => {
        optionsArr.value = formatOptions(data, labelName, valueName)
      })
      .catch((err) => {
        console.warn('useOptionsLabel', err)
      })
  } else {
    optionsArr.value = formatOptions(__options, labelName, valueName)
  }
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
  return h(
    Tag,
    { color: item.color },
    { default: () => item.label || value, icon: item.icon || (() => getIconNode(item.icon)) }
  )
}

export function getViewNode(option, effectData: Obj = {}) {
  const {
    type: colType = '',
    viewRender,
    render,
    options: colOptions,
    dictName,
    labelField,
    valueToNumber,
    tagViewer,
    initialValue,
  } = option as any
  const endField = option.endField ?? option.keepField

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
    } else if ((colOptions || dictName) && colType !== 'AutoComplete') {
      autoTag = !(tagViewer === false || (!tagViewer && globalConfig.tagViewer === false))
      let labelAsValue = option.labelAsValue ?? option.valueToLabel
      if (unref(colOptions)?.[0] && !isPlainObject(unref(colOptions)?.[0]) && !valueToNumber) {
        labelAsValue = true
      }
      const optionsArr = ref<any[]>()
      return (param = effectData, inner?: boolean) => {
        const tags: any[] = []
        const text = (param.text || param.value) ?? toValue(initialValue) ?? ''
        if (text === '') return ''
        // 绑定值为Label时直接返回原值
        if (labelAsValue) {
          return !inner && autoTag ? buildTagRender({ value: text, label: text, tagViewer }) : text
        }
        if (!optionsArr.value) {
          getOptions(option, param, optionsArr)
        }
        const arr = Array.isArray(text) ? text : typeof text === 'string' ? text.split(',') : [text]
        const values = arr.map((val) => {
          const item = unref(optionsArr)?.find(({ value }) => value == val) // 字符串数字都匹配
          // 内部调用时不进行标签化
          if (!inner && autoTag) {
            tags.push(buildTagRender({ value: val, label: val, ...item, tagViewer }))
          }
          return item ? item.label : val
        })
        return tags.length ? tags : values.join(',')
      }
    } else if (colType === 'Switch') {
      return ({ text } = effectData) => (option.valueLabels || '否是')[text ?? toValue(initialValue)]
      // } else {
      //   //textRender为undefined将直接返回绑定的值
    }
  })() //as false | undefined | ((param?: Obj) => VNode)

  const ISINNER = true as const
  if (colRender) {
    return (param: Obj = effectData) => {
      const vModels = getVModelProps(option, param.current)
      const {
        attrs: { disabled, ...attrs },
      } = useControl({ option, effectData: param })

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
        return buildTagRender({ label: text ? '是' : '否', color: text ? 'success' : 'error' })
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
  } else if (colType === 'Textarea') {
    return (param: Obj = effectData) => {
      return h('pre', { style: 'white-space: break-spaces;' }, param.value ?? toValue(initialValue))
    }
  } else if (!content && (colType === 'Upload' || colType.startsWith('Ext'))) {
    return (param: Obj = effectData) => {
      const vModels = getVModelProps(option, param.current)
      const slots = useInnerSlots(option.slots, param, rootSlots)
      const {
        attrs: { disabled, ...attrs },
      } = useControl({ option, effectData: param })

      return h(
        Controls[colType],
        reactive({ option, effectData: param, ...attrs, ...vModels, value: param.value, isView: true, disabled }),
        slots
      )
    }
  } else if (colType === 'Buttons') {
    const buttonsSlot = createButtons({ config: option, isView: true })
    return !!buttonsSlot && ((param = effectData) => buttonsSlot({ param }))
  } else {
    return content
  }
}
