<template>
  <div>
    <MyForm class="hi" />
    <a-row :gutter="10">
    <a-button @click="changeSelect">切换选项</a-button>
    <a-button @click="onSubmit">校验</a-button>
    <a-button @click="setValue">赋值</a-button>
    </a-row>
  </div>
</template>
<script setup lang="ts">
import { inject, reactive, ref } from 'vue'
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
