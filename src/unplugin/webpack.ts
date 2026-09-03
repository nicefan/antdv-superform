import { unplugin } from './core'
import type { SuperFormComponentsOptions } from './core'

export { createLibraryResolver } from './core'
export type { SuperFormComponentsOptions } from './core'

interface WebpackPlugin {
  apply(compiler: any): void
}

// 避免公共声明把 webpack 内部类型链带入 API Extractor。
const webpackPlugin = unplugin.webpack as (options: SuperFormComponentsOptions) => WebpackPlugin

export default webpackPlugin
