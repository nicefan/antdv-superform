<template>
  <form-item>
    <input-number style="width: 100%" type="number" :placeholder="'请输入' + option.label" v-bind="allAttrs" />
  </form-item>
</template>

<script setup lang="ts">
import useControl, { useVModel } from './useControl'
import { innerComps } from '../components'
import { reactive } from 'vue'

const { FormItem, InputNumber } = innerComps

const props = defineProps<{
  option: ExInputOption
  model: ModelData
  attrs: Obj
  effectData: Obj
}>()
const valueProps = useVModel(props)
const allAttrs = reactive({ ...valueProps, ...props.attrs })
</script>
