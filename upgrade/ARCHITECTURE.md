# UI 适配器目标架构

## 目标

将 SuperForm 的 Schema 语义、核心增强逻辑与具体 UI 框架协议分开，使核心能力不依赖 `antdv-next`，并允许通过适配器接入其他 UI 框架。

```text
Schema
  ↓
Core：模型、控制、选项、联动、校验编排和领域逻辑
  ↓
Core Enhancer：把增强字段整理为框架无关状态
  ↓
UIAdapter：组件、属性、model、事件、默认值和服务协议映射
  ↓
UI Framework：antdv-next 或其他实现
```

## 依赖方向

- Core 只依赖 Vue 和框架无关的工具，不直接导入 UI 框架、UI 图标或 UI 类型。
- Core Enhancer 可以认识 `Select`、`Switch`、`Upload` 等 SuperForm 增强语义，但不能渲染具体 UI 组件。
- UIAdapter 可以依赖具体 UI 框架，并负责把标准状态转换为该框架的属性、事件和实例协议。
- 自动导入负责解析普通 Schema 组件，不承担 SuperForm 增强语义的适配。
- 用户自定义组件注册与 UI 框架适配是两套职责，不继续共用一个含混的组件注册表。

禁止形成反向依赖：

```text
UIAdapter → Core        允许
Core → UIAdapter 契约   允许
Core → antdv-next       禁止
Core → @antdv-next/icons 禁止
```

## Schema 组件解析

`schema.type` 按以下顺序解析：

1. Core 内置类型，例如 `Text`、`Hidden`、`Fragment`、`Group`。
2. 与实际 UI 组件同名的 Core 增强类型，例如 `Select`、`Switch`、`RadioGroup`、`Upload`。
3. 用户显式注册的自定义类型。
4. 自动导入解析的普通组件。

纯 UI 组件不因当前使用 AntDV 就自动成为 Core 类型。UI 组件型 `schema.type` 必须使用当前 UI 库的实际组件名，不允许 Core 添加 `TimeRange`、`DateRange`、`Radio` 等别名。没有 SuperForm 语义价值的包装组件应删除，由 Adapter 组件表、自动导入和适配器默认值承接。

组件解析后，Adapter 可以通过 `processors` 显式指定 Core 处理器。Core 不根据组件名猜测行为。例如 `DateRangePicker` 和 `TimeRangePicker` 只有配置 `picker` 处理器后才会处理 `endField`；其他 UI 框架可以把自己的真实组件名绑定到同一个处理器。

## 职责边界

### Core

- Schema 与模型构建。
- `effectData`、动态属性、隐藏、禁用、必填和联动。
- options 获取、字典转换、标签同步等框架无关逻辑。
- 表单校验流程、上传领域流程、表格查询与编辑流程。
- 范围字段拆分、值转换等 Schema 领域能力。

### UIAdapter

- 实际 UI 组件和图标。
- `value`、`checked`、`modelValue` 等 model 属性与更新事件映射。
- UI 专属属性、事件参数和实例 API 转换。
- `FormItem`、栅格、弹窗、消息、上传、表格等能力协议实现。
- `valueFormat`、组件尺寸等 UI 框架默认值。
- 实际 UI 组件及其同名默认值；Core 不为 UI 组件创造额外别名。

### 自动导入

- 扫描 Schema 中非 Core、非增强的组件类型。
- 根据消费项目配置生成组件导入和类型声明。
- 不把自动导入组件重新包装为 Core 增强组件。

## 迁移约束

- `src/compat/antdv.ts` 是迁移桥梁，不在工程初期整体删除。
- 迁移采用逐能力、逐模块替换，避免一次性重写全部组件。
- 在 P004 前保留公共 Schema 对 AntDV Props 类型的临时暴露；不得把临时状态误认为目标架构。
- 在 P008 前保留必要的兼容注册 API，并为移除项记录迁移方案和目标版本。
- 第二 UI 框架 PoC 用于验证抽象是否成立，不以完整支持第二框架为首期发布目标。
