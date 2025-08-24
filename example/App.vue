<template>
  <ConfigProvider :locale="zhCN">
    <h1>关于</h1>
    <Tabs :default-active-key="tab">
      <Tabs.TabPane v-for="(item, index) of tabs" :key="index" :tab="item.label">
        <component :is="item.comp" msg="about" />
      </Tabs.TabPane>
    </Tabs>
  </ConfigProvider>
</template>

<script lang="ts" setup>
import { ConfigProvider } from 'ant-design-vue'
import 'dayjs/locale/zh-cn'
import zhCN from 'ant-design-vue/es/locale/zh_CN'

import { ref, computed } from 'vue'
import { Tabs } from 'ant-design-vue'
import Setups from './setups.vue'
import FirstForm from './form.vue'
import FristTable from './fristTable/index.vue'
import Detail from './Detail.vue'

const tabs = [
  { comp: Setups, label: '弹窗' },
  { comp: FirstForm, label: '超级表单' },
  { comp: FristTable, label: '一体表格' },
  { comp: Detail, label: '详情描述' },
]

const tab = ref(1)
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
