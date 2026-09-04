import { Plugin as Plugin_2 } from 'vite';

export declare function createLibraryResolver({ from, components, prefix }: LibraryResolverOptions): (type: string) => SuperFormComponentResolveResult | undefined;

declare const _default: (options: SuperFormComponentsOptions) => Plugin_2 | Plugin_2[];
export default _default;

export declare interface LibraryResolverOptions {
    from: string;
    components: string[] | Record<string, string>;
    prefix?: string;
}

export declare interface SuperFormComponentResolver {
    (type: string): SuperFormComponentResolveResult | undefined | null | false;
    /** Adapter 字段由 resolver 标记，生成声明时不重复写入 CustomFormComponentProps。 */
    adapterFields?: string[];
}

export declare interface SuperFormComponentResolveResult {
    /** 组件导入来源 */
    from: string;
    /** 实际导出名称，默认与 schema type 相同；default 表示默认导出 */
    importName?: string;
    /** Props 类型不随组件导出时可单独指定 */
    props?: {
        from?: string;
        name: string;
    };
    /** 自动导入组件使用非默认受控值协议时显式声明。 */
    model?: {
        prop?: string;
        event?: string;
    };
    /** 内置 Adapter resolver 使用；表示该组件只提供字段实现，不属于项目组件。 */
    adapterField?: boolean;
    /** 实际写入 UI 字段注册表的名称，默认使用 Schema type。 */
    registrationName?: string;
}

export declare interface SuperFormComponentsOptions {
    /** 扫描目录，相对于 root，默认 src */
    dirs?: string[];
    /** 动态 Schema 无法被扫描时显式声明可能使用的 type */
    types?: string[];
    /** 当前 Adapter 声明的字段名；仅用于避免为这些字段重复生成 Custom 类型声明。 */
    enhancedTypes?: string[];
    resolvers: SuperFormComponentResolver[];
    /** 同一 Vite 配置存在多个独立环境时，为虚拟模块设置唯一名称。 */
    virtualId?: string;
    /** 自动注入虚拟注册模块的入口文件，默认 src/main.ts 等常见入口 */
    entry?: string | RegExp | Array<string | RegExp>;
    /** 生成的类型声明路径；false 表示不生成 */
    dts?: string | false;
    /** 运行时注册函数的导入来源 */
    superFormImport?: string;
    /** 类型声明扩展的模块名 */
    dtsModule?: string;
    /** FormComponentProps 的导入来源，默认与 dtsModule 相同 */
    typesImport?: string;
    /** 项目根目录，通常由 Vite 自动提供 */
    root?: string;
    extensions?: string[];
}

export { }
