<template>
  <component :is="() => state.render()" />
</template>
<script setup lang="ts">
import { inject, reactive } from 'vue'
import type { ExtButtons } from '../../exaTypes'
import { useButtonState } from './useButtonState'

const props = defineProps<{ option: ExtButtons; methods?: Obj; effectData?: Obj }>()
const config = Array.isArray(props.option) ? { actions: props.option } : props.option
const state = useButtonState(config, reactive(props.effectData || {}), props.methods, inject('rootSlots', {}))
</script>
