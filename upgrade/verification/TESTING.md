# 升级验证策略

## 执行原则

- 日常阶段只运行与本次变更相关的测试和 lint。
- `build` 仅在用户确认提交、准备提交时执行。
- 单元测试统一放在根目录 `tests/`。
- 每个阶段开始前先补足能固定现有行为的测试，再迁移实现。
- 阶段完成后在 `upgrade-dev/pages/` 添加对应人工验证页面；Dev 页面用于交互冒烟，不能替代自动化测试。

## 架构保护

P005–P007 随各能力迁移逐步建立以下自动检查：

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

### P002/P003 精简回补：字段事件、公共映射与首轮复合组件

- 执行：`pnpm vitest run tests/adapter.test.ts tests/fieldProcessors.test.ts tests/useIcon.test.ts --threads false --reporter=dot`。
- 补充执行：`pnpm vitest run tests/adapter.test.ts tests/fieldProcessors.test.ts tests/useIcon.test.ts tests/formModel.test.ts tests/InputList.test.ts tests/ListGroup.test.ts --threads false --reporter=dot`。
- 结果：6 个测试文件、35 项测试通过；覆盖 Core 标准值事件、AntDV change 参数转换、最小非 AntDV Field Adapter、空图标、表单模型和复合列表行为。
- 执行：`pnpm exec vue-tsc --noEmit`。
- 结果：类型检查通过。
- 执行：相关源码、测试和示例 ESLint。
- 结果：变更源码及测试 0 个错误、0 个警告；示例文件保留既有警告。
- 未执行：build，原因是当前未进入提交阶段。

### P003 Action/Presentation 能力收缩

- 执行：`pnpm vitest run tests/adapter.test.ts tests/fieldProcessors.test.ts tests/useIcon.test.ts tests/formModel.test.ts tests/InputList.test.ts tests/ListGroup.test.ts --threads false --reporter=dot`。
- 结果：6 个测试文件、36 项测试通过；新增覆盖 AntDV Action/Presentation 协议映射及最小非 AntDV 粗粒度渲染实现。
- 执行：`pnpm exec vue-tsc --noEmit`。
- 结果：类型检查通过。
- 未执行：build，原因是当前未进入提交阶段。

### P003 Descriptions 兼容实现归位

- 执行：`pnpm vitest run tests/adapter.test.ts --threads false --reporter=dot`。
- 结果：Adapter 测试 14 项通过。
- 执行：`pnpm exec vue-tsc --noEmit`。
- 结果：类型检查通过。
- 执行：Descriptions 及 AntDV Adapter 相关 ESLint、`git diff --check`。
- 结果：0 个错误、0 个警告；差异格式检查通过。
- 提交前执行：`pnpm build`。
- 结果：JavaScript 和样式转换完成，但声明生成仍因已记录的不可命名推断类型及 API Extractor `WebpackPluginInstance` 内部错误而失败；失败产生的临时 `lib` 文件未纳入提交。

### P003 容器私有样式与 List 归位

- 执行：`pnpm vitest run tests/adapter.test.ts tests/InputList.test.ts tests/ListGroup.test.ts --threads false --reporter=dot`。
- 结果：3 个测试文件、24 项测试通过；确认 List 私有实现不再依赖公共基础组件注册表。
- 执行：`pnpm exec vue-tsc --noEmit`。
- 结果：类型检查通过。
- 执行：相关源码与测试 ESLint、`git diff --check`。
- 结果：0 个错误、0 个警告；差异格式检查通过。
- 提交前执行：`pnpm build`。
- 结果：JavaScript 和样式转换完成，但声明生成仍因已记录的不可命名推断类型及 API Extractor `WebpackPluginInstance` 内部错误而失败；失败产生的临时 `lib` 文件未纳入提交。

### P004 前置：声明构建恢复

- 执行：`pnpm vitest run tests/field-compat.test.ts tests/superFormUnplugin.test.ts --threads false --reporter=dot`。
- 结果：2 个测试文件、11 项测试通过。
- 执行：`pnpm build`。
- 结果：源码、样式和四个入口的声明汇总全部成功；unplugin 子路径使用 `lib/vite.d.ts`、`lib/rollup.d.ts`、`lib/webpack.d.ts`。
- 补充检查：发布声明不包含 `node_modules` 推断路径、未发布 `src/` 代理入口或 example 的 `Rate` 类型扩展。
- 补充执行：`pnpm vitest run tests/packageDeclarations.test.ts tests/field-compat.test.ts tests/superFormUnplugin.test.ts --threads false --reporter=dot`。
- 结果：3 个测试文件、13 项测试通过；发布声明回归测试固定了子路径入口与主声明边界。

### P004 启动：仅保留 Vite 插件

