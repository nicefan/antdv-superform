<script setup lang="ts">
import Collections from '../Collections'
import { ButtonGroup } from '../buttons'
import base from '../override'

const props = defineProps<{
  option: ExGroupOption
  model: ModelDataGroup
  effectData: Obj
  disabled?: Ref<boolean | undefined>
}>()
const { label, title = label, buttons } = props.option
</script>

<template>
  <base.Card :title="title">
    <template #extra>
      <ButtonGroup v-if="buttons" :config="buttons" :param="props.effectData"></ButtonGroup>
    </template>
    <Collections v-bind="props" />
  </base.Card>
</template>
