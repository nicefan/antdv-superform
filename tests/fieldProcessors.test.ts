import { afterEach, describe, expect, it, vi } from 'vitest'
import { effectScope, nextTick, ref } from 'vue'
import { buildModelsMap } from '../src/utils/buildModel'
import { resolveFieldProcessors } from '../src/processors'
import { globalConfig } from '../src/config'

function setupProcessor(name: string, option: Obj, attrs: Obj = {}) {
  const parent: Obj = {}
  const { modelsMap } = buildModelsMap([option], parent)
  const model = modelsMap.get(option)
  if (!model) throw new Error('测试字段模型创建失败')
  const effectData = { current: parent }
  const scope = effectScope()
  const processor = scope.run(() => resolveFieldProcessors([name], { option, effectData, attrs, model }))
  if (!processor) throw new Error('测试字段处理器创建失败')
  return { effectData, processor, scope }
}

afterEach(() => {
  globalConfig.dictApi = undefined
})

describe('字段选项数据处理', () => {
  it('Select 保持原始值数组和 fieldNames 的标准化语义', () => {
    const primitive = setupProcessor('options', {
      type: 'Select',
      field: 'value',
      options: { source: ['草稿', '发布'] },
    })
    expect(primitive.processor.state.value.options).toEqual([
      { label: '草稿', value: '草稿' },
      { label: '发布', value: '发布' },
    ])
    primitive.scope.stop()

    const objects = setupProcessor(
      'options',
      {
        type: 'Select',
        field: 'value',
        options: {
          source: [
            { text: '草稿', id: 'draft' },
            { text: '发布', id: 'published' },
          ],
          fieldNames: { label: 'text', value: 'id' },
        },
      },
      { fieldNames: { label: 'text', value: 'id' } }
    )
    expect(objects.processor.state.value.options).toEqual([
      { text: '草稿', id: 'draft', label: '草稿', value: 'draft' },
      { text: '发布', id: 'published', label: '发布', value: 'published' },
    ])
    objects.scope.stop()
  })

  it('Select 复用 options 对异步、Ref 和字典来源的处理', async () => {
    const asyncOptions = setupProcessor('options', {
      type: 'Select',
      field: 'asyncValue',
      options: { source: async () => [{ label: '异步项', value: 'async' }] },
    })
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(asyncOptions.processor.state.value.options).toEqual([{ label: '异步项', value: 'async' }])
    asyncOptions.scope.stop()

    const optionsRef = ref([{ label: '初始项', value: 'initial' }])
    const reactiveOptions = setupProcessor('options', {
      type: 'Select',
      field: 'refValue',
      options: { source: optionsRef },
    })
    optionsRef.value = [{ label: '更新项', value: 'updated' }]
    await nextTick()
    expect(reactiveOptions.processor.state.value.options).toEqual([{ label: '更新项', value: 'updated' }])
    reactiveOptions.scope.stop()

    globalConfig.dictApi = vi.fn(async () => [{ label: '字典项', value: 'dict' }])
    const dictionary = setupProcessor('options', {
      type: 'Select',
      field: 'dictValue',
      options: { dictName: 'status' },
    })
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(globalConfig.dictApi).toHaveBeenCalledWith('status')
    expect(dictionary.processor.state.value.options).toEqual([{ label: '字典项', value: 'dict' }])
    dictionary.scope.stop()
  })
})
