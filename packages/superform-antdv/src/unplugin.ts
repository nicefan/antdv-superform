import type { SuperFormComponentResolver } from 'superform/unplugin/vite'

const fields = [
  'Input',
  'TextArea',
  'InputNumber',
  'AutoComplete',
  'Select',
  'Radio',
  'RadioGroup',
  'Checkbox',
  'CheckboxGroup',
  'DatePicker',
  'DateRangePicker',
  'TimePicker',
  'TimeRangePicker',
  'TreeSelect',
  'Switch',
  'Rate',
]

/** AntDV 字段按需导入规则；Core 插件负责扫描和生成虚拟注册模块。 */
export function createAntdvResolver(): SuperFormComponentResolver {
  const resolver = ((type: string) =>
    fields.includes(type)
      ? { from: 'antdv-next', importName: type, adapterField: true, registrationName: type }
      : undefined) as SuperFormComponentResolver
  resolver.adapterFields = [...fields]
  return resolver
}

export const antdvResolver = createAntdvResolver()

export type { SuperFormComponentResolver } from 'superform/unplugin/vite'
export default createAntdvResolver
