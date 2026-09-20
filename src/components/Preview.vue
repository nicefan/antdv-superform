<template><RenderPreview /></template>
<script setup lang="ts">
import { getUIRender } from '../adapter'
const emit = defineEmits(['update:value'])
const props = defineProps<{
  images?: string[]
  visible: boolean
  current?: number
  width?: string | number
  height?: string | number
}>()

const setVisible = (boo) => {
  emit('update:value', boo)
}

const RenderPreview = () =>
  getUIRender('preview')({
    images: props.images,
    visible: props.visible,
    current: props.current,
    width: props.width,
    height: props.height,
    'onUpdate:visible': setVisible,
  })
</script>
