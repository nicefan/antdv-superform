import { describe, expect, it, vi } from 'vitest'
import { reactive, ref } from 'vue'
import { useButtonState } from '../src/components/buttons/useButtonState'
import type { ActionMenuData } from '../src/exaTypes'

vi.mock('../src/adapter', () => ({ getUIRender: () => (props: unknown) => props }))

describe('Buttons 协议边界', () => {
  it('保留原生 loading 对象，并仅用 pending 锁定执行', async () => {
    const loading = ref({ icon: 'loading-icon', delay: 120 })
    const onClick = vi.fn()
    const state = useButtonState({ actions: [{ name: 'save', attrs: { loading }, onClick }] }, reactive({}))
    const button = (state.render() as any).buttons[0]

    expect(button.attrs.loading).toEqual({ icon: 'loading-icon', delay: 120 })
    loading.value = false as any
    let finish!: () => void
    onClick.mockImplementation(() => new Promise<void>((resolve) => { finish = resolve }))
    const first = button.onClick()
    expect(button.disabled).toBe(true)
    expect(button.attrs.loading).toBe(false)
    await button.onClick()
    expect(onClick).toHaveBeenCalledTimes(1)
    finish()
    await first
    expect(button.disabled).toBe(false)
  })

  it('同步菜单函数读取 context，并把选中值传入 context.value', async () => {
    const context = reactive({ record: { id: 1 }, allowed: true })
    const onClick = vi.fn()
    const dropdown = vi.fn((param) => [
      { label: '启用', value: 'enable', disabled: !param.allowed },
      { label: '停用', value: 'disable', disabled: true },
    ])
    const state = useButtonState({ actions: [{ dropdown, onClick }] }, context)
    const button = (state.render() as any).buttons[0]

    expect(button.menu).toHaveLength(2)
    expect(dropdown).toHaveBeenCalledWith(context)
    await button.onSelect('disable')
    await button.onSelect('enable')
    expect(onClick).toHaveBeenCalledOnce()
    expect(onClick.mock.calls[0][0]).toMatchObject({ record: context.record, value: 'enable' })
  })

  it('Ref 菜单源在原始值数组和键值对象之间切换时保持一级菜单', () => {
    const dropdown = ref<ActionMenuData>(['enable'])
    const state = useButtonState({ actions: [{ dropdown }] }, reactive({}))
    const button = (state.render() as any).buttons[0]

    expect(button.menu.map((item: any) => item.value)).toEqual(['enable'])
    dropdown.value = { disable: '停用' }
    expect(button.menu.map((item: any) => item.value)).toEqual(['disable'])
  })

  it('更多入口默认是省略号图标，显式配置按原值渲染', () => {
    const actions = [{ label: '一' }, { label: '二' }]
    const fallback = useButtonState({ actions, limit: 1 }, reactive({})).render() as any
    expect(fallback.moreLabel().type).toBe('svg')

    const custom = useButtonState({ actions, limit: 1, moreLabel: '其余' }, reactive({})).render() as any
    expect(custom.moreLabel().children).toBe('其余')
  })
})
