<template>
  <tree-select :placeholder="'请选择' + option.label" allow-clear @Change="onChange" :tree-data="treeData" />
</template>

<script setup lang="ts">
import { ref, watchPostEffect, watch } from 'vue'
import baseComps from './base'

const { TreeSelect } = baseComps

const props = defineProps<{
  option: GetOption<'TreeSelect'>
  model: ModelData
  effectData: Obj
  onChange?: Fn
}>()

const treeData = ref<Obj[]>([])
const { data, labelField } = props.option
if (typeof data === 'function') {
  watchPostEffect(() => {
    Promise.resolve(data(props.effectData)).then((res) => {
      treeData.value = res
    })
  })
} else if (data) {
  watch(
    () => props.option.data,
    (data) => (treeData.value = data as any),
    { immediate: true }
  )
}
let onChange = props.onChange
if (labelField) {
  const current = props.effectData.current
  onChange = (...args) => {
    const [val, labels] = args
    current[labelField] = Array.isArray(val) ? labels : labels[0]
    props.onChange?.(...args)
  }
}
</script>
