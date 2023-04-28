
<script setup lang="ts">
import Collections from './Collections'
import { innerComps } from '../components'

const {Row, Divider} = innerComps

const props = defineProps<{
  option: ExGroupOption
  model: ModelData
  children: ModelsMap<UniOption>
}>()
const { attr, title } = props.option

</script>
<template>
  <div v-bind="attr">
    <Row v-if="title" :span="24" class="title">
      <slot name="title">
        <Divider orientation="left">{{ title }}</Divider>
      </slot>
    </Row>
    <Collections v-bind="props" />
  </div>
</template>