- 检查：package exports、构建入口和发布声明只保留 `unplugin/vite`，源码中删除 Rollup、Webpack 插件入口。
- 回归：发布声明测试同步断言 Rollup、Webpack 子路径不再导出。
- 执行：`pnpm vitest run tests/packageDeclarations.test.ts tests/superFormUnplugin.test.ts --threads false --reporter=dot`。
- 结果：2 个测试文件、5 项测试通过。
- 执行：`pnpm exec vue-tsc --noEmit`、相关 ESLint 和 `git diff --check`。
- 结果：均通过。
- 执行：`pnpm build`。
- 结果：完整构建成功，仅生成主入口和 `unplugin/vite` 的 JavaScript、声明及样式产物。

### 计划调整：compat 随能力直接清理

- 检查：`git diff --check`，并检索独立 P008/P009、兼容期和废弃期的残留规则。
- 结果：格式检查通过；旧决策只保留在已取代 ADR 和新 ADR 的历史说明中。
- 执行：`pnpm build`。
- 结果：类型检查、JavaScript、声明和样式构建成功；本轮仅调整文档，未运行业务单测。

### P004：Form、Field 与 Layout 类型分层

- 类型 fixture：`example/schema-types.typecheck.ts` 验证 Core 稳定 Props、AntDV Adapter Props 目录、字段增强合并及明确排除的 Core 属性。
- 执行：`pnpm vitest run tests/packageDeclarations.test.ts tests/field-compat.test.ts tests/superFormUnplugin.test.ts --threads false --reporter=dot`。
- 结果：3 个测试文件、13 项通过。
- 执行：变更文件 ESLint、`pnpm exec vue-tsc --noEmit` 和 `git diff --check`。
- 结果：均通过。
- 执行：`pnpm build`。
- 结果：完整构建成功；汇总声明包含稳定命名类型注册表，不包含指向源码 `exaTypes` 的相对模块扩展。

### P004：Container、Action 与公开运行时边界

- 类型 fixture：补充 Action Props 目录、安装配置、Tabs 子项 attrs 和 Descriptions 已移除属性检查。
- 执行：`pnpm vitest run tests/adapter.test.ts tests/field-compat.test.ts --threads false --reporter=dot`。
- 结果：2 个测试文件、22 项通过。
- 执行：`pnpm exec vue-tsc --noEmit` 和变更文件 ESLint。
- 结果：均通过。
- 执行：`pnpm build` 和 `pnpm vitest run tests/packageDeclarations.test.ts --threads false --reporter=dot`。
- 结果：完整构建成功；发布声明 2 项测试通过，包根不再导出底层 Adapter 运行时函数。

### P004：Modal、Table 与 Upload 类型分层

- 类型 fixture：补充三类 Core 稳定 Props、AntDV Adapter Props 目录，以及表格列、选择、分页、弹窗和上传属性检查。
- 执行：`pnpm exec vue-tsc --noEmit`、变更文件 ESLint 和 `git diff --check`。
- 结果：类型检查和差异格式检查通过；ESLint 0 错误，保留 3 个既有警告。
- 执行：`pnpm build` 和 `pnpm vitest run tests/packageDeclarations.test.ts --threads false --reporter=dot`。
- 结果：完整构建成功，发布声明 2 项测试通过；生成声明不包含 Core 对 AntDV 类型的直接引用或内部源码路径。

后续阶段完成时，在此追加执行命令、结果和已知限制，不粘贴大段日志。

### P005：Schema 解析、自动导入与 Element Plus 最小 Adapter

- 执行：`pnpm exec vue-tsc --noEmit`。
- 结果：类型检查通过，Element Plus 独立 Schema、Adapter 扩展和生成声明均可通过检查。
- 执行：`pnpm vitest run tests/elementPlusAdapter.test.ts tests/formComponents.test.ts tests/superFormUnplugin.test.ts tests/schemaDiagnostics.test.ts tests/uiDependencyArchitecture.test.ts --threads false --reporter=dot`，并在修正 Table 临时范围白名单后单独复核架构测试。
- 结果：5 个文件、17 项测试通过；覆盖内部 Element Plus Adapter、四级来源、保留类型、auto model、d.ts、Ext 移除、动态诊断注册和 Core UI 依赖边界。
- 执行：`pnpm vitest run tests/adapter.test.ts tests/field-compat.test.ts tests/fieldProcessors.test.ts --threads false --reporter=dot`。
- 结果：3 个文件、29 项回归测试通过。
- 人工验证：通过真实浏览器打开 `/upgrade-dev/element-plus/index.html`，确认 Form、布局、ElInput、ElSwitch、ElSelect、按需导入 ElRate、Tabs、ButtonGroup、TagInput 和 TagSelect 正常渲染与切换；Adapter 移入 `src/adapter` 后由用户在 5173 服务复核，页面无报错。
- 执行：P005 范围 ESLint。
- 结果：0 错误、0 警告。
- 未执行：build，原因是当前未进入提交阶段。

