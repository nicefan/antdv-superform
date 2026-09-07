# UI Adapter 架构

SuperForm 1.0 将 Schema 语义、Core 领域逻辑和具体 UI 框架协议拆开。Core 不再直接依赖 AntDV Next 或 Element Plus。

```text
Schema
  ↓
Core：模型、联动、校验、options、查询与 CRUD 流程
  ↓
UI Adapter：组件、Props、model、事件、默认值和服务协议
  ↓
AntDV Next / Element Plus / 第三方 UI
```

## 发布方式

- `superform`：独立 Core 与 Adapter SDK，面向第三方 Adapter 开发。
- `superform-antdv`：包含 Core 与 AntDV Adapter 的完整产品包。
- `superform-element-plus`：包含 Core 与 Element Plus Adapter 的完整产品包。

业务项目只选择一个官方产品包。两个官方产品不能在同一应用中混用，也不支持运行时切换。

## 初始化与注册

```ts
import superform from "superform-antdv";

superform.initialize();
superform.configure({ defaultProps, dictApi });
superform.registerComponents({ UserPicker });
```

三个入口分别负责 Adapter、Core 全局行为和项目业务字段。官方包导入本身不会修改全局状态。

## Schema 组件解析

字段按以下来源解析：

1. Core 内置节点，例如 `Text`、`Hidden`、`Fragment`、`Group`。
2. 当前 Adapter 声明并指定处理器的增强字段，例如 `Select`、`Switch`、`DateRangePicker`、`Upload`。
3. `registerComponent(s)` 注册的项目业务字段。
4. Vite 插件自动导入的普通 UI 字段。

UI 字段使用真实组件名。旧别名直接迁移：

```text
Textarea  → TextArea
DateRange → DateRangePicker
TimeRange → TimeRangePicker
Radio     → RadioGroup（组选项场景）
Checkbox  → CheckboxGroup（组选项场景）
```

Element Plus 的 Schema 名称去掉导出上的 `El` 前缀，例如 `ElInput` 对应 `Input`。

## 字段声明不等于组件引入

Adapter 声明某个字段表示：

- Schema 可以获得字段名和 Props 提示。
- Adapter 知道 model、事件、默认值和增强处理器。

它不会自动把实际 UI 组件打进产品根入口。运行时组件由 Vite 插件按需导入，或通过 `initialize({ components })` 手动提供；缺少时会明确提示组件未注册。

## 第三方 Adapter

第三方包依赖 `superform`，通过 `superform/sdk` 实现 UIAdapter。Core 只调用 capability 契约，不认识具体 UI 组件、CSS class 或实例 API。

切换 Adapter 不承诺整份 Schema 原样复用。Core 容器和业务语义保持稳定，UI 组件名称、`attrs` 与事件仍以目标框架为准。

详细设计和迁移记录见仓库中的 `upgrade/ARCHITECTURE.md` 与 `upgrade/migration/BREAKING-CHANGES.md`。
