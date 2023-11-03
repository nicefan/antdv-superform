<script setup lang="ts">
import { reactive, ref, toRef } from 'vue'
import { useControl, getEffectData, toNode } from '../utils'
import { ButtonGroup } from './buttons'
import base from './base'
import Collections from './Collections'
import { DetailLayout } from './Detail'

const { Collapse, CollapsePanel } = base
defineOptions({
  inheritAttrs: false
})

const props = defineProps<{
  option: GetOption<'Collapse'>
  model: ModelDataGroup<any>
  effectData: Obj
  disabled?: boolean
  isView?: boolean
}>()

const title = props.option.title || props.option.label
const panels = [...props.model.children].map(([option, model], idx) => {
  const effectData = getEffectData({ current: toRef(props.model, 'refData') })
  const { attrs: __attrs, hidden } = useControl({ option: option, effectData })

  const { key, field } = option
  const { disabled, ...attrs } = __attrs
  // console.log(__attrs, disabled)
  return {
    attrs: reactive(attrs),
    option,
    effectData,
    model,
    key: key || field || String(idx),
    hidden,
    disabled,
  }
})
const acKey = ref(props.option.activeKey || panels[0].key)
</script>

<template>
  <div v-if="title" class="sup-title ant-descriptions-header">
    <component :is="toNode(title, effectData)" />
  </div>

  <Collapse v-model:activeKey="acKey" v-bind="$attrs">
    <template v-for="{ attrs, hidden, option, disabled, model, key } of panels" :key="key">
      <CollapsePanel
        v-if="!hidden.value"
        :header="option.label"
        :collapsible="disabled.value ? 'disabled' : undefined"
        v-bind="attrs"
      >
        <template #extra v-if="!isView">
          <ButtonGroup v-if="option.buttons" :config="option.buttons" :param="effectData" />
        </template>
        <DetailLayout v-if="isView" :option="option" :modelsMap="model.children"/>
        <Collections v-else :option="option" :model="model" />
      </CollapsePanel>
    </template>
  </Collapse>
</template>
