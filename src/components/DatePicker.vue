<template>
  <form-item>
    <date-picker
      autofocus
      value-format="YYYY-MM-DD"
      v-bind="{ ...valueProps, ...props.attrs }"
      :disabled-date="disabledDate"
    />
  </form-item>
</template>

<script setup lang="ts">
import { useVModel } from '../utils'
import base from './base'

const { FormItem, DatePicker } = base

const props = defineProps<{
  option: ExInputOption
  model: ModelData
  attrs: Obj
  effectData: Obj
}>()
const valueProps = useVModel(props)

const disabledDate = (currentDate) => {
  return props.attrs.disabledDate?.(currentDate, props.effectData)
}
</script>
