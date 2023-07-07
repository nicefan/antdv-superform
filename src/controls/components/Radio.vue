<template>
  <form-item>
    <radio-group :name="option.field" v-bind="allAttrs">
      <template v-if="attrs.buttonStyle">
        <radio-button v-for="{ label, value, disabled } of options" :key="value" :value="value" :disabled="disabled">
          {{ label }}
        </radio-button>
      </template>
      <Radio v-for="{ label, value, disabled } of options" v-else :key="value" :value="value" :disabled="disabled">
        {{ label }}
      </Radio>
    </radio-group>
  </form-item>
</template>

<script setup lang="ts">
import { ref, watchPostEffect, unref, reactive } from 'vue'
import { useVModel } from '../'
import baseComps from '../override'

const { FormItem, RadioButton, RadioGroup, Radio } = baseComps

const props = defineProps<{
  option: ExSelectOption
  model: ModelData
  attrs: Obj
  effectData: Obj
}>()
const valueProps = useVModel(props)
const allAttrs = reactive({ ...valueProps, ...props.attrs })

const options = ref<any[] | undefined>(props.attrs.options || [])
const _options = props.option.options
if (typeof _options === 'function') {
  watchPostEffect(() => {
    Promise.resolve(_options(props.effectData)).then((data) => {
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
