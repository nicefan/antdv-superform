# SuperTable 工具栏

状态：已实现，待仓库级回归。

## 目标

将 `antdv-next-admin/src/components/Native/Table` 中 refresh、density、columnSetting 的交互能力纳入 SuperTable，但不复制其组件边界和 Teleport 方案。

- Core 声明 `tableTools?: false | ('refresh' | 'density' | 'columnSetting')[]`。
- refresh 复用 SuperTable `reload()`。
- Core 持有 density、列显隐、顺序和 fixed 偏好，Schema columns 始终是业务来源。
- UI Adapter 只负责工具栏组件和 density 到原生 Table size 的转换。
- 工具栏直接合入现有 title/extra 区域，不建立 `toolbarTarget` 或跨层 DOM 依赖。
- Antdv 与 Element Plus 共用同一 Core 协议。

## 实施

- 新增独立工具栏协议及 `tableToolbar` 固定 UI 渲染入口。
- SuperTable 保存跨子 Table 重建的视图状态；`setColumns()` 后只保留仍存在列的偏好，并按 Schema 顺序纳入新增列。
- Table 构建完成后从 Core 状态派生最终 columns；隐藏、排序和 fixed 不反写 Schema。
- Antdv、Element Plus 各自实现 refresh、density、列设置 UI；density 分别映射为对应原生 size。
- title/extra 与工具栏在 Core 标题布局中直接合成，无 Teleport。
- 工具栏图标复用 Core `builtInIcons` 语义图标，不增加 UI 包图标依赖。
- 增加纯状态回归测试，覆盖列变化、重置、density 和 refresh 委托。

## 验证

- 工作分支已同步到 `next-dev` 的 `b0cfc42b`，保留同期 v-model modifier 改动。
- 已完成最终差异和调用边界静态复核；内部 Table 仅由 SuperTable 创建，`tableViewState` 不新增外部实例化入口。
- 对 `tableTools` 模块增强协议做独立 TypeScript 编译检查，通过。
- 对 Core `tableTools.ts` 做独立 TypeScript 编译及状态运行断言，通过。
- 当前执行环境不能 checkout 仓库并运行依赖命令，仓库也没有 PR 触发的 CI workflow，因此尚未执行仓库级 `pnpm type-check`、`pnpm test` 和两套 UI build；合并前仍需完成这些回归。
