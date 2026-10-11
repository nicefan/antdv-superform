import { describe, expect, it } from 'vitest'
import { nextTick, reactive, ref } from 'vue'
import { buildModelsMap } from '../src/utils/buildModel'
import useVModel from '../src/utils/useVModel'
import { applyModelModifiers, resolveModelModifiers } from '../src/modelModifiers'

describe('v-model 修饰符', () => {
  it('按顺序执行 trim 和 number，并保留无法转换的值', () => {
    expect(applyModelModifiers(' 12.5 ', ['trim', 'number'])).toBe(12.5)
    expect(applyModelModifiers(' 12px ', ['trim', 'number'])).toBe(12)
    expect(applyModelModifiers(' abc ', ['trim', 'number'])).toBe('abc')
    expect(applyModelModifiers([' 1 ', ' x '], ['trim', 'number'])).toEqual([1, 'x'])
  })

  it('数组配置只作用主 value，具名配置按 binding 名解析', () => {
    expect(resolveModelModifiers(['trim'], 'value')).toEqual(['trim'])
    expect(resolveModelModifiers(['trim'], 'labelValue')).toBeUndefined()

    const modifiers = {
      value: ['number'],
      labelValue: ['trim'],
    } as const
    expect(resolveModelModifiers(modifiers, 'value')).toEqual(['number'])
    expect(resolveModelModifiers(modifiers, 'labelValue')).toEqual(['trim'])
  })

  it('number 保留空字符串、无法解析的文本和非字符串值', () => {
    for (const value of ['', '  ', 'text', null, undefined, false, 0, { amount: '12' }]) {
      expect(applyModelModifiers(value, ['number'])).toBe(value)
    }
    expect(applyModelModifiers('  ', ['trim', 'number'])).toBe('')
  })

  it('无 field 的 Ref 写回执行修饰符，外部赋值不转换', () => {
    const value = ref<any>('  initial  ')
    const option = { type: 'Input', value, modelModifiers: ['trim', 'number'] } as const
    const { modelsMap } = buildModelsMap([option], reactive({}))
    const binding = useVModel({ option, model: modelsMap.get(option)!, effectData: {} })
    expect(binding.value.value).toBe('  initial  ')
    binding['onUpdate:value'](' 12.5 ')
    expect(value.value).toBe(12.5)
    value.value = '  external  '
    expect(binding.value.value).toBe('  external  ')
  })

  it('先转换数组再拆分范围或序列化，外部复合值同步不转换', async () => {
    const source = reactive<any>({ start: ' 1 ', end: ' 2 ', tags: ' 3 , 4 ' })
    const range = { type: 'Input', field: 'start', endField: 'end', modelModifiers: ['trim', 'number'] } as const
    const tags = { type: 'Input', field: 'tags', stringifyValue: true, modelModifiers: ['trim', 'number'] } as const
    const { modelsMap } = buildModelsMap([range, tags], source)
    const rangeBinding = useVModel({ option: range, model: modelsMap.get(range)!, effectData: {} })
    const tagsBinding = useVModel({ option: tags, model: modelsMap.get(tags)!, effectData: {} })
    expect(rangeBinding.value.value).toEqual([' 1 ', ' 2 '])
    expect(tagsBinding.value.value).toEqual([' 3 ', ' 4 '])
    rangeBinding['onUpdate:value']([' 10 ', ' 20 '])
    tagsBinding['onUpdate:value']([' 30 ', ' text '])
    expect([source.start, source.end]).toEqual([10, 20])
    expect(source.tags).toBe('30,text')
    source.start = ' 40 '
    source.end = ' 50 '
    source.tags = ' 60 , 70 '
    await nextTick()
    expect(rangeBinding.value.value).toEqual([' 40 ', ' 50 '])
    expect(tagsBinding.value.value).toEqual([' 60 ', ' 70 '])
  })

  it('主值与具名 v-model 在写回前转换，外部赋值不主动转换', async () => {
    const parent = reactive({
      value: 'source',
      label: 'source label',
      extra: '0',
    })
    const alias = ref('source alias')
    const option = {
      type: 'Input',
      field: 'value',
      labelField: 'label',
      vModelFields: {
        extra: 'extra',
        alias,
      },
      modelModifiers: {
        value: ['trim'],
        labelValue: ['trim'],
        extra: ['number'],
        alias: ['trim'],
      },
    } as const
    const { modelsMap } = buildModelsMap([option], parent)
    const model = modelsMap.get(option)!
    const binding = useVModel({ option, model, effectData: {} })

    binding['onUpdate:value']('  changed  ')
    binding['onUpdate:labelValue']('  changed label  ')
    binding['onUpdate:extra'](' 12.5 ')
    binding['onUpdate:alias']('  changed alias  ')

    expect(parent.value).toBe('changed')
    expect(parent.label).toBe('changed label')
    expect(parent.extra).toBe(12.5)
    expect(alias.value).toBe('changed alias')

    parent.value = '  external  '
    await nextTick()
    expect(parent.value).toBe('  external  ')
    expect(binding.value.value).toBe('  external  ')
  })
})
