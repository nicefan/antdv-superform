<template>
  <component v-for="(tag, index) in tags" :key="tag" :is="() => renderTag(tag, index)" />
  <component :is="renderInput" v-if="inputVisible" />
  <component :is="renderAddTag" v-else />
</template>
<script lang="ts" setup>
import { computed, h, nextTick, ref } from 'vue'
import { getSemanticIconNode, toNode } from '../utils'
import { resolveUIField, getUIRender } from '../adapter'

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
// 延迟到实际显示输入框时解析，并复用字段配置中的 UI 协议。
const inputField = computed(() => resolveUIField('Input')!)
const renderInput = () => {
  const field = inputField.value
  const context = {
    type: 'Input',
    option: props.option,
    model: props.model,
    effectData: props.effectData,
    state: {},
    binding: { value: inputValue.value, 'onUpdate:value': (value) => (inputValue.value = value) },
  }
  const attrs = field.getAttrs(
    {
      ref: (instance) => (inputRef.value = instance),
      class: 'sup-tag-input',
      onBlur: handleInputConfirm,
    },
    props.option,
    context.state
  )
  return field.render({ ...context, attrs, slots: {} })
}

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

const renderTag = (tag: string, index: number) => {
  const node = getUIRender('tag')(
    {
      removable: getClosable(tag, index),
      onRemove: () => handleClose(tag),
    },
    { default: () => (tag.length > 20 ? `${tag.slice(0, 20)}...` : tag) }
  )
  return tag.length > 20 ? getUIRender('tooltip')({ title: tag }, { default: () => node }) : node
}

const renderAddTag = () =>
  getUIRender('tag')(
    { class: 'sup-tag-add', onClick: showInput },
    { default: () => [getSemanticIconNode('add'), toNode(props.newLabel, props.effectData)] }
  )

const updateValue = (val: string[]) => {
  if (props.stringifyValue) {
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
