# ADR-0006：Core 与 UI Adapter 独立发包

状态：已接受
日期：2026-09-04

## 背景

ADR-0005 采用单一 npm 包下的 Adapter 子路径。该方案能隔离构建入口，但 Core、AntDV Adapter 和 Element Plus Adapter 仍共享同一个版本与发布周期；同时第三方无法在 `superform/*` 下增加自己的发布入口。

## 决策

- Git 仓库继续使用 pnpm monorepo。
- 根包更名为 `superform`，承载 Core、Adapter 契约与通用自动导入能力。
- 官方 Adapter 分别发布为 `superform-antdv`、`superform-element-plus`。
- Adapter 包通过 peer dependency 共享同一份 `superform`，构建时必须 external，禁止打包第二份 Core。
- Core 契约发生不兼容变化时同步更新两个官方 Adapter；仅 Adapter 实现变化时只发布对应 Adapter 包。
- Adapter 包提供默认按需入口、`/full` 全量字段入口和 `/unplugin` resolver 入口。
- 第三方 Adapter 使用独立 npm 包接入相同契约，不要求修改 Core 包 exports。
- 导入 Adapter 包本身不初始化全局状态；由 `superform.useAdapter()` 显式完成一次性注册。
- `create*Adapter({ components })` 的 `components` 只提供该 Adapter 已声明字段的实际组件；固定 capability 原语由 Adapter 包直接引入。
- `superform.configure()` 只接收全局行为和默认属性；项目自定义 Schema 组件使用 `registerComponent(s)`，不再通过 Vue `app.use()` 初始化。

## 包结构

```text
superform                     Core
superform-antdv               AntDV Adapter
superform-element-plus        Element Plus Adapter
```

推荐按需用法：

```ts
import superform from 'superform'
import { antdvAdapter } from 'superform-antdv'

superform.useAdapter(antdvAdapter)
superform.configure({ defaultProps, dictApi })
superform.registerComponents({ UserSelect })
```

不使用自动导入插件时可直接使用全量入口：

```ts
import { antdvFull } from 'superform-antdv/full'

superform.useAdapter(antdvFull)
```

## 影响

- 用户需要安装 `superform` 与一个 UI Adapter 包。
- Adapter 可以独立版本和发布，UI 框架依赖不再出现在 Core 的长期发布边界中。
- monorepo 需要维护多个 package、构建、声明、测试和发布任务。
- 当前尚未完成的 Upload、Modal、Table compat 仍按 P006/P007 迁移；拆包期间只记录临时依赖，不静默扩大阶段范围。

## 取代关系

本决策取代 ADR-0005 中“具体 Adapter 作为 Core 包子路径发布”的部分；Adapter 独立构建、UI 依赖 external 和包根不聚合具体实现的原则继续有效。
