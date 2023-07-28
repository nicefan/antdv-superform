<template>
  <form-item>
    <time-picker v-bind="{ ...valueProps, ...props.attrs }" />
  </form-item>
</template>

<script setup lang="ts">
import useVModel from '../useVModel'
import baseComps from '../override'

const { FormItem, TimePicker } = baseComps

const props = defineProps<{
  option: ExFormItemOption
  model: ModelData
  attrs: Obj
  effectData: Obj
}>()
const valueProps = useVModel(props)
</script>
