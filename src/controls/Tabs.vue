<script lang="tsx">
import { inject, reactive, readonly, ref, unref, watch } from 'vue'
import { useDisabled, useShow, getListener, buildModel } from '../utils/util'
import useControl from './useControl'

export default {
  name: 'ExTabs',
}
</script>

<script setup lang="tsx">
import Collections from './Collections'
import ButtonGroup from './ButtonGroup.vue'
import VIcon from '../icon/VIcon'
import { innerComps } from '../components'

const {Card} = innerComps

const props = defineProps<{
  option: ExTabsOption
  model: ModelData
  children: ModelsMap<TabItem>
  attrs: Obj
  effectData: Obj
}>()

const { activeKey, buttons } = props.option

const tabMap: Obj = {}
const allList = [...props.children].map(([itemOption, data], idx) => {
  const { attrs, hidden } = useControl({ option: itemOption as any, model: data })

  const { key, field, label, icon } = itemOption
  const tabKey = key || field || String(idx)
  const tabLabel = (icon ? <VIcon type={icon} /> : '') + label
  tabMap[tabKey] = { children: data.children, option: itemOption }
  return reactive({ key: tabKey, tab: tabLabel, disabled: attrs.disabled, hidden })
})

const acKey = ref(unref(activeKey) || allList[0].key)
// const tabList = computed(() => _tabList.filter(({ key }) => contents[key].show.value))
const tabList = ref(allList)
watch(
  allList,
  () => {
    let validKey
    tabList.value = allList.filter((item) => {
      if (!item.hidden && !item.disabled) {
        validKey = validKey ?? item.key
      } else if (acKey.value === item.key) {
        acKey.value = validKey
      }
      return !item.hidden
    })
    acKey.value = acKey.value ?? validKey
  },
  { deep: true }
)

const onTabChange = (key) => {
  acKey.value = key
  props.attrs.onTabChange?.(key)
}


</script>
<template>
  <Card :tab-list="tabList" :active-tab-key="acKey" v-bind="attrs" @tab-change="onTabChange">
    <template #tabBarExtraContent>
      <ButtonGroup v-if="buttons" :config="buttons"></ButtonGroup>
    </template>
    <keep-alive>
      <Collections v-bind="tabMap[acKey]" :key="acKey" />
    </keep-alive>
  </Card>
</template>
