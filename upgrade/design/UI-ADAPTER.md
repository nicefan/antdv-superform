# UIAdapter 设计草案

状态：P001 基础契约与 P002 字段处理器能力已确认，复杂能力将在对应阶段扩展。

## 设计目标

第一版适配器应覆盖真实依赖能力，不只是一张组件映射表。同时避免在一开始设计过大的万能接口，按字段、容器、服务和复杂领域模块逐步扩展。

## 概念结构

P001 已建立以下最小结构：

```ts
interface UIAdapter {
  name: string
  components: Record<string, Component>
  fields?: Record<string, FieldAdapter | undefined>
  defaults?: Record<string, Record<string, unknown>>
}
```

`FieldAdapter` 当前支持实际组件、组件名称、model 协议、字段默认值、属性转换函数和 Core `processors`。Form、Modal、Upload、Table 等复杂服务暂不提前定型，在对应阶段按真实需求扩展。

## 字段适配

字段增强器输出框架无关状态，例如 Switch 输出：

```ts
{
  value,
  trueValue,
  falseValue,
  trueLabel,
  falseLabel,
  onUpdateValue,
}
```

AntDV 适配器再转换为 `checked`、`checkedValue`、`unCheckedValue`、`checkedChildren`、`unCheckedChildren` 和 `update:checked`。Core 不保留这些 AntDV 名称。

普通 UI 字段不经过增强器。Schema 直接使用 UI 库真实组件名，例如 `TimeRangePicker`；Adapter 只提供同名组件、model 协议和默认值，不维护 UI 组件别名。

需要 SuperForm 增强的真实 UI 组件由 Adapter 显式指定处理器：

```ts
fields: {
  DateRangePicker: {
    component: 'DateRangePicker',
    processors: ['picker'],
  },
  TimeRangePicker: {
    component: 'TimeRangePicker',
    processors: ['picker'],
  },
}
```

`picker` 是 Core 通用处理器，负责范围拆分和 `disabledDate(effectData)` 等标准增强。处理器不依赖组件名称；没有配置处理器时，即使名称以 `RangePicker` 结尾也不会自动获得 `endField` 行为。

## 用户扩展

- `adapter`：通过 `app.use(superForm, { adapter })` 在初始化时显式指定应用级 UI 框架实现；该参数必传，初始化后不可切换。
- `components`：目标职责是注册消费项目自己的 Schema 组件；P001 兼容期仍保留原有底层组件替换行为，后续再按迁移记录拆分。
- `defaultProps`：覆盖当前适配器提供的默认值；合并顺序需在 P001 定义并补测试。
- 兼容期可以保留旧 `components` 替换入口，但应标明兼容层和移除计划。

P001 期间旧 `components`、`registerComponent` 和 `registerFormComponents` 行为保持不变，职责彻底分离留到对应兼容清理阶段。

## P001 已确认决策

- Adapter 采用应用级全局实例，必须在安装时显式传入，P001 不支持表单级局部覆盖。
- 默认值合并顺序为 Adapter 默认值在前、用户 `defaultProps` 在后。
- Adapter 首次安装后锁定；同一 Adapter 实例可重复安装，不同实例会明确报错。
- Adapter、AntDV Adapter、定义辅助函数、只读访问函数及相关类型从包根公开导出，不公开运行时切换入口。
- 字段标准状态、默认值索引规则、复杂服务 capability、`locale` 和 `customIcon` 的最终归属，在实际迁移对应能力时确认；P001 不用假设接口锁死后续设计。

## P002 已确认决策

- 普通 UI 字段由 Adapter 或自动导入解析，不进入 Core 字段注册表。
- 字段增强通过 Adapter 的 `processors` 显式组合，不按组件名称推断。
- Core 处理器负责 options、范围模型、标签和值等通用语义；Adapter 负责 UI 组件、默认属性、受控值协议和特殊渲染。
- `TagInput`、`TagSelect` 具有独立交互和值转换语义，继续作为 Core 内置复合字段；其底层 UI 原语依赖不在 P002 内强行拆分。
