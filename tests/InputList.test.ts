import { beforeAll, describe, expect, it } from 'vitest'
import { nextTick, reactive } from 'vue'
import InputList from '../src/components/InputList.vue'
import { buildModelsMap, formatRule } from '../src/utils/buildModel'
import { initializeUIAdapter } from '../src/adapter'
import { antdvAdapter } from '../src/adapter/antdv'

beforeAll(() => initializeUIAdapter(antdvAdapter))

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
  it('只读模式逐项展示原始值数组', () => {
    const data = reactive({ names: ['甲', '乙'] })
    const option = {
      type: 'InputList',
      field: 'names',
      label: '姓名',
      columns: [{ type: 'Input', field: '$index' }],
    }
    const render = setupInputList(option, data, { isView: true })

    const spans = render().children.default()

    expect(spans.map((span) => span.children.at(-1))).toEqual(['甲', '乙'])
  })

  it('响应外部对数组的原地增删', async () => {
    const data = reactive({ names: ['甲'] })
    const option = {
      type: 'InputList',
      field: 'names',
      columns: [{ type: 'Input', field: '$index' }],
    }
    const render = setupInputList(option, data)

    expect(render()).toHaveLength(1)
    data.names.push('乙')
    await nextTick()
    expect(render()).toHaveLength(2)
    data.names.splice(0, 1)
    await nextTick()
    expect(render()).toHaveLength(1)
  })

  it('空数组初始化时立即保留一行', () => {
    const data = reactive({ names: [] as string[] })
    const option = {
      type: 'InputList',
      field: 'names',
      columns: [{ type: 'Input', field: '$index' }],
    }
    const render = setupInputList(option, data)

    expect(data.names).toHaveLength(1)
    expect(render()).toHaveLength(1)
  })

  it('为重复值维护互不冲突且稳定的行 key', async () => {
    const data = reactive({ names: ['同名', '同名'] })
    const option = {
      type: 'InputList',
      field: 'names',
      columns: [{ type: 'Input', field: '$index' }],
    }
    const render = setupInputList(option, data)
    const initialKeys = render().map((node) => node.key)

    expect(new Set(initialKeys).size).toBe(2)
    data.names[0] = '改名'
    await nextTick()
    expect(render().map((node) => node.key)).toEqual(initialKeys)
  })

  it('$index 模式按索引槽位维护 key', async () => {
    const data = reactive({ names: ['甲', '乙'] })
    const option = {
      type: 'InputList',
      field: 'names',
      columns: [{ type: 'Input', field: '$index' }],
    }
    const render = setupInputList(option, data)
    const initialKeys = render().map((node) => node.key)

    data.names.unshift('新增')
    await nextTick()
    const keys = render().map((node) => node.key)

    expect(keys[0]).not.toBe(initialKeys[0])
    expect(keys[1]).not.toBe(initialKeys[1])
    expect(new Set(keys).size).toBe(3)
  })

  it('对象移除后重新加入仍复用原 key', async () => {
    const first = { name: '甲' }
    const second = { name: '乙' }
    const data = reactive({ items: [first, second] })
    const option = {
      type: 'InputList',
      field: 'items',
      columns: [{ type: 'Input', field: 'name' }],
    }
    const render = setupInputList(option, data)
    const firstKey = render()[0].key

    data.items.splice(0, 1)
    await nextTick()
    data.items.push(first)
    await nextTick()

    expect(render()[1].key).toBe(firstKey)
  })

  it('对象列表只读重排时 DetailLayout 跟随对象 key', async () => {
    const first = { name: '甲' }
    const second = { name: '乙' }
    const data = reactive({ items: [first, second] })
    const option = {
      type: 'InputList',
      field: 'items',
      label: '名单',
      columns: [{ type: 'Input', field: 'name' }],
    }
    const render = setupInputList(option, data, { isView: true })
    const initialKeys = render().map((node) => node.key)

    data.items.reverse()
    await nextTick()

    expect(render().map((node) => node.key)).toEqual(initialKeys.reverse())
  })

  it('向只读详情布局传递展开后的配置且不使用动态 key', () => {
    const descriptionsProps = { column: 2 }
    const data = reactive({ items: [{ name: '甲' }] })
    const option = {
      type: 'InputList',
      field: 'items',
      descriptionsProps,
      columns: [{ type: 'Input', field: 'name' }],
    }
    const render = setupInputList(option, data, { isView: true })

    const vnode = render()

    expect(vnode.props.option.descriptionsProps).toBe(descriptionsProps)
    expect(vnode.props.option).not.toHaveProperty('_option')
    expect(vnode.key).toBeNull()
  })

  it('校验对象行中 value1 或 value2 至少填写一项', async () => {
    const data = reactive({ list: [{ value1: '', value2: '' }] })
    const option = {
      type: 'InputList',
      field: 'list',
      label: '至少填写一项',
      compact: true,
      columns: [
        {
          type: 'Input',
          field: 'value1',
          label: '值一',
          rules: {
            validator: ({ current }) =>
              current.value1?.trim() || current.value2?.trim() || new Error('value1 或 value2 至少填写一项'),
          },
        },
        { type: 'Input', field: 'value2', label: '值二' },
      ],
    }
    const model = buildModelsMap([option], data).modelsMap.get(option)!
    const value1Model = model.listData.modelsMap.get(option.columns[0])!
    const validator = formatRule(value1Model.rules, {
      current: data.list[0],
    })[0].validator

    await expect(validator({}, '')).rejects.toThrow('value1 或 value2 至少填写一项')
    data.list[0].value1 = '填写值一'
    await expect(validator({}, '填写值一')).resolves.toBeUndefined()
    data.list[0].value1 = ''
    data.list[0].value2 = '填写值二'
    await expect(validator({}, '填写值二')).resolves.toBeUndefined()
  })
})
