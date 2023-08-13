<script setup lang="ts">
import Collections from '../Collections'
import { ButtonGroup } from '../buttons'
import base from '../override'
import { CommonProps } from '../propTypes';

const props = defineProps<CommonProps<ExGroupOption>>()
const { label, title = label, buttons } = props.option
</script>

<template>
  <base.Card :title="title" v-bind="attrs">
    <template #extra>
      <ButtonGroup v-if="buttons" :config="buttons" :param="props.effectData"></ButtonGroup>
    </template>
    <Collections :option="props.option" :children="props.model.children" />
  </base.Card>
</template>
