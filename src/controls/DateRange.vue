<template>
  <a-form-item :name="ruleName" :label="label">
    <a-range-picker value-format="YYYY-MM-DD" v-bind="attrs" :disabled-date="disabledDate" />
  </a-form-item>
</template>

<script setup lang="ts">
import useControl from './useControl'

const props = defineProps<{
  option: ExInputOption
  model: ModelData
}>()

const { formData, attrs, ruleName, label } = useControl(props)
const disabledDate = (currentDate) => {
  return attrs.disabledDate?.({ formData, currentDate })
}
</script>
