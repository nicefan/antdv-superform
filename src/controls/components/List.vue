<script lang="ts" setup>
import { ref, toRef, watch } from 'vue'
import { nanoid } from 'nanoid'
import { cloneModels } from '../../utils/util'
import { ButtonGroup } from '../buttons'
import Collections from '../Collections'
import cloneDeep from 'lodash/cloneDeep'
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
const defaultData = props.listData.model.parent
const modelsMap = props.listData.children

const { parent, refName } = props.model
const orgList = refName ? toRef(parent, refName) : toRef(props.model, 'parent')

const rowKey = props.attrs?.rowKey || 'id'
const itemsMap: Obj = {}

const methods = {
  add() {
    orgList.value.push(cloneDeep(defaultData))
  },
  del({ record }) {
    const orgIdx = orgList.value.indexOf(record)
    orgList.value.splice(orgIdx, 1)
    delete itemsMap[record[rowKey]]
  },
}

const listItems = ref<ModelsMap[]>([])
// 监听数据变化
watch(
  () => orgList.value.length,
  () => {
    listItems.value = orgList.value.map((item) => {
      const hash = item[rowKey] || nanoid(12)
      let itemModel = itemsMap[hash]
      if (!itemModel) {
        item[rowKey] = hash
        // 原数据已经存在, 此处建立表单绑定
        itemModel = itemsMap[hash] = cloneModels(modelsMap, item)
      }
      return { modelsMap: itemModel, record: item }
    })
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
