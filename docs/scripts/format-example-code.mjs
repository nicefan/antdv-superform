import { readFile, writeFile } from 'node:fs/promises'
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

async function formatTemplate(file, propertyName, parser) {
  const source = await readFile(file, 'utf8')
  const sourceFile = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true)
  const replacements = []

  function visit(node) {
    const isNamedProperty = ts.isPropertyAssignment(node) && node.name.getText(sourceFile) === propertyName
    const isNamedVariable = ts.isVariableDeclaration(node) && node.name.getText(sourceFile) === propertyName
    if ((isNamedProperty || isNamedVariable) && ts.isNoSubstitutionTemplateLiteral(node.initializer)) {
      const start = node.initializer.getStart(sourceFile)
      const end = node.initializer.getEnd()
      const code = source.slice(start + 1, end - 1)
      const formatted = prettier.format(code, { ...prettierOptions, parser }).trimEnd()
      replacements.push({ start, end, text: `\`${formatted}\`` })
    }
    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  const output = replacements
    .sort((left, right) => right.start - left.start)
    .reduce(
      (result, replacement) => result.slice(0, replacement.start) + replacement.text + result.slice(replacement.end),
      source
    )

  await writeFile(file, output)
  return replacements.length
}

const exampleCount = await formatTemplate(join(docsRoot, '.vitepress/components/exampleCatalog.ts'), 'code', 'vue')
const mockCount = await formatTemplate(
  join(docsRoot, '.vitepress/components/exampleMocks.ts'),
  'sharedMockCode',
  'typescript'
)

console.log(`已格式化 ${exampleCount} 个示例和 ${mockCount} 个共享 mock 模块`)
