# UI 组件解耦改造记录

## 本阶段目标

第一阶段将 Schema 字段解析与具体 UI 字段列表解耦。用户配置的普通组件名直接对应 `type`，内部只保留对确有数据转换、默认行为或复杂交互需求的组件增强。

本阶段仍使用 Vue renderer，并保留 antdv-next 默认适配器，以保证现有项目平滑迁移；它不是 React 版本，也尚未移除 antdv-next peer dependency。

## 解析顺序

字段渲染按以下顺序处理：

1. `Form`、`Group`、`Tabs`、`InputList` 等核心容器；
2. `Text`、`HTML`、`Buttons`、`InputSlot` 等特殊节点；
3. Input、Select、Upload 等内置增强字段；
4. 安装配置中按名称注册的普通 UI 字段；
5. `registerComponent` 注册的上下文字段及其旧 `Ext*` 别名。

普通字段自动复用 Schema 已有的字段模型、FormItem、校验、动态属性、禁用、隐藏、插槽和表格编辑能力，不需要加入内部字段枚举。

## 兼容策略

- 原有 `components.Input`、`components.Table` 等底层覆盖语义保持不变；
- 未被核心占用的新名称直接注册为字段；
- `registerComponent("UserPicker", ...)` 新增 `UserPicker` 直接名称；
- 已有 `ExtUserPicker` 继续工作，后续版本再评估移除周期；
- 内置增强字段的公开 Schema 和数据转换行为不变。

## TypeScript 策略

组件注册发生在运行时，Schema 类型检查发生在编译期，因此使用可扩展的 `CustomFormComponentProps` 接口连接二者。应用通过模块扩展声明组件 Props，`attrs` 即可获得对应类型，而核心不需要依赖 Rate 等组件的具体类型。

## 后续跨框架边界

React 支持需要继续抽离 schema 标准化、字段路径、初始模型、规则描述、options 归一化和增强器协议。Vue 的 Ref、watch、VNode、provide/inject 及组件渲染应留在 Vue renderer；React renderer 使用同一份框架无关 schema 核心重新实现状态和视图绑定。

在上述核心真正独立前，不应把当前 Vue 组件注册表直接复用为 React 组件注册表。

## 自动导入补充

在字段注册表之上增加了独立的 `unplugin-superform-components`。它负责构建期 Schema 扫描、resolver 解析、虚拟注册模块注入及 `CustomFormComponentProps` 声明生成；运行时核心仍只接收普通组件注册表，不依赖具体构建器。

该插件提供 Vite、Rollup 和 Webpack 入口。自动导入属于 Vue 构建适配能力，不进入未来的框架无关 schema 核心。

## 开发页回归记录

第一阶段完成后，已在 Vite 开发服务中逐一验证全部示例页签：弹窗、超级表单、一体表格、详情描述、无 `rowKey` 表格和 InputList 校验。

回归过程中补充了以下兼容处理：

- 表格选择配置在传入底层 Table 前解包 `selectedRowKeys`，避免嵌套 `Ref` 被当作可迭代数组处理；
- Modal 封装改用 `open` / `update:open` 协议，并兼容新版 FormItem 不再暴露 `onFieldChange` 的情况。
- 对详情模型和表格公开实例先建立 reactive 包装再调用 `toRefs`，避免 Vue 3.5 对普通对象发出警告。

验证覆盖表格赋值、外部选中和分页，弹窗打开关闭，自动导入 Rate 的赋值和重置，详情异步数据，无 `rowKey` 的反转、选择和新增，以及 InputList 的失败、成功校验流程；各页签均无控制台 error 和 warning。
