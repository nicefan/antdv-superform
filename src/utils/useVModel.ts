import { toRef, watch, ref, unref, toValue, computed, isRef } from 'vue'
import type { ExtFormItemOption } from '../exaTypes'

type Param = {
  option: ExtFormItemOption
  model: ModelData
  effectData: Obj
}

export default function useVModel({ option, model, effectData }: Param, defaultValue?: any) {
  const { type, field, keepField, computed: __computed, vModelFields, value, onUpdate }: MixOption = option
  if (!field) return
  if (defaultValue !== undefined) model.refData ??= toValue(defaultValue)
  // 实际存储变量
  const refValue = toRef(model, 'refData')
  // 临时存储值，用于传递到计算属性
  const tempData = ref(model.refData)

  const updateValue = (val = toValue(defaultValue)) => {
    tempData.value = val
    // 数据重置时还原为默认值
    if (refValue.value !== val && defaultValue !== undefined) refValue.value = val
  }
  const vModels = {
    value: tempData,
    'onUpdate:value': updateValue,
  }

  // 同步外部引用值
  if (isRef(value)) {
    watch(refValue, (val) => (value.value = val))
    watch(value, updateValue)
  }

  if (vModelFields) {
    Object.entries(vModelFields).forEach(([name, field]) => {
      model.parent[field] ??= undefined
      vModels[name] = computed(() => model.parent[field])
      vModels[`onUpdate:${name}`] = (val) => {
        model.parent[field] = val
      }
    })
  }

  let raw = toValue(tempData) // 阻止监听自身数据变化
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
    watch([refValue, () => model.parent[keepField]], updateValue)
  } else {
    effect = (value) => {
      refValue.value = value
      raw = value
    }
    watch(refValue, updateValue)
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
      { immediate: true, flush: 'sync' }
    )
  }

  return vModels
}
