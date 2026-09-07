import createSuperFormComponents, {
  type SuperFormComponentResolver,
  type SuperFormComponentsOptions,
} from 'superform/unplugin/vite'
export * from 'superform/unplugin/vite'

export type AntdvSuperFormComponentsOptions = Omit<SuperFormComponentsOptions, 'resolvers'> & {
  /** 项目自定义组件 resolver；官方字段 resolver 会自动加入。 */
  resolvers?: SuperFormComponentResolver[]
}

const fields = [
  'Input',
  'TextArea',
  'InputNumber',
  'InputOTP',
  'InputPassword',
  'InputSearch',
  'AutoComplete',
  'Cascader',
  'ColorPicker',
  'Select',
  'Radio',
  'RadioGroup',
  'Checkbox',
  'CheckboxGroup',
  'DatePicker',
  'DateRangePicker',
  'DateMonthPicker',
  'DateQuarterPicker',
  'DateWeekPicker',
  'DateYearPicker',
  'TimePicker',
  'TimeRangePicker',
  'TreeSelect',
  'Switch',
  'Rate',
  'Mentions',
  'Segmented',
  'Slider',
  'Transfer',
]

/** AntDV 字段按需导入规则；Core 插件负责扫描和生成虚拟注册模块。 */
export function createAntdvResolver(): SuperFormComponentResolver {
  const resolver = ((type: string) =>
    fields.includes(type)
      ? {
          from: 'antdv-next',
          importName: type,
          adapterField: true,
          registrationName: type,
        }
      : undefined) as SuperFormComponentResolver
  resolver.adapterFields = [...fields]
  return resolver
}

export const antdvResolver = createAntdvResolver()

/** AntDV 产品包的自动导入插件，自动补齐产品包名、类型模块和官方字段 resolver。 */
export default function SuperFormComponents(options: AntdvSuperFormComponentsOptions = {}) {
  return createSuperFormComponents({
    ...options,
    superFormImport: options.superFormImport || 'superform-antdv',
    dtsModule: options.dtsModule || 'superform-antdv',
    typesImport: options.typesImport || 'superform-antdv',
    resolvers: [createAntdvResolver(), ...(options.resolvers || [])],
  })
}
