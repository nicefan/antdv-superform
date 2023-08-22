<template>
  <ButtonGroup :config="$props"></ButtonGroup>
</template>
<script setup lang="ts">
import { SpaceProps } from 'ant-design-vue'
import { ButtonGroup } from '../components/buttons'

interface ButtonsProps {
  limit?: number
  buttonType?: 'primary' | 'link' | 'text' | 'dashed' | 'ghost' | 'default'
  buttonShape?: 'circle' | 'round' | 'default'
  size?: 'large' | 'middle' | 'small'
  /** 是否只显示图标 */
  iconOnly?: boolean
  hidden?: boolean | Fn<boolean>
  disabled?: boolean | Fn<boolean>
  actions?: ButtonItem[]
}

defineProps<ButtonsProps>()
</script>
