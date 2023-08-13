import { ref, unref, toRefs, mergeProps, toRef, inject, watchEffect, provide, computed } from 'vue'
import { getListener, getComputedAttr, getEffectData, getComputedStatus } from '../utils/util'
import { merge } from 'lodash-es'
type Param = {
  option: MixOption
  model: Partial<ModelData> & { parent: Obj }
}

export default function render({ option, model }: Param) {
  const { type, labelField, dynamicAttrs: __attrs, disabled: __disabled, hidden: __hidden } = option

  // 动态属性方法需要传递的参数
  const effectData = getEffectData({ record: toRef(model, 'parent') })
  // 元素隐藏控制
  const hidden = getComputedStatus(__hidden, effectData)

  const disabled: Ref<undefined | boolean> = inject('disabled', ref(undefined))
  // 元素禁用控制，同步清除绑定的校验规则
  if (unref(disabled) === undefined && __disabled !== undefined) {
    if (typeof __disabled === 'function') {
      watchEffect(() => {
        disabled.value = __disabled(effectData)
      })
    } else {
      disabled.value = !!__disabled
    }
    if (model.children) {
      provide('disabled', disabled)
    }
  }
  const ignoreRules = inject<Obj>('exaProvider', {}).ignoreRules
  const rules = computed(() => (ignoreRules || disabled.value ? undefined : model.rules))

  const listener = getListener(option.on, effectData)
  const computedAttr = typeof __attrs === 'function' ? { ...toRefs(getComputedAttr(__attrs, effectData)) } : {}

  if (type === 'Select' && labelField) {
    const change = listener.onChange
    listener.onChange = function (val, currentOption) {
      model.parent[labelField] = currentOption.label
      change && change(val, currentOption)
    }
  }

  // 校验绑定
  // const ruleName = rules && computed(() => (unref(disabled) ? undefined : propChain))

  // 创建元素并进行数据绑定, name和label不做props接收将会自动绑定到根组件上
  const __merged = mergeProps({ ...option.attrs }, listener, computedAttr)
  const attrs: Obj = merge({}, option.attrs, __merged, { disabled })

  return { effectData, attrs, hidden, rules }
}
