import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import SuperFormComponents from '../packages/superform-element-plus/src/unplugin'

export default defineConfig(({ command }) => ({
  // 交互回归读取当前源码；生产构建仍使用包 exports。
  resolve: {
    alias:
      command === 'serve'
        ? [
            {
              find: '@demo/product',
              replacement: resolve(__dirname, '../packages/superform-element-plus/src/index.ts'),
            },
            {
              find: /^superform-element-plus$/,
              replacement: resolve(__dirname, '../packages/superform-element-plus/src/index.ts'),
            },
            {
              find: /^superform\/sdk$/,
              replacement: resolve(__dirname, '../src/sdk.ts'),
            },
            {
              find: /^superform$/,
              replacement: resolve(__dirname, '../src/index.ts'),
            },
          ]
        : [{ find: '@demo/product', replacement: 'superform-element-plus' }],
    dedupe: ['vue', 'element-plus'],
  },
  server: {
    host: '127.0.0.1',
    port: 5174,
    open: '/',
    fs: { allow: [resolve(__dirname, '..')] },
  },
  plugins: [
    SuperFormComponents({
      dirs: ['../examples/shared'],
      entry: 'main.ts',
      types: ['Input'],
      dts: 'superform-components.d.ts',
    }),
    vue(),
    vueJsx(),
  ],
}))
