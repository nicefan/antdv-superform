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
          <v-icon :type="option.addonAfterIcon || 'search'" />
        </Button>
        <v-icon v-else-if="option.addonAfterIcon" :type="option.addonAfterIcon" />
      </template>
      <template #addonBefore>
        <v-icon v-if="option.addonBeforeIcon" :type="option.addonBeforeIcon" />
      </template>
      <template #prefix>
        <v-icon v-if="option.prefixIcon" :type="option.prefixIcon" />
      </template>

      <template #suffix>
        <v-icon v-if="option.suffixIcon" :type="option.suffixIcon" />
        <Tooltip v-if="option.suffixTips" title="{item.suffixTips}">
          <v-icon type="info-circle" style="color: rgba(0, 0, 0, 0.45)" />
        </Tooltip>
      </template>
    </Input>
  </FormItem>
</template>

<script setup lang="ts">
import VIcon from '../../icon/VIcon'
import baseComps from '../override'
import { useVModel } from '../'

const { Input, Button, Tooltip, FormItem } = baseComps

const props = defineProps<{
  option: ExInputOption
  model: ModelData
  attrs: Obj
  effectData: Obj
}>()
const valueProps = useVModel(props)
</script>
