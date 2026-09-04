import { defineComponent, isProxy, reactive } from 'vue'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { getIconNode } from '../src/utils/useIcon'
import { initializeUIAdapter } from '../src/adapter'
import { antdvAdapter } from '../packages/superform-antdv/src'

beforeAll(() => initializeUIAdapter(antdvAdapter))

describe('图标渲染', () => {
  it('空图标不会调用 Adapter capability', () => {
    const icons = antdvAdapter.icons
    if (!icons) throw new Error('AntDV Adapter 缺少 Icon capability')
    const render = vi.spyOn(icons, 'render')

    expect(getIconNode(undefined)).toBeUndefined()
    expect(render).not.toHaveBeenCalled()
    render.mockRestore()
  })

  it('不会把 schema 中被代理的组件继续作为响应式组件渲染', () => {
    const Icon = defineComponent({
      name: 'TestIcon',
      render: () => null,
    })
    const reactiveIcon = reactive(Icon)

    expect(isProxy(reactiveIcon)).toBe(true)
    expect(getIconNode(reactiveIcon)?.type).toBe(Icon)
  })
})
