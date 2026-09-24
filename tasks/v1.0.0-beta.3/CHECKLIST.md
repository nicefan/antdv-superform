# 待验证及文档清单

- [ ] 人工检查 Element Plus 表格查询表单及 `ignoreRules` 表单：不同 size、嵌套 FormItem 的上下间距均为 6px，普通表单间距不受影响。

- [ ] 人工检查两套 UI 的 Buttons：全局 defaultButtons 和局部覆盖、保存/取消、展开/收起、权限与组禁用、普通下拉、更多菜单及折叠下拉、自定义渲染 tooltip、事件冒泡。
- [ ] 人工检查确认框异步成功、失败重试、取消及销毁后的 pending 恢复。
- [ ] 明确要求同步正式文档后，更新按钮默认配置分层、内置 name、ActionGroup 协议和 dropdown 的 context.value 示例。

- [ ] 人工检查两套 UI 在未设置顶层 `span` 时保留 `colProps.span`，显式设置时由顶层配置覆盖。
- [ ] 人工检查 Element Plus 的 `span/subSpan: 'auto'` 不生成 `el-col-24`，且能占据剩余空间。
- [ ] 人工检查两套 UI 的 `ignoreRules`：必填标记、输入触发及显式校验。
- [ ] 阶段确认并明确要求后，同步必要的正式文档。
