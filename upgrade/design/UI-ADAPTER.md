# UIAdapter 设计草案

> 升级已完成，本文保留为历史记录。最终架构统一见 [架构总览](../ARCHITECTURE.md)，后续改造进入 [独立任务](../../tasks/README.md)，人工确认完成后再同步正式文档。

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
  fieldComponents?: Record<string, Component | undefined>
  defaults?: Record<string, Record<string, unknown>>
}
```

`components` 只保存 Core 运行必需、由具体 Adapter 直接引入的固定 UI 原语。`FieldAdapter` 声明字段组件的注册名、model 协议、字段默认值、属性转换函数和 Core `processors`；字段实际组件由自动导入，或由 Adapter 工厂的 `components` 参数写入内部 `fieldComponents`。

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

普通 UI 字段不经过增强器。Schema 使用 Adapter 声明的字段名，例如 `TimeRangePicker`；Adapter 同时声明实际组件注册名、model 协议和默认值，但不直接引入字段组件。Element Plus 可将无前缀字段名映射到 `El*` 导出。

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

- `superform.useAdapter(adapter)`：第三方 Adapter 与 Core 组合时显式指定 UI 实现；初始化后不可切换。
- `superform.initialize({ components })`：官方产品显式初始化入口；未使用构建插件时同时提供 Adapter 已声明字段的实际 UI 组件。
- `superform.registerComponent(s)`：注册消费项目自己的 Schema 组件，不得覆盖 Core 或当前 Adapter 字段。
- `superform-antdv` 与 `superform-element-plus`：官方产品包内置 Core 并重新导出 Core API，但导入时不会初始化 Adapter。
- `fieldComponents`：两个产品包从 `/components` 子路径使用同一名称导出全量字段表，通过 `initialize({ components: fieldComponents })` 快速全量登记；产品根入口不引用该组件表。
- `superform.configure()`：设置 `dictApi`、默认按钮和 `defaultProps` 等 Core 全局行为。
- `defaultProps`：覆盖当前适配器提供的默认值；合并顺序需在 P001 定义并补测试。
- 新版本不保留旧 `components` 底层替换语义，也不增加废弃警告或双路径。

P005 已将项目组件与 Adapter 字段组件分为两套注册入口，并删除旧底层覆盖和 `Ext` 前缀兼容。自动导入组件使用独立的 `auto` 来源注册表。

当前官方 Adapter 的字段支持范围以各自 `FieldName`、字段协议、Schema Props、resolver 和 `/components` 全量表为同一事实集合：

- AntDV：Input 系列、AutoComplete、Cascader、ColorPicker、Select、Radio/Checkbox 系列、日期和时间系列、TreeSelect、Switch、Rate、Mentions、Segmented、Slider、Transfer。
- Element Plus：Input 系列、Autocomplete、Mention、Select/SelectV2、Cascader、TreeSelect、Radio/Checkbox 系列、Switch、日期和时间系列、ColorPicker、Rate、Slider、Segmented、Transfer；Schema 名称统一移除 `El` 前缀。
- Upload 继续使用 Core Upload 领域能力，不作为普通字段重复登记；Tree、Calendar 等非标准值输入不进入字段表。

## P001 已确认决策

- Adapter 采用应用级全局实例，不支持表单级局部覆盖；官方产品通过 `initialize` 显式绑定，第三方组合通过 `useAdapter` 显式传入。
- 默认值合并顺序为 Adapter 默认值在前、用户 `defaultProps` 在后。
- Adapter 首次初始化后锁定；同一 Adapter 实例可重复使用，不同实例会明确报错。
- `globalConfig` 视为应用初始化配置，不为同一 Adapter 的重复安装定义缺省项重置语义。
- Core 只公开 Adapter 定义辅助函数和相关类型；AntDV、Element Plus 分别通过独立 npm 包构建和发布。
- 字段标准状态、默认值索引规则和复杂服务 capability 的最终归属，在实际迁移对应能力时确认；P001 不用假设接口锁死后续设计。`customIcon` 已在 P003 回补中删除，业务图标直接传入组件或节点。
- `locale` 不属于 Core 安装配置；应用在当前 UI 框架的 ConfigProvider 中设置语言。

## P002 已确认决策

- 普通 UI 字段由 Adapter 声明支持、由自动导入或官方产品 `initialize({ components })` 提供实际组件，不进入 Core 字段注册表。手动组件的解析优先级始终高于自动导入。
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
- `SuperList` 和当前 Descriptions 表格/表单模式不是 Core 通用组件，由 AntDV Adapter 私有兼容实现显式提供；Descriptions 直接消费可覆盖的 AntDV 基础组件且不反向依赖公共 Adapter 入口，List 也不进入公共基础组件注册表。
- 单根且语义透明的包装保留 Vue attrs fallthrough；多根、跨层扩散、受控状态冲突或协议转换场景才显式接管。
- ButtonGroup、TagInput、TagSelect 等复合组件优先收缩旧 UI 属性和内部节点透传，再以最小业务视图模型连接 Adapter，不为每个内部原语建立独立扩展面。
- 允许删除升级前缺少明确业务价值的能力和规则；产生用户可见影响时同步更新迁移记录，不额外建立长期兼容层。

## P006 已确认决策

- Service capability 统一承接轻量消息、命令式确认框和可更新信息框；Core 不再调用具体 UI 框架的静态服务。
- Modal capability 使用 `visible/onUpdate:visible` 受控协议，并允许 Adapter 捕获和恢复脱离组件树挂载时所需的 UI 上下文。
- Upload capability 负责实际组件、忽略标记、事件转换和默认触发按钮；文件映射、校验、任务队列、提交等待及延迟删除属于 Core Controller。
- Preview capability 只接收图片列表、当前索引和受控可见状态，不向 Core 暴露 UI 图片组件。
- Upload 专属图标加入 Icon capability 的语义图标集合；Core 不再导入 UI 图标。

## P007 已确认决策

- Table capability 使用明确的表格、列、分页、选择、展开、筛选和 DOM 选择器协议；Core 不再传递或解释具体 UI 表格组件。
- Core 统一使用 `data/selection.selectedKeys/expandedKeys/onExpandedChange`，Adapter 负责转换各 UI 框架的事件和受控状态。
- 表格自动高度依赖的 UI 私有选择器由 Adapter 声明，缺少可选节点时 Core 安全跳过。
- `src/compat` 已完全删除；具体 UI 样式进入对应产品包，Core 样式只保留 `sup-*` 语义 class。
- 官方产品包内置 Core，包导入无 Adapter 初始化副作用；`initialize()` 首次调用创建并锁定 Adapter，重复无参调用幂等，初始化后不得再追加字段组件。

### P003 复合组件精简清单

- ButtonGroup 保留动作、权限、显隐禁用、确认、loading、图标文字模式、数量折叠和下拉业务；删除 `color -> ant-btn-*` 样式规则及根容器重复事件拦截。
- TagInput 保留标签增删、`closable`、`newLabel` 和 `stringifyValue`；删除任意 attrs 向每个 Tag 的复制及 `valueToString` 旧别名。
- TagSelect 保留 options、单多选、`stringifyValue`、`change/check` 和空状态；删除任意 attrs 向每个 CheckableTag 的复制及 `valueToString` 旧别名。
- Collections、Group 不再把同一份 attrs 同时扩散到 Row、section 和嵌套内容；布局或内容配置只使用已有的明确入口，不新增对应的透传属性组。
