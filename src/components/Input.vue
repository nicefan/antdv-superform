<template>
  <Input
    :placeholder="'请输入' + (option.label || '')"
    max-length="100"
    :disabled="disabled"
    :class="onSearch || enterButton ? 'ant-input-search ant-input-search-enter-button' : ''"
    :addon-before="addonBefore"
    :suffix="suffix"
    :prefix="prefix"
  >
    <template v-for="name in Object.keys($slots)" #[name]="data" :key="name">
      <slot :name="name" v-bind="data || {}"></slot>
    </template>
    <template #addonAfter v-if="!$slots.addonAfter">
      <component v-if="addonAfter && !enterButton && !onSearch" :is="toNode(addonAfter, effectData.value)" />
      <component
        v-if="!disabled && enterButton"
        :is="toNode(enterButton, effectData)"
        @click="() => onSearch?.(effectData.value)"
      />
      <Button v-else-if="!disabled && onSearch" @click="() => onSearch?.(effectData.value)">
        <component v-if="addonAfter" :is="toNode(addonAfter, effectData.value)" />
        <SearchOutlined v-else />
      </Button>
    </template>
  </Input>
</template>

<script setup lang="ts">
import { SearchOutlined } from '@ant-design/icons-vue'
import baseComps from './base'
import { toNode } from '../utils'

const { Input, Button } = baseComps

const props = defineProps<{
  option: GetOption<'Input'>
  model: ModelData
  effectData: Obj
  addonAfter?: string | Fn
  onSearch?: Fn
  disabled?: boolean
}>()

const option = props.option
const { addonAfter = props.addonAfter, addonBefore, suffix, prefix, enterButton } = props.option as any
</script>
