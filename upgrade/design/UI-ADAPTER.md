# UIAdapter 设计草案

状态：P001 基础契约与 P002 字段处理器能力已确认，复杂能力将在对应阶段扩展。

## 设计目标

第一版适配器应覆盖真实依赖能力，不只是一张组件映射表。同时避免在一开始设计过大的万能接口，按字段、容器、服务和复杂领域模块逐步扩展。

升级不以完整保留历史 UI 透传为目标。没有明确业务价值的属性、样式、事件和兼容规则优先删除；只有确认需要跨 UI 保留的语义才进入 Adapter，避免通过增加大量细粒度 capability 或 `*Props` 入口换取表面兼容。

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
- `globalConfig` 视为应用初始化配置，不为同一 Adapter 的重复安装定义缺省项重置语义。
- Adapter、AntDV Adapter、定义辅助函数、只读访问函数及相关类型从包根公开导出，不公开运行时切换入口。
- 字段标准状态、默认值索引规则、复杂服务 capability、`locale` 和 `customIcon` 的最终归属，在实际迁移对应能力时确认；P001 不用假设接口锁死后续设计。

## P002 已确认决策

- 普通 UI 字段由 Adapter 或自动导入解析，不进入 Core 字段注册表。
- 字段增强通过 Adapter 的 `processors` 显式组合，不按组件名称推断。
- Core 处理器负责 options、范围模型、标签和值等通用语义；Adapter 负责 UI 组件、默认属性、受控值协议和特殊渲染。
- UI 组件的事件参数由 Adapter 归一化后再交给 Core；外部 options/search 回调的并发、取消和异常仍由调用方负责。
- `TagInput`、`TagSelect` 具有独立交互和值转换语义，继续作为 Core 内置复合字段；其底层 UI 原语依赖不在 P002 内强行拆分。

## P003 已确认决策

- Form capability 分别声明表单容器和表单项，并映射 `validate/clearValidate` 实例方法；Core 继续负责模型、规则和提交编排。
- Layout capability 以 `row`、`col`、`space`、`compactSpace` 表达语义布局原语，不在 Core 中使用 AntDV 组件名或实例。
- `compactSpace` 为可选能力，未实现时回退到普通 `space`，保证其他 UI Adapter 不需模拟 AntDV 的 `Space.Compact`。
- 存在受控状态的 Tabs、Collapse 等容器先使用 `value/onUpdate:value`，再由 Container capability 映射为具体 UI model 协议。
- Action capability 只暴露 `group/tooltip` 粗粒度渲染入口，Presentation capability 只暴露 `tag/checkableTag` 语义入口；具体 Button、Dropdown、Menu、Divider 和 UI 事件协议留在 Adapter 内部。
- Icon capability 同时提供 Schema 图标渲染和 `add/remove/more/expand/collapse/info` 语义图标；Upload 专属图标留待 P006。
- `SuperList` 和当前 Descriptions 表格/表单模式不是 Core 通用组件，由 AntDV Adapter 作为兼容实现显式提供；Descriptions 实现位于 Adapter 私有目录并直接消费可覆盖的 AntDV 基础组件，不反向依赖公共 Adapter 入口。
- 单根且语义透明的包装保留 Vue attrs fallthrough；多根、跨层扩散、受控状态冲突或协议转换场景才显式接管。
- ButtonGroup、TagInput、TagSelect 等复合组件优先收缩旧 UI 属性和内部节点透传，再以最小业务视图模型连接 Adapter，不为每个内部原语建立独立扩展面。
- 允许删除升级前缺少明确业务价值的能力和规则；产生用户可见影响时同步更新迁移记录，不额外建立长期兼容层。

### P003 复合组件精简清单

- ButtonGroup 保留动作、权限、显隐禁用、确认、loading、图标文字模式、数量折叠和下拉业务；删除 `color -> ant-btn-*` 样式规则及根容器重复事件拦截。
- TagInput 保留标签增删、`closable`、`newLabel` 和 `stringifyValue`；删除任意 attrs 向每个 Tag 的复制及 `valueToString` 旧别名。
- TagSelect 保留 options、单多选、`stringifyValue`、`change/check` 和空状态；删除任意 attrs 向每个 CheckableTag 的复制及 `valueToString` 旧别名。
- Collections、Group 不再把同一份 attrs 同时扩散到 Row、section 和嵌套内容；布局或内容配置只使用已有的明确入口，不新增对应的透传属性组。
