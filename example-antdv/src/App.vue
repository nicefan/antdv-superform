<template>
  <ConfigProvider :locale="zhCN"><DemoApp ui="antdv" /></ConfigProvider>
</template>
<script setup lang="ts">
import { ConfigProvider } from 'antdv-next'
import zhCN from 'antdv-next/locale/zh_CN'
import DemoApp from '../../examples/shared/DemoApp.vue'
</script>
