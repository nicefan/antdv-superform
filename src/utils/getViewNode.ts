import { globalConfig } from '../plugin'
import { ref, unref, h, reactive, type VNode, inject, computed, mergeProps } from 'vue'
import { createButtons } from '../components/buttons'
import Controls from '../components'
import { isPlainObject, get as objectGet } from 'lodash-es'
import useControl from './useControl'
import { useInnerSlots } from './useInnerSlots'
import { getComputedAttr } from './reactivity'
import { Tag } from 'ant-design-vue'
import { useIcon } from './useIcon'

const getVModelProps = (options, parent: Obj) => {
  const vModels = {}
  if (options.vModelFields) {
    Object.entries(options.vModelFields as Obj).forEach(([name, field]) => {
      vModels[name] = parent[field]
    })
  }
  return vModels
}

const getOptions = (option, _effectData, optionsArr) => {
  const { options, dictName } = option as any
  const __options = unref(options)
  if (dictName && globalConfig.dictApi) {
    globalConfig.dictApi(dictName).then((data) => (optionsArr.value = data))
  } else if (typeof options === 'function') {
    Promise.resolve(options(_effectData))
      .then((data) => {
        optionsArr.value = data
      })
      .catch((err) => {
        console.warn('useOptionsLabel', err)
      })
  } else if (isPlainObject(__options)) {
    optionsArr.value = Object.entries(__options).map(([key, label]) => ({ value: key, label }))
  } else if (Array.isArray(__options) && typeof __options[0] === 'string') {
    optionsArr.value = __options.map((label, index) => ({ value: String(index), label }))
  } else {
    optionsArr.value = __options
  }
}

const buildTagRender = ({ value, label, color, icon, tagViewer = true }: Obj) => {
  const item: Obj = { color, label, icon }
  if (tagViewer !== true || !color) {
    const tagOption = tagViewer === true ? globalConfig.tagViewer : tagViewer
    if (typeof tagOption === 'function') {
      item.color = tagOption(value)
    } else if (Array.isArray(tagOption) && isPlainObject(tagOption[0])) {
      const tag = tagOption.find((item) => item.value === value)
      Object.assign(item, tag)
    }
    item.color ??=
      color || tagOption[Number(value)] || (value === true && 'success') || (value === false && 'error') || 'default'
  }
  return h(Tag, { color: item.color }, { default: () => item.label, icon: item.icon || (() => useIcon(item.icon)) })
}

export function getViewNode(option, effectData: Obj = {}) {
  const {
    type: colType = '',
    viewRender,
    render,
    options: colOptions,
    dictName,
    labelField,
    keepField,
    valueToLabel,
    valueToNumber,
    tagViewer,
  } = option as any

  const rootSlots = inject<Obj>('rootSlots', {})
  const __render = viewRender || (colType === 'InfoSlot' && render)
  const colRender = typeof __render === 'string' ? rootSlots[__render] : __render
  if (__render && !colRender) return false
  let autoTag = false
  const content = (() => {
    if (labelField) {
      return ({ current } = effectData) => String(objectGet(current, labelField))
    } else if (keepField) {
      return ({ current, text } = effectData) => (text || '') + ' - ' + (objectGet(current, keepField) || '')
    } else if (colOptions || dictName) {
      // 绑定值为Label时直接返回原值
      if (valueToLabel) return
      const optionsArr = ref<any[]>()
      autoTag = !(tagViewer === false || (!tagViewer && globalConfig.tagViewer === false))
      return (param = effectData, inner?: boolean) => {
        const tags: any[] = []
        if (!optionsArr.value) {
          getOptions(option, param, optionsArr)
        }
        const text = (param.text || param.value) ?? ''
        if (text === '') return ''
        const arr = Array.isArray(text) ? text : typeof text === 'string' ? text.split(',') : [text]
        const values = arr.map((val) => {
          const item = unref(optionsArr)?.find(({ value }) => (valueToNumber ? Number(value) : value) === val)
          // 内部调用时不进行标签化
          if (!inner && autoTag) {
            tags.push(buildTagRender({ value: val, label: val, ...item, tagViewer }))
          }
          return item ? item.label : val
        })
        return tags.length ? tags : values.join(',')
      }
    } else if (colType === 'Switch') {
      return ({ text } = effectData) => (option.valueLabels || '否是')[text]
    } else {
      // textRender为undefined将直接返回绑定的值
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
      const text = param.text
      if (typeof text === 'boolean' && tagViewer === true) {
        return buildTagRender({ label: text ? '是' : '否', color: text ? 'success' : 'error' })
      }
      const arr = Array.isArray(text) ? text : typeof text === 'string' ? text.split(',') : [text]
      const tags = arr.map((value) => buildTagRender({ value, tagViewer }))
      return tags
    }
  } else if (colType === 'Upload' || colType.startsWith('Ext')) {
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
  } else if (colType === 'HTML') {
    return (param = effectData) => {
      const dynamicAttrs = getComputedAttr(option.dynamicAttrs, param)
      const attrs = mergeProps({ ...option.attrs, innerHTML: param.value }, dynamicAttrs)
      return h('span', attrs)
    }
  } else if (colType === 'Text' && (option.attrs || option.dynamicAttrs)) {
    return (param: Obj = effectData) => {
      const text = content?.(param) || param.value
      const dynamicAttrs = getComputedAttr(option.dynamicAttrs, param)
      const attrs = mergeProps({ ...option.attrs, title: text }, dynamicAttrs)
      return h('span', attrs, text)
    }
  } else {
    return content
  }
}
