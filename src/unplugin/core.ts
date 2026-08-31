import { promises as fs } from 'node:fs'
import path from 'node:path'
import { createUnplugin } from 'unplugin'

const VIRTUAL_ID = 'virtual:antdv-superform/components'
const RESOLVED_VIRTUAL_ID = `\0${VIRTUAL_ID}`
const DEFAULT_EXTENSIONS = ['.vue', '.ts', '.tsx', '.js', '.jsx', '.mts', '.mjs']
const TYPE_PATTERN = /\btype\s*:\s*(['"`])([A-Z][\w$]*)\1/g

export interface SuperFormComponentResolveResult {
  /** 组件导入来源 */
  from: string
  /** 实际导出名称，默认与 schema type 相同；default 表示默认导出 */
  importName?: string
  /** Props 类型不随组件导出时可单独指定 */
  props?: {
    from?: string
    name: string
  }
}

export type SuperFormComponentResolver = (type: string) => SuperFormComponentResolveResult | undefined | null | false

export interface SuperFormComponentsOptions {
  /** 扫描目录，相对于 root，默认 src */
  dirs?: string[]
  /** 动态 Schema 无法被扫描时显式声明可能使用的 type */
  types?: string[]
  resolvers: SuperFormComponentResolver[]
  /** 自动注入虚拟注册模块的入口文件，默认 src/main.ts 等常见入口 */
  entry?: string | RegExp | Array<string | RegExp>
  /** 生成的类型声明路径；false 表示不生成 */
  dts?: string | false
  /** 运行时注册函数的导入来源 */
  superFormImport?: string
  /** 类型声明扩展的模块名 */
  dtsModule?: string
  /** FormComponentProps 的导入来源，默认与 dtsModule 相同 */
  typesImport?: string
  /** 项目根目录，通常由 Vite 自动提供 */
  root?: string
  extensions?: string[]
}

export interface LibraryResolverOptions {
  from: string
  components: string[] | Record<string, string>
  prefix?: string
}

export function createLibraryResolver({ from, components, prefix = '' }: LibraryResolverOptions) {
  const componentMap = Array.isArray(components)
    ? Object.fromEntries(components.map((name) => [`${prefix}${name}`, name]))
    : components
  return (type: string): SuperFormComponentResolveResult | undefined => {
    const importName = componentMap[type]
    return importName ? { from, importName } : undefined
  }
}

function normalizePath(file: string) {
  return file.replace(/\\/g, '/')
}

export function scanSchemaTypes(code: string) {
  const types = new Set<string>()
  for (const match of code.matchAll(TYPE_PATTERN)) types.add(match[2])
  return types
}

function matchesEntry(id: string, entry: SuperFormComponentsOptions['entry'], root: string) {
  const relativeId = normalizePath(path.relative(root, id.split('?')[0]))
  const entries = Array.isArray(entry) ? entry : [entry || /(^|\/)src\/main\.[cm]?[jt]sx?$/]
  return entries.some((item) => {
    if (typeof item === 'string') return relativeId === normalizePath(item)
    item.lastIndex = 0
    return item.test(relativeId)
  })
}

async function collectFiles(directory: string, extensions: Set<string>, files: string[]) {
  let entries
  try {
    entries = await fs.readdir(directory, { withFileTypes: true })
  } catch (error: any) {
    if (error?.code === 'ENOENT') return
    throw error
  }
  await Promise.all(
    entries.map(async (entry) => {
      if (entry.name === 'node_modules' || entry.name.startsWith('.')) return
      const file = path.join(directory, entry.name)
      if (entry.isDirectory()) {
        await collectFiles(file, extensions, files)
      } else if (!entry.name.endsWith('.d.ts') && extensions.has(path.extname(entry.name))) {
        files.push(file)
      }
    })
  )
}

function resolveComponents(types: Iterable<string>, resolvers: SuperFormComponentResolver[]) {
  const resolved = new Map<string, SuperFormComponentResolveResult>()
  for (const type of types) {
    for (const resolver of resolvers) {
      const result = resolver(type)
      if (result) {
        resolved.set(type, { ...result, importName: result.importName || type })
        break
      }
    }
  }
  return resolved
}

function identifier(type: string, index: number) {
  return `__superform_${type.replace(/\W/g, '_')}_${index}`
}

export function generateRuntimeModule(
  components: Map<string, SuperFormComponentResolveResult>,
  superFormImport = 'antdv-superform'
) {
  const imports: string[] = []
  const fields: string[] = []
  let index = 0
  for (const [type, result] of components) {
    const local = identifier(type, index++)
    imports.push(
      result.importName === 'default'
        ? `import ${local} from ${JSON.stringify(result.from)}`
        : `import { ${result.importName} as ${local} } from ${JSON.stringify(result.from)}`
    )
    fields.push(`${JSON.stringify(type)}: ${local}`)
  }
  return [
    `import { registerFormComponents as __registerFormComponents } from ${JSON.stringify(superFormImport)}`,
    ...imports,
    `export const components = { ${fields.join(', ')} }`,
    '__registerFormComponents(components)',
  ].join('\n')
}

export function generateDts(
  components: Map<string, SuperFormComponentResolveResult>,
  dtsModule = 'antdv-superform',
  typesImport = dtsModule
) {
  const fields = [...components].map(([type, result]) => {
    const props = result.props
      ? `import(${JSON.stringify(result.props.from || result.from)})[${JSON.stringify(result.props.name)}]`
      : `FormComponentProps<typeof import(${JSON.stringify(result.from)})[${JSON.stringify(result.importName)}]>`
    return `    ${JSON.stringify(type)}: ${props}`
  })
  return [
    '/* 此文件由 unplugin-superform-components 自动生成，请勿手动修改。 */',
    `import type { FormComponentProps } from ${JSON.stringify(typesImport)}`,
    `import ${JSON.stringify(dtsModule)}`,
    '',
    `declare module ${JSON.stringify(dtsModule)} {`,
    '  interface CustomFormComponentProps {',
    ...fields,
    '  }',
    '}',
    '',
    'export {}',
    '',
  ].join('\n')
}

async function writeIfChanged(file: string, content: string) {
  let current: string | undefined
  try {
    current = await fs.readFile(file, 'utf8')
  } catch {
    current = undefined
  }
  if (current === content) return
  await fs.mkdir(path.dirname(file), { recursive: true })
  await fs.writeFile(file, content, 'utf8')
}

export const unplugin = createUnplugin<SuperFormComponentsOptions>((options, meta) => {
  let root = path.resolve(options.root || process.cwd())
  let resolved = new Map<string, SuperFormComponentResolveResult>()
  const extensions = new Set(options.extensions || DEFAULT_EXTENSIONS)
  const dtsFile = options.dts === false ? undefined : options.dts || 'superform-components.d.ts'

  const scan = async () => {
    const files: string[] = []
    for (const dir of options.dirs || ['src']) {
      await collectFiles(path.resolve(root, dir), extensions, files)
    }
    const types = new Set(options.types || [])
    await Promise.all(
      files.map(async (file) => {
        const code = await fs.readFile(file, 'utf8')
        scanSchemaTypes(code).forEach((type) => types.add(type))
      })
    )
    resolved = resolveComponents(types, options.resolvers)
    if (dtsFile) {
      await writeIfChanged(path.resolve(root, dtsFile), generateDts(resolved, options.dtsModule, options.typesImport))
    }
  }

  return {
    name: 'unplugin-superform-components',
    enforce: 'pre',
    async buildStart() {
      await scan()
    },
    resolveId(id) {
      if (id === VIRTUAL_ID) return RESOLVED_VIRTUAL_ID
    },
    load(id) {
      if (id === RESOLVED_VIRTUAL_ID) return generateRuntimeModule(resolved, options.superFormImport)
    },
    transform(code, id) {
      if (!matchesEntry(id, options.entry, root) || code.includes(VIRTUAL_ID)) return
      return `import ${JSON.stringify(VIRTUAL_ID)}\n${code}`
    },
    watchChange: meta.framework === 'vite' ? undefined : scan,
    vite: {
      configResolved(config) {
        root = path.resolve(options.root || config.root)
      },
      async handleHotUpdate(ctx) {
        if (!extensions.has(path.extname(ctx.file)) || ctx.file.endsWith('.d.ts')) return
        await scan()
        const virtualModule = ctx.server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_ID)
        if (virtualModule) {
          ctx.server.moduleGraph.invalidateModule(virtualModule)
          return [...ctx.modules, virtualModule]
        }
      },
    },
  }
})
