<template>
  <div>
    <MyForm class="hi" />
    <Row :gutter="10">
      <!-- <a-button @click="changeSelect">切换选项</a-button> -->
      <Button @click="onSubmit">校验</Button>
      <!-- <a-button @click="setValue">赋值</a-button> -->
    </Row>
  </div>
</template>
<script setup lang="ts">
import { inject, reactive, ref } from 'vue'
import { Row, Button } from 'ant-design-vue'
import { useFormOption } from './formOption'
import { useForm } from '../../src'

const props = defineProps<{
  msg: string
  other?: string
}>()
// const myModel = useExampleModal()
const options = useFormOption()
const [register, form] = useForm(options)

const MyForm = register()

const onSubmit = () => {
  return form.onSubmit().then((data) => {
    console.log(data)
  })
}
const setValue = () => {
  const data = {
    street: '白龙',
    isReg: 1,
    'table': [{ id: 'dadf', col2: 'col2' }],
    'group': {
      'food': ['1'],
    },
    list: [{ tab1: 'tab1' }],
  }
  form.setFieldsValue(data)
}
</script>
