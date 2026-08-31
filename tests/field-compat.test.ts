import { describe, expect, expectTypeOf, it } from 'vitest'
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
import type { OptionType } from '../src/exaTypes'
import DateRangeField from '../src/components/DateRange.vue'
import TextareaField from '../src/components/Textarea.vue'

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
    const renderDateRange = (DateRangeField as any).setup(
      { disabledDate: undefined, effectData: {} },
      { slots: {} }
    )
    const renderTextarea = (TextareaField as any).setup({ option: { label: '备注' } })

    expect(renderDateRange().type).toBe(AntdvNext.DateRangePicker)
    expect(renderTextarea().type).toBe(AntdvNext.TextArea)
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
  it('为各字段暴露对应的 antdv-next 属性类型', () => {
    const textarea: OptionType['Textarea'] = { type: 'Textarea', attrs: { variant: 'filled' } }
    const inputNumber: OptionType['InputNumber'] = { type: 'InputNumber', attrs: { variant: 'underlined' } }
    const dateRange: OptionType['DateRange'] = {
      type: 'DateRange',
      attrs: { variant: 'borderless', needConfirm: true },
    }
    const timeRange: OptionType['TimeRange'] = {
      type: 'TimeRange',
      attrs: { variant: 'outlined', renderExtraFooter: () => 'footer' },
    }
    const radio: OptionType['Radio'] = { type: 'Radio', attrs: { orientation: 'vertical' } }

    expectTypeOf(textarea.attrs).toMatchTypeOf<Record<string, any> | undefined>()
    expectTypeOf(inputNumber.attrs).toMatchTypeOf<Record<string, any> | undefined>()
    expect(dateRange.attrs?.needConfirm).toBe(true)
    expect(timeRange.attrs?.variant).toBe('outlined')
    expect(radio.attrs?.orientation).toBe('vertical')
  })
})
