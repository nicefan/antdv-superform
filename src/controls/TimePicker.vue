<template>
  <a-form-item :name="ruleName" :label="label">
    <a-time-picker v-bind="attrs" />
  </a-form-item>
</template>

<script setup lang="ts">
import useControl from './useControl'

const props = defineProps<{
  option: ExFormOption
  model: ModelData
}>()
// const defData = reactive(defaultData || {})
const { attrs, ruleName, label } = useControl(props)
</script>
