<template>
  <form-item>
    <input-number
      style="width: 100%"
      type="number"
      :placeholder="'请输入' + option.label"
      v-bind="{ ...valueProps, ...props.attrs }"
    />
  </form-item>
</template>

<script setup lang="ts">
import { useVModel } from '../'
import baseComps from '../override'

const { FormItem, InputNumber } = baseComps

const props = defineProps<{
  option: ExInputOption
  model: ModelData
  attrs: Obj
  effectData: Obj
}>()
const valueProps = useVModel(props)
</script>
