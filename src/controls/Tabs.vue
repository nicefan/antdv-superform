<script lang="tsx">
import { inject, reactive, readonly, ref, unref, watch } from 'vue'
import { useDisabled, useShow, getListener, buildModel } from '../util'
export default {
  name: 'ExTabs',
}
</script>
<script lang="tsx" setup>
import Collections from './Collections'
import ButtonGroup from './ButtonGroup.vue'

const props = defineProps<{
  option: ExTabsOption
  modelData: ModelData
}>()
const formData = inject('formData')
const { subItems: tabsOption, activeKey, attr, buttons } = props.option

const tabMap: Obj = {}
const allList = tabsOption.map((itemOption, idx) => {
  const { key, prop, label, icon, hide, disabled: dis } = itemOption
  const tabKey = key || prop || String(idx)
  const subModel = !prop ? props.modelData : buildModel(itemOption, props.modelData)
  const effectData = { current: subModel.parent }
  const disabled = useDisabled(dis, effectData)
  const show = useShow(hide, effectData)
  const tabLabel = (icon ? <v-icon type={icon} /> : '') + label
  tabMap[tabKey] = { modelData: subModel, option: itemOption }
  return reactive({ key: tabKey, tab: tabLabel, disabled, show })
})

const acKey = ref(unref(activeKey) || allList[0].key)
// const tabList = computed(() => _tabList.filter(({ key }) => contents[key].show.value))
const tabList = ref(allList)
watch(
  allList,
  () => {
    let validKey
    tabList.value = allList.filter((item) => {
      if (item.show && !item.disabled) {
        validKey = validKey ?? item.key
      } else if (acKey.value === item.key) {
        acKey.value = validKey
      }
      return item.show
    })
    acKey.value = acKey.value ?? validKey
  },
  { deep: true }
)

const listener = getListener(props.option.on, { formData })
const _tabChange = listener.onTabChange
listener.onTabChange = (key) => {
  acKey.value = key
  _tabChange?.(key)
}
</script>
<template>
  <a-card :tab-list="tabList" :active-tab-key="acKey" v-bind="{ ...attr, ...listener }">
    <template #tabBarExtraContent>
      <ButtonGroup v-if="buttons" :config="buttons"></ButtonGroup>
    </template>
    <keep-alive>
      <Collections v-bind="tabMap[acKey]" :key="acKey" />
    </keep-alive>
  </a-card>
</template>
