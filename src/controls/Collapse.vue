<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useDisabled, useShow, getListener } from '../utils/util'
import ButtonGroup from './ButtonGroup.vue'
import Collections from './Collections'
import { innerComps } from '../components'

const {Collapse, CollapsePanel} = innerComps

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
  const attrs = reactive({ ...option.attr, ...getListener(option.on, effectData) })
  return {
    attrs,
    option,
    disabled,
    propsData: data,
    key: key || prop || String(idx),
    show: useShow(hide, effectData),
  }
})
const acKey = ref(activeKey || panels[0].key)
</script>

<template>
  <Collapse v-model:activeKey="acKey" v-bind="attr">
    <template v-for="panel of panels" :key="panel.key">
      <CollapsePanel
        v-if="panel.show"
        :header="panel.option.label"
        :collapsible="panel.disabled ? 'disabled' : 'header'"
        v-bind="panel.attrs"
      >
        <template #extra>
          <ButtonGroup v-if="panel.option.buttons" :config="panel.option.buttons"></ButtonGroup>
        </template>
        <Collections :option="panel.option" v-bind="panel.propsData" />
      </CollapsePanel>
    </template>
  </Collapse>
</template>
