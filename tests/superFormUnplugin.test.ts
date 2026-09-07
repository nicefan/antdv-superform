import { describe, expect, it } from 'vitest'
import {
  createLibraryResolver,
  filterAutoImportTypes,
  generateDts,
  generateRuntimeModule,
  scanSchemaTypes,
  type SuperFormComponentResolveResult,
} from '../src/unplugin/core'
import { createElementPlusResolver } from '../packages/superform-element-plus/src/unplugin'

describe('SuperForm 组件自动导入插件', () => {
  it('从静态 Schema 中提取 PascalCase type', () => {
    const types = scanSchemaTypes(`
      const schema = {
        type: 'Form',
        subItems: [
          { type: "Rate", field: 'score' },
          { type: \`UserPicker\`, field: 'userId' },
          { attrs: { type: 'primary' } },
        ],
      }
    `)

    expect([...types]).toEqual(['Form', 'Rate', 'UserPicker'])
  })

  it('通过组件库 resolver 限制允许自动导入的组件', () => {
    const resolver = createLibraryResolver({
      from: 'antdv-next',
      components: ['Rate', 'Slider'],
    })

    expect(resolver('Rate')).toEqual({ from: 'antdv-next', importName: 'Rate' })
    expect(resolver('Input')).toBeUndefined()
  })

  it('只排除 Core，Adapter 字段仍进入自动导入', () => {
    expect([...filterAutoImportTypes(['Form', 'Select', 'Input', 'Rate'], ['Input'])]).toEqual([
      'Select',
      'Input',
      'Rate',
    ])
  })

  it('内置 Element Plus resolver 覆盖 Adapter 声明的字段', () => {
    const resolver = createElementPlusResolver()
    expect(resolver('Rate')).toEqual({
      from: 'element-plus',
      importName: 'ElRate',
      adapterField: true,
      registrationName: 'Rate',
    })
    expect(resolver('Input')).toEqual({
      from: 'element-plus',
      importName: 'ElInput',
      adapterField: true,
      registrationName: 'Input',
    })
  })

  it('生成运行时注册模块和 attrs 类型声明', () => {
    const components = new Map<string, SuperFormComponentResolveResult>([
      ['Rate', { from: 'antdv-next', importName: 'Rate' }],
      [
        'Editor',
        {
          from: './Editor.vue',
          importName: 'default',
          model: { prop: 'modelValue', event: 'update:modelValue' },
        },
      ],
    ])

    const runtime = generateRuntimeModule(components)
    expect(runtime).toContain('import { Rate as __superform_Rate_0 } from "antdv-next"')
    expect(runtime).toContain('import __superform_Editor_1 from "./Editor.vue"')
    expect(runtime).toContain('__registerAutoImportedComponents(components, [])')
    expect(runtime).toContain('model: {"prop":"modelValue","event":"update:modelValue"}')

    const dts = generateDts(components)
    expect(dts).toContain('interface CustomFormComponentProps')
    expect(dts).toContain('"Rate": FormComponentProps<typeof import("antdv-next")["Rate"]>')
    expect(dts).toContain('"Editor": FormComponentProps<typeof import("./Editor.vue")["default"]>')
  })
})
