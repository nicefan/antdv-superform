# Buttons 协议与默认配置收口

日期：2026-09-24。状态：源码已修改，待人工验证。

- Core 集中内置按钮名称与语义，UI 提供默认外观，业务沿用 `defaultButtons` 扩展；本次不实现语言包。
- 明确 ActionGroup 输入及菜单选择协议，补齐两套 UI 的菜单、折叠、提示与事件行为。
- 修正独立 SuperButtons 参数、配置复用和确认流程。
- 不新增测试，不运行测试或构建；正式文档待明确要求后同步。

## 实施结果

- ~~导出独立名称列表；默认图标及原生风格均放入 UI 的 `ButtonActions`。~~（本阶段调整删除）
- 内置名称为 `add/delete/edit/detail/submit/search/reset/save/cancel/expand`，允许业务自定义名称。默认语义图标已移回 Core，删除 `builtInButtonNames` 及其公开导出，`BuiltInButtonName` 从默认配置推导，UI 仅补充原生外观。
- 配置沿用 Core 默认 → UI 默认 → `defaultButtons` → 宿主配置 → 局部动作；公共原生属性覆盖默认动作属性，局部动作 `attrs` 最后覆盖。权限、组禁用和 pending 仍由 Core 约束。
- `UIActionItem/UIActionMenuItem` 明确内容函数、状态、菜单及点击协议，Adapter 不再解析 effectData。菜单选择传递 `context.value`，第二参数仍为可选宿主动作函数；这是与现有 dropdown 文档示例不同的行为，后续同步文档时须修改示例。
- Element Plus 支持下拉与更多菜单，折叠后的下拉动作保留次级菜单；两套 UI 统一事件隔离、自定义渲染提示及禁用状态。
- 确认服务补充生命周期类型，Element Plus 通过 beforeClose 等待业务动作，失败保留弹窗，关闭释放状态。
- 独立 SuperButtons 补齐菜单、外观、方法参数及对齐处理；修复配置过滤修改原始 Schema、未知宿主方法未包装及组禁用被单按钮覆盖的问题。

已进行源码差异核对；未执行类型检查、测试、构建或浏览器交互验证。
