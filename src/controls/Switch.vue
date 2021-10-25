<template>
  <a-form-item :name="ruleName" :label="label">
    <a-switch
      :checked-children="trueName"
      :un-checked-children="falseName"
      :checked-value="1"
      :un-checked-value="0"
      :checked="attrs.value"
      v-bind="attrs"
      @update:checked="attrs['onUpdate:value']"
    />
  </a-form-item>
</template>

<script setup lang="ts">
import useControl from './useControl'

const props = defineProps<{
  option: ExSwitchOption
  modelData: ModelData
}>()
const { formData, attrs, ruleName, label } = useControl(props)

const [trueName, falseName] = props.option.valueLabels || []
</script>
