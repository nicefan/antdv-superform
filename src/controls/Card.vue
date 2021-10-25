<script lang="ts"></script>

<script setup lang="ts">
import Collections from './Collections'
import ButtonGroup from './ButtonGroup.vue'

const props = defineProps<{
  option: ExCardOption
  modelData: ModelData
}>()
const { attr, title, buttons } = props.option
</script>

<template>
  <a-card :title="title" v-bind="attr">
    <template #extra>
      <ButtonGroup v-if="buttons" :config="buttons"></ButtonGroup>
    </template>
    <Collections v-bind="props" />
  </a-card>
</template>