### P004/P005 回补：Adapter 独立构建入口

- 检查：包根不再导出具体 Adapter；package exports 与 Vite library entry 分别声明 AntDV、Element Plus 子路径。
- 执行：`pnpm build`。
- 结果：首次构建发现 external 正则误匹配 Element Plus Adapter 入口；收紧为 npm 模块 ID 后重新构建成功，生成 AntDV、Element Plus 独立 JavaScript 与汇总声明。
- 执行：`pnpm vitest run tests/packageDeclarations.test.ts tests/elementPlusAdapter.test.ts tests/formComponents.test.ts tests/superFormUnplugin.test.ts tests/schemaDiagnostics.test.ts tests/uiDependencyArchitecture.test.ts tests/adapter.test.ts tests/field-compat.test.ts --threads false --reporter=dot`。
- 结果：8 个测试文件、41 项测试通过；发布声明、两个 Adapter、组件来源、自动导入、诊断和 UI 依赖边界均通过。

### P005 回补：Element Plus 独立 dev package

- 修改：将 Element Plus 验证的依赖、TypeScript、Vite、自动导入和启动配置移入 `upgrade-dev/element-plus`，并只通过公开 package exports 消费已构建产物。

### P005 回补：Adapter 字段声明与运行时注册分离

- 修改：固定 UI 原语保留在 Adapter 内部直接依赖；字段组件改由自动导入或 Adapter 工厂 `components` 注册，AntDV/Element Plus resolver 覆盖各自字段范围。
- 覆盖：Rate 类型支持、Adapter 字段解析优先级、未注册错误、TagInput 的 Input 依赖和自动生成声明去重。
- 结果：按用户要求只修改，未执行测试、typecheck 或 build。

### P005 回补：全量字段入口与无前缀 Element Plus Schema

- 修改：新增两个 `/full` 发布入口；Element Plus Schema 字段移除 `El` 前缀，并由 resolver 映射实际组件导出。
- 后续验证已完成：全量入口声明与发布路径、同名 Adapter 字段类型合并、Element Plus 自动导入和手动 `components` 注册。
- 结果：按用户要求只修改，未执行测试、typecheck 或 build。
- 隔离：根 Vite 配置移除 Element Plus 验证插件实例，根 TypeScript 工程排除该目录。
- 未执行：按用户要求本轮只修改，未安装独立 package 依赖、未启动服务、未运行测试或 build。

### P005 回补：Core 与官方 Adapter 独立 npm 包

- 执行：`pnpm type-check`，以及两个 Adapter package 的 `vue-tsc --noEmit`。
- 结果：Core、`superform-antdv`、`superform-element-plus` 类型检查通过。
- 执行：`pnpm test`。
- 结果：17 个测试文件、78 项测试全部通过；覆盖 Adapter、字段协议、组件来源、自动导入和三包发布声明。
- 执行：Core、两个 Adapter package 构建，以及 `superform-antdv-example`、`superform-element-plus-example` 构建。
- 结果：五项构建全部通过；两个 Adapter 的 `/full`、`/unplugin` 和声明产物生成成功，两个 example 均完成生产打包。
- 运行验证：在 Codex 可见集成终端分别启动 5173、5174，Vite 均正常 ready，验证后已显式停止；浏览器因用户保存的 localhost 访问策略未做页面级自动检查。
- 已知临时边界：P006/P007 尚未迁移的 Upload、Modal、Table 继续使 Core 内部 compat 保留 AntDV 施工依赖；不属于最终发布边界。
## 2026-09-06 P006 capability 与 Upload Controller

- 已补充 Service、Modal、Upload、Preview capability 的 Adapter 定向断言。
- 已补充 Upload Controller 的字段映射、校验、submit 延迟上传和删除等待用例。
- 按本轮协作要求仅修改代码，尚未执行测试、typecheck 或 build。
- 建议下一步先运行：`pnpm test -- tests/uploadController.test.ts tests/adapter.test.ts tests/elementPlusAdapter.test.ts tests/uiDependencyArchitecture.test.ts`。
- 基础验证结果：上述 4 个测试文件共 23 项通过；Core、AntDV Adapter、Element Plus Adapter 类型检查通过；未执行 build。

## 2026-09-06 P007 Table 与最终 UI 解耦

- 执行：`tests/adapter.test.ts`、`tests/elementPlusAdapter.test.ts`、`tests/uiDependencyArchitecture.test.ts`、`tests/uploadController.test.ts`、`tests/superFormUnplugin.test.ts`，共 32 项通过。
- 执行：`tests/useQuery.test.ts`，4 项通过，确认请求取消、最后响应和分页语义未变化。
- 类型检查：Core、`superform-antdv`、`superform-element-plus` 以及两个 example 均通过。
- 架构检查：Core 源码、样式和发布 peer dependency 均不再包含具体 UI 框架；compat 已删除。
- 按用户要求只做基础验证，未执行 build、生产产物声明检查或浏览器人工验证；这些工作留到 P010 提交准备阶段。

