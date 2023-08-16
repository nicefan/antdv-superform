<template>
  <FormItem>
    <Input
      :placeholder="'请输入' + (option.label || '')"
      max-length="100"
      :class="option.btnClick ? 'ant-input-search ant-input-search-enter-button' : ''"
      v-bind="{ ...attrs, ...valueProps }"
    >
      <template #addonAfter>
        <Button
          v-if="option.btnClick"
          :disabled="attrs.disabled"
          class="ant-input-search-button"
          @click="option.btnClick?.(effectData, $event)"
        >
          <component :is="option.addonAfterIcon ? useIcon(option.addonAfterIcon) : SearchOutlined" />
        </Button>
        <component v-else-if="option.addonAfterIcon" :is="useIcon(option.addonAfterIcon)" />
      </template>
      <template v-if="option.addonBeforeIcon" #addonBefore>
        <component :is="useIcon(option.addonBeforeIcon)" />
      </template>

      <template v-if="option.prefixIcon" #prefix>
        <component :is="useIcon(option.prefixIcon)" />
      </template>

      <template #suffix>
        <component v-if="option.suffixIcon" :is="useIcon(option.suffixIcon)" />
        <Tooltip v-if="option.suffixTips" title="{item.suffixTips}" />
      </template>
    </Input>
  </FormItem>
</template>

<script setup lang="ts">
import { SearchOutlined } from '@ant-design/icons-vue'
import baseComps from '../override'
import { useVModel } from '../'
import { useIcon } from '../hooks'

const { Input, Button, Tooltip, FormItem } = baseComps

const props = defineProps<{
  option: ExInputOption
  model: ModelData
  attrs: Obj
  effectData: Obj
}>()
const valueProps = useVModel(props)
</script>
