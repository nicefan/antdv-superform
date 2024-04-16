import { globalConfig } from '../plugin'
import { ref, unref, h, reactive, type VNode, inject, computed } from 'vue'
import { createButtons } from '../components/buttons'
import Controls from '../components'
import { isPlainObject } from 'lodash-es'
import useControl from './useControl'

const getVModelProps = (options, parent: Obj) => {
  const vModels = {}
  if (options.vModelFields) {
    Object.entries(options.vModelFields as Obj).forEach(([name, field]) => {
      vModels[name] = parent[field]
    })
  }
  return vModels
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
    valueToNumber,
    valueToLabel,
  } = option as any

  const rootSlots = inject<Obj>('rootSlots', {})

  const content = (() => {
    if (labelField) {
      return ({ current } = effectData) => current[labelField as string]
    } else if (keepField) {
      return ({ current, text } = effectData) => (text || '') + ' - ' + (current[labelField as string] || '')
    } else if (colOptions || dictName) {
      // 绑定值为Label时直接返回原值
      if (valueToLabel) return
      if (isPlainObject(colOptions) || typeof colOptions?.[0] === 'string') {
        return ({ text } = effectData) => colOptions[text]
      } else {
        const options = ref<any[]>()
        if (dictName && globalConfig.dictApi) {
          globalConfig.dictApi(dictName).then((data) => (options.value = data))
        } else if (typeof colOptions === 'function') {
          Promise.resolve(colOptions(effectData)).then((data) => (options.value = data))
        } else {
          options.value = unref(colOptions)
        }
        return ({ text } = effectData) => {
          const arr = Array.isArray(text) ? text : typeof text === 'string' ? text.split(',') : [text]
          const labels = arr.map((val) => {
            const item = options.value?.find(({ value }) => (valueToNumber ? Number(value) : value) === val)
            return item ? item.label : val
          })
          return labels.join(', ')
        }
      }
    } else if (colType === 'Switch') {
      return ({ text } = effectData) => (option.valueLabels || '否是')[text]
    } else if (colType === 'Buttons') {
      const buttonsSlot = createButtons({ config: option, isView: true })
      return !!buttonsSlot && ((param = effectData) => buttonsSlot({ param }))
    } else {
      // textRender为undefined将直接返回绑定的值
    }
  })() as false | undefined | ((param?: Obj) => VNode)

  const __render = viewRender || (colType === 'InfoSlot' && render)
  const colRender = typeof __render === 'string' ? rootSlots[__render] : __render
  if (colRender || colType === 'Upload' || colType.startsWith('Ext')) {
    const slots = {}
    Object.entries(option.slots || {}).forEach(([key, value]) => {
      slots[key] = typeof value === 'string' ? rootSlots[value] : value
    })

    return (param: Obj = effectData) => {
      const vModels = getVModelProps(option, param.current)
      const {
        attrs: { disabled, ...attrs },
      } = useControl({ option, effectData: param })

      const props: Obj = reactive({
        props: { ...attrs, ...vModels },
        ...param,
        ...(content && { text: computed(() => content(param)) }),
      })
      return colRender
        ? colRender(props)
        : h(
            Controls[colType],
            reactive({ option, effectData: param, ...attrs, ...vModels, value: param.value, isView: true }),
            slots
          )
    }
  } else {
    return content
  }
}
