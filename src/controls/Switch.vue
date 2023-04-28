<template>
  <form-item :name="ruleName" :label="label">
    <Switch
      v-model:checked="attrs.value"
      :checked-children="trueName"
      :un-checked-children="falseName"
      :checked-value="1"
      :un-checked-value="0"
      v-bind="attrs"
    />
  </form-item>
</template>

<script setup lang="ts">
import useControl from './useControl'
import { innerComps } from '../components'

const {FormItem, Switch} = innerComps

const props = defineProps<{
  option: ExSwitchOption
  model: ModelData
}>()
const {
  attrs,
  ruleName,
  label,
} = useControl(props)

const [falseName, trueName] = props.option.valueLabels || []
</script>
