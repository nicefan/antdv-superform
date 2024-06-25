<template>
  <div style="background: #eee; padding: 16px">
    <SuperDetail @register="detailRegister">
      <template #test="{ attrs }">
        <div v-bind="attrs">这是个插槽！</div>
      </template>
    </SuperDetail>
  </div>
</template>
<script setup lang="ts">
import useOption from './useExForm'
import { SuperDetail, useDetail } from '../src'
import { ref } from 'vue';

const source = ref({})
const { options, changeSelect } = useOption()
const [detailRegister, { setData }] = useDetail(async () => {
  return { isContainer: true, ...options }
}, source)

// const MyDetail = detailRegister()
setTimeout(() => {
  setData({
    name: '白龙',
    street: '白龙',
    text: 'text',
    array: ['a', 'b'],
    isReg: 1,
    'table': [{ id: 'dadf', col1: 'dadf', col2: 'col2' }],
    'group': {
      'food': ['1'],
      tree: ['0-0'],
      datelist: [{index1: '2024-1-1', index2: '2024-1-9'},{index1: '2024-1-1', index2: '2024-1-9'}]
    },
    tab3: { input: 'input' },
    list: [{ tab1: 'tab1' }],
  })
}, 4000)

</script>
<style>
.exform-section {
  background-color: #fff;
  padding: 16px;
  margin-bottom: 16px;
}
</style>
