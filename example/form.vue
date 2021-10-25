<template>
  <div>
    <MyForm class="hi" />
    <a-button @click="changeSelect">切换选项</a-button>
    <a-button @click="onSubmit">校验</a-button>
    <a-button @click="openForm">弹窗表单</a-button>
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
const { FormComponent: MyForm, onSubmit } = buildForm(options)
const openForm = () => {
  // myModel.openModal({
  //   title: '新增测试数据',
  //   onOk() {
  //     return myModel.onSubmit().then((data) => {
  //       console.log(data)
  //     })
  //   },
  // })
}
// msg2.value += props.msg
</script>
