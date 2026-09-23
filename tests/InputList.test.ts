import { beforeAll, describe, expect, it } from 'vitest'
import { h, nextTick, reactive } from 'vue'
import InputList from '../src/components/InputList.vue'
import InputGroup from '../src/components/InputGroup.vue'
import { buildModelsMap } from '../src/utils/buildModel'
import { defineUIAdapter, initializeUIAdapter } from '../src/adapter'

// 这里只检查 Core 生成的模型与规则，不加载具体 UI 包或构建产物。
beforeAll(() => initializeUIAdapter(defineUIAdapter({
  name: 'input-list-logic',
  supportedFields: ['Input', 'InputNumber'],
  uiComponents: {
    formItem: { render: ({ attrs }) => h('div', attrs) },
  },
})))

function setupInputList(option: Obj, data: Obj, props: Obj = {}) {
  const { modelsMap } = buildModelsMap([option], data)
  const model = modelsMap.get(option)!
  const render = (InputList as any).setup(
    {
      option,
      model,
      effectData: reactive({ current: data, value: data[option.field] }),
      isView: false,
      labelIndex: false,
      ...props,
    },
    { slots: {} }
  )
  return render as () => any
}

describe('InputList', () => {
  it('对象行移动后保留模型并同步子字段路径及数组绑定', async () => {
    const data = reactive({ items: [{ name: '甲', age: 1 }, { name: '乙', age: 2 }] })
    const render = setupInputList({
      type: 'InputList',
      field: 'items',
      columns: [{ type: 'Input', field: 'name' }, { type: 'InputNumber', field: 'age' }],
    }, data)
    const secondModel = render()[1].props.model
    const group = [...secondModel.children.values()][0] as ModelData
    const field = [...group.children!.values()][0]

    data.items.reverse()
    await nextTick()
    expect(render()[0].props.model).toBe(secondModel)
    expect(field.propChain).toEqual(['items', 0, 'name'])
    data.items.reverse()
    await nextTick()

    data.items.splice(0, 1)
    await nextTick()

    expect(render()[0].props.model).toBe(secondModel)
    expect(group.propChain).toEqual(['items', 0])
    expect(field.propChain).toEqual(['items', 0, 'name'])
    expect(group.refData).toBe(data.items[0])

    data.items = [{ name: '新增', age: 3 }, ...data.items]
    await nextTick()

    expect(render()[1].props.model).toBe(secondModel)
    expect(field.propChain).toEqual(['items', 1, 'name'])
    field.refData = '修改'
    expect(data.items[1].name).toBe('修改')
  })

  it('普通数组按钮增删保留重复值行并更新其读写下标', async () => {
    const data = reactive({ names: ['同名', '同名'] })
    const render = setupInputList({
      type: 'InputList', field: 'names',
      columns: [{ type: 'Input', field: '$index' }],
    }, data)
    const secondNode = render()[1]
    const field = [...secondNode.props.model.children.values()][0] as ModelData
    const buttons = [...secondNode.props.model.children.keys()].find((option) => option.type === 'Buttons')
    buttons.methods.add.onClick({ index: 0 })
    await nextTick()
    expect(render()[2].key).toBe(secondNode.key)
    expect(field.propChain).toEqual(['names', 2])
    field.refData = '修改'
    await nextTick()
    expect(data.names[2]).toBe('修改')
    expect(render()[2].key).toBe(secondNode.key)
    buttons.methods.delete.onClick({ index: 0 })
    await nextTick()
    expect(render()[1].key).toBe(secondNode.key)
    expect(field.propChain).toEqual(['names', 1])
  })

  it('InputGroup 合并行规则和子字段规则，并读取最新校验路径', () => {
    const childOption = { type: 'Input', field: 'name', required: true }
    const children = buildModelsMap([childOption], reactive({ name: '' }), ['items', '0']).modelsMap
    const validator = () => true
    const model = reactive({
      index: 0, propChain: ['items', 0], refData: { name: '' },
      rules: [{ validator }], children,
    })
    const render = (InputGroup as any).setup({
      model, option: {}, compact: true, effectData: reactive({}),
    }, { attrs: {} })
    const rules = render().props.rules
    expect(rules).toHaveLength(2)
    expect(rules[0].validator).toBeTypeOf('function')
    expect(rules[1].fields.name[0].required).toBe(true)
    model.propChain = ['items', 1]
    expect(render().props.name).toEqual(['items', 1])
  })
})
