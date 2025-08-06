<script lang="tsx">
import { onMounted, reactive, ref, toRef, unref, watchEffect } from 'vue'
import { DetailLayout } from './Detail'
import type { ExtTabItem } from '../exaTypes'

export default {
  name: 'ExTabs',
}
</script>

<script setup lang="tsx">
import { getIconNode, useControl, getEffectData, toNode } from '../utils'
import base from './base'
import Collections from './Collections'
import { ButtonGroup } from './buttons'

const { Tabs, TabPane } = base

const {
  option,
  model,
  isView,
  effectData: parentEffect,
} = defineProps<{
  option: GetOption<'Tabs'>
  model: ModelDataGroup<ExtTabItem>
  effectData: Obj
  isView?: boolean
}>()

const activeKey = ref(option.activeKey as any)
const paneKeys: string[] = []
const planeHideEvent = (idx, key, invalid) => {
  paneKeys[idx] = !invalid && key
  if (invalid && activeKey.value === key) {
    activeKey.value = paneKeys.find((val) => val)
  }
}
onMounted(() => {
  activeKey.value ??= paneKeys.find((val) => val)
})
const panes = [...model.children].map(([option, model], idx) => {
  const { key, field, label, icon } = option
  const effectData = getEffectData({
    parent: parentEffect,
    current: toRef(model, 'parent'),
    field: model.refName,
    value: model.refData,
  })

  const { hidden, attrs } = useControl({ option, effectData })
  const tabKey = key || field || String(idx)
  const tabLabel = () => [getIconNode(icon), toNode(label, effectData)]
  watchEffect(() => {
    planeHideEvent(idx, tabKey, unref(hidden) || unref(attrs.disabled))
  })
  return {
    attrs: reactive({
      ...attrs,
      key: tabKey,
      tab: tabLabel,
    }),
    hidden,
    option: { ...option, type: 'TabPane' },
    model,
    effectData,
  }
})
</script>
<template>
  <Tabs v-model:activeKey="activeKey">
    <template #rightExtra>
      <ButtonGroup v-if="!isView && option.buttons" :option="option.buttons"></ButtonGroup>
    </template>

    <template v-for="{ attrs, hidden, option, model, effectData } of panes" :key="attrs.key">
      <TabPane v-bind="attrs" v-if="!hidden.value">
        <DetailLayout v-if="isView" :option="option" :modelsMap="model.children" :effectData="effectData" />
        <Collections v-else :option="option" :model="model" :effectData="effectData" />
      </TabPane>
    </template>
  </Tabs>
</template>
