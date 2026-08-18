import { describe, expect, it } from 'vitest'
import plugin from '../src/plugin'

type InstallConfig = NonNullable<Parameters<typeof plugin.install>[1]>

const config = {
  dictApi: async () => [{ label: '启用', value: 1, disabled: true }],
} satisfies InstallConfig

const listOption = {
  type: 'List',
  field: 'items',
  attrs: { rowKey: 'userId' },
  columns: [{ type: 'Input', field: 'name' }],
} satisfies GetOption<'List'>

const listRowKey: NonNullable<NonNullable<GetOption<'List'>['attrs']>['rowKey']> = 'userId'

describe('插件配置类型', () => {
  it('dictApi 支持标准选项的布尔属性', () => {
    expect(config.dictApi).toBeTypeOf('function')
    expect(listOption.attrs.rowKey).toBe(listRowKey)
  })
})
