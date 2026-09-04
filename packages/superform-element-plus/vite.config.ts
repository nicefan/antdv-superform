import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import viteDts from 'vite-plugin-dts'

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
      external: ['vue', 'superform', /^superform\//, /^element-plus(?:\/|$)/],
    },
  },
  plugins: [
    viteDts({
      include: ['src'],
      outDir: 'lib',
      rollupTypes: true,
      insertTypesEntry: false,
      copyDtsFiles: true,
    }),
  ],
})
