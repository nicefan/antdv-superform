import { readFile, readdir, writeFile } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import prettier from 'prettier'
import ts from 'typescript'

const docsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const prettierOptions = {
  semi: false,
  singleQuote: true,
  printWidth: 100,
}

async function* findVueFiles(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name)
    if (entry.isDirectory()) yield* findVueFiles(file)
    else if (entry.name.endsWith('.vue')) yield file
  }
}

let exampleCount = 0
for await (const file of findVueFiles(join(docsRoot, 'repl-examples'))) {
  const source = await readFile(file, 'utf8')
  await writeFile(file, prettier.format(source, { ...prettierOptions, parser: 'vue' }), 'utf8')
  exampleCount += 1
}

async function formatTemplate(file, variableName, parser) {
  const source = await readFile(file, 'utf8')
  const sourceFile = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true)
  const declaration = sourceFile.statements
    .filter(ts.isVariableStatement)
    .flatMap((statement) => statement.declarationList.declarations)
    .find((item) => item.name.getText(sourceFile) === variableName)

  if (!declaration || !ts.isNoSubstitutionTemplateLiteral(declaration.initializer)) {
    throw new Error(`未找到可格式化的 ${variableName}`)
  }

  const start = declaration.initializer.getStart(sourceFile)
  const end = declaration.initializer.getEnd()
  const code = source.slice(start + 1, end - 1)
  const formatted = prettier.format(code, { ...prettierOptions, parser }).trimEnd()
  const output = source.slice(0, start) + `\`${formatted}\`` + source.slice(end)
  await writeFile(file, output, 'utf8')
}

await formatTemplate(
  join(docsRoot, '.vitepress/components/exampleMocks.ts'),
  'sharedMockCode',
  'typescript'
)

console.log(`已格式化 ${exampleCount} 个独立 Vue 示例和 1 个共享 mock 模块`)
