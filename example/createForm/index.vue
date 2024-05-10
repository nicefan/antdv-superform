<template>
  <div>
    <!-- <MyTable class="hi"> 
      <template #tableFooter>
        <h3>表格footer插槽</h3>
      </template>
    </MyTable> -->
    <SuperTable @register="register">
      <template #tableFooter>
        <h3>表格footer插槽</h3>
      </template>
    </SuperTable>
    <Row :gutter="10">
      <!-- <a-button @click="changeSelect">切换选项</a-button> -->
      <Button @click="onSubmit">提交</Button>
      <Button @click="setValue">赋值</Button>
    </Row>
  </div>
</template>
<script setup lang="ts">
import { watch, reactive, ref, toRef } from 'vue'
import { Row, Button } from 'ant-design-vue'
import { myTableOption } from './formOption'
import { useForm, useTable, SuperTable } from '../../src'

const props = defineProps<{
  msg: string
  other?: string
}>()
const activeKey = ref<string>()
watch(activeKey, (k) => console.log(k))
// const myModel = useExampleModal()
const params = reactive({
  name: undefined
})
const [register, table] = useTable({
  ...myTableOption,
  tabsFilter: {
    options: ['湖南', '广东'],
    valueToLabel: true,
    activeKey: toRef(params, 'name'),
  },
  params
})

// const MyTable = register()

const onSubmit = () => {
  console.log(table.selectedRows)
  console.log(table.getData())
}
const setValue = () => {
  const data = [
    {
      id: '121',
      fieldName: 'la',
      title: '大因',
      dataType: ['text'],
      isRequire: 1,
      col2: '12',
       fileIds:['a'],
     files: [{
        uid: 'a',
        name: 'a.a'
      }]
    },
    {
      id: '122',
      fieldName: 'la2',
      title: '大因2',
      dataType: ['text'],
      isRequire: 1,
      col2: '122',
      fileIds:['a2'],
      files: [{
        uid: 'a2',
        name: 'a2.a2'
      }]
    },
  ]
  table.setData(data)
}
</script>
