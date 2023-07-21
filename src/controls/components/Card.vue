<script setup lang="ts">
import Collections from '../Collections'
import ButtonGroup from './ButtonGroup.vue'
import base from '../override'
import { inject } from 'vue'

const props = defineProps<{
  option: ExGroupOption
  children: ModelsMap
  attrs: Obj
  effectData: Obj
}>()
const { label, title = label, buttons } = props.option
</script>

<template>
  <base.Card :title="title" v-bind="attrs">
    <template #extra>
      <ButtonGroup v-if="buttons" :config="buttons" :param="{ formData: inject('formData') }"></ButtonGroup>
    </template>
    <Collections v-bind="props" />
  </base.Card>
</template>
