import path from 'path'
// import { terser } from 'rollup-plugin-terser';
// import resolve from '@rollup/plugin-node-resolve'
// import commonjs from '@rollup/plugin-commonjs'
import ts from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import viteDts from 'vite-plugin-dts'
import addGlobalTs from 'rollup-plugin-add-global-ts'
import vuePlugin from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/rollup'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import vueJsx from 'rollup-plugin-vue-jsx-compat'
import esbuild from 'rollup-plugin-esbuild'
import postcss from 'rollup-plugin-postcss'
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pkg = require('./package.json')
const name = pkg.name
const dir = 'dist'
const banner = `/*!
  * ${pkg.name} v${pkg.version}
  * (c) ${new Date().getFullYear()} 范阳峰 covien@msn.com
  * @license MIT
  */`

const tsPlugin = ts({
  lib: ['esnext', 'dom'],
  target: 'es2015',
  declaration: true,
  noForceEmit: true,
  outDir: dir,
  declarationDir: dir + '/types',
  // check: true,
  tsconfig: './tsconfig.json',
})
const componentsPlugin = Components({
  resolvers: [AntDesignVueResolver()],
  include: [/\.vue$/, /\.tsx$/],
})

const mainFile = 'src/index.ts'
const mainConfig = {
    input: mainFile,
    output: {
      banner,
      format: 'es',
      file: pkg.module,
    },
    plugins: [
      // componentsPlugin,
      vuePlugin(),
      tsPlugin,
      // vueJsx(),
      // esbuild({
      //   jsxFactory: 'vueJsxCompat',
      // }),

      postcss(),
    ],
  }
const types = {
  input: [`dist/index.d.ts`],
  output: {
    format: 'es',
    dir: '.',
    entryFileNames: 'lib/index.d.ts',
  },
  plugins: [
    dts(),
    // addGlobalTs({
    //   path: ['types/index.d.ts', 'types/exaTypes.d.ts']
    // }),
  ]
}
export default types
