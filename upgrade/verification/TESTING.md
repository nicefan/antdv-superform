# 升级验证策略

## 执行原则

- 日常阶段只运行与本次变更相关的测试和 lint。
- `build` 仅在用户确认提交、准备提交时执行。
- 单元测试统一放在根目录 `tests/`。
- 每个阶段开始前先补足能固定现有行为的测试，再迁移实现。
- 阶段完成后在 `upgrade-dev/pages/` 添加对应人工验证页面；Dev 页面用于交互冒烟，不能替代自动化测试。

## 架构保护

P008 前逐步建立以下自动检查：

- Core 目录不得导入 `antdv-next` 或 `@antdv-next/icons`。
- Core 目录不得从已标记为 AntDV Adapter 私有的入口导入组件或类型。
- 普通自动导入组件不得接收 `option/model/effectData` 等增强字段私有参数。
- Adapter 之外不得新增 AntDV model、服务或实例 API 名称。

## 行为回归重点

| 模块 | 必须固定的行为 |
| --- | --- |
| Select/options | 同步、异步、Ref、字典、原始值、fieldNames、labelField、约 600ms 远程搜索 |
| Switch | true/false 值、数字值、选项顺序、默认值、标签同步 |
| Date/Time | 默认格式、disabledDate 的 effectData、TimeRangePicker 的 endField 拆分 |
| Form | 初始化模型、动态 dataSource、resetFields、setFieldsValue、校验与错误反馈 |
| Upload | 各上传模式、校验、重复文件、预览、删除、提交等待、单文件 |
| Table | query/reload/goPage、取消过期请求、分页、选择、展开、CRUD 后 reload |
| Auto import | 扫描、动态 types、解析顺序、运行时注册、d.ts 生成、HMR |
| Compatibility | 自定义组件、旧注册 API、默认值覆盖、AntDV Adapter 默认行为 |

## 阶段验证记录

### P000

- 验证类型：文档结构与链接检查。
- 结果：文档已建立；未改业务代码，因此未运行测试、lint 或 build。

### P001

- 执行：`pnpm vitest run tests/adapter.test.ts tests/formComponents.test.ts --threads false --reporter=verbose`。
- 结果：2 个测试文件、6 项测试通过。
- 执行：`pnpm exec vue-tsc --noEmit`。
- 结果：类型检查通过。
- Dev 页面：`/upgrade-dev/index.html#p001-adapter`，覆盖 Adapter 状态、组件别名、model 协议、默认值和现有表单渲染冒烟检查。
- 未执行：build，原因是当前未进入确认提交阶段。
- 剩余风险：字段、容器和复杂服务尚未切换到 Adapter 渲染边界，由 P002、P003、P006 和 P007 分阶段处理。

### P001 回补：Adapter 初始化生命周期

- 执行：`pnpm vitest run tests/adapter.test.ts tests/field-compat.test.ts tests/Switch.test.ts tests/fieldProcessors.test.ts tests/formModel.test.ts tests/formComponents.test.ts --threads false --reporter=verbose`。
- 结果：6 个测试文件、31 项测试通过；覆盖 Adapter 必传、同实例重复安装、禁止切换以及 P002 字段回归。
- 补充执行：新增初始化前访问用例后单独运行 `tests/adapter.test.ts`，7 项测试通过。
- 执行：`pnpm exec vue-tsc --noEmit`。
- 结果：类型检查通过。
- 执行：Adapter 生命周期相关源码、测试和 P001 Dev 页面 ESLint，以及 `git diff --check`。
- 结果：ESLint 0 错误、0 警告；差异格式检查通过。
- 未执行：build，原因是当前未进入确认提交阶段。

### P002：真实组件名与 picker 处理器

- 执行：`pnpm vitest run tests/adapter.test.ts tests/field-compat.test.ts tests/formModel.test.ts tests/formComponents.test.ts --threads false --reporter=verbose`。
- 结果：4 个测试文件、18 项测试通过。
- 执行：`pnpm exec vue-tsc --noEmit`。
- 结果：类型检查通过。
- Dev 页面：`/upgrade-dev/index.html#p002-real-component-names`，覆盖真实 UI 名称、Picker 处理器配置和 `endField` 交互冒烟。
- 未执行：build，原因是当前未进入确认提交阶段。

### P002：字段处理器与 Adapter 渲染迁移

- 执行：`pnpm vitest run tests/adapter.test.ts tests/fieldProcessors.test.ts tests/Switch.test.ts tests/field-compat.test.ts tests/formModel.test.ts tests/formComponents.test.ts --threads false --reporter=verbose`。
- 结果：6 个测试文件、30 项测试通过；覆盖 Input、AutoComplete、Select/options、RadioGroup、CheckboxGroup、TreeSelect、Switch、Picker、Adapter 解析和自定义组件注册。
- 执行：`pnpm exec vue-tsc --noEmit`。
- 结果：类型检查通过。
- 执行：本次改动范围的 ESLint 检查。
- 结果：0 个错误；保留 `src/utils/getViewNode.ts` 中 1 个既有未使用变量警告，本阶段不扩散修改。
- 执行：`git diff --check`。
- 结果：通过。
- Dev 页面：`/upgrade-dev/index.html#p002-real-component-names`，已扩展为完整 P002 人工验证入口。
- 未执行：build，原因是当前未进入确认提交阶段。

### P001/P002 提交前验证

- 执行：`pnpm vitest run tests/adapter.test.ts tests/fieldProcessors.test.ts tests/Switch.test.ts tests/field-compat.test.ts tests/formModel.test.ts tests/formComponents.test.ts --threads false --reporter=dot`。
- 结果：6 个测试文件、32 项测试通过。
- 执行：`pnpm build`。
- 结果：`vue-tsc --noEmit` 通过；Vite 声明打包失败。既有 `compat/antdv.ts` 和 `Table/buildColumns.ts` 的导出推断引用 AntDV 内部不可命名类型，随后 API Extractor 无法跟踪 `WebpackPluginInstance`；该构建链问题不属于 P001/P002 改动，本次未扩大范围修复。

### P003：容器、布局与图标解耦

- 执行：`pnpm vitest run tests/adapter.test.ts tests/formModel.test.ts tests/formComponents.test.ts tests/InputList.test.ts tests/ListGroup.test.ts tests/useIcon.test.ts tests/fieldProcessors.test.ts --threads false --reporter=dot`。
- 结果：7 个测试文件、35 项测试通过；覆盖 capability 解析、Form 实例方法、model/props 映射、语义图标、复合列表和字段回归。
- 执行：`pnpm exec vue-tsc --noEmit`。
- 结果：类型检查通过。
- 执行：P003 改动范围的 ESLint 检查及 `git diff --check`。
- 结果：ESLint 0 个错误；保留 17 个既有未使用变量/断言警告，本阶段不扩散修改；差异格式检查通过。
- Dev 页面：`/upgrade-dev/index.html#p003-containers`，覆盖 Form、栅格、Card、Tabs、Collapse、Descriptions 和 ButtonGroup 图标交互。
- 未执行：build，原因是当前未进入确认提交阶段。

后续阶段完成时，在此追加执行命令、结果和已知限制，不粘贴大段日志。
