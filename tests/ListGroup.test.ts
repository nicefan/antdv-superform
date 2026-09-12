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
    const secondModel = render()[1].props.model
    const secondField = [...secondModel.children.values()][0] as ModelData

    data.items = [second, first]
    await nextTick()

    expect(render().map((node) => node.key)).toEqual(initialKeys.reverse())
    expect(render()[0].props.model).toBe(secondModel)
    expect(secondField.propChain).toEqual(['items', 0, 'name'])

    data.items.unshift({ name: '新增' })
    await nextTick()
    expect(render()).toHaveLength(3)
    expect(render()[1].props.model).toBe(secondModel)
    expect(secondField.propChain).toEqual(['items', 1, 'name'])

    data.items.splice(0, 1)
    await nextTick()
    expect(secondField.propChain).toEqual(['items', 0, 'name'])
  })
})
