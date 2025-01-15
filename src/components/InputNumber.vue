<template>
  <input-number style="width: 100%" type="number" :placeholder="'请输入' + option.label" />
</template>

<script setup lang="ts">
import baseComps from './base'

const { InputNumber } = baseComps

const props = defineProps<{
  option: GetOption<'InputNumber'>
  model: ModelData
  effectData: Obj
}>()
</script>
