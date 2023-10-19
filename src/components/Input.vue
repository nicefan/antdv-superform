<template>
  <FormItem>
    <Input
      :placeholder="'请输入' + (option.label || '')"
      max-length="100"
      allow-clear
      :class="onSearch || option.enterButton ? 'ant-input-search ant-input-search-enter-button' : ''"
      v-bind="{ ...attrs, ...valueProps }"
    >
      <template #addonAfter>
        <component
          v-if="option.enterButton"
          :is="toNode(option.enterButton, effectData)"
          class="abc"
          :disabled="attrs.disabled"
          @click="() => onSearch(valueProps.value)"
        />
        <Button v-else-if="onSearch" :disabled="attrs.disabled" @click="() => onSearch(valueProps.value)">
          <component v-if="addonAfter" :is="toNode(addonAfter)" />
          <SearchOutlined v-else />
        </Button>
        <component v-else-if="addonAfter" :is="toNode(addonAfter)" />
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
  </FormItem>
</template>

<script setup lang="ts">
import { SearchOutlined } from '@ant-design/icons-vue'
import baseComps from './base'
import { useVModel, toNode } from '../utils'

const { Input, Button, Tooltip, FormItem } = baseComps

const props = defineProps<{
  option: ExInputOption
  model: ModelData
  attrs: Obj
  effectData: Obj
}>()
const valueProps = useVModel(props)
const option = props.option
const {
  addonAfter = option.addonAfter,
  addonBefore = option.addonBefore,
  suffix = option.suffix,
  prefix = option.prefix,
  suffixTips = option.suffixTips,
  onSearch,
  ...attrs
} = props.attrs
</script>
