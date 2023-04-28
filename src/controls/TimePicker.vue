<template>
  <form-item :name="ruleName" :label="label">
    <time-picker v-bind="attrs" />
  </form-item>
</template>

<script setup lang="ts">
import useControl from './useControl'
import { innerComps } from '../components'

const {FormItem, TimePicker} = innerComps

const props = defineProps<{
  option: ExFormOption
  model: ModelData
}>()
// const defData = reactive(defaultData || {})
const { attrs, ruleName, label } = useControl(props)
</script>
