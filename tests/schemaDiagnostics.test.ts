import { describe, expect, it } from 'vitest'
import { diagnoseSchema } from '../src/utils/diagnoseSchema'

describe('schema 诊断', () => {
  it('报告废弃 API、无效配置、重复字段和冗余默认值', () => {
    const diagnostics = diagnoseSchema(
      {
        immediate: true,
        pagination: false,
        searchSchema: { subItems: [] },
        columns: [
          { type: 'Input', field: 'name', label: '名称', attrs: { placeholder: '请输入名称' } },
          { type: 'Unknown', field: 'name', exclude: ['list'] },
          { type: 'Select', field: 'status' },
        ],
      },
      'table'
    )

    expect(diagnostics.map(({ code }) => code)).toEqual(
      expect.arrayContaining([
        'deprecated-api',
        'redundant-default',
        'unknown-type',
        'invalid-exclude',
        'duplicate-field',
        'missing-options',
      ])
    )
  })

  it('合法的基础 schema 不产生诊断', () => {
    expect(diagnoseSchema({ subItems: [{ type: 'Input', field: 'name', label: '名称' }] }, 'form')).toEqual([])
    expect(
      diagnoseSchema(
        {
          subItems: [
            { type: 'Group', block: false, subItems: [] },
            { type: 'Text', field: 'status', tagViewer: true },
          ],
        },
        'form'
      )
    ).toEqual([])
    expect(diagnoseSchema({ columns: [{ field: 'name', label: '名称' }] }, 'table')).toEqual([])
  })

  it('返回结构化的 schema 根级错误', () => {
    expect(diagnoseSchema({ columns: null }, 'table')).toEqual([
      {
        level: 'error',
        code: 'missing-columns',
        path: 'schema.columns',
        message: '表格必须配置 columns。',
      },
    ])
  })
})
