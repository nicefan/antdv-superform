import { globalConfig } from '../plugin'
import { ref, unref, h, effect, reactive } from 'vue'
import { createButtons } from '../components/buttons'
import Controls from '../components'
import useControl from './useControl'
import useVModel from './useVModel'

const buildProps = (option, effectData, model) => {
  const valueProps = useVModel({ option, model, effectData })

  return { ...option.attrs, ...valueProps }
}

export function getViewNode(option, model, slots) {
  const {
    type: colType = '',
    viewRender,
    render,
    options: colOptions,
    dictName,
    labelField,
    keepField,
    valueToNumber,
    valueToLabel,
  } = option as any
  const __render = viewRender || (colType === 'InfoSlot' && render)

  if (__render) {
    const slot = typeof __render === 'string' ? slots[__render] : __render
    return (effectData) => {
      const attrs = buildProps(option, effectData, model)
      return slot(reactive({ props: attrs, ...effectData }))
    }
  } else if (labelField) {
    return ({ current }) => current[labelField as string]
  } else if (keepField) {
    return ({ current, text }) => (text || '') + ' - ' + (current[labelField as string] || '')
  } else if (colOptions && typeof colOptions[0] === 'string') {
    if (valueToLabel) return // 绑定值为Label时直接返回原值
    return ({ text }) => colOptions[text]
  } else if (dictName || colOptions) {
    const options = ref<any[]>()
    if (dictName && globalConfig.dictApi) {
      globalConfig.dictApi(dictName).then((data) => (options.value = data))
    } else if (typeof colOptions === 'function') {
      Promise.resolve(colOptions({})).then((data) => (options.value = data))
    } else {
      options.value = unref(colOptions)
    }
    return ({ text }) => {
      const arr = Array.isArray(text) ? text : typeof text === 'string' ? text.split(',') : [text]
      const labels = arr.map((val) => {
        const item = options.value?.find(({ value }) => (valueToNumber ? Number(value) : value) === val)
        return item ? item.label : val
      })
      return labels.join(',')
    }
  } else if (colType === 'Switch') {
    return ({ text }) => (option.valueLabels || '否是')[text]
  } else if (colType === 'Buttons') {
    const buttonsSlot = createButtons({ config: option, isView: true })
    return !!buttonsSlot && ((param) => buttonsSlot({ param }))
  } else if (colType === 'Upload' || colType.startsWith('Ext')) {
    return (effectData) => {
      const attrs = buildProps(option, effectData, model)
      return h(Controls[colType], reactive({ option, effectData, ...attrs, isView: true }), slots)
    }
  } else {
    // textRender为undefined将直接返回绑定的值
  }
}
