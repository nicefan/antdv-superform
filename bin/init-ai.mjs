import { readFile, stat, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

export const START_MARKER = '<!-- antdv-superform init-ai:start -->'
export const END_MARKER = '<!-- antdv-superform init-ai:end -->'

export const MANUAL_PROMPT = `项目使用了 antdv-superform。编写或修改相关代码前，请先阅读 node_modules/antdv-superform/AI_GUIDE.md，并遵循其中的现行 API、默认配置和推荐用法。不要从旧代码推断已废弃 API，也不要重复生成库已提供的默认配置。生成 schema 后，请使用 npx antdv-superform diagnose-schema 或包根导出的 diagnoseSchema() 进行检查。`

const ENTRY_FILES = ['AGENTS.md', 'CLAUDE.md', 'GEMINI.md', '.github/copilot-instructions.md', '.cursorrules']

const guideBlock = (eol) =>
  [
    START_MARKER,
    '## Antdv SuperForm',
    '',
    '编写或修改使用 `antdv-superform` 的代码前，必须先阅读 `node_modules/antdv-superform/AI_GUIDE.md`，并遵循其中的现行 API、默认配置和推荐用法。不要从旧代码推断已废弃 API，也不要重复生成库已提供的默认配置。',
    '',
    '生成可序列化的 schema 后，可执行 `npx antdv-superform diagnose-schema <schema.json> --type form|table|detail` 检查；代码中的动态 schema 可调用包根导出的 `diagnoseSchema(schema, type)`。',
    END_MARKER,
  ].join(eol)

async function getPathType(path) {
  try {
    const info = await stat(path)
    return info.isDirectory() ? 'directory' : info.isFile() ? 'file' : undefined
  } catch (error) {
    if (error?.code === 'ENOENT') return undefined
    throw error
  }
}

function updateContent(current, file) {
  const hasStart = current.includes(START_MARKER)
  const hasEnd = current.includes(END_MARKER)
  if (hasStart !== hasEnd) {
    throw new Error(`${file} 中的 antdv-superform 指引标记不完整，请修正后重试。`)
  }

  const eol = current.includes('\r\n') ? '\r\n' : '\n'
  const block = guideBlock(eol)
  if (hasStart) {
    const start = current.indexOf(START_MARKER)
    const endMarkerIndex = current.indexOf(END_MARKER, start)
    if (endMarkerIndex < 0) throw new Error(`${file} 中的 antdv-superform 指引标记顺序错误，请修正后重试。`)
    const end = endMarkerIndex + END_MARKER.length
    return current.slice(0, start) + block + current.slice(end)
  }

  const prefix = current.trimEnd()
  return prefix ? `${prefix}${eol}${eol}${block}${eol}` : `${block}${eol}`
}

export async function initAi(cwd = process.cwd()) {
  const entries = []

  for (const relativePath of ENTRY_FILES) {
    const file = resolve(cwd, relativePath)
    if ((await getPathType(file)) === 'file') entries.push({ file, current: await readFile(file, 'utf8') })
  }

  const cursorRulesDir = resolve(cwd, '.cursor/rules')
  if ((await getPathType(cursorRulesDir)) === 'directory') {
    const file = resolve(cursorRulesDir, 'antdv-superform.mdc')
    const exists = (await getPathType(file)) === 'file'
    const current = exists
      ? await readFile(file, 'utf8')
      : '---\ndescription: 使用 antdv-superform 创建或检查表单、表格和详情 schema\nalwaysApply: false\n---\n'
    entries.push({ file, current })
  }

  if (!entries.length) return { entries: [], prompt: MANUAL_PROMPT }

  const updates = entries.map(({ file, current }) => ({ file, current, next: updateContent(current, file) }))
  await Promise.all(
    updates.filter(({ current, next }) => current !== next).map(({ file, next }) => writeFile(file, next, 'utf8'))
  )

  return {
    entries: updates.map(({ file, current, next }) => ({ file, changed: current !== next })),
  }
}
