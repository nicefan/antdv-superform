# 不兼容变化与迁移记录

当前状态：已开始记录 P002 实施的不兼容 Schema 类型命名调整。

本文件只记录用户可观察的 API、类型或行为变化，不重复 Git diff。每项变化必须包含影响、迁移方式、兼容策略和计划移除版本。

## 记录模板

```md
## 变化名称

阶段：P00X
状态：计划中 / 已实施
影响版本：待定

### 以前

旧用法或旧行为。

### 现在

新用法或新行为。

### 影响

哪些用户、Schema、类型或运行时行为会受影响。

### 迁移

可执行的迁移步骤和代码示例。

### 兼容策略

兼容入口、警告方式和计划移除版本。
```

## 已知潜在变化

以下项目只是计划风险，不代表已经实施；进入对应阶段后必须给出最终方案。

- 安装配置可能从 `components` 同时承担底层替换和自定义注册，调整为 `adapter` 与用户组件注册分离。
- `InputNumber`、`TextArea`、`TimePicker` 等纯 UI Schema 类型的解析来源将从 Core 包装改为 Adapter 或自动导入。
- 公开 Schema Props 将从直接继承 AntDV 类型改为稳定通用类型加 Adapter 扩展类型。
- `registerFormComponents`、`registerComponent`、`Ext` 前缀等兼容 API 可能进入废弃流程。
- UI 默认属性的配置归属和索引名称可能调整。

## UI 组件 Schema 类型使用真实组件名

阶段：P002
状态：已实施
影响版本：下一大版本

### 以前

部分 Schema 类型使用 SuperForm 别名：

```text
Textarea
DateRange
TimeRange
Radio
Checkbox
```

### 现在

UI 组件型 Schema 类型必须与当前 UI 库的实际组件名一致：

```text
TextArea
DateRangePicker
TimeRangePicker
RadioGroup
CheckboxGroup
```

### 影响

使用以上旧类型名的 Schema、类型标注和动态 Schema 数据需要同步修改。范围字段的 `endField` 仍然有效。

### 迁移

按以下关系直接替换：

```text
Textarea  → TextArea
DateRange → DateRangePicker
TimeRange → TimeRangePicker
Radio     → RadioGroup
Checkbox  → CheckboxGroup
```

`Radio` 和 `Checkbox` 仍可作为 UI 库中真实存在的单控件名称使用，但不再承载原有的分组选项增强；需要 `options` 和标签同步时必须改用 `RadioGroup`、`CheckboxGroup`。

### 兼容策略

不保留旧名称兼容。项目已经开放 UI 组件库自由绑定，保留与实际组件不一致的别名会破坏跨 UI 框架的一致解析规则。

## 安装时必须显式传入 Adapter

阶段：P001 回补
状态：已实施
影响版本：下一大版本

### 以前

省略安装配置时会隐式使用 AntDV Adapter，并且重复安装可以切换当前 Adapter。

```ts
app.use(superForm)
```

### 现在

安装时必须显式传入 Adapter，首次初始化后不能切换为其他 Adapter。

```ts
import superForm, { antdvAdapter } from 'antdv-superform'

app.use(superForm, { adapter: antdvAdapter })
```

### 影响

所有省略 `adapter` 的应用安装代码都需要调整。运行期间依赖重新安装插件切换 UI 框架的代码将明确报错。

### 迁移

根据项目实际使用的 UI 框架导入对应 Adapter，并在 `app.use` 初始化配置中显式传入。

### 兼容策略

不保留隐式默认 Adapter，也不提供运行时切换兼容入口。同一 Adapter 实例的重复安装仍允许执行。
