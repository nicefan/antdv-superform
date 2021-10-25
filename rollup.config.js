import path from 'path'
// import { terser } from 'rollup-plugin-terser';
// import resolve from '@rollup/plugin-node-resolve'
// import commonjs from '@rollup/plugin-commonjs'
import ts from '@rollup/plugin-typescript'
import vuePlugin from 'rollup-plugin-vue'
import Components from 'unplugin-vue-components/rollup'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import vueJsx from 'rollup-plugin-vue-jsx-compat'
import esbuild from 'rollup-plugin-esbuild'
import postcss from 'rollup-plugin-postcss'

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
  lib: ['esnext'],
  target: 'es2015',
  declaration: false,
  outDir: dir,
  declarationDir: dir + '/types',
  // check: true,
  tsconfig: path.resolve(__dirname, 'tsconfig.json'),
})
const componentsPlugin = Components({
  resolvers: [AntDesignVueResolver()],
  include: [/\.vue$/, /\.tsx$/],
})

const mainFile = 'src/index.ts'
const mainConfig = [
  {
    input: mainFile,
    output: {
      banner,
      format: 'es',
      file: pkg.module,
    },
    plugins: [
      componentsPlugin,
      vuePlugin(),
      vueJsx(),
      esbuild({
        jsxFactory: 'vueJsxCompat',
      }),

      postcss(),
      // tsPlugin,
    ],
  },
  // {
  //   input: 'src/VIcon.ts',
  //   output: {
  //     banner,
  //     format: 'es',
  //     file: `${dir}/VICon.js`,
  //   },
  //   plugins: [tsPlugin],
  // },
]

export default mainConfig
