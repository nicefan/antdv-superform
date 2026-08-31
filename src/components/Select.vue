<template>
  <Select
    option-filter-prop="label"
    :placeholder="'请选择' + option.label"
    :options="optionsRef"
    @change="onChange"
    @search="onSearch"
  >
    <template v-for="(_, name) of $slots" #[name]="data">
      <slot :name="name" v-bind="data || {}"></slot>
    </template>
  </Select>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue'
import baseComps from '../compat/antdv'
import { throttle } from 'lodash-es'
import { useOptions } from '../utils/useOptions'
const { Select } = baseComps

const emit = defineEmits(['update:labelValue'])
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
  /** 使用选项 label 作为字段值 */
  labelAsValue?: boolean
  /** @deprecated 使用 `labelAsValue` */
  valueToLabel?: boolean
  fieldNames?: Obj
  onChange?: Fn
  onSearch?: Fn
}>()

const { options: orgOptions, labelField } = props.option
const attrs: Obj = useAttrs()

const { optionsRef, setOptions } = useOptions(props.option, props.options, props.effectData)

// 同步保存label字段
let onChange = props.onChange
if (labelField) {
  const labelName = props.fieldNames?.label || 'label'
  onChange = (...args) => {
    const item = args[1]
    emit('update:labelValue', Array.isArray(item) ? item.map((item) => item[labelName]) : item?.[labelName])
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
