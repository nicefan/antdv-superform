<script lang="ts" setup>
import { ref, toRef, watch } from 'vue'
import { nanoid } from 'nanoid'
import { cloneModels } from '../../utils/util'
import { ButtonGroup } from '../buttons'
import Collections from '../Collections'
import { cloneDeep } from 'lodash-es'
import baseComps from '../override'

const { Row, List, ListItem } = baseComps

const props = defineProps<{
  option: ExListOption
  model: ModelData
  listData: ListModels
  attrs?: Obj
  effectData: Obj
}>()

const { buttons, rowButtons, label } = props.option
// 先构建一个数据结构
const { children: childrenMap, model: listModel } = props.listData
const defaultData = listModel.parent

const { parent, refName, currentRules, propChain } = props.model as Required<ModelData>
const orgList = refName ? toRef(parent, refName) : toRef(props.model, 'parent')

const rowKey = props.attrs?.rowKey || 'id'

const methods = {
  add() {
    orgList.value.push(cloneDeep(defaultData))
  },
  del({ record }) {
    const orgIdx = orgList.value.indexOf(record)
    orgList.value.splice(orgIdx, 1)
  },
}

const listItems = ref<any[]>([])
// 监听数据变化
watch(
  () => [...orgList.value],
  (org) => {
    listItems.value = org.map((item, idx) => {
      const hash = item[rowKey] || nanoid(12)
      item[rowKey] = hash
      // 原数据已经存在, 此处建立表单绑定
      const itemModel = cloneModels(childrenMap, item, [...propChain, idx])
      currentRules[idx] = listModel.rules
      return { modelsMap: itemModel, record: item }
    })
    Object.keys(currentRules).forEach((key, idx) => idx > org.length - 1 && delete currentRules[key])
  },
  {
    immediate: true,
  }
)
</script>

<template>
  <List :data-source="listItems" v-bind="attrs">
    <template #header>
      <Row v-if="label || buttons" type="flex" justify="space-between" align="middle">
        <span style="font-size: 16px">{{ label }}</span>
        <ButtonGroup v-if="buttons" :config="buttons" :param="{ listData: orgList }" :methods="methods" />
      </Row>
    </template>
    <template #renderItem="{ item, index }">
      <ListItem :key="item.record[rowKey]">
        <template #actions>
          <ButtonGroup
            v-if="rowButtons"
            :config="rowButtons"
            :methods="methods"
            :param="{ listData: orgList, index, record: item.record }"
          />
        </template>
        <Collections style="width: 100%" :children="item.modelsMap" />
      </ListItem>
    </template>
  </List>
</template>
