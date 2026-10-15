# Table 增强工具栏

日期：2026-10-14。状态：展示职责已移入 UI，类型检查通过，交互待验证。

## 实施前

工具栏状态和标题/Tabs 布局分散在 Core 与 UI，通过独立 tableToolbar、tableFilter 协议拼接。

## 当前实现

- Core 生成业务列、解析标题/按钮/Tabs 内容，向 renderTable 提供 title、extra、headerCell 等 slots、Tabs 状态及刷新回调；tableBody slot 保持行编辑校验宿主的包裹范围。
- 两套 UI 在 renderTable 内组合标题、Tabs、业务操作和工具栏。密度、列显隐、排序、固定及重置由 UI 内部管理，只派生原生 columns，不反写业务列或编辑模型；公共处理及列设置样式位于 packages/shared。
- 删除 tableToolbar、tableFilter 渲染入口及工具栏状态传递类型。表格协议以 tableInstance 标识实例，UI 自行保留列重建前的视图偏好和原生查询重置状态；Core 不保存视图状态或刷新版本。
- AntDV 内置 onResizeColumn 更新 UI 派生列宽；配置 resizable 即可拖动，保留业务事件回调，不反写业务 columns。示例移除手写列宽更新。
- 静态配置使用 attrs.tableTools，动态配置由 dynamicAttrs 返回；false/空数组关闭。表单内 Table 无刷新回调时不显示刷新入口。刷新清除表格排序筛选并回第一页，保留搜索/Tabs 等其他条件；reload 语义不变。

## 验证

Core、AntDV、Element Plus 类型检查通过。本次未修改或运行测试、未构建。迁移前截图不代表当前布局验收，剩余事项见 Checklist。
