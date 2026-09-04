import { describe, expect, it } from 'vitest'
import { ElForm, ElInput, ElSelect, ElSwitch } from 'element-plus'
import { elementPlusAdapter } from '../src/adapter/element-plus'

describe('Element Plus 最小 Adapter', () => {
  it('在内部 Adapter 中提供 P005 表单能力', () => {
    expect(elementPlusAdapter.form?.component).toBe('Form')
    expect(elementPlusAdapter.components.Form).toBe(ElForm)
    expect(elementPlusAdapter.components.ElInput).toBe(ElInput)
    expect(elementPlusAdapter.components.ElSelect).toBe(ElSelect)
    expect(elementPlusAdapter.components.ElSwitch).toBe(ElSwitch)
    expect(elementPlusAdapter.fields?.ElInput?.processors).toEqual(['input'])
    expect(elementPlusAdapter.fields?.ElSelect?.processors).toEqual(['select'])
    expect(elementPlusAdapter.fields?.ElSwitch?.processors).toEqual(['switch'])
    expect(elementPlusAdapter.containers).toHaveProperty('tabs')
    expect(elementPlusAdapter.actions).toBeDefined()
    expect(elementPlusAdapter.presentation).toBeDefined()
  })

  it('普通 ElRate 留给自动导入，不进入 Adapter 组件表', () => {
    expect(elementPlusAdapter.components).not.toHaveProperty('ElRate')
  })
})
