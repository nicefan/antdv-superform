<script setup lang="ts">
import Collections from './Collections'
import { innerComps } from '../components'

const { FormItem, InputGroup } = innerComps

const props = defineProps<{
  option: ExInputGroupOption
  model: ModelData
  children: ModelsMap
  attrs: Obj
  effectData: Obj
}>()
</script>

<template>
  <form-item style="margin: 0">
    <input-group v-bind="attrs">
      <Collections v-bind="props" />
    </input-group>
  </form-item>
</template>
