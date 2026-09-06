import type {
  AdapterDefaultProps,
  FormSchemaProps,
  SuperFormConfig,
  LayoutColProps,
  LayoutRowProps,
  ModalSchemaProps,
  OptionType,
  RootTableOption,
  TableSchemaProps,
  UploadSchemaProps,
  UIActionComponentProps,
  UIFormComponentProps,
  UIModalComponentProps,
  UITableComponentProps,
  UIUploadComponentProps,
} from 'superform-antdv'

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
export const buttonProps: UIActionComponentProps['Button'] = { danger: true }
export const tableProps: UITableComponentProps['Table'] = { scroll: { x: 1200 } }
export const columnProps: UITableComponentProps['Column'] = { width: 160, fixed: 'left' }
export const modalProps: UIModalComponentProps['Modal'] = { width: 720, maskClosable: false }
export const uploadProps: UIUploadComponentProps['Upload'] = { listType: 'picture-card' }

export const coreTableProps: TableSchemaProps = { defaultExpandLevel: 2, rowSelection: false }
export const coreModalProps: ModalSchemaProps = { title: '编辑', destroyOnClose: true }
export const coreUploadProps: UploadSchemaProps = { uploadMode: 'submit', maxCount: 3, accept: '.png,.jpg' }

export const tableOption: RootTableOption = {
  columns: [{ type: 'Text', field: 'name', columnProps: { width: 160, fixed: 'left' } }],
  attrs: { bordered: true, rowSelection: { preserveSelectedRowKeys: true } },
  pagination: { current: 1, pageSize: 20, showSizeChanger: true },
  modalProps: { width: 720, maskClosable: false },
}

export const uploadOption: OptionType['Upload'] = {
  type: 'Upload',
  field: 'files',
  attrs: { uploadMode: 'submit', maxCount: 3, listType: 'picture-card' },
}

export const defaultProps: AdapterDefaultProps = {
  Form: { layout: 'vertical' },
  Input: { allowClear: true },
}

export const superFormConfig: SuperFormConfig = { defaultProps }

export const removedLocale: SuperFormConfig = {
  // @ts-expect-error locale 已无运行时消费方，不再作为 Core 安装配置。
  locale: {},
}

export const removedFormProps: FormSchemaProps = {
  // @ts-expect-error `component` 是 AntDV 专属实现属性，不属于 Core 稳定契约。
  component: false,
}

export const removedColProps: LayoutColProps = {
  // @ts-expect-error 响应式断点属于 Adapter 扩展，Core 只保证栅格基础语义。
  xs: 24,
}

export const tabsOption: OptionType['Tabs'] = {
  type: 'Tabs',
  subItems: [{ label: 'A', attrs: { forceRender: true }, subItems: [] }],
  // @ts-expect-error Tabs 根节不再接收实际未消费的透传 attrs。
  attrs: { animated: true },
}

export const descriptionsOption: OptionType['Descriptions'] = {
  type: 'Descriptions',
  subItems: [],
  attrs: {
    mode: 'table',
    column: 2,
  },
}
