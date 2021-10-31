<template>
  <a-form-item :name="ruleName" :label="label">
    <a-input-search :placeholder="'请输入' + label" allow-clear max-length="100" v-bind="attrs">
      <template #enterButton>
        <a-button v-if="option.addonAfterIcon">
          <a-icon :type="option.addonAfterIcon" />
        </a-button>
      </template>

      <template v-if="option.addonBeforeIcon" #addonBefore>
        <icon-font :type="option.addonBeforeIcon" />
      </template>

      <template v-if="option.prefixIcon" #prefix>
        <icon-font :type="option.prefixIcon" />
      </template>

      <template #suffix>
        <icon-font v-if="option.suffixIcon" type="{item.suffixIcon}" />
        <a-tooltip v-if="option.suffixTips" title="{item.suffixTips}">
          <icon-font type="info-circle" style="color: rgba(0, 0, 0, 0.45)" />
        </a-tooltip>
      </template>
    </a-input-search>
  </a-form-item>
</template>
<script setup lang="ts">
import useControl from './useControl'

const props = defineProps<{
  option: ExInputOption
  model: ModelData
}>()
const { attrs, ruleName, label } = useControl(props)

</script>
