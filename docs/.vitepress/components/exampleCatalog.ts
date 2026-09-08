import catalog from './exampleCatalog.json'

export interface ExampleItem {
  id: string
  title: string
  description: string
  level?: '基础' | '进阶' | '综合'
  code: string
}

export interface ExampleGroup {
  title: string
  items: ExampleItem[]
}

interface ExampleMetadata extends Omit<ExampleItem, 'code'> {
  file: string
}

const sources = import.meta.glob('../../repl-examples/**/*.vue', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>
const metadataGroups = catalog as Array<{ title: string; items: ExampleMetadata[] }>

export const exampleGroups: ExampleGroup[] = metadataGroups.map((group) => ({
  title: group.title,
  items: group.items.map((item) => {
    const code = sources['../../repl-examples/' + item.file]
    if (!code) throw new Error('示例源码不存在：' + item.file)
    const { file: _file, ...metadata } = item
    return { ...metadata, code }
  }),
}))

export const allExamples = exampleGroups.flatMap((group) => group.items)
