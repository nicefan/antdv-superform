import { toRef, reactive, watch, onMounted, ref, unref, toValue } from 'vue'
type Param = {
  option: ExFormItemOption
  model: ModelData
  effectData: Obj
}

export default function useVModel({ option, model, effectData }: Param, defaultValue?: any) {
  const { type, keepField, computed: __computed }: MixOption = option
  if (defaultValue !== undefined) model.refData ??= toValue(defaultValue)
  // 实际存储变量
  const refValue = toRef(model, 'refData')
  // 临时存储值，用于传递到计算属性
  const tempData = ref(model.refData)

  const vModel = reactive({
    value: tempData,
    'onUpdate:value': (val = toValue(defaultValue)) => {
      tempData.value = val
      // 数据重置时还原为默认值
      if (refValue.value !== val && defaultValue !== undefined) refValue.value = val
    },
  })

  let raw = toValue(tempData) // 阻止监听自身数据变化
  // 表单绑定值，变更后同步处理后再改到实际存储变量中
  let effect: Fn
  if (type === 'DateRange' && keepField) {
    tempData.value = []
    effect = (val) => {
      const [start, end] = val || []
      refValue.value = start
      raw = start
      model.parent[keepField] = end
    }
    // 源数据变化通知表单同步
    watch([refValue, () => model.parent[keepField]], vModel['onUpdate:value'])
  } else {
    effect = (value) => {
      refValue.value = value
      raw = value
    }
    watch(refValue, vModel['onUpdate:value'])
  }
  // 表单数据变化同步源数据
  watch(tempData, effect, { flush: 'sync' })

  if (__computed) {
    onMounted(() =>
      watch(
        () => ref(__computed(raw, effectData)),
        (val) => effect(unref(val))
      )
    )
  }
  return vModel
}
