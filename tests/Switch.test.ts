import { beforeAll, describe, expect, it } from 'vitest'
import { effectScope, nextTick, ref } from 'vue'
import { buildModelsMap } from '../src/utils/buildModel'
import { resolveFieldProcessors } from '../src/processors'
import { mapUIFieldProps } from '../src/adapter'
import { antdvAdapter } from '../packages/superform-antdv/src'
import plugin from '../src/plugin'

beforeAll(() => plugin.useAdapter(antdvAdapter))

function setupSwitch(option: Obj, value?: string | number | boolean, attrs: Obj = {}) {
  const parent: Obj = value === undefined ? {} : { [option.field]: value }
  const { modelsMap } = buildModelsMap([option], parent)
  const model = modelsMap.get(option)
  if (!model) throw new Error('Switch 测试模型创建失败')
  const effectData = { current: parent }
  const scope = effectScope()
  const processor = scope.run(() => resolveFieldProcessors(['switch'], { option, effectData, attrs, model }))
  if (!processor) throw new Error('Switch 测试处理器创建失败')
  const render = (extra: Obj = {}) => {
    const normalized = processor.transformProps({
      value: model.refData,
      'onUpdate:value': (nextValue) => (model.refData = nextValue),
      ...extra,
    })
    return mapUIFieldProps('Switch', normalized, { option, effectData })
  }
  return { parent, render, scope }
}

describe('Switch processor', () => {
  it('使用 options 同步未选中和选中状态的值与标签', async () => {
    const { parent, render, scope } = setupSwitch({
      type: 'Switch',
      field: 'status',
      options: [
        { label: '停用', value: 0 },
        { label: '启用', value: 1 },
      ],
    })

    await nextTick()
    expect(parent.status).toBe(0)
    expect(render()).toMatchObject({
      checked: 0,
      checkedChildren: '启用',
      unCheckedChildren: '停用',
      checkedValue: 1,
      unCheckedValue: 0,
    })
    scope.stop()
  })

  it('值变化时同步 options 中对应的 labelField', async () => {
    const { parent, render, scope } = setupSwitch(
      {
        type: 'Switch',
        field: 'status',
        labelField: 'statusName',
        options: [
          { label: '停用', value: 0 },
          { label: '启用', value: 1 },
        ],
      },
      0
    )

    await nextTick()
    render()['onUpdate:checked'](1)
    expect(parent.status).toBe(1)
    expect(parent.statusName).toBe('启用')
    scope.stop()
  })

  it('等待异步 options 后再写入对应的默认值和标签', async () => {
    const options = ref<any[]>([])
    const { parent, scope } = setupSwitch({
      type: 'Switch',
      field: 'status',
      labelField: 'statusName',
      options,
    })

    await nextTick()
    expect(parent.status).toBeUndefined()

    options.value = [
      { label: '停用', value: 0 },
      { label: '启用', value: 1 },
    ]
    await nextTick()

    expect(parent.status).toBe(0)
    expect(parent.statusName).toBe('停用')
    scope.stop()
  })

  it('向底层 Switch 透传标准属性', () => {
    const { render, scope } = setupSwitch({ type: 'Switch', field: 'enabled' }, true)

    expect(render({ loading: true, classes: { root: 'custom-switch' } })).toMatchObject({
      loading: true,
      classes: { root: 'custom-switch' },
    })
    scope.stop()
  })
})
