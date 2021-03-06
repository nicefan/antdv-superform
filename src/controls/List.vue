<script lang="ts" setup>
import { ref, watch } from 'vue'
import { nanoid } from 'nanoid'
import { cloneModels } from '../utils/util'
import ButtonGroup from './ButtonGroup.vue'
import Collections from './Collections'
import cloneDeep from 'lodash/cloneDeep'

const props = defineProps<{
  option: ExListOption
  model: ModelData
  listData: ListModels
}>()

const { buttons, itemButtons, label, attr } = props.option
// 先构建一个数据结构
const defaultData = props.listData.model.parent
const modelsMap = props.listData.children

const { parent, refName } = props.model
const orgList = parent[refName]

const rowKey = attr?.rowKey || 'id'
const itemsMap: Obj = {}

const methods = {
  add() {
    orgList.push(cloneDeep(defaultData))
  },
  del({ record }) {
    const orgIdx = orgList.indexOf(record)
    orgList.splice(orgIdx, 1)
    delete itemsMap[record[rowKey]]
  },
}

const listItems = ref<ModelsMap[]>([])
// 监听数据变化
watch(
  () => orgList.length,
  () => {
    listItems.value = orgList.map((item) => {
      const hash = item[rowKey] || nanoid(12)
      let itemModel = itemsMap[hash]
      if (!itemModel) {
        item[rowKey] = hash
        // 原数据已经存在, 此处建立表单绑定
        itemModel = itemsMap[hash] = cloneModels(modelsMap, item)
      }
      return itemModel
    })
  }
)
</script>

<template>
  <a-list :data-source="listItems">
    <template #header>
      <a-row v-if="label || buttons" type="flex" justify="space-between" align="middle">
        <span style="font-size: 16px">{{ label }}</span>
        <ButtonGroup v-if="buttons" :config="buttons" :param="{ listData: orgList }" :methods="methods" />
      </a-row>
    </template>
    <template #renderItem="{ item: models, index }">
      <a-list-item :key="model.parent[rowKey]">
        <template #actions>
          <ButtonGroup
            v-if="itemButtons"
            :config="itemButtons"
            :methods="methods"
            :param="{ listData: orgList, index, record: model.parent }"
          />
        </template>
        <Collections style="width: 100%" :children="models" />
      </a-list-item>
    </template>
  </a-list>
</template>