## 2026-09-06 P007 回补：官方产品显式初始化

- 类型检查：Core、`superform-antdv`、`superform-element-plus` 以及两个 example 均通过。
- 定向测试：`adapter.test.ts`、`elementPlusAdapter.test.ts`、`officialProduct.test.ts`、`superFormUnplugin.test.ts` 共 25 项通过。
- 覆盖：导入无 Adapter 初始化副作用、显式初始化与重复调用、官方产品混用拦截、手动组件优先级、Element Plus 无前缀全量组件表，以及 Adapter 字段不重复生成 d.ts。
- 构建修正：官方包的 `/unplugin` 入口将 `unplugin` 和 `node:` 模块保持为 external，避免 Node 代码进入浏览器产物；产品包直接声明 `unplugin` 依赖。
- 声明修正：`fieldComponents` 使用可移植的 `Record<FieldName, Component>` 类型，声明构建同时纳入产品包所内置的 Core 源码。
- 执行：`superform-antdv` 和 `superform-element-plus` 定向 build，均通过；`tests/packageDeclarations.test.ts` 3 项通过。

## 2026-09-06 P007 回补：字段类型与组件属性同名冲突

- 修复：字段处理器使用独立的 `fieldType` 传递 Schema 类型，组件 attrs 中的 `type` 不再覆盖内部字段类型。
- 定向测试：`tests/adapter.test.ts` 16 项通过，覆盖 `Input` 与 `type="number"` 同时传递。
- 类型检查：Core `vue-tsc --noEmit` 通过。
- 运行验证：复用用户已启动的 `http://127.0.0.1:5173/`，浏览器控制台为 0 errors、0 warnings；未重启或停止该服务。
- 未执行 build：本次为运行时回归修复，且尚未进入提交准备阶段。

## 2026-09-08 P007 回补：全量字段组件独立入口

- 修改：AntDV 与 Element Plus 产品包从 `/components` 子路径导出 `fieldComponents`，根入口不再引用全量字段组件模块。
- 发布边界：两个包均新增 `components.js`、`components.d.ts` 构建目标与 package export。
- 验证：按用户要求只修改，未执行测试、类型检查或 build；构建产物和发布声明留待提交前验证。

## 2026-09-08 P005/P007 回补：官方 Adapter 输入组件范围

- 修改：两个官方 Adapter 的字段协议、公开字段名、Schema Props、自动导入 resolver 和全量组件表同步补齐常用值输入组件。
- 边界：Upload 继续由 Core Upload 能力承载；Tree、Calendar、CascaderPanel 等不作为普通表单值字段登记。
- 验证：按用户要求只修改，未执行测试、类型检查或 build。

## 2026-09-08 P010 发布与迁移

- 类型检查：Core、`superform-antdv`、`superform-element-plus`、AntDV example、Element Plus example 五个工程均通过。
- 完整测试：19 个测试文件、90 项测试通过；构建后再次执行声明、自动导入和架构保护 3 个文件、10 项定向测试通过。
- 三包构建：`pnpm run build` 通过，生成 Core 及两个产品包的 JavaScript、CSS 和汇总声明；诊断函数改为直接导入后不再出现跨 chunk 循环依赖警告。
- 真实消费：`pnpm run build:examples` 通过；AntDV example 的生产模式消费正式 package exports，Element Plus example 继续消费发布产物。两者仅有超过 Vite 默认 500 kB 的示例 chunk 体积提示。
- 发布边界：产品根入口不导入字段全量表，`/components` 单独包含 29 个 AntDV、23 个 Element Plus 字段；Core 构建产物不包含具体 UI 框架引用；三个库的共享 chunk 均使用稳定文件名，不生成带 hash 的发布文件。
- npm 清单：Core 与两个产品包 `npm pack --dry-run --json` 均成功；产品包各包含 README、LICENSE、`index`、`components`、`unplugin`、声明和样式，不包含源码或 example。
- 元数据：两个产品包 exports、peerDependencies、repository、license 和 CSS sideEffects 已检查；产品包不声明运行时 `superform` 依赖。
- 运行边界：产品入口包含 CSS import，原生 Node ESM 不处理 CSS；本项目以 Vite 前端消费构建为验收环境，SSR 需由构建器接管 CSS。AntDV 依赖自身也不支持直接由原生 Node ESM 加载全部组件入口。
- 差异检查：`git diff --check` 通过；声明文件仅报告工作区 CRLF/LF 转换提示，无空白错误。
