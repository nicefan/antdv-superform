<template>
  <ElConfigProvider :locale="zhCN"><DemoApp ui="element" /></ElConfigProvider>
</template>
<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCN from 'element-plus/es/locale/lang/zh-cn'
import DemoApp from '../examples/shared/DemoApp.vue'
</script>
