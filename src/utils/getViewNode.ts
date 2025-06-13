import { globalConfig } from '../plugin'
import { ref, unref, h, reactive, type VNode, inject, computed, mergeProps, watchEffect, watch } from 'vue'
import { createButtons } from '../components/buttons'
import Controls from '../components'
import { isPlainObject, get as objectGet } from 'lodash-es'
import useControl from './useControl'
import { useInnerSlots } from './useInnerSlots'
import { getComputedAttr } from './reactivity'
import { Tag } from 'ant-design-vue'

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
    optionsArr.value = __options.map((label, index) => ({ value: index, label }))
  } else {
    optionsArr.value = __options
  }
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
  const content = (() => {
    if (labelField) {
      return ({ current } = effectData) => objectGet(current, labelField)
    } else if (keepField) {
      return ({ current, text } = effectData) => (text || '') + ' - ' + (objectGet(current, keepField) || '')
    } else if (colOptions || dictName) {
      // 绑定值为Label时直接返回原值
      if (valueToLabel) return
      const optionsArr = ref<any[]>()
      return (param = effectData) => {
        if (!optionsArr.value) {
          getOptions(option, param, optionsArr)
        }
        const text = param.text || param.value
        if (text === undefined) return ''
        const arr = Array.isArray(text) ? text : typeof text === 'string' ? text.split(',') : [text]
        const values = arr.map((val) => {
          const item = unref(optionsArr)?.find(({ value }) => (valueToNumber ? Number(value) : value) === val)
          return item ? item.label : val
        })
        return values.join(',')
      }
    } else if (colType === 'Switch') {
      return ({ text } = effectData) => (option.valueLabels || '否是')[text]
    } else {
      // textRender为undefined将直接返回绑定的值
    }
  })() //as false | undefined | ((param?: Obj) => VNode)
  if (tagViewer) {
    const tagOption = tagViewer === true ? globalConfig.tagColors : tagViewer
    return (param: Obj = effectData) => {
      const text = param.text
      const arr = Array.isArray(text) ? text : typeof text === 'string' ? text.split(',') : [text]
      let labels
      const tags = arr.map((val, index) => {
        const item: Obj = {}
        if (typeof tagOption === 'function') {
          item.color = tagOption(val, param)
        } else if (Array.isArray(tagOption) && isPlainObject(tagOption[0])) {
          const tag = tagOption.find((item) => item.value === val)
          Object.assign(item, tag)
        } else {
          item.color = tagOption[val] || (val === true && 'success') || (val === false && 'error') || 'default'
        }
        if (item.label === undefined && !labels) {
          labels = content?.(param)
          labels = labels ? labels.split(',') : arr
        }
        item.label ??= labels[index]
        return h(Tag, { color: item.color }, { default: () => item.label, icon: item.icon })
      })
      return tags
    }
  }

  if (colRender) {
    return (param: Obj = effectData) => {
      const vModels = getVModelProps(option, param.current)
      const {
        attrs: { disabled, ...attrs },
      } = useControl({ option, effectData: param })

      const props: Obj = reactive({
        props: { ...attrs, ...vModels },
        ...param,
        ...(content && { text: computed(() => content(param)) }),
        isView: true,
      })
      return colRender(props)
    }
  } else if (colType === 'Upload' || colType.startsWith('Ext')) {
    const slots = useInnerSlots(option.slots)

    return (param: Obj = effectData) => {
      const vModels = getVModelProps(option, param.current)
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
  } else if (colType === 'Text' && (option.attrs || option.dynamicAttrs)) {
    return (param: Obj = effectData) => {
      const text = content?.(param) || param.value
      const dynamicAttrs = getComputedAttr(option.dynamicAttrs, param)
      const attrs = mergeProps({ ...option.attrs, title: text }, dynamicAttrs)
      return h('span', attrs, text)
    }
  } else if (colType === 'HTML') {
    return (param = effectData) => {
      const dynamicAttrs = getComputedAttr(option.dynamicAttrs, param)
      const attrs = mergeProps({ ...option.attrs }, dynamicAttrs)
      return h('span', attrs)
    }
  } else {
    return content
  }
}
