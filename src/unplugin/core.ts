import { promises as fs } from 'node:fs'
import path from 'node:path'
import { createUnplugin } from 'unplugin'
import { coreTypes } from '../components/schemaTypes'

const DEFAULT_VIRTUAL_ID = 'virtual:superform/components'
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
  /** 自动导入组件使用非默认受控值协议时显式声明。 */
  model?: {
    prop?: string
    event?: string
  }
  /** 内置 Adapter resolver 使用；表示该组件只提供字段实现，不属于项目组件。 */
  adapterField?: boolean
  /** 实际写入 UI 字段注册表的名称，默认使用 Schema type。 */
  registrationName?: string
}

export interface SuperFormComponentResolver {
  (type: string): SuperFormComponentResolveResult | undefined | null | false
  /** Adapter 字段由 resolver 标记，生成声明时不重复写入 CustomFormComponentProps。 */
  adapterFields?: string[]
}

export interface SuperFormComponentsOptions {
  /** 扫描目录，相对于 root，默认 src */
  dirs?: string[]
  /** 动态 Schema 无法被扫描时显式声明可能使用的 type */
  types?: string[]
  /** 当前 Adapter 声明的字段名；仅用于避免为这些字段重复生成 Custom 类型声明。 */
  enhancedTypes?: string[]
  resolvers: SuperFormComponentResolver[]
  /** 同一 Vite 配置存在多个独立环境时，为虚拟模块设置唯一名称。 */
  virtualId?: string
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

export function filterAutoImportTypes(types: Iterable<string>, adapterEnhancedTypes: string[] = []) {
  void adapterEnhancedTypes
  const reservedTypes = new Set<string>(coreTypes)
  const collected = new Set(types)
  // TagInput 是 Core 复合字段，但其可编辑输入仍由当前 Adapter 提供。
  if (collected.has('TagInput')) collected.add('Input')
  return new Set([...collected].filter((type) => !reservedTypes.has(type)))
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
  superFormImport = 'superform'
) {
  const imports: string[] = []
  const fields: string[] = []
  const adapterFields: string[] = []
  const registeredNames = new Set<string>()
  let index = 0
  for (const [type, result] of components) {
    const registrationName = result.registrationName || type
    if (registeredNames.has(registrationName)) continue
    registeredNames.add(registrationName)
    const local = identifier(type, index++)
    imports.push(
      result.importName === 'default'
        ? `import ${local} from ${JSON.stringify(result.from)}`
        : `import { ${result.importName} as ${local} } from ${JSON.stringify(result.from)}`
    )
    fields.push(
      result.model
        ? `${JSON.stringify(registrationName)}: { component: ${local}, model: ${JSON.stringify(result.model)} }`
        : `${JSON.stringify(registrationName)}: ${local}`
    )
    if (result.adapterField) adapterFields.push(JSON.stringify(registrationName))
  }
  return [
    `import { registerAutoImportedComponents as __registerAutoImportedComponents } from ${JSON.stringify(
      superFormImport
    )}`,
    ...imports,
    `export const components = { ${fields.join(', ')} }`,
    `__registerAutoImportedComponents(components, [${adapterFields.join(', ')}])`,
  ].join('\n')
}

export function generateDts(
  components: Map<string, SuperFormComponentResolveResult>,
  dtsModule = 'superform',
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
  const virtualId = options.virtualId || DEFAULT_VIRTUAL_ID
  const resolvedVirtualId = `\0${virtualId}`

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
    resolved = resolveComponents(filterAutoImportTypes(types, options.enhancedTypes), options.resolvers)
    if (dtsFile) {
      const adapterFields = new Set<string>([
        ...(options.enhancedTypes || []),
        ...options.resolvers.flatMap((resolver) => resolver.adapterFields || []),
      ])
      const customComponents = new Map([...resolved].filter(([type]) => !adapterFields.has(type)))
      await writeIfChanged(
        path.resolve(root, dtsFile),
        generateDts(customComponents, options.dtsModule, options.typesImport)
      )
    }
  }

  return {
    name: 'unplugin-superform-components',
    enforce: 'pre',
    async buildStart() {
      await scan()
    },
    resolveId(id) {
      if (id === virtualId) return resolvedVirtualId
    },
    load(id) {
      if (id === resolvedVirtualId) return generateRuntimeModule(resolved, options.superFormImport)
    },
    transform(code, id) {
      if (!matchesEntry(id, options.entry, root) || code.includes(virtualId)) return
      return `import ${JSON.stringify(virtualId)}\n${code}`
    },
    watchChange: meta.framework === 'vite' ? undefined : scan,
    vite: {
      configResolved(config) {
        root = path.resolve(options.root || config.root)
      },
      async handleHotUpdate(ctx) {
        if (!extensions.has(path.extname(ctx.file)) || ctx.file.endsWith('.d.ts')) return
        await scan()
        const virtualModule = ctx.server.moduleGraph.getModuleById(resolvedVirtualId)
        if (virtualModule) {
          ctx.server.moduleGraph.invalidateModule(virtualModule)
          return [...ctx.modules, virtualModule]
        }
      },
    },
  }
})
