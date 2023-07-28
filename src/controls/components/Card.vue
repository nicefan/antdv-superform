<script setup lang="ts">
import Collections from '../Collections'
import { ButtonGroup } from '../buttons'
import base from '../override'
import { inject } from 'vue'
import { ExGroupProps } from '../propTypes';

const props = defineProps<ExGroupProps>()
const { label, title = label, buttons } = props.option
</script>

<template>
  <base.Card :title="title" v-bind="attrs">
    <template #extra>
      <ButtonGroup v-if="buttons" :config="buttons" :param="{ formData: inject<any>('exaProvider')?.data }"></ButtonGroup>
    </template>
    <Collections v-bind="props" />
  </base.Card>
</template>
