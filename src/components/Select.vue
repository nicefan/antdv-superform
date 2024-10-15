<template>
  <Select
    option-filter-prop="label"
    allow-clear
    :placeholder="'请选择' + option.label"
    :options="optionsRef"
    @change="onChange"
    @search="onSearch"
  >
    <template v-for="(slot, name) of $slots" #[name]="data">
      <slot :name="name" v-bind="data"></slot>
    </template>
  </Select>
</template>

<script setup lang="ts">
import { toRef, useAttrs } from 'vue'
import baseComps from './base'
import { throttle } from 'lodash-es'
import { useOptions } from '../utils/useOptions'
const { Select } = baseComps

const props = defineProps<{
  option: GetOption<'Select'>
  model: ModelData
  effectData: Obj
  options?: any
  labelField?: string

  /** 字典名称 */
  dictName?: string
  /** 选项中的value转成number类型 */
  valueToNumber?: boolean
  /** 选项中的value使用label */
  valueToLabel?: boolean
  onChange?: Fn
  onSearch?: Fn
}>()

const { options: orgOptions, labelField } = props.option
const attrs = useAttrs()

const { optionsRef, setOptions } = useOptions(props.option, props.options, props.effectData)

// 同步保存label字段
let onChange = props.onChange
if (labelField) {
  const model = toRef(props, 'model')
  onChange = (...args) => {
    const [_, item] = args
    model.value.parent[labelField] = Array.isArray(item) ? item.map(({ lable }) => lable) : item?.label
    props.onChange?.(...args)
  }
}

let onSearch = props.onSearch && throttle(props.onSearch, 600, { leading: false })
if (attrs.showSearch && !onSearch && typeof orgOptions === 'function') {
  const searchHandler = (val) => {
    Promise.resolve(orgOptions(props.effectData, val)).then((data) => {
      setOptions(data)
    })
  }
  onSearch = throttle(searchHandler, 600, { leading: false })
}
</script>
