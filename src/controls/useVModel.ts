import { getEffectData } from '../utils/util'
import { toRef, reactive, watch, onMounted, computed } from 'vue'
type Param = {
  option: ExFormItemOption
  model: Obj
}

export default function useVModel({ option, model }: Param, defaultValue?: any) {
  const { type, keepField, computed: __computed }: MixOption = option
  const { refName, parent } = model
  if (defaultValue !== undefined) parent[refName] ??= defaultValue
  // 实际存储变量
  const refValue = toRef(parent, refName)
  // 创建一个静态对象，用于传递到计算属性
  const tempData = reactive({ [refName]: parent[refName] })

  const vModel = {
    value: toRef(tempData, refName),
    'onUpdate:value': (val) => {
      tempData[refName] = val
    },
  }

  let raw = tempData[refName] // 阻止监听自身数据变化
  // 表单绑定值，变更后同步处理后再改到实际存储变量中
  let effect: Fn
  if (type === 'DateRange' && keepField) {
    tempData[refName] = []
    effect = ([start, end]) => {
      refValue.value = start
      raw = start
      parent[keepField] = end
    }
    // 源数据变化通知表单同步
    watch([refValue, () => parent[keepField]], vModel['onUpdate:value'])
  } else {
    effect = (value) => {
      refValue.value = value
      raw = value
    }
    watch(refValue, vModel['onUpdate:value'])
  }
  // 表单数据变化同步源数据
  watch(() => tempData[refName], effect, { flush: 'sync' })

  if (__computed) {
    const effectData = getEffectData({ record: parent })
    const changeVal = computed(() => __computed(raw, effectData))
    onMounted(() => watch(changeVal, effect))
  }
  return vModel
}
