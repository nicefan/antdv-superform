import zhCN from 'antdv-next/locale/zh_CN'
import type { ReplProps } from '@vue/repl'

export const exampleAppCode = `<template>
  <ConfigProvider :locale="zhCN">
    <Example />
  </ConfigProvider>
</template>

<script>
import zhCN from 'antdv-next/locale/zh_CN'

// antdv-superform 的插件安装配置，可继续加入 dictApi、defaultProps 等全局策略。
export const superFormConfig = {
  locale: zhCN,
  schemaDiagnostics: false,
}
</script>

<script setup>
import { ConfigProvider } from 'antdv-next'
import zhCN from 'antdv-next/locale/zh_CN'
import Example from './Example.vue'
</script>`

export const exampleLocaleUrl = `data:text/javascript;charset=utf-8,${encodeURIComponent(
  `export default ${JSON.stringify(zhCN)}`
)}`

export const examplePreviewOptions: NonNullable<ReplProps['previewOptions']> = {
  customCode: {
    importCode: `import SuperFormPlugin from 'antdv-superform'`,
    useCode: `app.use(SuperFormPlugin, __modules__['src/App.vue'].superFormConfig)`,
  },
}
