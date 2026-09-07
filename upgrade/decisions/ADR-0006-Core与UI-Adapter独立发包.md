# ADR-0006：Core 与 UI Adapter 独立发包

状态：已接受
日期：2026-09-04
修订：2026-09-08

## 背景

ADR-0005 采用单一 npm 包下的 Adapter 子路径。该方案能隔离构建入口，但 Core、AntDV Adapter 和 Element Plus Adapter 仍共享同一个版本与发布周期；同时第三方无法在 `superform/*` 下增加自己的发布入口。

## 决策

- Git 仓库继续使用 pnpm monorepo。
- 根包更名为 `superform`，承载 Core、Adapter 契约与通用自动导入能力。
- 官方产品包分别发布为 `superform-antdv`、`superform-element-plus`，各自打包一份 Core，但导入入口不会自动初始化 Adapter。
- 应用只需安装并导入一个官方产品包，不再额外安装、导入 `superform` 或调用 `useAdapter()`；应用启动时显式调用产品实例的 `initialize()`。
- `superform` 仍作为独立 Core/SDK 发布，供第三方 Adapter 开发与非官方组合使用；官方产品包构建时复用其源码，但不把它声明为运行时 peer dependency。
- Core 契约发生不兼容变化时同步更新两个官方 Adapter；仅 Adapter 实现变化时只发布对应 Adapter 包。
- Adapter 包提供产品入口、`/components` 全量字段入口和 `/unplugin` resolver 入口；包根不再导出 `fieldComponents`，避免普通产品导入关联全量字段组件。
- 第三方 Adapter 使用独立 npm 包接入相同契约，不要求修改 Core 包 exports。
- 官方产品包导入与 Adapter 工厂、SDK 入口都保持无初始化副作用；同一应用不得初始化两个官方产品包。
- `initialize({ components })` 只提供该 Adapter 已声明字段的实际组件；固定 capability 原语由 Adapter 包直接引入。手动提供的字段组件优先级始终高于自动导入组件，不受两者执行顺序影响。
- `initialize()` 首次调用时创建并锁定 Adapter；重复无参调用可安全复用，初始化后不得再追加字段组件。
- `superform.configure()` 只接收全局行为和默认属性；项目自定义 Schema 组件使用 `registerComponent(s)`，不再通过 Vue `app.use()` 初始化。

## 包结构

```text
superform                     Core
superform-antdv               AntDV Adapter
superform-element-plus        Element Plus Adapter
```

推荐按需用法：

```ts
import superform from 'superform-antdv'

superform.initialize()
superform.configure({ defaultProps, dictApi })
superform.registerComponents({ UserSelect })
```

不使用自动导入插件时，可传入指定字段组件，或使用 `/components` 提供的全量组件表：

```ts
import superform from 'superform-antdv'
import { fieldComponents } from 'superform-antdv/components'

superform.initialize({ components: fieldComponents })
```

## 影响

- 官方 UI 用户只需安装一个产品包；每个产品包包含自己的 Core 实例，因此不能在同一应用中混用。
- 第三方 Adapter 仍依赖独立的 `superform` Core/SDK，并自行决定是否提供类似的产品聚合包。
- Adapter 可以独立版本和发布，UI 框架依赖不再出现在 Core 的长期发布边界中。
- 全量字段组件入口与产品根入口分离；未导入 `/components` 时，不需要依赖消费端 tree-shaking 来移除该组件表。
- monorepo 需要维护多个 package、构建、声明、测试和发布任务。
- P006/P007 已完成 Upload、Modal、Table capability 迁移并删除全部 compat，官方产品包具备打入纯 Core 的边界。

## 取代关系

本决策取代 ADR-0005 中“具体 Adapter 作为 Core 包子路径发布”的部分；Adapter 独立构建、UI 依赖 external 和包根不聚合具体实现的原则继续有效。
