<template>
  <form-item>
    <input-number
      style="width: 100%"
      type="number"
      allow-clear
      :placeholder="'请输入' + option.label"
      v-bind="{ ...valueProps, ...props.attrs }"
    />
  </form-item>
</template>

<script setup lang="ts">
import { useVModel } from '../utils'
import baseComps from './base'

const { FormItem, InputNumber } = baseComps

const props = defineProps<{
  option: ExInputOption
  model: ModelData
  attrs: Obj
  effectData: Obj
}>()
const valueProps = useVModel(props)
</script>
