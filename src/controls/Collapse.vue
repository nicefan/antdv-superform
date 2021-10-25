<script lang="ts"></script>

<script setup lang="ts">
import { ref, watch, inject, readonly, reactive } from 'vue'
import { buildModelDeep, buildModel, useDisabled, useShow, getListener } from '../util'
import ButtonGroup from './ButtonGroup.vue'
import Collections from './Collections'

const props = defineProps<{
  option: ExCollapseOption
  modelData: ModelData
}>()
const { attr, subItems, activeKey } = props.option

const formData = inject('formData')
const panels = subItems.map((itemOption, idx) => {
  const { key, prop, icon, hide, disabled: dis } = itemOption
  const subModel = !prop ? props.modelData : buildModel(itemOption, props.modelData)
  const effectData = { current: subModel.parent }
  const tabKey = key || prop || String(idx)
  const disabled = useDisabled(dis, effectData)
  const show = useShow(hide, effectData)
  const attrs = reactive({ ...itemOption.attr, disabled, ...getListener(itemOption.on, effectData) })
  return { key: tabKey, attrs, show, modelData: subModel, option: itemOption }
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
        <Collections :option="panel.option" :model-data="panel.modelData" />
      </a-collapse-panel>
    </template>
  </a-collapse>
</template>
