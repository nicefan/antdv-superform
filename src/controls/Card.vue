<script setup lang="ts">
import Collections from './Collections'
import ButtonGroup from './ButtonGroup.vue'
import { innerComps } from '../components'

const { Card } = innerComps

const props = defineProps<{
  option: ExCardOption
  children: ModelsMap
  attrs: Obj
  effectData: Obj
}>()
const { title, buttons } = props.option
</script>

<template>
  <Card :title="title" v-bind="attrs">
    <template #extra>
      <ButtonGroup v-if="buttons" :config="buttons"></ButtonGroup>
    </template>
    <Collections v-bind="props" />
  </Card>
</template>
