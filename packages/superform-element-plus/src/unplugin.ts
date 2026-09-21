import { elementPlusFieldSources, elementPlusFieldImports } from './fieldNames'
import createSuperFormComponents, {
  type SuperFormComponentResolver,
  type SuperFormComponentsOptions,
} from 'superform/unplugin/vite'
export * from 'superform/unplugin/vite'

export type ElementPlusSuperFormComponentsOptions = Omit<SuperFormComponentsOptions, 'resolvers'> & {
  /** 项目自定义组件 resolver；官方字段 resolver 会自动加入。 */
  resolvers?: SuperFormComponentResolver[]
}

/** Element Plus 字段自动导入 resolver；只描述映射，不注册 Adapter 或修改全局状态。 */
export function createElementPlusResolver(): SuperFormComponentResolver {
  const resolver = ((type: string) => {
    const importName = elementPlusFieldImports[type as keyof typeof elementPlusFieldImports]
    return importName
      ? {
          from: 'element-plus',
          importName,
          adapterField: true,
          registrationName: elementPlusFieldSources[type as keyof typeof elementPlusFieldSources] ?? type,
        }
      : undefined
  }) as SuperFormComponentResolver
  resolver.adapterFields = Object.keys(elementPlusFieldImports)
  return resolver
}

/** Element Plus 产品包的自动导入插件，自动补齐产品包名、类型模块和官方字段 resolver。 */
export default function SuperFormComponents(options: ElementPlusSuperFormComponentsOptions = {}) {
  return createSuperFormComponents({
    ...options,
    superFormImport: options.superFormImport || 'superform-element-plus',
    dtsModule: options.dtsModule || 'superform-element-plus',
    typesImport: options.typesImport || 'superform-element-plus',
    resolvers: [createElementPlusResolver(), ...(options.resolvers || [])],
  })
}
