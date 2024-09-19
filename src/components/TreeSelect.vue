<template>
  <tree-select :placeholder="'请选择' + option.label" allow-clear @Change="onChange" :tree-data="dataRef" />
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

const dataRef = ref<any[]>([])
const { data, treeData = data, labelField } = props.option
if (typeof treeData === 'function') {
  watchPostEffect(() => {
    Promise.resolve(treeData(props.effectData)).then((res) => {
      dataRef.value = res || []
    })
  })
} else if (data) {
  watch(
    () => treeData,
    (data) => (dataRef.value = data as any),
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
