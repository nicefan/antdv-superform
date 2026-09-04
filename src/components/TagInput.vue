<template>
  <component v-for="(tag, index) in tags" :key="tag" :is="() => renderTag(tag, index)" />
  <component
    :is="Input"
    v-if="inputVisible"
    ref="inputRef"
    v-bind="inputProps"
    class="sup-tag-input"
    @blur="handleInputConfirm"
  />
  <component :is="renderAddTag" v-else />
</template>
<script lang="ts" setup>
import { computed, nextTick, ref } from 'vue'
import { getSemanticIconNode, toNode } from '../utils'
import { mapUIFieldProps, renderUIAction, renderUIPresentation, requireUIComponent } from '../adapter'

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
// 延迟到组件渲染阶段解析，避免模块加载早于 app.use 初始化 Adapter。
const Input = computed(() => requireUIComponent('Input'))
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

const renderTag = (tag: string, index: number) => {
  const node = renderUIPresentation(
    'tag',
    {
      removable: getClosable(tag, index),
      onRemove: () => handleClose(tag),
    },
    { default: () => (tag.length > 20 ? `${tag.slice(0, 20)}...` : tag) }
  )
  return tag.length > 20 ? renderUIAction('tooltip', { title: tag }, { default: () => node }) : node
}

const renderAddTag = () =>
  renderUIPresentation(
    'tag',
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
