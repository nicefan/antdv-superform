<template>
  <FormItem>
    <InputSearch
      :placeholder="'请输入' + option.label"
      allow-clear
      max-length="100"
      v-bind="{ ...valueProps, ...props.attrs }"
    >
      <template #enterButton>
        <Button v-if="option.addonAfterIcon">
          <component :is="useIcon(option.addonAfterIcon)" />
        </Button>
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
    </InputSearch>
  </FormItem>
</template>
<script setup lang="ts">
import { useVModel } from '../'
import baseComps from '../override'
import { useIcon } from '../hooks'

const { FormItem, Tooltip, Button, InputSearch } = baseComps

const props = defineProps<{
  option: ExInputOption
  model: ModelData
  attrs: Obj
  effectData: Obj
}>()
const valueProps = useVModel(props)
</script>
