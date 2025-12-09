<template>
  <template v-for="(tag, index) in tags" :key="tag">
    <Tooltip v-if="tag.length > 20" :title="tag">
      <Tag :closable="getClosable(tag, index)" @close="handleClose(tag)" v-bind="$attrs">
        {{ `${tag.slice(0, 20)}...` }}
      </Tag>
    </Tooltip>
    <Tag v-else :closable="getClosable(tag, index)" @close="handleClose(tag)" v-bind="$attrs">
      {{ tag }}
    </Tag>
  </template>
  <Input
    v-if="inputVisible"
    ref="inputRef"
    v-model:value="inputValue"
    type="text"
    size="small"
    :style="{ width: '78px' }"
    @blur="handleInputConfirm"
  />
  <Tag v-else style="background: #fff; border-style: dashed" @click="showInput">
    <plus-outlined />
    <component :is="() => toNode(newLabel, effectData)" />
  </Tag>
</template>
<script lang="ts" setup>
import { computed, nextTick, ref, type Slot } from 'vue'
import baseComps from './base'
import { PlusOutlined } from '@ant-design/icons-vue'
import { toNode } from '../utils'

const { Input, Tooltip, Tag } = baseComps

defineOptions({
  inheritAttrs: false,
})

const props = withDefaults(
  defineProps<{
    option: GetBaseOption
    model: ModelData
    effectData: Obj
    value?: string | string[]
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
  if (props.valueToString) {
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
