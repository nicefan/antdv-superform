<template>
  <form-item>
    <Switch
      v-model:checked="valueProps.value"
      :checked-children="trueName"
      :un-checked-children="falseName"
      :checked-value="1"
      :un-checked-value="0"
      v-bind="attrs"
    />
  </form-item>
</template>

<script setup lang="ts">
import { useVModel } from '../utils'
import baseComps from './base'

const { FormItem, Switch } = baseComps

const props = defineProps<{
  option: ExSwitchOption
  model: ModelData
  attrs: Obj
  effectData: Obj
}>()
const valueProps = useVModel(props, 0)

const [falseName, trueName] = props.option.valueLabels || []
</script>
