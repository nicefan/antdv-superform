<template>
  <form-item>
    <range-picker value-format="YYYY-MM-DD" v-bind="allAttrs" :disabled-date="disabledDate" />
  </form-item>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useVModel } from '../'
import baseComps from '../override'

const { FormItem, RangePicker } = baseComps

const props = defineProps<{
  option: ExInputOption
  model: ModelData
  attrs: Obj
  effectData: Obj
}>()
const valueProps = useVModel(props)
const allAttrs = reactive({ ...valueProps, ...props.attrs })

const disabledDate = (currentDate) => {
  return props.attrs.disabledDate?.(currentDate, props.effectData)
}
</script>
