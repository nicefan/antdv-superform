import type { SuperFormComponentResolver } from 'superform/unplugin/vite'
export { default } from 'superform/unplugin/vite'
export * from 'superform/unplugin/vite'

const fields = {
  Input: 'ElInput',
  Select: 'ElSelect',
  Switch: 'ElSwitch',
  Rate: 'ElRate',
}

/** Element Plus 字段自动导入 resolver；只描述映射，不注册 Adapter 或修改全局状态。 */
export function createElementPlusResolver(): SuperFormComponentResolver {
  const resolver = ((type: string) => {
    const importName = fields[type as keyof typeof fields]
    return importName
      ? {
          from: 'element-plus',
          importName,
          adapterField: true,
          registrationName: type,
        }
      : undefined
  }) as SuperFormComponentResolver
  resolver.adapterFields = Object.keys(fields)
  return resolver
}
