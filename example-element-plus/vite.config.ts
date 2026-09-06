import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import SuperFormComponents, {
  createElementPlusResolver,
} from 'superform-element-plus/unplugin'

export default defineConfig({
  server: {
    host: '127.0.0.1',
    port: 5174,
    open: '/',
  },
  plugins: [
    SuperFormComponents({
      dirs: ['.'],
      entry: 'main.ts',
      dts: 'superform-components.d.ts',
      superFormImport: 'superform-element-plus',
      dtsModule: 'superform-element-plus',
      typesImport: 'superform-element-plus',
      resolvers: [createElementPlusResolver()],
    }),
    vue(),
  ],
})
