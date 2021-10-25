<script setup lang="ts">
import Collections from './Collections'

const props = defineProps<{
  option: ExInputGroupOption
  modelData: ModelData
}>()
</script>

<template>
  <a-form-item :label="option.label" style="margin: 0">
    <a-input-group v-bind="props.option.attr">
      <Collections v-bind="props" />
    </a-input-group>
  </a-form-item>
</template>
