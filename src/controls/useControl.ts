import { unref, onMounted, reactive, toRef, watch, inject, computed, toRefs } from 'vue'
import { getListener, getComputedAttr, getEffectData, getComputedStatus } from '../utils/util'
type Param = {
  option: ExFormOption
  model: Obj
}

export default function render({ option, model }: Param) {
  const { type, keepField, attrs: __attrs, disabled: __disabled, hidden: __hidden }: MixOption = option
  const { parent, currentRules, propChain } = model

  // 动态属性方法需要传递的参数
  const effectData = getEffectData({ record: parent })
  // 元素隐藏控制
  const hidden = getComputedStatus(__hidden, effectData)

  // 元素禁用控制，同步清除绑定的校验规则
  const disabled = getComputedStatus(__disabled, effectData)

  const listener = getListener(option.on, effectData)
  const computedAttr =
    typeof __attrs === 'function' ? { ...toRefs(getComputedAttr(__attrs, effectData)) } : __attrs || {}

  if (type === 'Select' && keepField) {
    const change = listener.onChange
    listener.onChange = function (val, currentOption) {
      parent[keepField] = currentOption.label
      change && change(val, currentOption)
    }
  }

  // 校验绑定
  const ruleName = currentRules && computed(() => (unref(disabled) ? undefined : propChain))

  // 创建元素并进行数据绑定, name和label不做props接收将会自动绑定到根组件上
  const attrs: Obj = reactive({ ...listener, ...computedAttr, disabled })

  return { effectData, attrs, ruleName, hidden }
}
