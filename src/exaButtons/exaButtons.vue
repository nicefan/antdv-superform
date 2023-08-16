<template>
  <ButtonGroup :config="config"></ButtonGroup>
</template>
<script setup lang="ts">
import { SpaceProps } from 'ant-design-vue'
import { ButtonGroup } from '../controls/buttons'

interface ButtonsProps extends SpaceProps {
  limit?: number
  itemType?: 'primary' | 'link' | 'text' | 'dashed' | 'ghost' | 'default'
  itemShape?: 'circle' | 'round' | 'default'
  itemSize?: 'large' | 'middle' | 'small'
  /** 是否只显示图标 */
  iconOnly?: boolean
  hidden?: boolean | Fn<boolean>
  disabled?: boolean | Fn<boolean>
  actions?: ButtonItem[]
}
const {
  limit,
  itemShape: shape,
  itemType: type,
  itemSize: size,
  iconOnly,
  hidden,
  disabled,
  actions,
} = defineProps<ButtonsProps>()
const config: ExButtonGroup = {
  defaultAttrs: { type, size, shape },
  limit,
  iconOnly,
  hidden,
  disabled,
  actions,
}
</script>
