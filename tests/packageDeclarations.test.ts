import { access, readFile } from 'node:fs/promises'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const workspace = process.cwd()

describe('发布声明', () => {
  it('具体 UI Adapter 使用独立子路径和产物', async () => {
    const packageJson = JSON.parse(await readFile(path.join(workspace, 'package.json'), 'utf8'))

    expect(packageJson.exports['./adapter/antdv']).toEqual({
      types: './lib/antdv.d.ts',
      import: './lib/adapter/antdv.js',
    })
    expect(packageJson.exports['./adapter/element-plus']).toEqual({
      types: './lib/element-plus.d.ts',
      import: './lib/adapter/element-plus.js',
    })

    const rootDeclaration = await readFile(path.join(workspace, 'lib/index.d.ts'), 'utf8')
    const antdvDeclaration = await readFile(path.join(workspace, 'lib/antdv.d.ts'), 'utf8')
    const elementPlusDeclaration = await readFile(path.join(workspace, 'lib/element-plus.d.ts'), 'utf8')

    expect(rootDeclaration).not.toContain('antdvAdapter')
    expect(rootDeclaration).not.toContain('elementPlusAdapter')
    expect(antdvDeclaration).toContain('antdvAdapter')
    expect(antdvDeclaration).not.toContain('element-plus')
    expect(elementPlusDeclaration).toContain('elementPlusAdapter')
    expect(elementPlusDeclaration).not.toContain('antdv-next')
  })

  it('unplugin 子路径指向汇总后的独立声明', async () => {
    const packageJson = JSON.parse(await readFile(path.join(workspace, 'package.json'), 'utf8'))
    expect(packageJson.exports['./unplugin/vite'].types).toBe('./lib/vite.d.ts')
    expect(packageJson.exports).not.toHaveProperty('./unplugin/rollup')
    expect(packageJson.exports).not.toHaveProperty('./unplugin/webpack')
    await expect(access(path.join(workspace, 'lib/unplugin/rollup.js'))).rejects.toThrow()
    await expect(access(path.join(workspace, 'lib/unplugin/webpack.js'))).rejects.toThrow()

    const declaration = await readFile(path.join(workspace, 'lib/vite.d.ts'), 'utf8')
    expect(declaration).not.toContain('../src')
    expect(declaration).not.toContain('node_modules')
  })

  it('主声明不包含开发环境的类型扩展或内部依赖路径', async () => {
    const declaration = await readFile(path.join(workspace, 'lib/index.d.ts'), 'utf8')

    expect(declaration).toContain('export declare interface UIAdapter')
    expect(declaration).toContain('export declare type UIFormComponentProps')
    expect(declaration).toContain('export declare type UIContainerComponentProps')
    expect(declaration).toContain('export declare type UIActionComponentProps')
    expect(declaration).toContain('export declare type UITableComponentProps')
    expect(declaration).toContain('export declare type UIModalComponentProps')
    expect(declaration).toContain('export declare type UIUploadComponentProps')
    expect(declaration).toContain('export declare interface FormSchemaProps')
    expect(declaration).toContain('export declare interface LayoutColProps')
    expect(declaration).toContain('export declare interface InstallConfig')
    expect(declaration).not.toContain('export declare function getUIAdapter')
    expect(declaration).not.toContain('export declare function renderUI')
    expect(declaration).not.toContain('export declare function resolveUI')
    expect(declaration).not.toContain('export declare function mapUI')
    expect(declaration).not.toContain('declare module "../src/exaTypes"')
    expect(declaration).not.toContain("declare module '../../exaTypes'")
    expect(declaration).not.toContain("from './compat/antdv'")
    expect(declaration).not.toContain('src/compat/antdv')
    expect(declaration).not.toContain('InternalFormItemProps')
    expect(declaration).not.toContain('node_modules')
  })
})
