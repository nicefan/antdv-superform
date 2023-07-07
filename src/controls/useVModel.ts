import { getEffectData } from '../utils/util'
import { toRef, reactive, watch, onMounted } from 'vue'
type Param = {
  option: ExFormOption
  model: Obj
}

export default function useVModel({ option, model }: Param) {
  const { type, keepField, computed: __computed }: MixOption = option
  const { refName, parent } = model
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

  // 表单绑定值，变更后同步处理后再改到实际存储变量中
  let effect: Fn
  if (type === 'DateRange' && keepField) {
    tempData[refName] = []
    effect = ([start, end]) => {
      refValue.value = start
      parent[keepField] = end
    }
    // 源数据变化通知表单同步
    watch([refValue, () => parent[keepField]], vModel['onUpdate:value'])
  } else {
    effect = (value) => {
      refValue.value = value
    }
    watch(refValue, vModel['onUpdate:value'])
  }
  // 表单数据变化同步源数据
  watch(() => tempData[refName], effect, { flush: 'sync' })

  if (__computed) {
    const effectData = getEffectData({ record: parent })
    const raw = tempData[refName] // 阻止监听自身数据变化
    onMounted(() => watch(() => __computed(raw, effectData), effect))
  }
  return vModel
}
