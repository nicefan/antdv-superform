import { describe, expect, it } from 'vitest'
import { containers, formItemTypes, independentTypes } from '../src/components/componentTypes'

describe('组件类型分类', () => {
  it('InputGroup 和 InputList 保留表单项身份并作为独立容器处理', () => {
    expect(formItemTypes).toEqual(expect.arrayContaining(['InputGroup', 'InputList']))
    expect(containers).not.toEqual(expect.arrayContaining(['InputGroup', 'InputList']))
    expect(independentTypes).toEqual(expect.arrayContaining(['InputGroup', 'InputList']))
  })
})
