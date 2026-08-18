import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { cloneDeep } from 'lodash-es'
import { buildModelsMap } from '../src/utils/buildModel'
import { resetFields } from '../src/utils/fields'

describe('Form 数据模型初始化', () => {
  it('先从空对象生成初始模型，再绑定动态数据', () => {
    const modelData = ref<Obj>({})
    const items = [
      { field: 'name', initialValue: '默认名称' },
      { field: 'group', subItems: [{ field: 'count', initialValue: 1 }] },
    ]

    buildModelsMap(items, modelData)
    const initialData = cloneDeep(modelData.value)

    expect(initialData).toEqual({ name: '默认名称', group: { count: 1 } })

    modelData.value = { name: '动态名称', group: {} }
    expect(modelData.value).toEqual({ name: '动态名称', group: { count: 1 } })

    resetFields(modelData.value, {}, initialData)
    expect(modelData.value).toEqual(initialData)
  })

  it('空规则数组不抛错，并保留无字段模型规则', () => {
    const data = ref<Obj>({ name: '' })
    const group = {
      type: 'InputGroup',
      rules: { validator: () => true },
      subItems: [{ field: 'name' }],
    }
    const emptyRules = { field: 'optional', rules: [] }

    expect(() => buildModelsMap([group, emptyRules], data)).not.toThrow()
    expect(buildModelsMap([group], data).modelsMap.get(group)?.rules).toHaveLength(1)
  })

  it('已有 rules 配置时不处理 required', () => {
    const data = ref<Obj>({ name: '' })
    const option = {
      field: 'name',
      required: true,
      rules: { validator: () => true },
    }

    const model = buildModelsMap([option], data).modelsMap.get(option)

    expect(model).toBeDefined()
    expect(model?.rules?.[0]).not.toHaveProperty('required')
    expect(model?.rules).toHaveLength(1)
  })

  it('数组字段规则类型使用解包后的数组值', () => {
    const data = ref<Obj>({ items: [] })
    const option = {
      field: 'items',
      rules: { required: true },
    }

    buildModelsMap([option], data)

    expect(option.rules.type).toBe('array')
  })
})
