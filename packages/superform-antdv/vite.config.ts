import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import viteDts from 'vite-plugin-dts'
import { resolve } from 'node:path'

export default defineConfig({
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        full: resolve(__dirname, 'src/full.ts'),
        unplugin: resolve(__dirname, 'src/unplugin.ts'),
      },
      formats: ['es'],
      fileName: (_, entryName) => `${entryName}.js`,
    },
    outDir: 'lib',
    minify: false,
    rollupOptions: {
      external: [
        'vue',
        'superform',
        /^superform\//,
        'antdv-next',
        /^antdv-next\//,
        '@antdv-next/icons',
        /^@antdv-next\//,
      ],
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    viteDts({
      include: ['src'],
      rollupTypes: true,
      insertTypesEntry: false,
      copyDtsFiles: true,
    }),
  ],
})
