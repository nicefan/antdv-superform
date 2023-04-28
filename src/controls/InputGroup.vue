<script setup lang="ts">
import Collections from './Collections'
import { innerComps } from '../components'

const {FormItem, InputGroup} = innerComps

const props = defineProps<{
  option: ExInputGroupOption
  model: ModelData
  children: ModelsMap
}>()
</script>

<template>
  <form-item :label="option.label" style="margin: 0">
    <input-group v-bind="props.option.attr">
      <Collections v-bind="props" />
    </input-group>
  </form-item>
</template>
