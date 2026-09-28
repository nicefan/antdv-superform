<template>
  <div class="sup-tag-input-group">
    <component v-for="(tag, index) in tags" :key="tag" :is="renderTag" :tag="tag" :index="index" />
    <span v-if="inputVisible" class="sup-tag-input-editor">
      <component :is="renderInput" />
    </span>
    <component :is="renderAddButton" v-else />
  </div>
</template>
<script lang="ts" setup>
import { computed, nextTick, ref } from 'vue'
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
    newLabel: '',
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
      size: 'small',
      onBlur: handleInputConfirm,
      onKeydown: handleInputKeydown,
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

// 保持组件类型稳定，切换输入框时复用已有标签，避免重新挂载触发入场动画。
const renderTag = ({ tag, index }: { tag: string; index: number }) => {
  const node = getUIRender('tag')(
    {
      removable: getClosable(tag, index),
      onRemove: () => handleClose(tag),
    },
    { default: () => (tag.length > 20 ? `${tag.slice(0, 20)}...` : tag) }
  )
  return tag.length > 20 ? getUIRender('tooltip')({ title: tag }, { default: () => node }) : node
}

const renderAddButton = () =>
  getUIRender('button')(
    { size: 'small', 'aria-label': '添加标签', onClick: showInput, class: 'sup-tag-add' },
    { default: () => [getSemanticIconNode('add'), toNode(props.newLabel, props.effectData)] }
  )

const updateValue = (val: string[]) => {
  if (props.stringifyValue) {
    emit('update:value', val.join(','))
  } else {
    emit('update:value', val)
  }
}

const handleInputKeydown = (event: KeyboardEvent) => {
  // 输入法选词的回车不提交标签；229 兼容部分浏览器在组合输入结束时的按键事件。
  if (event.key !== 'Enter' || event.isComposing || event.keyCode === 229) return
  event.preventDefault()
  event.stopPropagation()
  handleInputConfirm()
}

const handleInputConfirm = () => {
  if (inputValue.value && tags.value.indexOf(inputValue.value) === -1) {
    updateValue([...tags.value, inputValue.value])
  }
  inputVisible.value = false
  inputValue.value = ''
}
</script>
