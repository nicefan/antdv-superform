import { toRefs, mergeProps, computed, toValue } from 'vue'
import { getListener, getComputedAttr, getComputedStatus } from './reactivity'
import { merge } from 'lodash-es'
import { globalProps } from '../plugin'
type Param = {
  option: Obj
  // 动态属性方法需要传递的参数
  effectData: Obj
  /** tabs, collapse子面板不用传递 */
  inheritDisabled?: Ref<boolean | undefined>
}

export default function render({ option, effectData, inheritDisabled }: Param) {
  const { type, dynamicAttrs: __attrs, disabled: __disabled, hidden: __hidden } = option

  // 元素隐藏控制
  const hidden = getComputedStatus(__hidden, effectData)

  // 元素禁用控制
  const disabled = computed(() => {
    let bool = toValue(inheritDisabled)
    if (!bool) {
      if (typeof __disabled === 'function') {
        bool = !!__disabled(effectData)
      } else {
        bool = toValue(__disabled)
      }
    }
    return bool
  })

  // 事件控制
  const listener = getListener(option, effectData)

  // 动态属性
  const computedAttr = typeof __attrs === 'function' ? { ...toRefs(getComputedAttr(__attrs, effectData)) } : {}

  // 浅层props合并
  const __merged = mergeProps({ ...globalProps[type] }, { ...option.attrs }, listener, computedAttr)
  const attrs: Obj = merge({}, option.attrs, __merged, { disabled })

  return { attrs, hidden }
}
