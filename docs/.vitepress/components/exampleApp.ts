import zhCN from 'antdv-next/locale/zh_CN'
import type { ReplProps } from '@vue/repl'

export const exampleAppCode = `<template>
  <ConfigProvider :locale="zhCN">
    <Example />
  </ConfigProvider>
</template>

<script>
import zhCN from 'antdv-next/locale/zh_CN'

// SuperForm 的应用级配置，可继续加入 dictApi、defaultProps 等全局策略。
export const superFormConfig = {
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
    importCode: `import superform, { fieldComponents } from 'superform-antdv'`,
    useCode: `if (!globalThis['__superformAntdvReplInitialized']) {
  superform.initialize({ components: fieldComponents })
  globalThis['__superformAntdvReplInitialized'] = true
}
superform.configure(__modules__['src/App.vue'].superFormConfig || {})`,
  },
}
