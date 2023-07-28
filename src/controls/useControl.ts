import { unref, computed, toRefs, mergeProps } from 'vue'
import { getListener, getComputedAttr, getEffectData, getComputedStatus } from '../utils/util'
import merge from 'lodash/merge'
type Param = {
  option: Partial<MixOption>
  model: Obj
}

export default function render({ option, model }: Param) {
  const { type, labelField, dynamicAttrs: __attrs, disabled: __disabled, hidden: __hidden } = option
  const { parent, currentRules, propChain } = model

  // 动态属性方法需要传递的参数
  const effectData = getEffectData({ record: parent })
  // 元素隐藏控制
  const hidden = getComputedStatus(__hidden, effectData)

  // 元素禁用控制，同步清除绑定的校验规则
  const disabled = getComputedStatus(__disabled, effectData)

  const listener = getListener(option.on, effectData)
  const computedAttr = typeof __attrs === 'function' ? { ...toRefs(getComputedAttr(__attrs, effectData)) } : {}

  if (type === 'Select' && labelField) {
    const change = listener.onChange
    listener.onChange = function (val, currentOption) {
      parent[labelField] = currentOption.label
      change && change(val, currentOption)
    }
  }

  // 校验绑定
  const ruleName = currentRules && computed(() => (unref(disabled) ? undefined : propChain))

  // 创建元素并进行数据绑定, name和label不做props接收将会自动绑定到根组件上
  const __merged = mergeProps({ ...option.attrs }, listener, computedAttr)
  const attrs: Obj = merge({}, option.attrs, __merged, { disabled })

  return { effectData, attrs, ruleName, hidden }
}
