<template>
  <div style="background: #eee; padding: 16px">
    <ExaDetail @register="detailRegister">
      <template #test="{ attrs }">
        <div v-bind="attrs">这是个插槽！</div>
      </template>
    </ExaDetail>
  </div>
</template>
<script setup lang="ts">
import useOption from './useExForm'
import { ExaDetail, useDetail } from '../src'

const { options, changeSelect } = useOption()
const [detailRegister, { setData }] = useDetail({ isContainer: true, ...options })

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
    },
    tab3: { input: 'input' },
    list: [{ tab1: 'tab1' }],
  })
})

</script>
<style>
.exform-section {
  background-color: #fff;
  padding: 16px;
  margin-bottom: 16px;
}
</style>
