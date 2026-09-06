import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import SuperFormComponents, {
  createAntdvResolver,
} from 'superform-antdv/unplugin'

const libraryRoot = resolve(__dirname, '..')

export default defineConfig({
  resolve: {
    alias: [
      {
        find: /^superform-antdv\/unplugin$/,
        replacement: resolve(
          libraryRoot,
          'packages/superform-antdv/src/unplugin.ts'
        ),
      },
      {
        find: /^superform-antdv$/,
        replacement: resolve(
          libraryRoot,
          'packages/superform-antdv/src/index.ts'
        ),
      },
      {
        find: /^superform\/sdk$/,
        replacement: resolve(libraryRoot, 'src/sdk.ts'),
      },
      {
        find: /^superform$/,
        replacement: resolve(libraryRoot, 'src/index.ts'),
      },
    ],
    dedupe: ['vue', 'antdv-next', '@antdv-next/icons'],
  },
  server: {
    host: '127.0.0.1',
    port: 5173,
    open: '/',
    fs: {
      allow: [libraryRoot],
    },
  },
  plugins: [
    SuperFormComponents({
      dirs: ['.'],
      entry: ['src/main.ts', 'upgrade-dev/main.ts'],
      dts: 'superform-components.d.ts',
      superFormImport: 'superform-antdv',
      dtsModule: 'superform-antdv',
      typesImport: 'superform-antdv',
      resolvers: [createAntdvResolver()],
    }),
    vue(),
    vueJsx(),
  ],
})
