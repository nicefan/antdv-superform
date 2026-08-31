<template>
  <ConfigProvider :locale="zhCN">
    <h1>关于</h1>
    <Tabs v-model:active-key="tab">
      <TabPane v-for="(item, index) of tabs" :key="String(index)" :tab="item.label">
        <component :is="item.comp" msg="about" />
      </TabPane>
    </Tabs>
  </ConfigProvider>
</template>

<script lang="ts" setup>
import { ConfigProvider } from 'antdv-next'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import zhCN from 'antdv-next/locale/zh_CN'

import { ref, watch } from 'vue'
import { TabPane, Tabs } from 'antdv-next'
import Setups from './setups.vue'
import FirstForm from './form.vue'
import FristTable from './fristTable/index.vue'
import Detail from './Detail.vue'
import RowKeyTest from './RowKeyTest.vue'
import InputListTest from './InputListTest.vue'

dayjs.locale('zh-cn')

const tabs = [
  { comp: Setups, label: '弹窗' },
  { comp: FirstForm, label: '超级表单' },
  { comp: FristTable, label: '一体表格' },
  { comp: Detail, label: '详情描述' },
  { comp: RowKeyTest, label: '无 rowKey 测试' },
  { comp: InputListTest, label: 'InputList 校验测试' },
]

const tab = ref((location.hash || '#1').substring(1))
watch(tab, (key) => {
  location.hash = String(key)
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  padding: 20px;
}
</style>
