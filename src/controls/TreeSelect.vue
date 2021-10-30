<template>
  <a-form-item :name="ruleName" :label="label">
    <a-tree-select :placeholder="'请选择' + option.label" v-bind="attrs" :tree-data="treeData" />
  </a-form-item>
</template>

<script setup lang="ts">
import { ref, watchPostEffect, unref } from 'vue'
import useControl from './useControl'

const props = defineProps<{
  option: ExTreeOption
  model: ModelData
}>()

const { effectData, attrs, ruleName, label } = useControl(props)

const treeData = ref<Obj[]>([])
const _data = props.option.data
if (typeof _data === 'function') {
  watchPostEffect(() => {
    Promise.resolve(_data(effectData)).then((data) => {
      treeData.value = data
    })
  })
} else if (_data) {
  treeData.value = unref(_data)
}
// 异步获取
// 字典配置
/**
 *  动态切换
 *  依赖某值变化切换
 *
 */
</script>
