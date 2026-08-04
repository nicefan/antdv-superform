#!/usr/bin/env node

import { initAi } from './init-ai.mjs'
import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { diagnoseSchema } from '../shared/schema-diagnostics.mjs'

const help = `antdv-superform

用法：
  npx antdv-superform init-ai
  npx antdv-superform diagnose-schema <schema.json> [--type form|table|detail] [--json]

命令：
  init-ai  检测并更新当前项目已有的 AI 指令入口
  diagnose-schema  诊断 JSON schema；文件名使用 - 时从标准输入读取
`

const args = process.argv.slice(2)
const [command] = args

async function readStdin() {
  const chunks = []
  for await (const chunk of process.stdin) chunks.push(chunk)
  return Buffer.concat(chunks).toString('utf8')
}

async function runDiagnostics() {
  const file = args[1]
  if (!file || file.startsWith('--')) throw new Error('请提供 schema JSON 文件路径，或使用 - 从标准输入读取。')

  const typeIndex = args.indexOf('--type')
  const kind = typeIndex >= 0 ? args[typeIndex + 1] : 'auto'
  const source = file === '-' ? await readStdin() : await readFile(resolve(process.cwd(), file), 'utf8')
  const diagnostics = diagnoseSchema(JSON.parse(source), kind)

  if (args.includes('--json')) {
    console.log(JSON.stringify(diagnostics, null, 2))
  } else if (!diagnostics.length) {
    console.log('未发现 schema 问题。')
  } else {
    diagnostics.forEach(({ level, code, path, message }) => {
      console.log(`[${level}] ${path} (${code}) ${message}`)
    })
  }

  if (diagnostics.some(({ level }) => level === 'error')) process.exitCode = 1
}

if (!command || command === '--help' || command === '-h') {
  console.log(help)
} else if (command === 'init-ai') {
  try {
    const { entries, prompt } = await initAi()
    if (entries.length) {
      entries.forEach(({ file, changed }) => console.log(changed ? `已更新 ${file}` : `${file} 已是最新状态`))
    } else {
      console.log('未检测到已有的 AI 项目指令入口，未创建或修改文件。')
      console.log(`\n请手动将以下提示词添加到所用 AI 工具的项目指令中：\n\n${prompt}`)
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : error)
    process.exitCode = 1
  }
} else if (command === 'diagnose-schema') {
  try {
    await runDiagnostics()
  } catch (error) {
    console.error(error instanceof Error ? error.message : error)
    process.exitCode = 1
  }
} else {
  console.error(`未知命令：${command}\n\n${help}`)
  process.exitCode = 1
}
