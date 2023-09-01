<template>
  <FormItem>
    <Textarea
      style="width: 100%"
      allow-clear
      :placeholder="'请输入' + option.label"
      v-bind="{ ...valueProps, ...props.attrs }"
    />
  </FormItem>
</template>

<script setup lang="ts">
import { useVModel } from '../utils'
import baseComps from './base'

const { FormItem, Textarea } = baseComps

const props = defineProps<{
  option: ExInputOption
  model: ModelData
  attrs: Obj
  effectData: Obj
}>()
const valueProps = useVModel(props)
</script>
