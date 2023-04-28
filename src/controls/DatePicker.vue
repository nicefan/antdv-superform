<template>
  <form-item :name="ruleName" :label="label">
    <date-picker autofocus value-format="YYYY-MM-DD" v-bind="attrs" :disabled-date="disabledDate" />
  </form-item>
</template>

<script setup lang="ts">
import useControl from './useControl'
import { innerComps } from '../components'

const {FormItem, DatePicker,} = innerComps

const props = defineProps<{
  option: ExInputOption
  model: ModelData
}>()

const { formData, attrs, ruleName, label } = useControl(props)
const disabledDate = (currentDate) => {
  return attrs.disabledDate?.({ formData, currentDate })
}
</script>
