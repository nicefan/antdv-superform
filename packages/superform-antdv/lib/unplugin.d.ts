import { Plugin as Plugin_2 } from 'vite';

export declare const antdvResolver: SuperFormComponentResolver;

export declare type AntdvSuperFormComponentsOptions = Omit<SuperFormComponentsOptions, 'resolvers'> & {
    /** 项目自定义组件 resolver；官方字段 resolver 会自动加入。 */
    resolvers?: SuperFormComponentResolver[];
};

/** AntDV 字段按需导入规则；Core 插件负责扫描和生成虚拟注册模块。 */
export declare function createAntdvResolver(): SuperFormComponentResolver;

export declare function createLibraryResolver({ from, components, prefix }: LibraryResolverOptions): (type: string) => SuperFormComponentResolveResult | undefined;

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

/** AntDV 产品包的自动导入插件，自动补齐产品包名、类型模块和官方字段 resolver。 */
declare function SuperFormComponents(options?: AntdvSuperFormComponentsOptions): Plugin_2 | Plugin_2[];
export default SuperFormComponents;

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


declare global {
    namespace SuperFormTypeRegistry {
        interface UIContainerComponentPropSources {
            antdv: {
                Col: ColProps;
                Form: FormProps;
                FormItem: FormItemProps;
                Row: RowProps;
                Space: SpaceProps;
            };
        }
        interface UIFormComponentPropSources {
            antdv: {
                AutoComplete: AutoCompleteProps;
                Cascader: FormComponentProps<typeof import('antdv-next')['Cascader']>;
                Checkbox: FormComponentProps<typeof import('antdv-next')['Checkbox']>;
                CheckboxGroup: CheckboxGroupProps;
                ColorPicker: FormComponentProps<typeof import('antdv-next')['ColorPicker']>;
                DateMonthPicker: FormComponentProps<typeof import('antdv-next')['DateMonthPicker']>;
                DatePicker: DatePickerProps;
                DateQuarterPicker: FormComponentProps<typeof import('antdv-next')['DateQuarterPicker']>;
                DateRangePicker: RangePickerProps;
                DateWeekPicker: FormComponentProps<typeof import('antdv-next')['DateWeekPicker']>;
                DateYearPicker: FormComponentProps<typeof import('antdv-next')['DateYearPicker']>;
                Input: InputProps & InputFieldAttrs;
                InputNumber: InputNumberProps;
                InputOTP: FormComponentProps<typeof import('antdv-next')['InputOTP']>;
                InputPassword: FormComponentProps<typeof import('antdv-next')['InputPassword']>;
                InputSearch: FormComponentProps<typeof import('antdv-next')['InputSearch']> & InputFieldAttrs;
                Mentions: FormComponentProps<typeof import('antdv-next')['Mentions']>;
                Radio: FormComponentProps<typeof import('antdv-next')['Radio']>;
                RadioGroup: RadioGroupProps;
                Rate: FormComponentProps<typeof import('antdv-next')['Rate']>;
                Segmented: FormComponentProps<typeof import('antdv-next')['Segmented']>;
                Select: SelectProps;
                Slider: FormComponentProps<typeof import('antdv-next')['Slider']>;
                Switch: SwitchProps & SwitchFieldAttrs;
                TextArea: TextAreaProps;
                TimePicker: TimePickerProps;
                TimeRangePicker: TimeRangePickerProps;
                Transfer: FormComponentProps<typeof import('antdv-next')['Transfer']>;
                TreeSelect: TreeSelectProps;
            };
        }
        interface UIFormComponentOptionExtensionSources {
            antdv: {
                AutoComplete: AutoCompleteFieldOption;
                CheckboxGroup: SelectFieldOption;
                DateRangePicker: RangeFieldOption;
                Input: InputFieldOption;
                InputSearch: InputFieldOption;
                RadioGroup: SelectFieldOption;
                Select: SelectFieldOption;
                Switch: SwitchFieldOption;
                TimeRangePicker: RangeFieldOption;
                TreeSelect: TreeFieldOption<TreeSelectProps['treeData']>;
            };
        }
        interface UIActionComponentPropSources {
            antdv: {
                Button: ButtonProps;
                Dropdown: DropdownProps;
                Tooltip: TooltipProps;
            };
        }
        interface UITableComponentPropSources {
            antdv: {
                Table: AntdvTableProps;
                Column: TableColumnType & {
                    resizable?: boolean;
                };
                Pagination: PaginationProps;
            };
        }
        interface UIModalComponentPropSources {
            antdv: {
                Modal: ModalFuncProps & ModalProps;
            };
        }
        interface UIUploadComponentPropSources {
            antdv: {
                Upload: UploadProps;
            };
        }
    }
}



declare global {
  /** Adapter 类型目录的合并入口，带命名空间以避免污染业务全局类型。 */
  namespace SuperFormTypeRegistry {
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface UIContainerComponentPropSources {}
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface UIFormComponentProps {}
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface UIFormComponentOptionExtensions {}
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface UIFormComponentPropSources {}
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface UIFormComponentOptionExtensionSources {}
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface UIActionComponentPropSources {}
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface UITableComponentPropSources {}
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface UIModalComponentPropSources {}
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface UIUploadComponentPropSources {}
  }
}



declare global {
  export type GetOption<T extends keyof OptionType> = OptionType[T] & { type?: T }
  export type GetBaseOption = Partial<ExtBaseOption> & ExtRow
  export type MixWrapper = {
    [K in keyof WrapperTypes]: (k: Partial<WrapperTypes[K]>) => void
  }[keyof WrapperTypes] extends (k: infer U) => void
    ? U
    : never
  export type MixOption = {
    [K in keyof OptionType]: (k: Partial<OptionType[K]>) => void
  }[keyof OptionType] extends (k: infer U) => void
    ? U & ExtColumnsItem & Partial<CollapseItem> & { type?: string }
    : never

  export interface ModelData<T = GetBaseOption> {
    refData: any
    refName?: string
    parent: Obj
    index?: number
    initialValue?: any
    fieldName?: string
    propChain: string[]
    rules?: Obj[]
    children?: ModelsMap<T>
    /** 存储列表配置默认数据 */
    listData?: ModelChildren
  }
  export interface ModelDataGroup<T = ExtGroupBaseOption> extends ModelData<T> {
    children: Map<T, ModelDataGroup>
    /** 存储列表配置默认数据 */
    listData: ModelChildren
  }
  export type ModelsMap<T = GetBaseOption> = Map<T, ModelData>
  export interface ModelChildren<T = GetBaseOption> {
    modelsMap: ModelsMap<T>
    rules: Obj
  }
}

declare global {
  type Obj<T = any> = Record<string, T>
  type Fn<T = any> = (...args: any[]) => T
  type Ref<T = any> = import('vue').Ref<T>
}

