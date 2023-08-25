<script setup lang="ts">
import Collections from './Collections'
import { ButtonGroup } from './buttons'
import { DetailLayout } from './Detail'
import base from './base'

const props = defineProps<{
  option: ExGroupOption
  model: ModelDataGroup
  effectData: Obj
  isView?: boolean
}>()
const { label, title = label, buttons } = props.option
</script>

<template>
  <base.Card :title="title">
    <template #extra>
      <ButtonGroup v-if="buttons" :config="buttons" :param="props.effectData"></ButtonGroup>
    </template>
    <DetailLayout v-if="isView" :option="option" :modelsMap="model.children" />
    <Collections v-else v-bind="props" />
  </base.Card>
</template>
