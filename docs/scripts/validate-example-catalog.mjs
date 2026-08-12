import { Buffer } from 'node:buffer'
import { readFile, readdir } from 'node:fs/promises'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { compileScript, compileTemplate, parse } from '@vue/compiler-sfc'
import prettier from 'prettier'
import ts from 'typescript'

const docsRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const catalogFile = join(docsRoot, '.vitepress/components/exampleCatalog.ts')
const mocksFile = join(docsRoot, '.vitepress/components/exampleMocks.ts')
const prettierOptions = { semi: false, singleQuote: true, printWidth: 100 }

async function importTypeScript(file) {
  const source = await readFile(file, 'utf8')
  const javascript = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2020,
    },
    fileName: file,
  }).outputText
  const url = `data:text/javascript;base64,${Buffer.from(javascript).toString('base64')}`
  return import(url)
}

const { exampleGroups } = await importTypeScript(catalogFile)
const { sharedMockCode } = await importTypeScript(mocksFile)
const formattedMockCode = prettier.format(sharedMockCode, {
  ...prettierOptions,
  parser: 'typescript',
})
if (formattedMockCode.trimEnd() !== sharedMockCode) {
  throw new Error('共享 mock.ts 未格式化，请运行 pnpm --dir docs format:examples')
}

const mockResult = ts.transpileModule(sharedMockCode, {
  compilerOptions: {
    module: ts.ModuleKind.ESNext,
    target: ts.ScriptTarget.ES2020,
  },
  fileName: 'mock.ts',
  reportDiagnostics: true,
})
const mockErrors = mockResult.diagnostics?.filter(({ category }) => category === ts.DiagnosticCategory.Error)
if (mockErrors?.length) {
  throw new Error(`共享 mock.ts 编译失败：${mockErrors.map(({ messageText }) => messageText).join('\n')}`)
}

const ids = new Set()
let count = 0

const tableOptionOrder = new Map([
  ['attrs', 1],
  ['apis', 2],
  ['params', 3],
  ['beforeQuery', 4],
  ['afterQuery', 4],
  ['searchForm', 6],
  ['rowEditor', 7],
  ['buttons', 8],
  ['rowButtons', 9],
  ['tabs', 10],
  ['columnProps', 11],
  ['columns', 12],
])

function optionName(property, sourceFile) {
  if (!property.name) return
  if (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name)) return property.name.text
  return property.name.getText(sourceFile)
}

function validateTableOptionOrder(code, filename) {
  const sourceFile = ts.createSourceFile(filename, code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX)

  function visit(node) {
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      node.expression.text === 'useTable' &&
      ts.isObjectLiteralExpression(node.arguments[0])
    ) {
      let previousOrder = 0
      for (const property of node.arguments[0].properties) {
        const name = optionName(property, sourceFile)
        const currentOrder = name?.startsWith('on') ? 5 : tableOptionOrder.get(name) ?? 0
        if (currentOrder < previousOrder) {
          throw new Error(`${filename} 的 useTable 配置顺序不符合手册约定：${name}`)
        }
        previousOrder = currentOrder
      }
    }
    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
}

for (const group of exampleGroups) {
  if (!group.title || !group.items?.length) throw new Error('示例分类必须有标题且不能为空')

  for (const item of group.items) {
    count += 1
    if (!item.id || !item.title || !item.description || !item.code) {
      throw new Error(`“${group.title}”中存在信息不完整的示例`)
    }
    if (ids.has(item.id)) throw new Error(`示例 ID 重复：${item.id}`)
    ids.add(item.id)
    if (/\bConfigProvider\b/.test(item.code)) {
      throw new Error(`${item.id}.vue 不应在示例内部使用 ConfigProvider`)
    }

    const formattedCode = prettier.format(item.code, {
      ...prettierOptions,
      parser: 'vue',
    })
    if (formattedCode.trimEnd() !== item.code) {
      throw new Error(`${item.id}.vue 未格式化，请运行 pnpm --dir docs format:examples`)
    }

    const filename = `${item.id}.vue`
    const { descriptor, errors } = parse(item.code, { filename })
    if (errors.length) throw new Error(`${filename} 解析失败：${errors.join('\n')}`)
    if (descriptor.scriptSetup) validateTableOptionOrder(descriptor.scriptSetup.content, filename)

    let bindings
    if (descriptor.script || descriptor.scriptSetup) {
      bindings = compileScript(descriptor, { id: item.id }).bindings
    }
    if (descriptor.template) {
      const result = compileTemplate({
        id: item.id,
        filename,
        source: descriptor.template.content,
        compilerOptions: { bindingMetadata: bindings },
      })
      if (result.errors.length) throw new Error(`${filename} 模板编译失败：${result.errors.join('\n')}`)
    }
  }
}

async function* markdownFiles(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name)
    if (entry.isDirectory()) yield* markdownFiles(file)
    else if (entry.name.endsWith('.md')) yield file
  }
}

let referenceCount = 0
for await (const file of markdownFiles(join(docsRoot, 'manual'))) {
  const markdown = await readFile(file, 'utf8')
  for (const match of markdown.matchAll(/\/examples\?example=([\w-]+)/g)) {
    referenceCount += 1
    if (!ids.has(match[1])) throw new Error(`手册引用了不存在的示例 ID：${match[1]}`)
  }
}

console.log(
  `示例目录编译校验通过，共 ${exampleGroups.length} 类 ${count} 个示例、1 个共享 mock 模块、${referenceCount} 处手册引用`
)
