<script setup lang="ts">
import Collections from '../Collections'
import baseComps from '../override'

const { FormItem, InputGroup } = baseComps

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
      <Collections v-bind="{ option, children: model.children }" />
    </input-group>
  </form-item>
</template>
