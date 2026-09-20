<template>
  <template v-if="optionsRef.length">
    <component v-for="{ label, value } of optionsRef" :key="value" :is="() => renderOption(label, value)" />
  </template>
  <div v-else class="sup-tag-select-empty">{{ placeholder }}</div>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import type { SelectFieldOption } from '../exaTypes'
import { useOptions } from '../utils/useOptions'
import { getUIRender } from '../adapter'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  option: GetBaseOption & SelectFieldOption
  model: ModelData
  effectData: Obj
  value?: (string | number) | (string | number)[]
  options?: any[]
  stringifyValue?: boolean
  multiple?: boolean
  isView?: boolean
  placeholder?: string
}>()

const emit = defineEmits(['update:value', 'change', 'check'])
const { optionsRef: configuredOptions } = useOptions(props.option.options, props.effectData)
const optionsRef = computed(() => (props.option.options === undefined ? props.options ?? [] : configuredOptions.value))

const selected = computed(() => {
  const { value } = props
  const stringifyValue = props.stringifyValue
  if (value === undefined) {
    return []
  } else if (stringifyValue) {
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
    : [tag]

  emit('check', tag, checked)
  updateValue(nextSelected)
  emit('change', tag, nextSelected)
}

const renderOption = (label, value) =>
  getUIRender('checkableTag')(
    {
      class: 'tag-select',
      selected: selected.value.includes(value),
      onSelectedChange: (checked) => handleChange(value, checked),
    },
    { default: () => label }
  )

const updateValue = (val: string[]) => {
  if (!props.multiple) {
    emit('update:value', val[0])
  } else if (props.stringifyValue) {
    emit('update:value', val.join(','))
  } else {
    emit('update:value', val)
  }
}
</script>
