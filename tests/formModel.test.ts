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
})
