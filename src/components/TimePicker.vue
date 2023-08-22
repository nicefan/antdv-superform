<template>
  <form-item>
    <time-picker v-bind="{ ...valueProps, ...props.attrs }" />
  </form-item>
</template>

<script setup lang="ts">
import { useVModel } from '../utils'
import base from './base'

const { FormItem, TimePicker } = base

const props = defineProps<{
  option: ExFormItemOption
  model: ModelData
  attrs: Obj
  effectData: Obj
}>()
const valueProps = useVModel(props)
</script>
