import { describe, expect, it, vi } from 'vitest'
import { nextTick, ref, shallowReactive } from 'vue'
import SwitchField from '../src/components/Switch.vue'
import base from '../src/compat/antdv'

function setupSwitch(option: Obj, value?: string | number | boolean, attrs: Obj = {}) {
  const emit = vi.fn()
  const props = shallowReactive({
    option,
    model: {},
    effectData: {},
    value,
    options: undefined,
    dictName: undefined,
    valueToNumber: false,
    labelAsValue: false,
    valueToLabel: false,
    firstIsChecked: false,
    defaultChecked: false,
  })
  const render = (SwitchField as any).setup(props, { attrs, emit })
  return { emit, props, render }
}

describe('Switch options', () => {
  it('使用 options 同步未选中和选中状态的值与标签', async () => {
    const { emit, render } = setupSwitch({
      type: 'Switch',
      field: 'status',
      options: [
        { label: '停用', value: 0 },
        { label: '启用', value: 1 },
      ],
    })

    await nextTick()
    const node = render()

    expect(node.type).toBe(base.Switch)
    expect(node.props).toMatchObject({
      checkedChildren: '启用',
      unCheckedChildren: '停用',
      checkedValue: 1,
      unCheckedValue: 0,
    })
    expect(emit).toHaveBeenCalledWith('update:value', 0)
  })

  it('值变化时同步 options 中对应的 labelField', async () => {
    const { emit, render } = setupSwitch(
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
    render().props['onUpdate:checked'](1)

    expect(emit).toHaveBeenCalledWith('update:value', 1)
    expect(emit).toHaveBeenCalledWith('update:labelValue', '启用')
  })

  it('等待异步 options 后再写入对应的默认值和标签', async () => {
    const options = ref<any[]>([])
    const { emit } = setupSwitch({
      type: 'Switch',
      field: 'status',
      labelField: 'statusName',
      options,
    })

    await nextTick()
    expect(emit).not.toHaveBeenCalledWith('update:value', false)

    options.value = [
      { label: '停用', value: 0 },
      { label: '启用', value: 1 },
    ]
    await nextTick()

    expect(emit).toHaveBeenCalledWith('update:value', 0)
    expect(emit).toHaveBeenCalledWith('update:labelValue', '停用')
  })

  it('向底层 Switch 透传标准属性', async () => {
    const { render } = setupSwitch({ type: 'Switch', field: 'enabled' }, true, {
      loading: true,
      classes: { root: 'custom-switch' },
    })

    await nextTick()
    expect(render().props).toMatchObject({
      loading: true,
      classes: { root: 'custom-switch' },
    })
  })
})
