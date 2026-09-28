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
- 确认服务补充生命周期类型，~~Element Plus 通过 MessageBox.beforeClose 等待业务动作~~（本阶段调整删除，改为受控 Dialog 服务）；失败保留弹窗，关闭释放状态。
- 独立 SuperButtons 补齐菜单、外观、方法参数及对齐处理；修复配置过滤修改原始 Schema、未知宿主方法未包装及组禁用被单按钮覆盖的问题。

已进行源码差异核对；未执行类型检查、测试、构建或浏览器交互验证。

### 图标节点类型修复（2026-09-28）

- 实施前：公开图标类型改为 `VNode` 后，弹窗、Tabs、Collapse 和字段提示仍直接调用图标；该类型也未导入。
- 图标类型统一接受节点、组件和函数；上述渲染入口改用 `toNode()`，按钮及菜单沿用已有的 `toNode()` 转换。已静态核对相关调用点和差异；未运行测试、类型检查或构建。

## 本阶段后续修正

日期：2026-09-25。弹窗服务优化：Element Plus confirm/info 共用实例独立的受控 Dialog，保持现有 handle 接口，支持更新内容、按钮及回调，不再调用全局 MessageBox.close。补齐 maskClosable、keyboard、closable、centered 映射。保留命令式服务回调成功关闭、拒绝保留的行为；未扩展消息 API 或统一上下文协议。交互验证见阶段清单。

日期：2026-09-24。实施前状态：`UIActionItem.loading` 将原生 loading 对象压成布尔值；Element Plus 下拉选择依赖额外事件参数，折叠下拉嵌在非规范菜单结构内；`dropdown` 复用了字段选项类型，默认“更多”文案与文档不符。

- 删除 `UIActionItem.loading`，Adapter 透传 `attrs.loading` 原值；pending 仍用于防重复执行和禁用。
- Element Plus 下拉命令使用单一值参数，点击事件在实际菜单条目上阻止冒泡；溢出菜单扁平渲染为 `ElDropdownItem`，不增加 Core 菜单层级。
- `dropdown` 改用一级同步 `ActionMenuSource`，支持数组、键值对象、Ref 和接收 context 的同步函数；选中值统一从 `context.value` 读取。
- 未配置 `moreLabel` 时使用省略号图标；正式按钮使用文档按本轮明确要求更新。
- 新增两组边界回归测试，共 6 个用例通过；Core、AntDV、Element Plus 类型检查通过。未执行构建。

## 弹窗相关补充记录（2026-09-25）

以下内容从阶段 Checklist 迁入；后续验证及文档更新仍统一维护在 Checklist。

- 弹窗及 Element Plus 服务优化：实施前已确认 useModal 宿主重挂载、afterClose 包装，以及服务 update/destroy 实例隔离问题；本轮保留现有错误通知改动及服务接口，不扩展消息能力。
- 实施结果：useModal 按挂载状态重建并重新连接宿主，关闭回调不写回持久配置，支持本次打开参数决定销毁；Element Plus confirm/info 改用独立受控 Dialog，并补齐组件及服务的关闭属性映射。Element Plus 包 vue-tsc 类型检查通过，未运行测试、构建或浏览器交互验证；正式文档未修改。
- `useModalForm.onSubmitError`：源码已修改并核对差异，待人工验证；覆盖字段校验、提交任务及业务 `onOk` 的异常通知，支持打开参数覆盖。通知失败不替换原始错误，仍由外层保留弹窗并恢复 loading。未运行测试或构建。
