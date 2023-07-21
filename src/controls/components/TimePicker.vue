<template>
  <form-item>
    <time-picker v-bind="allAttrs" />
  </form-item>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
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
const allAttrs = reactive({ ...valueProps, ...props.attrs })
</script>
