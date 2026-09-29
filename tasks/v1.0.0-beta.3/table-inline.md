# 表格行编辑与相关修复

日期：2026-09-28。状态：已实现，待人工验证。

实施前：行编辑校验范围不完整，草稿仅支持单行；表格高度、分页和公开操作在部分配置或注册时机下行为不一致。

关键变更：

- 行编辑默认支持多行独立草稿、校验和保存；`rowEditor.singleEdit: true` 限制单行。保存校验当前行全部规则，包含未展示和只读字段；查询成功或 `setPageData` 后退出单行编辑，查询失败保留草稿。本地翻页保留草稿。保存结果不依赖后续刷新结果。
- Element Plus 支持 `pagination.placement` 的上下六种位置及 `none`，默认 `bottomEnd`；下方分页与表格间距为 16px。表格标题和操作按钮保持同行。
- 表格高度使用 `maxHeight: number | 'viewport' | 'parent'`、`fixedHeight`、`heightOffset`；未设置 `maxHeight` 时自然布局。数字限定内容区域高度，`heightOffset` 仅用于空间计算模式。运行时可启停高度约束；AntDV 仅在内容超高时启用纵向滚动。
- 异步 Schema 的 `onLoaded` 在加载时读取；`onLoaded` 注册返回注销函数，行编辑订阅在卸载时注销。搜索区 `hidden` 兼容布尔值和函数；卸载时取消待执行查询。`useTable` 操作方法等待内层实例就绪，并返回底层结果或异常；手动 `redoHeight` 可等待完成。

验证：已静态核对调用链和配置透传，差异空白检查通过；未运行测试、类型检查、构建或浏览器验证。后续人工检查见 [CHECKLIST.md](./CHECKLIST.md)。
