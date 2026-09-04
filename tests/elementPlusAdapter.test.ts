import { describe, expect, it } from 'vitest'
import { ElForm } from 'element-plus'
import { elementPlusAdapter } from '../packages/superform-element-plus/src'
import { elementPlusFull, elementPlusUIComponents } from '../packages/superform-element-plus/src/full'

describe('Element Plus 最小 Adapter', () => {
  it('在内部 Adapter 中提供 P005 表单能力', () => {
    expect(elementPlusAdapter.form?.component).toBe('Form')
    expect(elementPlusAdapter.components.Form).toBe(ElForm)
    expect(elementPlusAdapter.components).not.toHaveProperty('Input')
    expect(elementPlusAdapter.components).not.toHaveProperty('Select')
    expect(elementPlusAdapter.components).not.toHaveProperty('Switch')
    expect(elementPlusAdapter.fields?.Input?.processors).toEqual(['input'])
    expect(elementPlusAdapter.fields?.Select?.processors).toEqual(['select'])
    expect(elementPlusAdapter.fields?.Switch?.processors).toEqual(['switch'])
    expect(elementPlusAdapter.containers).toHaveProperty('tabs')
    expect(elementPlusAdapter.actions).toBeDefined()
    expect(elementPlusAdapter.presentation).toBeDefined()
  })

  it('Rate 使用无 El 前缀的 Schema 名称，但不直接引入组件', () => {
    expect(elementPlusAdapter.components).not.toHaveProperty('Rate')
    expect(elementPlusAdapter.fields?.Rate).toEqual({
      component: 'Rate',
      model: { prop: 'modelValue', event: 'update:modelValue' },
    })
  })

  it('全量入口使用无 El 前缀注册全部字段组件', () => {
    expect(Object.keys(elementPlusUIComponents)).toEqual(['Input', 'Select', 'Switch', 'Rate'])
    expect(elementPlusFull.fieldComponents).toEqual(elementPlusUIComponents)
  })
})
