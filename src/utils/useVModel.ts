import { toRef, watch, ref, unref, toValue, computed, isRef } from 'vue'
import { get as objectGet, set as objectSet } from 'lodash-es'
import type { ExtFormItemOption } from '../exaTypes'

type Param = {
  option: ExtFormItemOption
  model: ModelData
  effectData: Obj
}

export default function useVModel({ option, model, effectData }: Param, defaultValue?: any) {
  const { type, field, keepField, labelField, valueToString, computed: __computed, value, onUpdate }: MixOption = option
  const vModels: Obj = {}

  const vModelFields: Obj = option.vModelFields || {}
  if (labelField) {
    vModels['labelValue'] = computed(() => objectGet(model.parent, labelField))
    vModels[`onUpdate:labelValue`] = (val) => {
      const value = valueToString ? val?.toString() : val
      objectSet(model.parent, labelField, value)
    }
  }
  Object.entries(vModelFields).forEach(([name, field]) => {
    if (typeof field === 'string') {
      model.parent[field] ??= undefined
      vModels[name] = computed(() => objectGet(model.parent, field))
      vModels[`onUpdate:${name}`] = (val) => {
        objectSet(model.parent, field, val)
      }
    } else if (isRef(field)) {
      vModels[name] = field
      vModels[`onUpdate:${name}`] = (val) => (field.value = val)
    } else {
      vModels[name] = field
    }
  })

  if (!field) {
    if (isRef(value)) {
      Object.assign(vModels, {
        value,
        'onUpdate:value': (val) => (value.value = val),
      })
    }
    return vModels
  }

  if (defaultValue !== undefined) model.refData ??= toValue(defaultValue)
  // 实际存储变量
  const refValue = toRef(model, 'refData')
  // 用于绑定到表单值，可进行转换后再同步至表单对象
  const tempData = ref()

  const updateValue = (val = toValue(defaultValue)) => {
    tempData.value = val
    // 数据重置时还原为默认值
    if (refValue.value !== val && defaultValue !== undefined) refValue.value = val
  }
  Object.assign(vModels, {
    value: tempData,
    'onUpdate:value': updateValue,
  })

  // 同步外部引用值
  if (isRef(value)) {
    watch(refValue, (val) => (value.value = val))
    watch(value, updateValue)
  }

  let raw = toValue(model.refData) // 阻止监听自身数据变化
  // 表单绑定值，变更后同步处理后再改到实际存储变量中
  let effect: Fn
  if (type === 'DateRange' && keepField) {
    tempData.value = [refValue.value, model.parent[keepField]]
    effect = (val) => {
      const [start, end] = val || []
      refValue.value = start
      raw = start
      model.parent[keepField] = end
    }
    // 源数据变化通知表单同步
    watch([refValue, () => model.parent[keepField]], (arr) => {
      tempData.value = arr
    })
  } else if (valueToString) {
    const convert = (val) => {
      return val?.toString().split(',') || []
    }
    tempData.value = convert(refValue.value)
    effect = (val) => {
      const str = val?.toString() || ''
      refValue.value = str
      raw = str
    }
    // 源数据变化通知表单同步
    watch(refValue, (val) => {
      val !== raw && (tempData.value = convert(val))
    })
  } else {
    tempData.value = raw
    effect = (value) => {
      refValue.value = value
      raw = value
    }
    watch(refValue, updateValue, { flush: 'sync' })
  }

  // 表单数据变化同步源数据
  watch(tempData, effect, { flush: 'sync' })

  if (onUpdate) {
    watch(refValue, () => onUpdate(effectData))
  }

  if (__computed) {
    watch(
      // 使用ref让计算结果即使一样也会进行后面的赋值
      () => ref(__computed(raw, effectData)),
      (val) => effect(unref(val)),
      { immediate: true }
    )
  }

  return vModels
}
