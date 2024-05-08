<template>
  <template v-for="(tag, index) in tags" :key="tag">
    <Tooltip v-if="tag.length > 20" :title="tag">
      <Tag :closable="index !== 0" @close="handleClose(tag)">
        {{ `${tag.slice(0, 20)}...` }}
      </Tag>
    </Tooltip>
    <Tag v-else :closable="index !== 0" @close="handleClose(tag)">
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
    New Tag
  </Tag>
</template>
<script lang="ts" setup>
import { computed, defineComponent, nextTick, ref, watch } from 'vue'
import baseComps from './base';
import { PlusOutlined } from '@ant-design/icons-vue';

const {Input, Tooltip, Tag} = baseComps

defineOptions({
  inheritAttrs: false,
})

const props = defineProps<{
  option: GetBaseOption
  model: ModelData
  effectData: Obj
  value?: string | string[]
  valueToString?: boolean
  isView?: boolean
}>()

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
