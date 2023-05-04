<template>
  <form-item>
    <tree-select :placeholder="'请选择' + option.label" v-bind="allAttrs" :tree-data="treeData" />
  </form-item>
</template>

<script setup lang="ts">
import { ref, watchPostEffect, unref, reactive } from 'vue'
import { useVModel } from './useControl'
import { innerComps } from '../components'

const { FormItem, TreeSelect } = innerComps

const props = defineProps<{
  option: ExTreeOption
  model: ModelData
  attrs: Obj
  effectData: Obj
}>()
const valueProps = useVModel(props)
const allAttrs = reactive({ ...valueProps, ...props.attrs })

const treeData = ref<Obj[]>([])
const _data = props.option.data
if (typeof _data === 'function') {
  watchPostEffect(() => {
    Promise.resolve(_data(props.effectData)).then((data) => {
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
