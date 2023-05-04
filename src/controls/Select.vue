<template>
  <FormItem>
    <Select option-filter-prop="label" :placeholder="'请选择' + option.label" v-bind="allAttrs" :options="options" />
  </FormItem>
</template>

<script setup lang="ts">
import { ref, watchPostEffect, unref, reactive } from 'vue'
import useControl, { useVModel } from './useControl'
import { innerComps } from '../components'

const { FormItem, Select } = innerComps

const props = defineProps<{
  option: ExSelectOption
  model: ModelData
  attrs: Obj
  effectData: Obj
}>()
const valueProps = useVModel(props)
const allAttrs = reactive({ ...valueProps, ...props.attrs })

const options = ref<Obj[] | undefined>(props.attrs.options || [])
const _options = props.option.options
if (typeof _options === 'function') {
  watchPostEffect(() => {
    Promise.resolve(_options(props.effectData)).then((data) => {
      options.value = data
    })
  })
} else if (_options) {
  options.value = unref(_options)
}
// 异步获取
// 字典配置
/**
 *  动态切换
 *  依赖某值变化切换
 *
 */
</script>
