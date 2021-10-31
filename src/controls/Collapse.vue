<script lang="ts"></script>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useDisabled, useShow, getListener } from '../utils/util'
import ButtonGroup from './ButtonGroup.vue'
import Collections from './Collections'

const props = defineProps<{
  option: ExCollapseOption
  model: ModelData
  children: ModelsMap<CollapseItem>
}>()
const { attr, activeKey } = props.option

const panels = [...props.children].map(([option, data], idx) => {
  const { key, prop, icon, hide, disabled: dis } = option
  const effectData = { current: data.model.parent }
  const disabled = useDisabled(dis, effectData)
  const attrs = reactive({ ...option.attr, disabled, ...getListener(option.on, effectData) })
  return {
    attrs,
    option,
    propsData: data,
    key: key || prop || String(idx),
    show: useShow(hide, effectData),
  }
})
const acKey = ref(activeKey || panels[0].key)
</script>

<template>
  <a-collapse v-model:activeKey="acKey" v-bind="attr">
    <template v-for="panel of panels" :key="panel.key">
      <a-collapse-panel v-if="panel.show" :header="panel.option.label" v-bind="panel.attrs">
        <template #extra>
          <ButtonGroup v-if="panel.option.buttons" :config="panel.option.buttons"></ButtonGroup>
        </template>
        <Collections :option="panel.option" v-bind="panel.propsData" />
      </a-collapse-panel>
    </template>
  </a-collapse>
</template>
