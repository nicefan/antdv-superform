<script setup lang="ts">
import Collections from './Collections'
import { toNode } from '../utils'

const props = defineProps<{
  option: GetOption<'Group'>
  model: ModelDataGroup
  effectData: Obj
  disabled: any
}>()
const title = props.option.title || props.option.label
</script>
<template>
  <div>
    <div v-if="title" class="sup-title ant-descriptions-header">
      <component :is="toNode(title, effectData)" />
    </div>
    <Collections :option="option" :model="model" />
  </div>
</template>
