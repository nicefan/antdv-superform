<template>
  <div style="background: #eee; padding: 16px">
    <MyForm>
      <div style="text-align: center; margin-top: 16px; background: #fff">
        <exa-buttons style="margin: 16px" />
      </div>
      <template #test="{ attrs }">
        <div v-bind="attrs">这是个插槽！</div>
      </template>
    </MyForm>
  </div>
</template>
<script setup lang="ts">
import { inject, reactive, ref } from 'vue'
import { Row, Button } from 'ant-design-vue'
import useOption from './useExForm'
import { useForm } from '../src'
import { useButtons } from '../src/exaButtons'

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
    text: 'text',
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

const [ExaButtons] = useButtons({
  actions: [
    { label: '切换选项', onClick: changeSelect },
    { label: '校验', onClick: onSubmit },
    { label: '赋值', onClick: setValue },
    { label: '重置', onClick: reset },
  ],
})
</script>
<style>
.exform-section {
  background-color: #fff;
  padding: 16px;
  margin-bottom: 16px;
}
</style>
