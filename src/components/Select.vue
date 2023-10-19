<template>
  <FormItem>
    <Select
      option-filter-prop="label"
      allow-clear
      :placeholder="'请选择' + option.label"
      v-bind="{ ...valueProps, ...props.attrs, options, onChange, onSearch }"
    />
  </FormItem>
</template>

<script setup lang="ts">
import { ref, watchPostEffect, unref, watch, computed } from 'vue'
import { useVModel } from '../utils'
import baseComps from './base'
import { globalConfig } from '../plugin'
import { throttle, uniq } from 'lodash-es'
const { FormItem, Select } = baseComps

const props = defineProps<{
  option: ExSelectOption
  model: ModelData
  attrs: Obj
  effectData: Obj
}>()
const valueProps = useVModel(props)

const { options: orgOptions, labelField, valueToNumber, valueToLabel } = props.option
const list = ref<any[]>(props.attrs?.options || [])

if (typeof orgOptions === 'function') {
  watchPostEffect(() => {
    Promise.resolve(orgOptions(props.effectData)).then((data) => {
      list.value = data
    })
  })
} else if (orgOptions) {
  watch(
    () => props.option.options,
    (data) => (list.value = unref(data as any)),
    { immediate: true }
  )
  // options.value = unref(_options)
} else if (props.option.dictName && globalConfig.dictApi) {
  globalConfig.dictApi(props.option.dictName).then((data) => (list.value = data))
}

const options = computed(() => {
  const _list = list.value
  if (!_list.length) return _list
  let _options = _list
  if (_list.length && typeof _list[0] !== 'object') {
    _options = uniq(_list).map((val, idx) => {
      const label = String(val)
      return { value: valueToLabel ? label : idx, label }
    })
  } else if (valueToLabel) {
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

let onChange = props.attrs.onChange
if (labelField) {
  const current = props.effectData.current
  onChange = (...args) => {
    const [_, item] = args
    current[labelField] = Array.isArray(item) ? item.map(({ lable }) => lable) : item?.label
    props.attrs.onChange?.(...args)
  }
}

let onSearch = props.attrs.onSearch && throttle(props.attrs.onSearch, 800, { leading: false })
if (props.attrs.showSearch && !onSearch && typeof orgOptions === 'function') {
  const searchHandler = (val) => {
    Promise.resolve(orgOptions(props.effectData, val)).then((data) => {
      list.value = data
    })
  }
  onSearch = throttle(searchHandler, 800, { leading: false })
}
</script>
