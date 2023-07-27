<template>
  <FormItem>
    <Select option-filter-prop="label" :placeholder="'请选择' + option.label" v-bind="allAttrs" :options="options" />
  </FormItem>
</template>

<script setup lang="ts">
import { ref, watchPostEffect, unref, reactive, watch } from 'vue'
import { useVModel } from '../'
import baseComps from '../override'
import { globalConfig } from '../../plugin'
const { FormItem, Select } = baseComps

const props = defineProps<{
  option: ExSelectOption
  model: ModelData
  attrs: Obj
  effectData: Obj
}>()
const valueProps = useVModel(props)
const allAttrs = reactive({ ...valueProps, ...props.attrs })

const options = ref<Obj[]>(props.attrs?.options || [])
const _options = props.option.options
if (typeof _options === 'function') {
  watchPostEffect(() => {
    Promise.resolve(_options(props.effectData)).then((data) => {
      options.value = data
    })
  })
} else if (_options) {
  watch(
    () => props.option.options,
    (data) => (options.value = unref(data as any)),
    { immediate: true }
  )
  // options.value = unref(_options)
} else if (props.option.dictName && globalConfig.dictApi) {
  globalConfig.dictApi(props.option.dictName).then((data) => (options.value = data))
}
</script>
