import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'rollup-plugin-dts'
import viteDts from 'vite-plugin-dts'
// import ViteComponents, { AntDesignVueResolver } from 'vite-plugin-components'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import svgSymbol from 'vite-svg-symbol-loader'
// import svgSprite from 'vite-plugin-svg-sprite'
import resolvePlugin from '@rollup/plugin-node-resolve'

import { resolve } from 'path'

const types = {
  input: [`dist/index.d.ts`],
  output: {
    format: 'es',
    dir: '.',
    entryFileNames: 'lib/[name].ts',
  },
  plugins: [dts()],
}
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      name: 'MyLib',
      fileName: 'index',
    },
    outDir: 'lib',
    minify: false,
    rollupOptions: {
      // input: {
      //   main: resolve(__dirname, 'example/index.html'),
      // },
      external: ['vue', /moment/, 'nanoid', /dayjs/, /lodash/, /ant-design-vue/, /@ant-design/],
      // input: [`dist/index.d.ts`],
      // output: {
      //   format: 'es',
      //   dir: '.',
      //   entryFileNames: 'lib/[name].ts',
      // },
      // plugins: [dts()],
    
      // output: {
        // https://rollupjs.org/guide/en/#outputmanualchunks
        // manualChunks: {
        //   vele: ['ant-design-vue'],
        //   vlib: ['vue', 'vue-router', 'vuex'],
        // },

        // globals: {
        //   vue: 'vue',
        //   'ant-design-vue': 'ant-design-vue',
        // }
      // },
    },
  },
  esbuild: {
    target: 'es2020',
  },
  plugins: [
    vue(),
    vueJsx(),
    viteDts({
      outDir: 'dist',
    }),
    // Components({
    //   dts: true,
    //   deep: false,
    //   // extensions: ['vue', 'tsx'],
    //   resolvers: [AntDesignVueResolver()],
    //   include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/, /\.ts$/],
    //   types: [],
    // }),
    //   svgSprite({
    //   symbolId: 'icon-[name]-[hash]',
    // }),

    svgSymbol({
      id: 'icon-[name]',
      svgo: ['removeXMLNS']
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
        // 重写 less 变量，定制样式
        modifyVars: {
          // '@primary-color': 'red',
        },
      },
    },
  },
})
