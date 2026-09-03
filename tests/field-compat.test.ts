import { beforeAll, describe, expect, expectTypeOf, it } from 'vitest'
import { createApp, defineComponent } from 'vue'
import * as AntdvNext from 'antdv-next'
import base from '../src/compat/antdv'
import {
  AutoComplete,
  DatePicker,
  DateRangePicker,
  InputNumber,
  RadioGroup,
  Select,
  TextArea,
  TimePicker,
  TimeRangePicker,
  TreeSelect,
  Upload,
  override,
} from '../src/compat/antdv'
import type { OptionType, UIFormComponentProps } from '../src/exaTypes'
import { antdvAdapter, getUIFieldAdapter, resolveUIComponent } from '../src/adapter'
import plugin from '../src/plugin'

beforeAll(async () => {
  await plugin.install(createApp(defineComponent(() => () => null)), { adapter: antdvAdapter })
})

function expectProps(component: any, names: string[]) {
  const props = component.props || component.__vccOpts?.props || {}
  names.forEach((name) => expect(props, `${component.name} 缺少 ${name}`).toHaveProperty(name))
}

function expectEmits(component: any, names: string[]) {
  const emits = component.emits || component.__vccOpts?.emits || {}
  names.forEach((name) => {
    const assertion = expect(emits, `${component.name} 缺少 ${name} 事件`)
    Array.isArray(emits) ? assertion.toContain(name) : assertion.toHaveProperty(name)
  })
}

describe('antdv-next 导出边界', () => {
  it('只暴露 1.0 使用的新导出名称', () => {
    expect(TextArea).toBe(AntdvNext.TextArea)
    expect(DateRangePicker).toBe(AntdvNext.DateRangePicker)
    expect(base.TextArea).toBe(AntdvNext.TextArea)
    expect(base.DateRangePicker).toBe(AntdvNext.DateRangePicker)
    expect(base.SpaceCompact).toBe(AntdvNext.SpaceCompact)
    expect(base).not.toHaveProperty('Textarea')
    expect(base).not.toHaveProperty('RangePicker')
    expect(base).not.toHaveProperty('InputGroup')
  })

  it('字段渲染器使用新导出', () => {
    expect(resolveUIComponent('DateRangePicker')).toBe(AntdvNext.DateRangePicker)
    expect(resolveUIComponent('TextArea')).toBe(AntdvNext.TextArea)
    expect(getUIFieldAdapter('DateRangePicker')?.processors).toEqual(['picker'])
  })

  it('在同一兼容边界维护底层组件覆盖', () => {
    const original = base.Input
    const replacement = { name: 'CustomInput' }

    try {
      override({ Input: replacement })
      expect(base.Input).toBe(replacement)
    } finally {
      override({ Input: original })
    }
  })
})

describe('字段使用的规范属性', () => {
  it('输入类字段支持 variant', () => {
    expectProps(TextArea, ['variant'])
    expectProps(InputNumber, ['variant'])
    expectProps(AutoComplete, ['variant', 'options', 'popupMatchSelectWidth', 'popupRender', 'classes', 'styles'])
  })

  it('选择类字段支持 popup 与语义化样式属性', () => {
    expectProps(Select, ['variant', 'popupMatchSelectWidth', 'popupRender', 'classes', 'styles'])
    expectProps(TreeSelect, ['variant', 'popupMatchSelectWidth', 'popupRender', 'classes', 'styles'])
    expectEmits(Select, ['openChange'])
    expectEmits(TreeSelect, ['openChange'])
  })

  it('日期和时间字段支持新弹层属性', () => {
    expectProps(DatePicker, ['variant', 'classes', 'styles'])
    expectProps(DateRangePicker, ['variant', 'classes', 'styles'])
    expectEmits(DatePicker, ['calendarChange'])
    expectEmits(DateRangePicker, ['calendarChange'])
    expectProps(TimePicker, ['variant', 'classes', 'styles', 'renderExtraFooter'])
    expectProps(TimeRangePicker, ['variant', 'classes', 'styles', 'renderExtraFooter'])
  })

  it('单选和上传字段支持 1.0 新属性', () => {
    expectProps(RadioGroup, ['orientation'])
    expectProps(Upload, ['showUploadList', 'beforeUpload'])
  })
})

describe('字段 schema 类型', () => {
  it('由 AntDV Adapter 类型目录提供真实组件属性', () => {
    const textarea: OptionType['TextArea'] = { type: 'TextArea', attrs: { variant: 'filled' } }
    const inputNumber: OptionType['InputNumber'] = { type: 'InputNumber', attrs: { variant: 'underlined' } }
    const dateRange: OptionType['DateRangePicker'] = {
      type: 'DateRangePicker',
      attrs: { variant: 'borderless', needConfirm: true },
    }
    const timeRange: OptionType['TimeRangePicker'] = {
      type: 'TimeRangePicker',
      attrs: { variant: 'outlined', renderExtraFooter: () => 'footer' },
    }
    const radio: OptionType['RadioGroup'] = { type: 'RadioGroup', attrs: { orientation: 'vertical' } }
    const inputProps: UIFormComponentProps['Input'] = { variant: 'filled' }

    expectTypeOf(textarea.attrs).toMatchTypeOf<Record<string, any> | undefined>()
    expectTypeOf(inputNumber.attrs).toMatchTypeOf<Record<string, any> | undefined>()
    expect(dateRange.attrs?.needConfirm).toBe(true)
    expect(timeRange.attrs?.variant).toBe('outlined')
    expect(radio.attrs?.orientation).toBe('vertical')
    expect(inputProps.variant).toBe('filled')
  })
})
