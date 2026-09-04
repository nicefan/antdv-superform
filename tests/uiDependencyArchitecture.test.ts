import { readFileSync, readdirSync } from 'node:fs'
import { extname, join, relative, resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const sourceRoot = resolve(__dirname, '../src')
const temporaryCompatConsumers = new Set([
  'components/Form.vue',
  'components/Preview.vue',
  'components/Upload.vue',
  'components/buttons/actions.ts',
  'superModal/Modal.tsx',
  'superModal/useModal.ts',
  'superTable/SuperTable.vue',
])

function normalize(file: string) {
  return relative(sourceRoot, file).replace(/\\/g, '/')
}

function collectSourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = join(directory, entry.name)
    if (entry.isDirectory()) return collectSourceFiles(file)
    return ['.ts', '.tsx', '.vue'].includes(extname(file)) ? [file] : []
  })
}

describe('Core UI 依赖架构保护', () => {
  it('只有 P006/P007 明确保留的模块可以消费 AntDV compat', () => {
    const violations = collectSourceFiles(sourceRoot)
      .filter((file) => !normalize(file).startsWith('adapter/') && !normalize(file).startsWith('compat/'))
      .filter((file) => /(?:antdv-next|@antdv-next\/icons|compat\/(?:antdv|icons))/.test(readFileSync(file, 'utf8')))
      .map(normalize)
      .filter((file) => !file.startsWith('components/Table/') && !temporaryCompatConsumers.has(file))

    expect(violations).toEqual([])
  })
})
