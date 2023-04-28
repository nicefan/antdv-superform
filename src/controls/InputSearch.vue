<template>
  <FormItem :name="ruleName" :label="label">
    <InputSearch :placeholder="'请输入' + label" allow-clear max-length="100" v-bind="attrs">
      <template #enterButton>
        <Button v-if="option.addonAfterIcon">
          <a-icon :type="option.addonAfterIcon" />
        </Button>
      </template>

      <template v-if="option.addonBeforeIcon" #addonBefore>
        <icon-font :type="option.addonBeforeIcon" />
      </template>

      <template v-if="option.prefixIcon" #prefix>
        <icon-font :type="option.prefixIcon" />
      </template>

      <template #suffix>
        <icon-font v-if="option.suffixIcon" type="{item.suffixIcon}" />
        <Tooltip v-if="option.suffixTips" title="{item.suffixTips}">
          <icon-font type="info-circle" style="color: rgba(0, 0, 0, 0.45)" />
        </Tooltip>
      </template>
    </InputSearch>
  </FormItem>
</template>
<script setup lang="ts">
import useControl from './useControl'
import { innerComps } from '../components'

const {FormItem, Tooltip, Button, InputSearch} = innerComps

const props = defineProps<{
  option: ExInputOption
  model: ModelData
}>()
const { attrs, ruleName, label } = useControl(props)

</script>
