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
  vi.useRealTimers()
})

describe('field processors', () => {
  it('Input 搜索处理器维护异步 loading 状态', async () => {
    let finishSearch: () => void = () => undefined
    const onSearch = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          finishSearch = resolve
        })
    )
    const { processor, scope } = setupProcessor('input', { type: 'Input', field: 'keyword' }, { onSearch })

    const searching = processor.transformProps({ onSearch }).onSearch('adapter')
    expect(processor.transformProps({ onSearch }).searchLoading).toBe(true)
    finishSearch()
    await searching
    expect(processor.transformProps({ onSearch }).searchLoading).toBe(false)
    scope.stop()
  })

  it('AutoComplete 复用 options 并以 label 作为值', () => {
    const { processor, scope } = setupProcessor('autoComplete', {
      type: 'AutoComplete',
      field: 'keyword',
      options: [{ label: '适配器', value: 'adapter' }],
    })

    expect(processor.transformProps({}).options).toEqual([{ label: '适配器', value: '适配器' }])
    scope.stop()
  })

  it('Select 保持原始值数组和 fieldNames 的标准化语义', () => {
    const primitive = setupProcessor('select', {
      type: 'Select',
      field: 'value',
      options: ['草稿', '发布'],
    })
    expect(primitive.processor.transformProps({}).options).toEqual([
      { label: '草稿', value: '草稿' },
      { label: '发布', value: '发布' },
    ])
    primitive.scope.stop()

    const objects = setupProcessor(
      'select',
      {
        type: 'Select',
        field: 'value',
        options: [
          { text: '草稿', id: 'draft' },
          { text: '发布', id: 'published' },
        ],
        attrs: { fieldNames: { label: 'text', value: 'id' } },
      },
      { fieldNames: { label: 'text', value: 'id' } }
    )
    expect(objects.processor.transformProps({}).options).toEqual([
      { text: '草稿', id: 'draft', label: '草稿', value: 'draft' },
      { text: '发布', id: 'published', label: '发布', value: 'published' },
    ])
    objects.scope.stop()
  })

  it('Select 变更时同步 labelField', () => {
    const updateLabel = vi.fn()
    const onChange = vi.fn()
    const { processor, scope } = setupProcessor('select', {
      type: 'Select',
      field: 'status',
      labelField: 'statusName',
      options: [{ label: '发布', value: 'published' }],
    })
    const props = processor.transformProps({
      'onUpdate:labelValue': updateLabel,
      onChange,
    })

    props.onValueChange('published')
    expect(updateLabel).toHaveBeenCalledWith('发布')
    expect(props.onChange).toBe(onChange)
    scope.stop()
  })

  it('Select 复用 options 对异步、Ref 和字典来源的处理', async () => {
    const asyncOptions = setupProcessor('select', {
      type: 'Select',
      field: 'asyncValue',
      options: async () => [{ label: '异步项', value: 'async' }],
    })
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(asyncOptions.processor.transformProps({}).options).toEqual([{ label: '异步项', value: 'async' }])
    asyncOptions.scope.stop()

    const optionsRef = ref([{ label: '初始项', value: 'initial' }])
    const reactiveOptions = setupProcessor('select', {
      type: 'Select',
      field: 'refValue',
      options: optionsRef,
    })
    optionsRef.value = [{ label: '更新项', value: 'updated' }]
    await nextTick()
    expect(reactiveOptions.processor.transformProps({}).options).toEqual([{ label: '更新项', value: 'updated' }])
    reactiveOptions.scope.stop()

    globalConfig.dictApi = vi.fn(async () => [{ label: '字典项', value: 'dict' }])
    const dictionary = setupProcessor('select', {
      type: 'Select',
      field: 'dictValue',
      dictName: 'status',
    })
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(globalConfig.dictApi).toHaveBeenCalledWith('status')
    expect(dictionary.processor.transformProps({}).options).toEqual([{ label: '字典项', value: 'dict' }])
    dictionary.scope.stop()
  })

  it('Select 在远程搜索条件成立时约 600ms 后携带关键词请求', async () => {
    vi.useFakeTimers()
    const options = vi.fn(() => Promise.resolve([]))
    const { processor, effectData, scope } = setupProcessor(
      'select',
      { type: 'Select', field: 'status', options },
      { showSearch: true }
    )
    const props = processor.transformProps({ showSearch: true })

    props.onSearch('pub')
    await vi.advanceTimersByTimeAsync(600)
    expect(options).toHaveBeenCalledWith(effectData, 'pub')
    scope.stop()
  })

  it('RadioGroup 和 CheckboxGroup 同步 labelField', () => {
    const radioLabel = vi.fn()
    const radio = setupProcessor('radioGroup', {
      type: 'RadioGroup',
      field: 'level',
      labelField: 'levelName',
      options: [{ label: '重要', value: 'important' }],
    })
    const radioProps = radio.processor.transformProps({
      'onUpdate:labelValue': radioLabel,
      buttonStyle: 'solid',
    })
    radioProps.onValueChange('important')
    expect(radioLabel).toHaveBeenCalledWith('重要')
    expect(radioProps).not.toHaveProperty('name')
    expect(radioProps).not.toHaveProperty('optionType')
    radio.scope.stop()

    const checkboxLabel = vi.fn()
    const checkbox = setupProcessor('checkboxGroup', {
      type: 'CheckboxGroup',
      field: 'features',
      labelField: 'featureNames',
      options: [
        { label: 'Schema', value: 'schema' },
        { label: 'Adapter', value: 'adapter' },
      ],
    })
    checkbox.processor.transformProps({ 'onUpdate:labelValue': checkboxLabel }).onValueChange(['schema', 'adapter'])
    expect(checkboxLabel).toHaveBeenCalledWith(['Schema', 'Adapter'])
    checkbox.scope.stop()
  })

  it('TreeSelect 支持异步树数据', async () => {
    const treeData = vi.fn(() => Promise.resolve([{ label: '根节点', value: 'root' }]))
    const { processor, scope } = setupProcessor('treeSelect', {
      type: 'TreeSelect',
      field: 'node',
      treeData,
    })

    expect(treeData).toHaveBeenCalled()
    await treeData.mock.results[0].value
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(processor.transformProps({}).treeData).toEqual([{ label: '根节点', value: 'root' }])
    scope.stop()
  })
})
