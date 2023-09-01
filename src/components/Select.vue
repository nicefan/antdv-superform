<template>
  <FormItem>
    <Select
      option-filter-prop="label"
      allow-clear
      :placeholder="'请选择' + option.label"
      v-bind="{ ...valueProps, ...props.attrs, options, onChange }"
    />
  </FormItem>
</template>

<script setup lang="ts">
import { ref, watchPostEffect, unref, watch } from 'vue'
import { useVModel } from '../utils'
import baseComps from './base'
import { globalConfig } from '../plugin'
const { FormItem, Select } = baseComps

const props = defineProps<{
  option: ExSelectOption
  model: ModelData
  attrs: Obj
  effectData: Obj
}>()
const valueProps = useVModel(props)

const { options: orgOptions, labelField } = props.option
const options = ref<Obj[]>(props.attrs?.options || [])
if (typeof orgOptions === 'function') {
  watchPostEffect(() => {
    Promise.resolve(orgOptions(props.effectData)).then((data) => {
      options.value = data
    })
  })
} else if (orgOptions) {
  watch(
    () => props.option.options,
    (data) => (options.value = unref(data as any)),
    { immediate: true }
  )
  // options.value = unref(_options)
} else if (props.option.dictName && globalConfig.dictApi) {
  globalConfig.dictApi(props.option.dictName).then((data) => (options.value = data))
}

let onChange = props.attrs.onChange
if (labelField) {
  const current = props.effectData.current
  onChange = (...args) => {
    const [_, item] = args
    current[labelField] = Array.isArray(item) ? item.map(({ lable }) => lable) : item?.label
    props.attrs.onChange?.(...args)
  }
}
</script>
