<script setup lang="ts">
import base from './base'
import Collections from './Collections'
const { FormItem, InputGroup } = base

const props = defineProps<{
  option: ExInputGroupOption
  model: ModelDataGroup
  attrs?: Obj
  effectData: Obj
}>()
</script>

<template>
  <form-item style="margin: 0">
    <input-group v-bind="attrs">
      <Collections v-bind="{ option, model }" />
    </input-group>
  </form-item>
</template>
