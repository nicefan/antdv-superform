<script setup lang="ts">
import { reactive, ref, toRefs, inject } from 'vue'
import { ButtonGroup } from '../buttons'
import Collections from '../Collections'
import baseComps from '../override'
import useControl from '../useControl'

const { Collapse, CollapsePanel } = baseComps

const props = defineProps<{
  option: ExCollapseOption
  model: ModelData
  children: ModelsMap<CollapseItem>
  attrs: Obj
  effectData: Obj
}>()

const panels = [...props.children].map(([option, data], idx) => {
  const { attrs: __attrs, hidden } = useControl({ option: option as any, model: data })

  const { key, field } = option
  const { disabled, ...attrs } = toRefs(__attrs)
  // console.log(__attrs, disabled)
  return {
    attrs: reactive(attrs),
    option,
    propsData: data,
    key: key || field || String(idx),
    hidden,
    disabled,
  }
})
const { activeKey } = props.option
const acKey = ref(activeKey || panels[0].key)
</script>

<template>
  <Collapse v-model:activeKey="acKey" v-bind="attrs">
    <template v-for="panel of panels" :key="panel.key">
      <CollapsePanel
        v-if="!panel.hidden.value"
        :header="panel.option.label"
        :collapsible="panel.disabled.value ? 'disabled' : 'header'"
        v-bind="panel.attrs"
      >
        <template #extra>
          <ButtonGroup
            v-if="panel.option.buttons"
            :config="panel.option.buttons"
            :param="{ formData: inject('formData') }"
          />
        </template>
        <Collections :option="panel.option" v-bind="panel.propsData" />
      </CollapsePanel>
    </template>
  </Collapse>
</template>
