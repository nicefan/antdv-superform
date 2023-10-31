<template>
  <div>
    <MyForm class="hi" />
    <Row :gutter="10">
      <!-- <a-button @click="changeSelect">切换选项</a-button> -->
      <Button @click="onSubmit">提交</Button>
      <Button @click="setValue">赋值</Button>
    </Row>
  </div>
</template>
<script setup lang="ts">
import { inject, reactive, ref } from 'vue'
import { Row, Button } from 'ant-design-vue'
import { myTableOption } from './formOption'
import { useForm, useTable } from '../../src'

const props = defineProps<{
  msg: string
  other?: string
}>()
// const myModel = useExampleModal()
const [register, table] = useTable(myTableOption)

const MyForm = register()

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
      dataType: 'text',
      isRequire: 1,
      col2: '12',
    },
  ]
  table.setData(data)
}
</script>
