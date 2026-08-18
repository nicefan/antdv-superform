import { createApp } from 'vue'
import { describe, expect, it } from 'vitest'
import { buildInnerNode } from '../src/components/Collections'

describe('集合字段默认渲染', () => {
  it('Text 和 HTML 未配置 viewRender 时仍然渲染默认内容', () => {
    const app = createApp({})
    const buildNode = (type: 'Text' | 'HTML') =>
      app.runWithContext(() => buildInnerNode({ type }, { refData: '内容' } as any, {}, {}))

    const textNode = buildNode('Text')!()
    const htmlNode = buildNode('HTML')!()

    expect(textNode).toMatchObject({ type: 'span', children: '内容' })
    expect(htmlNode).toMatchObject({ type: 'span', props: { innerHTML: '内容' } })
  })
})
