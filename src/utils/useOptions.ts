import { globalConfig } from '../plugin'
import { isArray, isPlainObject } from 'lodash-es'
import { ref, watchPostEffect, watch, unref, computed } from 'vue'

export function useOptions(option, attrOptions, effectData) {
  const { options: orgOptions, dictName, valueToNumber } = option

  const labelName = option.attrs?.fieldNames?.label || 'label'
  const valueName = option.attrs?.fieldNames?.value || 'value'
  const list = ref<any[]>(attrOptions || [])
  if (typeof orgOptions === 'function') {
    watchPostEffect(() => {
      Promise.resolve(orgOptions(effectData)).then((data) => {
        list.value = data
      })
    })
  } else if (orgOptions) {
    watch(
      () => unref(orgOptions),
      (data) => (list.value = data),
      { immediate: true }
    )
  } else if (dictName && globalConfig.dictApi) {
    globalConfig.dictApi(dictName).then((data) => (list.value = data))
  }

  const optionsRef = computed(() => {
    let labelAsValue = option.labelAsValue ?? option.valueToLabel
    const _list = isArray(list.value) ? list.value : []
    if (_list[0] && !isPlainObject(_list[0]) && !valueToNumber) {
      labelAsValue = true
    }
    // 普通数组转成选项对象数组
    if (isPlainObject(list.value) || !isPlainObject(_list[0])) {
      return Object.entries(list.value).map(([value, label]) => ({
        label,
        value: labelAsValue ? label : valueToNumber ? Number(value) : value,
      }))
    }
    return _list.map((item) => ({
      ...item,
      label: item[labelName],
      value: labelAsValue ? item[labelName] : valueToNumber ? Number(item[valueName]) : item[valueName],
    }))
  })

  return {
    optionsRef,
    setOptions(data) {
      list.value = data
    },
  }
}
