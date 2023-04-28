<template>
  <form-item :name="ruleName" :label="label">
    <input-number style="width:100%" type="number" :placeholder="'请输入' + label" v-bind="attrs" />
  </form-item>
</template>

<script setup lang="ts">
import useControl from './useControl'
import { innerComps } from '../components'

const {FormItem, InputNumber} = innerComps

const props = defineProps<{
  option: ExInputOption
  model: ModelData
}>()
// const defData = reactive(defaultData || {})
const { formData, attrs, ruleName, label } = useControl(props)
</script>
