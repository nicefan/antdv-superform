<script setup lang="ts">
import { reactive, ref, toRef } from 'vue'
import { ButtonGroup } from '../buttons'
import Collections from '../Collections'
import baseComps from '../override'
import useControl from '../useControl'
import { getEffectData } from '../hooks/reactivity'

const { Collapse, CollapsePanel } = baseComps

const props = defineProps<{
  option: ExCollapseOption
  model: ModelDataGroup<CollapseItem>
  effectData: Obj
}>()

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
  <Collapse v-model:activeKey="acKey">
    <template v-for="panel of panels" :key="panel.key">
      <CollapsePanel
        v-if="!panel.hidden.value"
        :header="panel.option.label"
        :collapsible="panel.disabled.value ? 'disabled' : 'header'"
        v-bind="panel.attrs"
      >
        <template #extra>
          <ButtonGroup v-if="panel.option.buttons" :config="panel.option.buttons" :param="effectData" />
        </template>
        <Collections :option="panel.option" :model="panel.model" />
      </CollapsePanel>
    </template>
  </Collapse>
</template>
