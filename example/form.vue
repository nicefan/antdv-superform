<template>
  <div style="background: #eee; padding: 16px">
    <MyForm class="hi" />
    <Row :gutter="10">
      <Button @click="changeSelect">切换选项</Button>
      <Button @click="onSubmit">校验</Button>
      <Button @click="setValue">赋值</Button>
      <Button @click="reset">重置</Button>
    </Row>
  </div>
</template>
<script setup lang="ts">
import { inject, reactive, ref } from 'vue'
import { Row, Button } from 'ant-design-vue'
import useOption from './useExForm'
import { useForm } from '../src'

const props = defineProps<{
  msg: string
  other?: string
}>()
// const myModel = useExampleModal()
const { options, changeSelect } = useOption()
const [formRegister, form] = useForm({ isContainer: true, ...options })
const MyForm = formRegister()

const onSubmit = () => {
  return form.submit().then((data) => {
    console.log(data)
  })
}
const setValue = () => {
  const data = {
    name: '白龙',
    street: '白龙',
    isReg: 1,
    'table': [{ id: 'dadf', col2: 'col2' }],
    'group': {
      'food': ['1'],
    },
    tab3: { input: 'input' },
    list: [{ tab1: 'tab1' }],
  }
  form.setData(data)
}
const reset = () => {
  form.getForm('resetFields')
}
</script>
<style>
.exform-section {
  background-color: #fff;
  padding: 16px;
  margin-bottom: 16px;
}
</style>
