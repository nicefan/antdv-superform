<template>
  <a-form-item :name="ruleName" :label="label">
    <a-radio-group :name="option.prop" v-bind="attrs">
      <template v-if="attrs.buttonStyle">
        <a-radio-button v-for="{ label, value, disabled } of options" :key="value" :value="value" :disabled="disabled">
          {{ label }}
        </a-radio-button>
      </template>
      <a-radio v-for="{ label, value, disabled } of options" v-else :key="value" :value="value" :disabled="disabled">
        {{ label }}
      </a-radio>
    </a-radio-group>
  </a-form-item>
</template>

<script setup lang="ts">
import { ref, watchPostEffect, unref } from 'vue'
import useControl from './useControl'

const props = defineProps<{
  option: ExSelectOption
  model: ModelData
}>()

const { effectData, attrs, ruleName, label } = useControl(props)

const options = ref<any[] | undefined>(attrs.options || [])
const _options = props.option.options
if (typeof _options === 'function') {
  watchPostEffect(() => {
    Promise.resolve(_options(effectData)).then((data) => {
      options.value = data
    })
  })
} else if (_options) {
  options.value = unref(_options)
}
// 异步获取
// 字典配置
/**
 *  动态切换
 *  依赖某值变化切换
 *
 */
</script>
