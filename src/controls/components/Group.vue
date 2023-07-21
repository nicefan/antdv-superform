<script setup lang="ts">
import Collections from '../Collections'
import { Row, Divider } from 'ant-design-vue'

const props = defineProps<{
  option: ExGroupOption
  model: ModelData
  children: ModelsMap<UniOption>
  attrs: Obj
  effectData: Obj
}>()
const title = props.option.title || props.option.label
</script>
<template>
  <div v-bind="attrs">
    <Row v-if="title" :span="24" class="title">
      <slot name="title">
        <Divider orientation="left">{{ title }}</Divider>
      </slot>
    </Row>
    <Collections v-bind="{ option, model, children }" />
  </div>
</template>
