import { getEffectData } from '../utils/util'
import { toRef, reactive, watch, onMounted, ref, unref, toValue } from 'vue'
type Param = {
  option: ExFormItemOption
  model: ModelData
}

export default function useVModel({ option, model }: Param, defaultValue?: any) {
  const { type, keepField, computed: __computed }: MixOption = option
  if (defaultValue !== undefined) model.refData ??= defaultValue
  // 实际存储变量
  const refValue = toRef(model, 'refData')
  // 临时存储值，用于传递到计算属性
  const tempData = ref(model.refData)

  const vModel = reactive({
    value: tempData,
    'onUpdate:value': (val) => {
      tempData.value = val
    },
  })

  let raw = toValue(tempData) // 阻止监听自身数据变化
  // 表单绑定值，变更后同步处理后再改到实际存储变量中
  let effect: Fn
  if (type === 'DateRange' && keepField) {
    tempData.value = []
    effect = ([start, end]) => {
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
    const effectData = getEffectData({ record: model.parent })
    onMounted(() =>
      watch(
        () => ref(__computed(raw, effectData)),
        (val) => effect(unref(val))
      )
    )
  }
  return vModel
}
