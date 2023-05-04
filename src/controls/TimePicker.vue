<template>
  <form-item>
    <time-picker v-bind="allAttrs" />
  </form-item>
</template>

<script setup lang="ts">
import useControl, { useVModel } from './useControl'
import { innerComps } from '../components'
import { reactive } from 'vue'

const { FormItem, TimePicker } = innerComps

const props = defineProps<{
  option: ExFormOption
  model: ModelData
  attrs: Obj
  effectData: Obj
}>()
const valueProps = useVModel(props)
const allAttrs = reactive({ ...valueProps, ...props.attrs })
</script>
