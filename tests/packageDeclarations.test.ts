import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

const workspace = process.cwd()

describe('发布声明', () => {
  it('unplugin 子路径指向汇总后的独立声明', async () => {
    const packageJson = JSON.parse(await readFile(path.join(workspace, 'package.json'), 'utf8'))
    const entries = ['vite', 'rollup', 'webpack']

    for (const name of entries) {
      expect(packageJson.exports[`./unplugin/${name}`].types).toBe(`./lib/${name}.d.ts`)
      const declaration = await readFile(path.join(workspace, `lib/${name}.d.ts`), 'utf8')
      expect(declaration).not.toContain('../src')
      expect(declaration).not.toContain('node_modules')
    }
  })

  it('主声明不包含开发环境的类型扩展或内部依赖路径', async () => {
    const declaration = await readFile(path.join(workspace, 'lib/index.d.ts'), 'utf8')

    expect(declaration).toContain('export declare interface UIAdapter')
    expect(declaration).not.toContain('declare module "../src/exaTypes"')
    expect(declaration).not.toContain('InternalFormItemProps')
    expect(declaration).not.toContain('node_modules')
  })
})
