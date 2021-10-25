<template>
  <a-form-item :name="ruleName" :label="label">
    <a-input-number style="width:100%" type="number" :placeholder="'请输入' + label" v-bind="attrs" />
  </a-form-item>
</template>

<script setup lang="ts">
import useControl from './useControl'

const props = defineProps<{
  option: ExInputOption
  modelData: ModelData
}>()
// const defData = reactive(defaultData || {})
const { formData, attrs, ruleName, label } = useControl(props)

</script>
