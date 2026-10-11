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
