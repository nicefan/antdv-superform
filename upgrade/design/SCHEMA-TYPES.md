# 公共 Schema 类型设计

> 升级已完成，本文保留为历史记录。最终架构统一见 [架构总览](../ARCHITECTURE.md)，后续改造进入 [独立任务](../../tasks/README.md)，人工确认完成后再同步正式文档。

更新时间：2026-09-03
阶段：P004

## 目标

公共类型只表达 SuperForm 保证的稳定语义。UI Adapter 可以完整声明当前 UI 库支持的组件 Props，但这些类型声明不得产生运行时导入；实际组件仍由 Vite 插件按 Schema 使用情况导入。

## 类型分类

| 分类 | 名称来源 | 示例 | 类型归属 |
| --- | --- | --- | --- |
| Core 容器 | SuperForm 固定语义名 | `Form`、`Tabs`、`Collapse`、`Descriptions` | Core 类型映射 |
| Core 组件 | SuperForm 固定语义名 | `Text`、`Hidden`、`Buttons`、`InputList`、`TagInput` | Core 类型映射 |
| UI 输入组件 | 当前 UI 库真实组件名 | AntDV `Input`、`Select`、`TimeRangePicker` | Adapter 类型扩展 |
| 项目组件 | 自动导入或显式注册名 | `UserPicker` | 应用类型扩展 |

容器名称跨 Adapter 稳定，由 Core 负责子项结构和业务状态，各 Adapter 只映射最终 UI 组件、model 和 slot。普通输入组件不建立 Core renderer；Element Plus 字段统一去掉组件导出的 `El` 前缀，例如 `ElInputNumber`、`ElCascader` 分别使用 `InputNumber`、`Cascader`，再由 Adapter 映射实际组件导出。

具有 SuperForm 业务能力的输入处理器仍可绑定到 UI 真实组件名，例如 AntDV `Select`。该名称是否启用 options、远程搜索等增强，由 Adapter 的 processor 配置决定，不由公共类型根据名称猜测。

## 类型映射

目标结构由三部分组成：

```ts
interface CoreSchemaTypeMap {
  Form: FormOption
  Tabs: TabsOption
  TagInput: TagInputOption
}

namespace SuperFormTypeRegistry {
  interface UIFormComponentProps {}
  interface UIFormComponentOptionExtensions {}
  interface UIContainerComponentProps {}
  interface UIActionComponentProps {}
}
export interface CustomFormComponentProps {}
```

`UniOption` 由上述映射生成可辨识联合。Adapter 通过命名类型注册表的声明合并预先提供全部受支持 UI 组件的 Props；`UIFormComponentOptionExtensions` 将 Select、Range 等组件关联到 Core 增强配置，避免 Core 根据组件名猜测能力。应用或 Vite 插件只扩展项目组件；这些类型映射都不导入运行时组件代码。

Schema 的 `attrs` 对 UI Props 使用 `Partial`：保留属性名称和值类型提示，但不把 UI 组件声明的必填 Props 强制为静态 Schema 必填，因为它们还可能由 `dynamicAttrs`、Adapter 默认值或字段处理器补充。

多个 Adapter 使用同一 Schema 名称时，按 Adapter 来源分别登记 Props 和增强配置，再将同名字段汇总为联合类型，避免全量构建时发生全局接口重复属性冲突。

Form、FormItem、Row、Col 和 Space 是 Core 固定语义名，它们先接收 Core 稳定 Props，再与当前 Adapter 在 `UIContainerComponentProps` 中声明的 Props 合并。这保留单根组件的自然 attrs 能力，同时不让 Core 类型直接引用具体 UI 包。

Descriptions 和 Tabs 只保留实际被 Core 消费的容器语义，不再继承整个 UI 组件 Props。按钮、Tooltip 和 Dropdown 会落到 Adapter 的语义 Action 渲染器，其有效 UI Props 由 `UIActionComponentProps` 提供类型，Core 不解释具体 UI 属性。

Modal、Table 和 Upload 同样以稳定业务属性为主体，并分别通过 `UIModalComponentProps`、`UITableComponentProps`、`UIUploadComponentProps` 合并 Adapter 属性。类型分层不提前定义运行时 capability，也不改变查询、弹窗和上传流程。

当 UI 组件名与 Core 名称冲突时，Core 固定语义和 Adapter 字段优先，项目组件必须排除这些保留名称。Vite 插件只排除无需运行时导入的 Core 类型；Adapter 字段仍要导入实际组件，但不写入项目组件类型扩展。

## 默认输入协议

普通输入默认使用 `value/onUpdate:value`，Adapter 不重复声明默认 model。只有 `checked`、`modelValue` 等非默认协议，或需要属性、事件、processor 转换时才增加字段协议。

类型目录与运行时导入相互独立：

- Adapter 类型声明可以列出全部支持组件。
- Adapter 运行时保存字段协议差异，并只直接引入 Core 固定 UI 原语，不引入 Schema 字段组件。
- Vite 插件静态扫描实际使用的 `schema.type` 并生成按需导入。
- 动态 Schema 无法静态识别时，由插件的 `types` 显式补充。

## 当前耦合清单

| 能力 | 当前 UI 类型 | P004 处理原则 |
| --- | --- | --- |
| Form | `FormProps`、`FormItemProps` | 提取模型、布局、校验等稳定字段；其余进入 AntDV 扩展 |
| Field | Input、Select、Picker、Tree、Switch、Group Props | 增强业务字段留在 Core，UI `attrs` 由 Adapter 类型映射提供 |
| Layout | `RowProps`、`ColProps`、`SpaceProps` | 保留 span、gutter、align 等稳定语义，响应式和 UI 专属字段进入扩展 |
| Modal | `ModalProps`、`ModalFuncProps` | 生命周期和确认语义留在 Core，UI 外观字段后续随 Modal capability 处理 |
| Table | `TableProps`、`TableColumnType`、`PaginationProps` | 查询、分页、列业务语义留在 Core，渲染协议留待 P007 |
| Upload | `UploadProps` | 文件领域配置留在 Core，UI 列表和事件协议留待 P006 |

P004 直接建立稳定公共类型和 Adapter 扩展入口。Modal、Table、Upload 的运行时 capability 虽然留待 P006/P007，公共类型也不因此保留 AntDV Props 兼容别名。

## 第二 Adapter 验证

不建立假 Adapter 测试。P005 使用最小 Element Plus Adapter、独立 Schema 和独立 dev 环境，验证类型扩展、组件名映射、默认/非默认 model、容器映射与按需打包。两个 Adapter 可共享无前缀字段名，但各自保留独立 Props 和运行时组件协议。

## P005 解析实现

- `coreTypes` 只固定 Core 容器、复合字段和特殊渲染类型；UI 字段名由当前 Adapter 动态登记，Core 不预设 AntDV 字段。
- 具体 Adapter 的字段声明始终优先于项目组件；是否进入处理器由该字段的 `processors` 决定。
- 项目显式组件和自动导入组件分别进入 `custom`、`auto` 注册表，查找时 `custom` 优先于 `auto`，两者都只接收标准字段属性和 model 绑定。
- 自动导入 resolver 只负责定位实际组件；`createAntdvResolver`、`createElementPlusResolver` 分别由两个 Adapter 包的 `/unplugin` 入口提供。项目组件 resolver 仍可用 `model` 声明非默认协议；`virtualId` 用于隔离多个独立入口。
