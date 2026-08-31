import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import dts from 'rollup-plugin-dts'
import viteDts from 'vite-plugin-dts'
import SuperFormComponents, { createLibraryResolver } from './src/unplugin/vite'
// import ViteComponents, { AntDesignVueResolver } from 'vite-plugin-components'
// import svgSprite from 'vite-plugin-svg-sprite'
// import resolvePlugin from '@rollup/plugin-node-resolve'

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
export default defineConfig(({ command, mode }) =>
  mode === 'dist'
    ? {
        build: {
          lib: {
            entry: resolve(__dirname, 'scripts/repl-entry.ts'),
            name: 'antdv-superform',
            formats: ['es'],
          },
          outDir: 'dist',
          // minify: false,
          rollupOptions: {
            external: ['vue'],
            output: {
              exports: 'named',
              globals: {
                // vue: 'vue',
                'antdv-next': 'antd',
              },
              chunkFileNames: '[name].js',
              minifyInternalExports: false,
              manualChunks(id) {
                if (id.includes('antdv-next')) {
                  return 'antd'
                }
              },
            },
          },
        },
        plugins: [vue(), vueJsx()],
      }
    : {
        resolve: {},
        server: {
          host: '127.0.0.1',
          open: '/index.html',
        },
        test: {
          deps: {
            inline: [/antdv-next/, /@v-c/],
          },
        },
        build: {
          lib: {
            entry: {
              index: resolve(__dirname, 'src/index.ts'),
              'unplugin/vite': resolve(__dirname, 'src/unplugin/vite.ts'),
              'unplugin/rollup': resolve(__dirname, 'src/unplugin/rollup.ts'),
              'unplugin/webpack': resolve(__dirname, 'src/unplugin/webpack.ts'),
            },
            formats: ['es'],
            name: 'MyLib',
            fileName: (_, entryName) => `${entryName}.js`,
          },
          outDir: 'lib',
          minify: false,
          rollupOptions: {
            // input: {
            //   main: resolve(__dirname, 'example/index.html'),
            // },
            external: [
              'vue',
              'unplugin',
              /^node:/,
              /moment/,
              'nanoid',
              /dayjs/,
              /lodash/,
              /antdv-next/,
              /@antdv-next/,
              '@vueuse/core',
            ],
            // input: [`dist/index.d.ts`],
            // output: {
            //   format: 'es',
            //   dir: '.',
            //   entryFileNames: 'lib/[name].ts',
            // },
            // plugins: [dts()],

            output: {
              intro: (chunk) => (chunk.name === 'index' ? 'import "./style.css";' : ''),
            },
          },
        },
        esbuild: {
          target: 'es2020',
        },
        plugins: [
          SuperFormComponents({
            dirs: ['example'],
            entry: 'example/main.ts',
            dts: 'example/superform-components.d.ts',
            superFormImport: '/src/components/index.ts',
            dtsModule: '../src/exaTypes',
            typesImport: '../src',
            resolvers: [createLibraryResolver({ from: 'antdv-next', components: ['Rate'] })],
          }),
          vue(),
          vueJsx(),
          viteDts({
            // outDir: 'dist',
            staticImport: true,
            // declarationOnly: true,
            rollupTypes: true,
            insertTypesEntry: true,
            // cleanVueFileName: true,
            copyDtsFiles: true,
            compilerOptions: {
              charset: 'utf8',
            },
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
      }
)
