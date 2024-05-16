<template>
  <checkable-tag
    v-bind ="$attrs"
    class="tag-select"
    v-for="{ label, value } of optionsRef"
    :key="value"
    :checked="selected.indexOf(value) > -1"
    @change="(checked) => handleChange(value, checked)"
  >
    {{ label }}
  </checkable-tag>
</template>
<script lang="ts" setup>
import { computed, effect, ref } from 'vue'
import baseComps from './base'
import { useOptions } from '../utils/useOptions'

const { CheckableTag } = baseComps

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  option: GetBaseOption
  model: ModelData
  effectData: Obj
  value?: (string | number) | (string | number)[]
  options?: any[]
  valueToString?: boolean
  multiple?: boolean
  isView?: boolean
}>()

const emit = defineEmits(['update:value', 'change'])
const { optionsRef } = useOptions(props.option, props.options, props.effectData)

const selected = computed(() => {
  const { value, valueToString } = props
  if (value === undefined) {
    return []
  } else if (valueToString) {
    return (value as string).split(',')
  } else if (Array.isArray(value)) {
    return value
  } else {
    return [value]
  }
})

const handleChange = (tag, checked) => {
  const nextSelected = props.multiple
    ? checked
      ? [...selected.value, tag]
      : selected.value.filter((_tag) => _tag !== tag)
    : checked
    ? [tag]
    : []
  updateValue(nextSelected)
  emit('change', props.effectData, tag, checked )
}

const updateValue = (val: string[]) => {
  if (!props.multiple) {
    emit('update:value', val[0])
  } else if (props.valueToString) {
    emit('update:value', val.join(','))
  } else {
    emit('update:value', val)
  }
}
</script>
