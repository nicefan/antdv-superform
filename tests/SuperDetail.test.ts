import { describe, expect, it } from 'vitest'
import { nextTick, reactive } from 'vue'
import SuperDetail from '../src/superDetail/SuperDetail.vue'

function getDetailNode(render: () => any) {
  return render().children[0]
}

describe('SuperDetail', () => {
  it('schema prop 整体替换时重建模型映射', async () => {
    const firstItem = { type: 'Input', field: 'first' }
    const secondItem = { type: 'Input', field: 'second' }
    const props = reactive<any>({
      dataSource: undefined,
      schema: { subItems: [firstItem] },
    })
    const render = (SuperDetail as any).setup(props, {
      emit: () => undefined,
      expose: () => undefined,
      slots: {},
    }) as () => any

    expect([...getDetailNode(render).props.modelsMap.keys()].map((item) => item.field)).toEqual(['first'])

    props.schema = { subItems: [secondItem] }
    await nextTick()

    const detailNode = getDetailNode(render)
    expect([...detailNode.props.modelsMap.keys()].map((item) => item.field)).toEqual(['second'])
  })
})
