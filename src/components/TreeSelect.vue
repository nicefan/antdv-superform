<template>
  <form-item>
    <tree-select
      :placeholder="'请选择' + option.label"
      allow-clear
      v-bind="{ ...valueProps, ...props.attrs, onChange }"
      :tree-data="treeData"
    />
  </form-item>
</template>

<script setup lang="ts">
import { ref, watchPostEffect, toValue } from 'vue'
import { useVModel } from '../utils'
import baseComps from './base'

const { FormItem, TreeSelect } = baseComps

const props = defineProps<{
  option: ExTreeOption
  model: ModelData
  attrs: Obj
  effectData: Obj
}>()
const valueProps = useVModel(props)

const treeData = ref<Obj[]>([])
const { data, labelField } = props.option
if (typeof data === 'function') {
  watchPostEffect(() => {
    Promise.resolve(data(props.effectData)).then((res) => {
      treeData.value = res
    })
  })
} else if (data) {
  treeData.value = toValue(data)
}
let onChange = props.attrs.onChange
if (labelField) {
  const current = props.effectData.current
  onChange = (...args) => {
    const [val, labels] = args
    current[labelField] = Array.isArray(val) ? labels : labels[0]
    props.attrs.onChange?.(...args)
  }
}

// 异步获取
// 字典配置
/**
 *  动态切换
 *  依赖某值变化切换
 *
 */
</script>
