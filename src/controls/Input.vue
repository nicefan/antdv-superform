<template>
  <a-form-item :name="ruleName" :label="label">
    <a-input
      :readonly="!!option.keepProp"
      :placeholder="'请输入' + (label || '')"
      max-length="100"
      :class="option.btnClick ? 'ant-input-search ant-input-search-enter-button' : ''"
      v-bind="attrs"
    >
      <template #addonAfter>
        <a-button
          v-if="option.btnClick"
          :disabled="attrs.disabled"
          class="ant-input-search-button"
          @click="option.btnClick?.(formData, $event)"
        >
          <v-icon :type="option.addonAfterIcon || 'search'" />
        </a-button>
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
        <a-tooltip v-if="option.suffixTips" title="{item.suffixTips}">
          <v-icon type="info-circle" style="color: rgba(0, 0, 0, 0.45)" />
        </a-tooltip>
      </template>
    </a-input>
  </a-form-item>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import useControl from './useControl'

const props = defineProps<{
  option: ExInputOption
  modelData: ModelData
}>()
// const defData = reactive(defaultData || {})
const { formData, attrs, ruleName, label, rules } = useControl(props)
</script>
