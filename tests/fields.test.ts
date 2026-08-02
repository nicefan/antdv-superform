import { describe, expect, it } from 'vitest'
import { resetFields, setFieldsValue } from '../src/utils/fields'

describe('表单字段数据处理', () => {
  it('resetFields 只回填已初始化的模型字段', () => {
    const origin = { name: '', status: 'draft' }
    const initial = { name: '默认名称', status: 'draft' }
    const record = { name: '编辑记录', outside: '不应写入模型' }

    resetFields(origin, record, initial)

    expect(origin).toEqual({
      name: '编辑记录',
      status: 'draft',
    })
  })

  it('setFieldsValue 不会加入模型外字段', () => {
    const origin = { name: '原名称', status: 'draft' }

    setFieldsValue(origin, { name: '新名称', outside: '忽略' }, { name: '', status: 'draft' })

    expect(origin).toEqual({ name: '新名称', status: 'draft' })
  })
})
