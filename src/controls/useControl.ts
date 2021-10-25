import { unref, onMounted, reactive, toRef, watch, watchEffect, inject, toRaw, readonly, computed } from 'vue'
import { useDisabled, getListener } from '../util'
type Param = {
  option: ExFormOption
  modelData: Obj
  defaultData?: Obj
}

export default function render({ option, modelData }: Param) {
  const { type, label, prop, attr, disabled: __disabled, computed: __computed, keepProp }: MixOption = option
  const { refName, parent, currentRules, propChain } = modelData
  // 实际存储变量
  const refValue = toRef(parent, refName)
  // 创建一个静态对象，用于传递到计算属性
  const tempData = reactive({ [refName]: parent[refName] })
  // 表单绑定值，变更后同步处理后再改到实际存储变量中

  const vModel = {
    value: toRef(tempData, refName),
    'onUpdate:value': (val) => {
      tempData[refName] = val
    },
  }

  let effect: Fn
  if (type === 'DateRange' && keepProp) {
    tempData[refName] = []
    effect = ([start, end]) => {
      refValue.value = start
      parent[keepProp] = end
    }
    // 源数据变化通知表单同步
    watch([refValue, () => parent[keepProp]], vModel['onUpdate:value'])
  } else {
    effect = (value) => {
      refValue.value = value
    }
    watch(refValue, vModel['onUpdate:value'])
  }
  // 表单数据变化同步源数据
  watch(() => tempData[refName], effect, { flush: 'sync' })

  const formData: Obj = inject('formData') || {}
  const effectData = { current: parent }
  if (__computed) {
    const raw = tempData[refName] // 阻止监听自身数据变化
    onMounted(() => watch(() => __computed(raw, effectData), effect))
  }
  // 元素禁用控制，同步清除绑定的校验规则
  const disabled = useDisabled(__disabled, effectData)

  const listener = getListener(option.on, effectData)
  const _attr = { ...attr, ...listener }

  if (type === 'Select' && keepProp) {
    const change = listener.onChange
    listener.onChange = function (val, currentOption) {
      parent[keepProp] = currentOption.label
      change && change(val, currentOption)
    }
  }

  // 校验绑定
  const ruleName = currentRules && computed(() => (unref(disabled) ? undefined : propChain))

  // 创建元素并进行数据绑定, name和label不做props接收将会自动绑定到根组件上
  const attrs: Obj = reactive({ ...vModel, ..._attr, disabled })

  return { effectData, formData, attrs, ruleName, label, rules: modelData.currentRules }
}
