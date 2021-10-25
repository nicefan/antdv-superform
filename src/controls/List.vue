<script lang="ts" setup>
import { ref, watch, inject } from 'vue'
import { nanoid } from 'nanoid'
import { buildModelDeep, buildModel } from '../util'
import ButtonGroup from './ButtonGroup.vue'
import Collections from './Collections'
import cloneDeep from 'lodash/cloneDeep'

const props = defineProps<{
  option: ExListOption
  modelData: ModelData
}>()

const { columns, buttons, itemButtons, label, attr } = props.option
// 先构建一个数据结构
const defaultData: Obj = {}
buildModelDeep(columns, { parent: defaultData })

const formData = inject('formData')
const rowKey = attr?.rowKey || 'id'

const itemsMap: Obj = {}
const listItems = ref<Obj[]>([])
// 监听数据变化
const orgList = props.modelData.parent
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
watch(
  () => orgList.length,
  () => {
    listItems.value = orgList.map((item, idx) => {
      const hash = item[rowKey] || nanoid(12)
      let hashItem = itemsMap[hash]
      if (!hashItem) {
        item[rowKey] = hash
        // 原数据已经存在, 此处建立表单绑定
        const itemModel = buildModel({ prop: String(idx), columns: true }, props.modelData)
        hashItem = itemModel
      }
      return hashItem
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
    <template #renderItem="{ item, index }">
      <a-list-item :key="item.parent[rowKey]">
        <template #actions>
          <ButtonGroup
            v-if="itemButtons"
            :config="itemButtons"
            :methods="methods"
            :param="{ listData: orgList, index, record: item.parent }"
          />
        </template>
        <Collections style="width: 100%" :model-data="item" :option="props.option" />
      </a-list-item>
    </template>
  </a-list>
</template>
