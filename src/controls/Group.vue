
<script setup lang="ts">
import Collections from './Collections'

const props = defineProps<{
  option: ExGroupOption
  model: ModelData
  children: ModelsMap<UniOption>
}>()
const { attr, title } = props.option

</script>
<template>
  <div v-bind="attr">
    <a-row v-if="title" :span="24" class="title">
      <slot name="title">
        <a-divider orientation="left">{{ title }}</a-divider>
      </slot>
    </a-row>
    <Collections v-bind="props" />
  </div>
</template>
