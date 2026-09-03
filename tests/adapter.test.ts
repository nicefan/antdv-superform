import { beforeAll, describe, expect, it, vi } from 'vitest'
import { createApp, defineComponent } from 'vue'
import plugin, { globalProps } from '../src/plugin'
import {
  antdvAdapter,
  clearUIFormValidation,
  defineUIAdapter,
  getUIAdapter,
  getUIFieldAdapter,
  mapUIContainerProps,
  mapUIFieldProps,
  renderUIContainer,
  renderUIForm,
  renderUIFormItem,
  renderUIAction,
  renderUIPresentation,
  renderUILayout,
  renderUISemanticIcon,
  resolveUIComponent,
  validateUIForm,
} from '../src/adapter'
import { getFormComponent } from '../src/components'

function createTestApp() {
  return createApp(defineComponent(() => () => null))
}

beforeAll(async () => {
  await plugin.install(createTestApp(), { adapter: antdvAdapter })
})

describe('UIAdapter', () => {
  it('安装时必须显式传入 Adapter', async () => {
    await expect((plugin.install as any)(createTestApp())).rejects.toThrow('必须显式传入 adapter')
  })

  it('显式初始化 AntDV Adapter 后可解析字段组件协议', () => {
    expect(getUIAdapter()).toBe(antdvAdapter)
    expect(resolveUIComponent('Input')).toBe(antdvAdapter.components.Input)
    expect(resolveUIComponent('TimeRangePicker')).toBe(antdvAdapter.components.TimeRangePicker)
    expect(getUIFieldAdapter('Switch')?.model).toEqual({
      prop: 'checked',
      event: 'update:checked',
    })
  })

  it('UI 字段只使用真实组件名，不注册旧别名', () => {
    expect(resolveUIComponent('TextArea')).toBe(antdvAdapter.components.TextArea)
    expect(resolveUIComponent('TimeRangePicker')).toBe(antdvAdapter.components.TimeRangePicker)
    expect(getFormComponent('RadioGroup')).toBeUndefined()
    expect(getFormComponent('CheckboxGroup')).toBeUndefined()
    expect(getUIFieldAdapter('RadioGroup')?.processors).toEqual(['radioGroup'])
    expect(getUIFieldAdapter('CheckboxGroup')?.processors).toEqual(['checkboxGroup'])

    const aliases = ['Textarea', 'DateRange', 'TimeRange']
    aliases.forEach((type) => {
      expect(resolveUIComponent(type)).toBeUndefined()
      expect(getFormComponent(type)).toBeUndefined()
    })

    const rawCheckedComponents = ['Radio', 'Checkbox']
    rawCheckedComponents.forEach((type) => {
      expect(resolveUIComponent(type)).toBe(antdvAdapter.components[type])
      expect(getFormComponent(type)).toBeUndefined()
      expect(getUIFieldAdapter(type)?.model).toEqual({
        prop: 'checked',
        event: 'update:checked',
      })
    })
  })

  it('普通 UI 字段由 Adapter 补充默认属性后直接渲染', () => {
    expect(
      mapUIFieldProps(
        'TextArea',
        { value: '说明' },
        {
          option: { label: '备注' },
          effectData: {},
        }
      )
    ).toMatchObject({
      value: '说明',
      allowClear: true,
      placeholder: '请输入备注',
    })
  })

  it('AntDV Adapter 将字段 change 参数转换为 Core 标准值', () => {
    const onValueChange = vi.fn()
    const onChange = vi.fn()
    const context = { option: {}, effectData: {} }

    const selectProps = mapUIFieldProps('Select', { onValueChange, onChange }, context)
    selectProps.onChange('published', { label: '发布', value: 'published' })
    expect(onValueChange).toHaveBeenLastCalledWith('published')
    expect(onChange).toHaveBeenCalledWith('published', { label: '发布', value: 'published' })

    const radioProps = mapUIFieldProps('RadioGroup', { onValueChange }, context)
    radioProps.onChange({ target: { value: 'important' } })
    expect(onValueChange).toHaveBeenLastCalledWith('important')

    const treeProps = mapUIFieldProps('TreeSelect', { onValueChange }, context)
    treeProps.onChange('root', ['根节点'])
    expect(onValueChange).toHaveBeenLastCalledWith('root', '根节点')
  })

  it('Adapter 默认值先于用户 defaultProps 合并', async () => {
    await plugin.install(createTestApp(), {
      adapter: antdvAdapter,
      defaultProps: {
        FormItem: { validateFirst: false },
      },
    })

    expect(getUIAdapter()).toBe(antdvAdapter)
    expect(globalProps.FormItem).toEqual({ validateFirst: false })
    expect(globalProps.TimeRangePicker).toEqual({ valueFormat: 'HH:mm:ss' })
  })

  it('通过 Adapter 渲染表单、表单项和布局原语', () => {
    expect(renderUIForm({ model: {} }).type).toBe(antdvAdapter.components.Form)
    expect(renderUIFormItem({ name: ['name'] }).type).toBe(antdvAdapter.components.FormItem)
    expect(renderUILayout('row', { gutter: 16 }).type).toBe(antdvAdapter.components.Row)
    expect(renderUILayout('col', { span: 8 }).type).toBe(antdvAdapter.components.Col)
    expect(renderUILayout('space').type).toBe(antdvAdapter.components.Space)
    expect(renderUILayout('compactSpace').type).toBe(antdvAdapter.components.SpaceCompact)
  })

  it('通过 Form capability 调用 UI 表单实例', async () => {
    const instance = {
      validate: vi.fn().mockResolvedValue({ name: '张三' }),
      clearValidate: vi.fn(),
    }

    await expect(validateUIForm(instance)).resolves.toEqual({ name: '张三' })
    clearUIFormValidation(instance)
    expect(instance.validate).toHaveBeenCalledOnce()
    expect(instance.clearValidate).toHaveBeenCalledOnce()
  })

  it('通过容器 capability 转换受控状态和 UI 专属属性', () => {
    const onUpdate = vi.fn()
    expect(mapUIContainerProps('tabs', { value: 'base', 'onUpdate:value': onUpdate })).toEqual({
      activeKey: 'base',
      'onUpdate:activeKey': onUpdate,
    })
    expect(mapUIContainerProps('collapsePanel', { disabled: true })).toEqual({
      collapsible: 'disabled',
    })
    expect(renderUIContainer('card').type).toBe(antdvAdapter.components.Card)
    expect(renderUIContainer('list').type).toBe(antdvAdapter.containers?.list?.component)
    expect(antdvAdapter.components).not.toHaveProperty('SuperList')
  })

  it('通过 Adapter 渲染动作、展示原语和语义图标', () => {
    expect(renderUIAction('tooltip', { title: '提示' }).type).toBe(antdvAdapter.components.Tooltip)
    expect(
      renderUIAction('group', {
        groupProps: {},
        buttons: [],
        moreButtons: [],
        defaultButtonProps: {},
        effectData: {},
      }).type
    ).toBe(antdvAdapter.components.Space)
    expect(renderUISemanticIcon('add')?.type).toBe(antdvAdapter.icons?.semantic?.add)
    expect(renderUISemanticIcon('remove')?.type).toBe(antdvAdapter.icons?.semantic?.remove)
    expect(renderUIPresentation('tag').type).toBe(antdvAdapter.components.Tag)
  })

  it('AntDV Action/Presentation 在 Adapter 内转换内部 UI 协议', () => {
    const onClick = vi.fn()
    const stopPropagation = vi.fn()
    const group = renderUIAction('group', {
      groupProps: {},
      buttons: [{ attrs: {}, label: '保存', onClick }],
      moreButtons: [],
      defaultButtonProps: {},
      divider: false,
      labelOnly: false,
      iconOnly: false,
      effectData: {},
    })
    const tooltip = (group.children as Obj).default()[0]
    const button = tooltip.children.default()
    const event = { stopPropagation }
    button.props.onClick(event)

    expect(stopPropagation).toHaveBeenCalledOnce()
    expect(onClick).toHaveBeenCalledWith(event)

    const onSelectedChange = vi.fn()
    const checkableTag = renderUIPresentation('checkableTag', {
      selected: true,
      onSelectedChange,
    })
    expect(checkableTag.props).toMatchObject({ checked: true, onChange: onSelectedChange })

    const onRemove = vi.fn()
    const tag = renderUIPresentation('tag', { removable: true, onRemove })
    expect(tag.props).toMatchObject({ closable: true, onClose: onRemove })
  })

  it('初始化后拒绝切换为其他 Adapter', async () => {
    const adapter = defineUIAdapter({
      name: 'other-ui',
      components: { Input: defineComponent(() => () => null) },
    })

    await expect(plugin.install(createTestApp(), { adapter })).rejects.toThrow("不能切换为 'other-ui'")
    expect(getUIAdapter()).toBe(antdvAdapter)
  })

  it('初始化前读取 Adapter 时提供明确错误', async () => {
    vi.resetModules()
    const freshAdapterModule = await import('../src/adapter')

    expect(() => freshAdapterModule.getUIAdapter()).toThrow('尚未初始化 UIAdapter')
  })

  it('非 AntDV Adapter 可以消费 Core 标准字段和复合组件协议', async () => {
    vi.resetModules()
    const { defineUIAdapter, initializeUIAdapter, mapUIFieldProps, renderUIAction, renderUIPresentation } =
      await import('../src/adapter')
    const Field = defineComponent(() => () => null)
    const adapter = defineUIAdapter({
      name: 'simple-ui',
      components: { Field },
      fields: {
        Choice: {
          component: 'Field',
          transformProps(props) {
            const { onValueChange, ...rest } = props
            return { ...rest, onSelect: onValueChange }
          },
        },
      },
      actions: {
        render(type) {
          return `action:${type}`
        },
      },
      presentation: {
        render(type) {
          return `presentation:${type}`
        },
      },
    })
    initializeUIAdapter(adapter)

    const onValueChange = vi.fn()
    const mapped = mapUIFieldProps('Choice', { onValueChange }, { option: {}, effectData: {} })
    mapped.onSelect('selected')

    expect(mapped).not.toHaveProperty('onValueChange')
    expect(onValueChange).toHaveBeenCalledWith('selected')
    expect(renderUIAction('group')).toBe('action:group')
    expect(renderUIPresentation('checkableTag')).toBe('presentation:checkableTag')
  })
})
