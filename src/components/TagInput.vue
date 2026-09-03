<template>
  <template v-for="(tag, index) in tags" :key="tag">
    <component :is="Tooltip" v-if="tag.length > 20" :title="tag">
      <component :is="Tag" :closable="getClosable(tag, index)" @close="handleClose(tag)" v-bind="$attrs">
        {{ `${tag.slice(0, 20)}...` }}
      </component>
    </component>
    <component :is="Tag" v-else :closable="getClosable(tag, index)" @close="handleClose(tag)" v-bind="$attrs">
      {{ tag }}
    </component>
  </template>
  <component
    :is="Input"
    v-if="inputVisible"
    ref="inputRef"
    v-bind="inputProps"
    type="text"
    size="small"
    :style="{ width: '78px' }"
    @blur="handleInputConfirm"
  />
  <component :is="Tag" v-else style="background: #fff; border-style: dashed" @click="showInput">
    <component :is="getSemanticIconNode('add')" />
    <component :is="() => toNode(newLabel, effectData)" />
  </component>
</template>
<script lang="ts" setup>
import { computed, nextTick, ref, type Slot } from 'vue'
import { getSemanticIconNode, toNode } from '../utils'
import {
  mapUIFieldProps,
  resolveUIActionComponent,
  resolveUIComponent,
  resolveUIPresentationComponent,
} from '../adapter'

const Input = resolveUIComponent('Input')
const Tooltip = resolveUIActionComponent('tooltip')
const Tag = resolveUIPresentationComponent('tag')

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    option: GetBaseOption
    model: ModelData
    effectData: Obj
    value?: string | string[]
    stringifyValue?: boolean
    /** @deprecated 使用 `stringifyValue` */
    valueToString?: boolean
    newLabel?: string | Fn
    isView?: boolean
    closable?: boolean | Fn
  }>(),
  {
    newLabel: '添加',
    closable: true,
  }
)

const emit = defineEmits(['update:value'])

const inputRef = ref()
const inputValue = ref('')
const inputVisible = ref(false)
const inputProps = computed(() =>
  mapUIFieldProps(
    'Input',
    {
      value: inputValue.value,
      'onUpdate:value': (value) => (inputValue.value = value),
    },
    { option: props.option, effectData: props.effectData }
  )
)

// watch(
//   () => props.value,
//   (val) => {
//     val ?? emit('update:value', [])
//   },
// )
const getClosable = (tag: string, index: number) => {
  if (typeof props.closable === 'function') {
    return props.closable(tag, index)
  }
  return props.closable
}

const tags = computed(() => {
  if (!props.value) {
    return []
  } else if (typeof props.value === 'string') {
    return (props.value as string).split(',')
  } else {
    return props.value
  }
})
const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    inputRef.value.focus()
  })
}
const handleClose = (removedTag) => {
  const _tags = tags.value.filter((tag) => tag !== removedTag)
  updateValue(_tags)
}

const updateValue = (val: string[]) => {
  if (props.stringifyValue || props.valueToString) {
    emit('update:value', val.join(','))
  } else {
    emit('update:value', val)
  }
}

const handleInputConfirm = () => {
  if (inputValue.value && tags.value.indexOf(inputValue.value) === -1) {
    updateValue([...tags.value, inputValue.value])
  }
  inputVisible.value = false
  inputValue.value = ''
}
</script>
