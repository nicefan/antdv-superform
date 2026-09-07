# ADR-0005：Adapter 独立构建入口

状态：已被 ADR-0006 取代
日期：2026-09-04

## 背景

包根曾直接导出 AntDV Adapter。新增 Element Plus Adapter 后，如果继续从根入口汇总具体实现，根产物会携带具体 UI 框架依赖，且任一消费者都可能被迫解析并安装并未使用的 UI 库。这与 Core、Adapter 契约和具体 UI 实现分层的目标不一致。

## 决策

- 包根只导出 `defineUIAdapter` 与 Adapter 类型契约，不导出任何具体 Adapter。
- AntDV Adapter 通过 `antdv-superform/adapter/antdv` 发布。
- Element Plus Adapter 通过 `antdv-superform/adapter/element-plus` 发布。
- 两个 Adapter 分别提供 `/full` 子入口，集中导出 Adapter 和全量字段组件注册表；普通入口仍不引入字段组件。
- 两个具体 Adapter 分别作为 Vite library entry 构建，生成独立 JavaScript 与汇总声明。
- 具体 UI 框架依赖保持 external；Element Plus peer dependency 标记为可选，未使用该子路径的消费者无需安装。
- Adapter 实现之间不得相互导入，也不得通过包根形成隐式聚合。

## 影响

- AntDV 用户需要调整具体 Adapter 的导入路径。
- 只使用一个 UI 框架时，不会因为另一个 Adapter 的存在而引入其运行时代码。
- 新增 UI 框架时必须增加明确的 Adapter 子路径、独立构建入口和声明验证。
- 不使用自动导入的用户可从 `/full` 一次导入 Adapter 与 `uiComponents`，代价是字段组件全量进入依赖图。
