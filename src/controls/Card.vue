<script setup lang="ts">
import Collections from './Collections'
import ButtonGroup from './ButtonGroup.vue'
import { innerComps } from '../components'

const {Card} = innerComps

const props = defineProps<{
  option: ExCardOption
  children: ModelsMap
}>()
const { attr, title, buttons } = props.option
</script>

<template>
  <Card :title="title" v-bind="attr">
    <template #extra>
      <ButtonGroup v-if="buttons" :config="buttons"></ButtonGroup>
    </template>
    <Collections v-bind="props" />
  </Card>
</template>
