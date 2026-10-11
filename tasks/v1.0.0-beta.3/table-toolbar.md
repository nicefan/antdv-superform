# SuperTable 工具栏

日期：2026-10-11。状态：已整合到 next-dev，手册已同步；验证结果见下文。

## 实施前

独立表格没有统一的刷新、密度或列设置入口。work/table-toolbar 新增 Core 视图状态和双 UI 工具栏，但审查与仓库回归发现生产声明、固定列响应性、触发节点和表单内 Table 兼容问题。

## 关键变更

- tableTools 按需启用 refresh、density、columnSetting，未配置、false 或空数组关闭；应用默认值位于 defaultProps.SuperTable，根 Schema 优先于 attrs 与组件属性。
- refresh 复用 reload；Core 保存 density、顶层列显隐、排序及 fixed 偏好，Adapter 映射原生 size 并渲染 tableToolbar。工具合入 title/extra/tabs，不引入 Teleport 或 DOM 宿主依赖。
- setColumns 保留仍存在列的偏好，删除列清理状态，新增列按 Schema 顺序追加且默认可见；重置恢复当前 Schema 列，不重置密度。不反写业务列，也不持久化到存储。
- 将 Schema 属性与 Adapter 协议直接声明在原类型中，工具栏协议集中在 adapter/types.ts 并从产品入口及 SDK 导出；避免模块增强阻塞生产声明打包，以及产品汇总声明引用未发布的相对模块。
- 固定状态存在性检查改用响应式 in 操作，保证首次设置 fixed 能更新派生列及工具栏。原写法 hasOwnProperty.call 未跟踪新键，纯状态测试能通过但 UI 未更新；新增 computed 回归验证。
- Dropdown/Popover 使用直接按钮触发节点，保留原生标题提示；修复 AntDV 提示浮层遮挡菜单及 Element Plus 包装节点未转发触发监听的问题。
- 工具栏按当前配置动态渲染，避免初始化时关闭后无法启用；保留列的响应式包装。表单内 Table 通过默认的实例视图状态兼容旧调用路径，不要求新增外部参数。
- 正式手册补充配置、覆盖顺序、列键、分组列、重置与实例生命周期；API 索引、AI_GUIDE 和架构总览同步。

## 验证

- 全量 Vitest：21 文件、63 用例通过；工具栏 6 项覆盖列增删、重置、Schema 不变、密度保留、reload 委托与首次固定状态的响应性。
- Chromium 双 UI 浏览器 22 项通过：标题/extra 共存、刷新、密度映射、列显隐、固定、排序、setColumns、重置、动态启停、setOption 更新以及表单内 Table。排序通过实际组件的原生 drag/drop 事件回调验证，未替代真实鼠标拖拽人工验收。Element Plus 固定区域会影响最终列位置，独立排序检查先取消固定。
- docs:check-types 通过：218 个公开属性、17 个既有未公开属性；两套示例 vue-tsc 通过；git diff --check 通过。
- Core、AntDV、Element Plus 的类型检查及生产构建通过；三套生产声明 strict 消费检查通过，包含工具类型、RootTableOption.tableTools、attrs.tableTools、全局默认值及非法工具的类型拒绝。生产产品声明不再引用 tableToolbarProtocol 相对文件。

日志、消费样本、浏览器脚本及截图保存在 /workspace/test-results/antdv-superform/toolbar-*.log、toolbar-consumer-types/ 与 toolbar-browser/。复跑需将消费样本及浏览器夹具恢复到仓库原临时路径；浏览器启动两套示例的 5173/5174，工作区绝对路径随环境调整。临时夹具不进入仓库。分组列、行编辑、Tabs、自动高度及真实拖拽/键盘组合验收保留在 Checklist；未执行文档站整体构建或 build:repl。
