import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { END_MARKER, initAi, MANUAL_PROMPT, START_MARKER } from '../bin/init-ai.mjs'

const tempDirs: string[] = []

async function createTempDir() {
  const dir = await mkdtemp(join(tmpdir(), 'antdv-superform-init-ai-'))
  tempDirs.push(dir)
  return dir
}

afterEach(async () => {
  await Promise.all(tempDirs.splice(0).map((dir) => rm(dir, { recursive: true, force: true })))
})

describe('init-ai', () => {
  it('没有 AI 入口时不创建文件并返回手动提示词', async () => {
    const cwd = await createTempDir()

    const result = await initAi(cwd)

    expect(result.entries).toEqual([])
    expect(result.prompt).toBe(MANUAL_PROMPT)
    await expect(readFile(join(cwd, 'AGENTS.md'), 'utf8')).rejects.toMatchObject({ code: 'ENOENT' })
  })

  it('更新所有已存在的 AI 入口并保留原有内容', async () => {
    const cwd = await createTempDir()
    const agentsFile = join(cwd, 'AGENTS.md')
    const claudeFile = join(cwd, 'CLAUDE.md')
    await writeFile(agentsFile, '# 项目约束\n\n- 使用 pnpm。\n', 'utf8')
    await writeFile(claudeFile, '# Claude 约束\n', 'utf8')

    const first = await initAi(cwd)
    const second = await initAi(cwd)
    const agentsContent = await readFile(agentsFile, 'utf8')
    const claudeContent = await readFile(claudeFile, 'utf8')

    expect(first.entries).toHaveLength(2)
    expect(first.entries.every(({ changed }) => changed)).toBe(true)
    expect(second.entries.every(({ changed }) => !changed)).toBe(true)
    expect(agentsContent).toContain('# 项目约束')
    expect(claudeContent).toContain('# Claude 约束')
    expect(agentsContent.match(new RegExp(START_MARKER, 'g'))).toHaveLength(1)
    expect(claudeContent).toContain('node_modules/antdv-superform/AI_GUIDE.md')
    expect(claudeContent).toContain('diagnose-schema')
  })

  it('存在 Cursor rules 目录时创建专属规则', async () => {
    const cwd = await createTempDir()
    const rulesDir = join(cwd, '.cursor', 'rules')
    await mkdir(rulesDir, { recursive: true })

    const result = await initAi(cwd)
    const content = await readFile(join(rulesDir, 'antdv-superform.mdc'), 'utf8')

    expect(result.entries).toHaveLength(1)
    expect(content).toContain('alwaysApply: false')
    expect(content).toContain(START_MARKER)
  })

  it('任一入口标记不完整时拒绝所有改写', async () => {
    const cwd = await createTempDir()
    const agentsFile = join(cwd, 'AGENTS.md')
    const claudeFile = join(cwd, 'CLAUDE.md')
    const agentsContent = '# 项目约束\n'
    const claudeContent = `# Claude 约束\n\n${START_MARKER}\n`
    await writeFile(agentsFile, agentsContent, 'utf8')
    await writeFile(claudeFile, claudeContent, 'utf8')

    await expect(initAi(cwd)).rejects.toThrow('指引标记不完整')
    await expect(readFile(agentsFile, 'utf8')).resolves.toBe(agentsContent)
    await expect(readFile(claudeFile, 'utf8')).resolves.toBe(claudeContent)
    expect(claudeContent).not.toContain(END_MARKER)
  })
})
