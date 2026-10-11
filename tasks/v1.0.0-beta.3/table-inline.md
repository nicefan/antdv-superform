# 表格行编辑与相关修复

日期：2026-09-28。状态：已实现，待人工验证。

实施前：行编辑校验范围不完整，草稿仅支持单行；表格高度、分页和公开操作在部分配置或注册时机下行为不一致。

关键变更：

- 行编辑默认支持多行独立草稿、校验和保存；`rowEditor.singleEdit: true` 限制单行。保存校验当前行全部规则，包含未展示和只读字段；查询成功或 `setPageData` 后退出单行编辑，查询失败保留草稿。本地翻页保留草稿。保存结果不依赖后续刷新结果。
- Element Plus 支持 `pagination.placement` 的上下六种位置及 `none`，默认 `bottomEnd`；下方分页与表格间距为 16px。表格标题和操作按钮保持同行。
- 表格高度使用 `maxHeight: number | 'viewport' | 'parent'`、`fixedHeight`、`heightOffset`；未设置 `maxHeight` 时自然布局。数字限定内容区域高度，`heightOffset` 仅用于空间计算模式。运行时可启停高度约束；AntDV 仅在内容超高时启用纵向滚动。
- 异步 Schema 的 `onLoaded` 在加载时读取；`onLoaded` 注册返回注销函数，行编辑订阅在卸载时注销。搜索区 `hidden` 兼容布尔值和函数；卸载时取消待执行查询。`useTable` 操作方法等待内层实例就绪，并返回底层结果或异常；手动 `redoHeight` 可等待完成。

验证：静态核对及差异空白检查通过。2026-10-11 浏览器辅助验收通过普通行多行独立校验/保存/取消、失败重试及 singleEdit 刷新成功退出；AntDV 树形子行隐藏规则阻止保存。Element Plus 原生展开键转为字符串后，默认及手动展开、子行隐藏规则校验和取消通过。Element Plus 六种分页位置/none、双分页同步及条数切换通过；viewport/parent 响应变化及隐藏表头通过。AntDV 指定最大高度的清除/重启/卸载挂载通过，Element Plus 原生高度用空字符串清除后恢复自然高度，清除/重启/卸载挂载回归通过。其余高度组合、并发及保存与刷新失败边界仍待验收。证据与完整范围见 [测试结果](./validation-2026-10-11.md)，后续见 [CHECKLIST.md](./CHECKLIST.md)。
