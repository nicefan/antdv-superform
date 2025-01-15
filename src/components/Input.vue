<template>
  <Input
    :placeholder="'请输入' + (option.label || '')"
    max-length="100"
    :disabled="disabled"
    :class="onSearch || option.enterButton ? 'ant-input-search ant-input-search-enter-button' : ''"
  >
    <template v-for="(slot, name) of $slots" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
    <template #addonAfter>
      <component v-if="addonAfter && !option.enterButton && !onSearch" :is="toNode(addonAfter, effectData.value)" />
      <component
        v-if="!disabled && option.enterButton"
        :is="toNode(option.enterButton, effectData)"
        @click="() => onSearch?.(effectData.value)"
      />
      <Button v-else-if="!disabled && onSearch" @click="() => onSearch?.(effectData.value)">
        <component v-if="addonAfter" :is="toNode(addonAfter, effectData.value)" />
        <SearchOutlined v-else />
      </Button>
    </template>
    <template #addonBefore v-if="addonBefore">
      <component :is="toNode(addonBefore)" />
    </template>

    <template #prefix v-if="prefix">
      <component :is="toNode(prefix)" />
    </template>

    <template #suffix v-if="suffix">
      <component v-if="suffix" :is="toNode(suffix)" />
      <Tooltip v-if="suffixTips" :title="suffixTips" />
    </template>
  </Input>
</template>

<script setup lang="ts">
import { SearchOutlined } from '@ant-design/icons-vue'
import baseComps from './base'
import { toNode } from '../utils'

const { Input, Button, Tooltip } = baseComps

const props = defineProps<{
  option: GetOption<'Input'>
  model: ModelData
  effectData: Obj
  addonAfter?: string | Fn
  addonBefore?: string | Fn
  suffix?: string | Fn
  prefix?: string | Fn
  suffixTips?: string
  onSearch?: Fn
  disabled?: boolean
}>()

const option = props.option
const {
  addonAfter = props.addonAfter,
  addonBefore = props.addonBefore,
  suffix = props.suffix,
  prefix = props.prefix,
  suffixTips = props.suffixTips,
} = props.option
</script>
