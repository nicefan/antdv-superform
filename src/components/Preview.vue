<template>
  <Image.PreviewGroup
    :style="{ display: 'none' }"
    :preview="{
      visible,
      onVisibleChange: setVisible,
      current,
    }"
  >
    <Image v-for="(img, index) of images" :key="index" :width="width" :src="img" :height="height" />
  </Image.PreviewGroup>
</template>
<script setup lang="ts">
import { Image } from 'ant-design-vue'
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
</script>
