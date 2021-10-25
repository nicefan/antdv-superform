
<script setup lang="ts">
import Collections from './Collections'

const props = defineProps<{
  option: ExGroupOption
  modelData: ModelData
}>()
const { attr, title } = props.option

</script>
<template>
  <div style="width: 100%" class="form-group-list ant-row" v-bind="attr">
    <a-row v-if="title" :span="24" class="title">
      <slot name="title">
        <a-divider orientation="left">{{ title }}</a-divider>
      </slot>
    </a-row>
    <Collections v-bind="props" />
  </div>
</template>
