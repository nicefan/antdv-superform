<script setup lang="ts">
import Collections from '../Collections'
import { Row, Divider } from 'ant-design-vue'

const props = defineProps<{
  option: ExGroupOption
  model: ModelDataGroup
  effectData: Obj
}>()
const title = props.option.title || props.option.label
</script>
<template>
  <div>
    <Row v-if="title" :span="24" class="title">
      <slot name="title">
        <Divider orientation="left">{{ title }}</Divider>
      </slot>
    </Row>
    <Collections v-bind="props" />
  </div>
</template>
