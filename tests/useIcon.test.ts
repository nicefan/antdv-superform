import { defineComponent, isProxy, reactive } from 'vue'
import { beforeAll, describe, expect, it } from 'vitest'
import { getIconNode } from '../src/utils/useIcon'
import { antdvAdapter, initializeUIAdapter } from '../src/adapter'

beforeAll(() => initializeUIAdapter(antdvAdapter))

describe('图标渲染', () => {
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
