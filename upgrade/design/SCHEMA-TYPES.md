# 公共 Schema 类型设计

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

容器名称跨 Adapter 稳定，由 Core 负责子项结构和业务状态，各 Adapter 只映射最终 UI 组件、model 和 slot。普通输入组件不建立 Core 别名，切换 UI 库时允许 Schema 使用不同的真实组件名。

具有 SuperForm 业务能力的输入处理器仍可绑定到 UI 真实组件名，例如 AntDV `Select`。该名称是否启用 options、远程搜索等增强，由 Adapter 的 processor 配置决定，不由公共类型根据名称猜测。

## 类型映射

目标结构由三部分组成：

```ts
interface CoreSchemaTypeMap {
  Form: FormOption
  Tabs: TabsOption
  TagInput: TagInputOption
}

export interface UIFormComponentProps {}
export interface CustomFormComponentProps {}
```

`UniOption` 由上述映射生成可辨识联合。Adapter 通过模块扩展预先提供全部受支持 UI 组件的 Props，应用或 Vite 插件扩展项目组件；二者只影响类型提示，不导入组件代码。

当 UI 组件名与 Core 名称冲突时，Core 固定语义和增强类型优先，UI 扩展必须排除这些保留名称。Vite 插件也必须按 ADR-0002 的解析顺序排除 Core 和增强类型。

## 默认输入协议

普通输入默认使用 `value/onUpdate:value`，Adapter 不重复声明默认 model。只有 `checked`、`modelValue` 等非默认协议，或需要属性、事件、processor 转换时才增加字段协议。

类型目录与运行时导入相互独立：

- Adapter 类型声明可以列出全部支持组件。
- Adapter 运行时只保存必要的协议差异，不导入全部普通 UI 组件。
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

P004 先建立稳定公共类型和扩展入口。Modal、Table、Upload 尚未完成运行时 capability 时，可以保留明确标记的临时 AntDV 类型别名，但不得继续扩散到新接口。

## 第二 Adapter 验证

不建立假 Adapter 测试。P005 使用最小 Element Plus Adapter 和独立 dev 环境验证类型扩展、真实组件名、默认/非默认 model、容器映射与按需打包。
