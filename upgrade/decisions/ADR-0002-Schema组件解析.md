# ADR-0002：Schema 组件解析

状态：已接受
日期：2026-09-01

## 背景

当前 `formItems` 和 `allItems` 同时承担 Core 组件、增强字段、UI 组件与自定义组件注册，导致纯转发包装也占据 Core Schema 类型注册表。

## 决策

Schema 类型按以下优先级解析：

```text
Core 内置类型
→ Core 增强类型
→ 用户显式注册类型
→ 自动导入组件
```

- UI 框架组件不是 Core 组件。
- UI 组件型 `schema.type` 必须与当前 Adapter 声明的字段名一致；Adapter 可映射实际组件库导出名，Core 不维护映射。
- 没有 SuperForm 语义价值的纯转发包装不得继续加入 Core。
- 自动导入与用户自定义组件需要独立来源标识，不再都归为模糊的 `custom`。
- Adapter 负责声明支持的 UI 字段及增强协议，不直接引入这些字段组件；实际组件由自动导入或 Adapter 工厂的 `components` 提供。
- UI 增强通过 Adapter 的 `processors` 显式绑定到字段名，Core 不使用名称后缀推断行为。

## 后果

- `InputNumber`、`TextArea`、`TimePicker`、`TimeRangePicker` 不需要 Core renderer。
- 范围模型能力留在 Core，但 Schema 使用实际组件名 `DateRangePicker`、`TimeRangePicker`。
- `Select`、`Switch`、`RadioGroup`、`CheckboxGroup` 等保留增强语义，但增强器名称与实际 UI 组件一致，且不直接绑定 AntDV 组件。
- `DatePicker`、`DateRangePicker`、`TimePicker`、`TimeRangePicker` 统一通过 `picker` 处理器进入通用包装，不保留组件专属 Core renderer。
- 不保留 `Textarea`、`DateRange`、`TimeRange`、`Radio`、`Checkbox` 旧别名。
- unplugin 只排除无需导入的 Core 类型；Adapter 字段仍需进入自动导入，但不重复生成项目组件类型声明。

## 2026-09-04 回补：支持声明与运行时引入分离

此前实现把固定 UI 原语和 Schema 字段都放入 `adapter.components`，使“Adapter 声明支持”错误地等同于“Adapter 已直接引入”。现修正为：

- `adapter.components` 只保存 Form、布局、容器、Action、Presentation 等 Core 运行必需的固定 UI 原语。
- `adapter.fields` 完整声明当前 Adapter 支持的字段名、model、processor、默认值和转换规则，包括没有增强处理器的 Rate。
- 自动导入与 Adapter 工厂的 `components` 只提供字段的实际组件，不改变字段的 Adapter 来源，也不能绕过其协议。
- Adapter 已声明但实际组件未注册时，运行时给出明确错误。
- `components` 继续只用于项目自定义 Schema 组件，不能覆盖 Adapter 字段。
