<template>
  <ConfigProvider :locale="zhCN">
    <h1>关于</h1>
    <Tabs :default-active-key="tab" @change="changeTab">
      <Tabs.TabPane v-for="name of tabNames" :key="name" :tab="name" />
    </Tabs>
    <component :is="comp" msg="about" />
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
import CreateForm from './createForm/index.vue'
import Detail from './Detail.vue'

const tabs = {
  Setups,
  FirstForm,
  CreateForm,
  Detail,
}

const tabNames = Object.keys(tabs)
const tab = ref('FirstForm')
const comp = computed(() => tabs[tab.value])
const changeTab = (name) => {
  tab.value = name
}
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
