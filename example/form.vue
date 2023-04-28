<template>
  <div>
    <MyForm class="hi" />
    <Row :gutter="10">
    <Button @click="changeSelect">切换选项</Button>
    <Button @click="onSubmit">校验</Button>
    <Button @click="setValue">赋值</Button>
    </Row>
  </div>
</template>
<script setup lang="ts">
import { inject, reactive, ref } from 'vue'
import { Row, Button } from 'ant-design-vue'
import useOption, { useExampleForm, useExampleModal } from './useExForm'
import { buildForm } from '../src'

const props = defineProps<{
  msg: string
  other?: string
}>()
// const myModel = useExampleModal()
const { options, changeSelect } = useOption()
const form = buildForm(options)

const MyForm = form.FormComponent
const onSubmit = () => {
  return form.onSubmit().then(data => {
    console.log(data)
  })
}
const setValue = () => {
  const data = {
    name:'白龙',
    street: '白龙',
    isReg: 1,
    "table": [
      {id: 'dadf', col2:'col2'}
    ],
    "group": {
        "food": ['1'],
    },
    list:[{tab1: 'tab1'}]
  }
  form.setFieldsValue(data)
}
</script>
