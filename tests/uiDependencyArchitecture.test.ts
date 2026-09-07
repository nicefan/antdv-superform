import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { extname, join, relative, resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const workspaceRoot = resolve(__dirname, '..')
const sourceRoot = join(workspaceRoot, 'src')

function normalize(file: string) {
  return relative(sourceRoot, file).replace(/\\/g, '/')
}

function collectSourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = join(directory, entry.name)
    if (entry.isDirectory()) return collectSourceFiles(file)
    return ['.ts', '.tsx', '.vue', '.less'].includes(extname(file))
      ? [file]
      : []
  })
}

describe('Core UI 依赖架构保护', () => {
  it('Core 源码不直接消费具体 UI 框架或旧 compat', () => {
    const violations = collectSourceFiles(sourceRoot)
      .filter((file) =>
        /(?:antdv-next|@antdv-next\/icons|element-plus|compat\/(?:antdv|icons)|\.ant-|\.el-)/.test(
          readFileSync(file, 'utf8')
        )
      )
      .map(normalize)

    expect(violations).toEqual([])
    expect(existsSync(join(sourceRoot, 'compat/antdv.ts'))).toBe(false)
    expect(existsSync(join(sourceRoot, 'compat/icons.ts'))).toBe(false)
  })

  it('Core 的发布依赖不包含具体 UI 框架', () => {
    const packageJson = JSON.parse(
      readFileSync(join(workspaceRoot, 'package.json'), 'utf8')
    )
    const peers = packageJson.peerDependencies || {}

    expect(peers).not.toHaveProperty('antdv-next')
    expect(peers).not.toHaveProperty('@antdv-next/icons')
    expect(peers).not.toHaveProperty('element-plus')
  })
})
