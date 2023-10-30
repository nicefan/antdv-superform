import { globalConfig } from '../plugin'
import { uniq } from 'lodash-es'
import { ref, watchPostEffect, watch, unref, computed } from 'vue'

export function useOptions(option, attrOptions, effectData) {
  const { options: orgOptions, dictName, valueToNumber, valueToLabel } = option

  const list = ref<any[]>(attrOptions || [])
  if (typeof orgOptions === 'function') {
    watchPostEffect(() => {
      Promise.resolve(orgOptions(effectData)).then((data) => {
        list.value = data
      })
    })
  } else if (orgOptions) {
    watch(
      () => option.options,
      (data) => (list.value = unref(data as any)),
      { immediate: true }
    )
  } else if (dictName && globalConfig.dictApi) {
    globalConfig.dictApi(dictName).then((data) => (list.value = data))
  }

  const optionsRef = computed(() => {
    const _list = list.value
    if (!_list.length) return _list
    let _options = _list
    if (_list.length && typeof _list[0] !== 'object') {
      // 普通数组转成选项对象数组
      _options = uniq(_list).map((val, idx) => {
        const label = String(val)
        return { value: valueToLabel ? label : idx, label }
      })
    } else if (valueToLabel) {
      // value 替换成 label
      _options = _list.map(({ label }) => ({ value: label, label }))
    }
    if (valueToNumber) {
      return _options.map((item) => ({
        ...item,
        value: Number(item.value),
      }))
    } else {
      return _options
    }
  })

  return {
    optionsRef,
    setOptions(data) {
      list.value = data
    },
  }
}
