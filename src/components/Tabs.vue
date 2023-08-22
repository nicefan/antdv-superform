<script lang="tsx">
import { onMounted, reactive, ref, toRef, watchEffect } from 'vue'

export default {
  name: 'ExTabs',
}
</script>

<script setup lang="tsx">
import { useIcon, useControl, getEffectData } from '../utils'
import base from './base'
import Collections from './Collections'
import { ButtonGroup } from './buttons'

const { Tabs, TabPane } = base

const props = defineProps<{
  option: ExTabsOption
  model: ModelDataGroup<TabItem>
  effectData: Obj
}>()

const activeKey = ref(toRef(props.option, 'activeKey') as any)
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
const panes = [...props.model.children].map(([option, model], idx) => {
  const { key, field, label, icon } = option
  const effectData = getEffectData({ current: toRef(props.model, 'refData') })

  const { attrs, hidden } = useControl({ option, effectData })
  const tabKey = key || field || String(idx)
  const tabLabel = () => [useIcon(icon), label]
  watchEffect(() => {
    planeHideEvent(idx, tabKey, hidden.value || attrs.disabled.value)
  })
  return {
    attrs: reactive({
      ...attrs,
      key: tabKey,
      tab: tabLabel,
    }),
    hidden,
    option,
    model,
  }
})
</script>
<template>
  <Tabs v-model:activeKey="activeKey">
    <template #rightExtra>
      <ButtonGroup v-if="option.buttons" :config="option.buttons"></ButtonGroup>
    </template>

    <template v-for="{ attrs, hidden, option, model } of panes" :key="attrs.key">
      <TabPane v-bind="attrs" v-if="!hidden.value">
        <Collections :option="option" :model="model" />
      </TabPane>
    </template>
  </Tabs>
</template>
