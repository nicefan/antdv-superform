<template>
  <form-item>
    <slot style="width: 100%" v-bind="{ attrs: { ...valueProps, ...props.attrs }, ...effectData }" />
  </form-item>
</template>

<script setup lang="ts">
import { useVModel } from '../utils'
import baseComps from './base'

const { FormItem } = baseComps

const props = defineProps<{
  option: ExInputOption
  model: ModelData
  attrs: Obj
  effectData: Obj
}>()
const valueProps = props.option.field && useVModel(props)
</script>
