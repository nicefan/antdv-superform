<template>
  <div style="background: #eee; padding: 16px">
    <SuperForm @register="formRegister">
      <div style="text-align: center; margin-top: 16px; background: #fff">
        <super-buttons style="margin: 16px" />
      </div>
      <template #test="{ attrs, current }">
        <div v-bind="attrs">这是个插槽！{{ current.name }}</div>
      </template>
    </SuperForm>
  </div>
</template>
<script setup lang="ts">
import { inject, reactive, ref } from 'vue'
import { Row, Button } from 'ant-design-vue'
import useOption from './useExForm'
import { useDetail, useForm, useModal, SuperForm } from '../src'
import { useButtons } from '../src/superButtons'

// const props = defineProps<{
//   msg: string
//   other?: string
// }>()
// const myModel = useExampleModal()
const { options, changeSelect } = useOption()
// const dataSource = ref({})
const [formRegister, form] = useForm({ isContainer: true, ...options })
// const sourceData = form.getSource()

const onSubmit = () => {
  console.log(form.getData())
  return form.submit().then((data) => {
    console.log(data)
  })
}
const getData = () => {
  return {
    name: '白龙',
    street: '白龙',
    text: 'text',
    array: ['a', 'b'],
    isReg: 1,
    'table': [{ id: 'dadf', col1: 'dadf', col2: 'col2' }],
    'group': {
      'food': ['1'],
    },
    tab3: { input: 'input' },
    list: [{ tab1: 'tab1' }],
    listGroup: [{
      datelist: [{ index1: '2002-02-02', index2: undefined, index3: undefined }],
  }],
    fileList: [
      {
        id: 'abc',
        name: 'logo.png',
        url: 'http://192.168.0.234:5001/logo.png',
      },
    ],
  }
}
const setValue = () => {
  const data = getData()
  form.setFieldsValue(data)
}
const reset = () => {
  form.resetFields()
}

// const detailData = ref(dataSource)
const [detailRegister, detailForm] = useDetail(options)
const detailModal = useModal(detailRegister(), {
  width: 1200,
  title: '表单预览',
  cancelText: null,
})

const [SuperButtons] = useButtons({
  limit: 5,
  actions: [
    { label: '切换选项', onClick: changeSelect },
    { label: '校验', onClick: onSubmit },
    { label: '赋值', onClick: setValue },
    { label: '重置', onClick: reset },
    {
      label: '预览',
      onClick: () => {
        detailForm.setData(form.getData())
        detailModal.openModal()
      },
    },
    {
      label: '赋值预览',
      onClick: () => {
        // detailData.value = getData()
        detailForm.setData(getData())
        detailModal.openModal()
      },
    },
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
