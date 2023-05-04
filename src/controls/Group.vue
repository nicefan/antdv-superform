<script setup lang="ts">
import Collections from './Collections'
import { innerComps } from '../components'

const { Row, Divider } = innerComps

const props = defineProps<{
  option: ExGroupOption
  model: ModelData
  children: ModelsMap<UniOption>
  attrs: Obj
  effectData: Obj
}>()
</script>
<template>
  <div v-bind="attrs">
    <Row v-if="option.title" :span="24" class="title">
      <slot name="title">
        <Divider orientation="left">{{ option.title }}</Divider>
      </slot>
    </Row>
    <Collections v-bind="props" />
  </div>
</template>
