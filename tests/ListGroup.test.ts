import { describe, expect, it } from 'vitest'
import { nextTick, reactive } from 'vue'
import ListGroup from '../src/components/ListGroup.vue'
import { buildModelsMap } from '../src/utils/buildModel'

describe('ListGroup', () => {
  it('对象重排时组件 key 跟随对象身份', async () => {
    const first = { name: '甲' }
    const second = { name: '乙' }
    const data = reactive({ items: [first, second] })
    const option = {
      type: 'ListGroup',
      field: 'items',
      columns: [{ type: 'Input', field: 'name' }],
    }
    const { modelsMap } = buildModelsMap([option], data)
    const render = (ListGroup as any).setup(
      {
        option,
        model: modelsMap.get(option),
        effectData: reactive({ current: data, value: data.items }),
        isView: false,
        labelIndex: false,
      },
      { slots: {} }
    ) as () => any[]
    const initialKeys = render().map((node) => node.key)

    data.items = [second, first]
    await nextTick()

    expect(render().map((node) => node.key)).toEqual(initialKeys.reverse())
  })
})
