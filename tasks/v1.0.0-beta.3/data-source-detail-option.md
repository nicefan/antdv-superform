# 数据源入口、分区样式与表格详情配置

日期：2026-10-10。状态：已实现，待人工验证。

## 实施前

`useTable`、`useDetail` 既接收 Schema.dataSource，又提供第二参数传入数据。表单、详情和独立表格通过 `isContainer` 开启分区样式。表格详情的 `descriptionsProps` 只配置展示属性和弹窗属性，字段固定复用表格列模型。

## 关键变更

- AntDV 自定义详情结构补齐 antdv-next Descriptions 样式注册、哈希及主题变量类，`middle` 映射原生 `medium` 类，修复表格模式缺少原生边框、间距和背景的问题。
- Element Plus 补齐 `mode: 'form'` 的栅格布局及只读输入框外观，消费 `labelCol`、`wrapperCol`、`noInput` 和纵向布局配置；普通及表格模式保持原生 Descriptions。共享详情示例可切换三种模式，静态模式配置通过 key 重建实例。
- `useTable(option)`、`useDetail(option)` 移除第二参数，初始数据统一使用 `option.dataSource`，保留对象、同步函数和异步函数的 Schema 入口及组件 dataSource。现有 `setData` 动作保留，`useDetail` 注册前设置的数据仍暂存至注册。
- `isContainer` 更名为 `useSectionStyle`，同步表单、详情、独立表格的 Schema 类型、组件属性和内部读取，保持现有 `sup-container` 样式及容器包装行为，不保留旧名称兼容。
- 表格配置改为 `detailOption?: ExtDescriptionsOption & { modalProps?: ExtModalProps }`，不再读取表格级 `descriptionsProps`。显式详情配置通过 SuperDetail 渲染自己的 subItems、title、buttons、mode、attrs 和布局；详情根级 mode 作为默认展示模式，attrs.mode 可覆盖。未配置 detailOption 时沿用表格列模型及原详情渲染。
- 详情数据由当前记录和 `apis.info` 合并结果提供，优先于 detailOption.dataSource；保留表格详情插槽上下文。弹窗配置按全局 Modal、表格 modalProps、detailOption.modalProps 合并，本次打开参数继续覆盖。
- 迁移关联示例的数据源和样式名称；共享成员表通过 detailOption 展示独立字段范围、标题、布局与弹窗宽度。其他字段、分组及列表的 descriptionsProps 保留。
- 文档站的表单、详情、表格及 Descriptions 手册与 API 索引同步当前参数和名称，补充 detailOption 完整类型、必填 subItems、详情数据优先级及弹窗配置。详情示例演示 Schema.dataSource 的 Ref 替换与 setData，数组表格示例演示独立详情字段及弹窗；两套本地容器演示增加分区样式开关。

## 验证

2026-10-14：AntDV 详情样式注册修复后产品类型检查通过；未运行测试或构建，表格边框、主题及模式切换的页面效果待人工确认。

2026-10-14：Element Plus 表单式详情补齐后产品类型检查通过；未运行测试或构建，三种模式切换、标签/内容列及 noInput 的页面效果待人工确认。

静态核对及两套产品构建通过。2026-10-11 浏览器验收通过对象/同步/异步初始数据、已注册详情/表格 Ref 替换及 setData，默认/独立详情字段、记录与 API 数据优先级、销毁后切换记录及分区样式开关。已修复异步 useDetail 注册前及加载期间 setData 被 Schema 初值覆盖：等待 Schema 监听后恢复最新写入，双 UI 浏览器及两项注册回归单测通过。详情插槽、全部布局与打开配置优先级等仍待验收；在线 REPL 未重建。完整范围与证据见 [测试结果](./validation-2026-10-11.md)。
