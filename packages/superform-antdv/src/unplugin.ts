import { antdvFieldNames } from './fieldNames'
import createSuperFormComponents, {
  type SuperFormComponentResolver,
  type SuperFormComponentsOptions,
} from 'superform/unplugin/vite'
export * from 'superform/unplugin/vite'

export type AntdvSuperFormComponentsOptions = Omit<SuperFormComponentsOptions, 'resolvers'> & {
  /** 项目自定义组件 resolver；官方字段 resolver 会自动加入。 */
  resolvers?: SuperFormComponentResolver[]
}

/** AntDV 字段按需导入规则；Core 插件负责扫描和生成虚拟注册模块。 */
export function createAntdvResolver(): SuperFormComponentResolver {
  const resolver = ((type: string) =>
    (antdvFieldNames as readonly string[]).includes(type)
      ? {
          from: 'antdv-next',
          importName: type,
          adapterField: true,
          registrationName: type,
        }
      : undefined) as SuperFormComponentResolver
  resolver.adapterFields = [...antdvFieldNames]
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
