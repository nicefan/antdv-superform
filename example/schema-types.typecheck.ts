import type { FormSchemaProps, LayoutColProps, LayoutRowProps, OptionType, UIFormComponentProps } from '../src'

/** 验证 Core 表单和布局属性不需要引用具体 UI 类型。 */
export const formProps: FormSchemaProps = {
  layout: 'vertical',
  labelAlign: 'right',
  wrapperCol: { span: 16 },
}

export const rowProps: LayoutRowProps = { gutter: [8, 16], justify: 'space-between' }
export const colProps: LayoutColProps = { span: 8, flex: 'auto' }

export const antdvFormOption: OptionType['Form'] = {
  dataSource: {},
  attrs: { component: false },
  subItems: [{ type: 'Input', field: 'name', colProps: { xs: 24 } }],
}

/** 验证 AntDV Adapter 预声明的真实组件名、Props 和 Core 增强字段会合并到 Schema。 */
export const selectOption: OptionType['Select'] = {
  type: 'Select',
  field: 'status',
  options: ['enabled', 'disabled'],
  attrs: { mode: 'multiple', showSearch: true },
}

export const rangeOption: OptionType['DateRangePicker'] = {
  type: 'DateRangePicker',
  field: 'startedAt',
  endField: 'endedAt',
  attrs: { needConfirm: true },
}

export const inputProps: UIFormComponentProps['Input'] = { variant: 'filled' }

export const removedFormProps: FormSchemaProps = {
  // @ts-expect-error `component` 是 AntDV 专属实现属性，不属于 Core 稳定契约。
  component: false,
}

export const removedColProps: LayoutColProps = {
  // @ts-expect-error 响应式断点属于 Adapter 扩展，Core 只保证栅格基础语义。
  xs: 24,
}
