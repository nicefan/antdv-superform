import { describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { cloneDeep } from 'lodash-es'
import { buildModelsMap } from '../src/utils/buildModel'
import { resetFields } from '../src/utils/fields'
import useVModel from '../src/utils/useVModel'
import { resolveFieldProcessors } from '../src/processors'

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

  it('实际 RangePicker 组件名仍可通过 endField 拆分范围值', () => {
    const parent = { startTime: '09:00:00', endTime: '18:00:00' }
    const option = {
      type: 'TimeRangePicker',
      field: 'startTime',
      endField: 'endTime',
    }
    const { modelsMap } = buildModelsMap([option], parent)
    const model = modelsMap.get(option)!
    const processorState = resolveFieldProcessors(['picker'], { option, effectData: {}, attrs: {}, model })
    const binding = useVModel(
      {
        option,
        model,
        effectData: {},
      },
      undefined,
      processorState.modelBehavior
    )

    expect(binding.value.value).toEqual(['09:00:00', '18:00:00'])
    binding['onUpdate:value'](['08:30:00', '17:30:00'])
    expect(parent.startTime).toBe('08:30:00')
    expect(parent.endTime).toBe('17:30:00')
  })
})
