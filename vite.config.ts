import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import viteDts from 'vite-plugin-dts'
// import ViteComponents, { AntDesignVueResolver } from 'vite-plugin-components'
// import svgSprite from 'vite-plugin-svg-sprite'
// import resolvePlugin from '@rollup/plugin-node-resolve'

import { resolve } from 'path'
import { readFile, rm, writeFile } from 'node:fs/promises'
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isElementPlusRepl = mode === 'dist-element-plus'
  return mode === 'dist' || isElementPlusRepl
    ? {
        build: {
          lib: {
            entry: resolve(
              __dirname,
              isElementPlusRepl
                ? 'scripts/repl-element-plus-entry.ts'
                : 'scripts/repl-entry.ts'
            ),
            name: 'superform',
            formats: ['es'],
            fileName: isElementPlusRepl
              ? 'superform-element-plus'
              : 'superform-antdv',
          },
          outDir: isElementPlusRepl
            ? '.repl-dist/element-plus'
            : '.repl-dist',
          // minify: false,
          rollupOptions: {
            external: ['vue'],
            output: {
              exports: 'named',
              chunkFileNames: '[name].js',
              minifyInternalExports: false,
              // 在线 REPL 需要同时映射产品包和 UI 包，保持在同一构建图中以共享依赖实例。
              manualChunks(id) {
                if (!isElementPlusRepl && id.includes('antdv-next')) return 'antd'
                if (
                  isElementPlusRepl &&
                  id.includes('/node_modules/') &&
                  id.includes('element-plus')
                ) {
                  return 'element-plus'
                }
              },
            },
          },
        },
        plugins: [vue(), vueJsx()],
      }
    : {
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
              sdk: resolve(__dirname, 'src/sdk.ts'),
            },
            formats: ['es'],
            name: 'superform',
            fileName: (_, entryName) => `${entryName}.js`,
          },
          outDir: 'dist',
          minify: false,
          rollupOptions: {
            external: [
              'vue',
              'unplugin',
              /^node:/,
              /moment/,
              'nanoid',
              /dayjs/,
              /lodash/,
              '@vueuse/core',
            ],
            output: {
              intro: (chunk) => (chunk.name === 'index' ? 'import "./style.css";' : ''),
              chunkFileNames: '[name].js',
            },
          },
        },
        esbuild: {
          target: 'es2020',
        },
        plugins: [
          vue(),
          vueJsx(),
          viteDts({
            include: ['src'],
            staticImport: true,
            // declarationOnly: true,
            rollupTypes: true,
            insertTypesEntry: false,
            // cleanVueFileName: true,
            copyDtsFiles: true,
            async afterBuild() {
              // 汇总过程需要代理声明作为入口，结束后只保留 package exports 指向的汇总声明。
              await Promise.all(
                ['unplugin/vite'].map((name) =>
                  rm(resolve(__dirname, `dist/${name}.d.ts`), { force: true })
                )
              )
              // API Extractor 在 Windows 下输出 CRLF，统一为仓库使用的 LF。
              await Promise.all(
                ['index', 'vite', 'sdk'].map(async (name) => {
                  const file = resolve(__dirname, `dist/${name}.d.ts`)
                  const content = await readFile(file, 'utf8')
                  await writeFile(file, content.replace(/\r\n/g, '\n'), 'utf8')
                })
              )
            },
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
})
