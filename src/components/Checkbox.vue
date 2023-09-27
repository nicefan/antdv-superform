<template>
  <form-item>
    <checkbox-group :name="option.field" v-bind="{ ...valueProps, ...props.attrs }" :options="options" />
  </form-item>
</template>

<script setup lang="ts">
import { ref, watchPostEffect, toValue } from 'vue'
import { useVModel } from '../utils'
import base from './base'

const { FormItem, CheckboxGroup } = base

const props = defineProps<{
  option: ExSelectOption
  model: ModelData
  attrs: Obj
  effectData: Obj
}>()
const valueProps = useVModel(props)

const options = ref<any[] | undefined>(props.attrs.options || [])
const _options = props.option.options
if (typeof _options === 'function') {
  watchPostEffect(() => {
    Promise.resolve(_options(props.effectData)).then((data) => {
      options.value = data
    })
  })
} else if (_options) {
  options.value = toValue(_options) as any[]
}
// 异步获取
// 字典配置
/**
 *  动态切换
 *  依赖某值变化切换
 *
 */
</script>
