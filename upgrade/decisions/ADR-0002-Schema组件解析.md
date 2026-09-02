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
- UI 组件型 `schema.type` 必须与当前 Adapter 暴露的实际组件名一致，Core 不定义 UI 组件别名。
- 没有 SuperForm 语义价值的纯转发包装不得继续加入 Core。
- 自动导入与用户自定义组件需要独立来源标识，不再都归为模糊的 `custom`。
- Adapter 负责增强语义到 UI 组件的映射，不负责普通组件的自动导入。
- UI 增强通过 Adapter 的 `processors` 显式绑定到真实组件名，Core 不使用名称后缀推断行为。

## 后果

- `InputNumber`、`TextArea`、`TimePicker`、`TimeRangePicker` 不需要 Core renderer。
- 范围模型能力留在 Core，但 Schema 使用实际组件名 `DateRangePicker`、`TimeRangePicker`。
- `Select`、`Switch`、`RadioGroup`、`CheckboxGroup` 等保留增强语义，但增强器名称与实际 UI 组件一致，且不直接绑定 AntDV 组件。
- `DatePicker`、`DateRangePicker`、`TimePicker`、`TimeRangePicker` 统一通过 `picker` 处理器进入通用包装，不保留组件专属 Core renderer。
- 不保留 `Textarea`、`DateRange`、`TimeRange`、`Radio`、`Checkbox` 旧别名。
- unplugin 在解析普通组件前必须排除 Core 与增强类型。
