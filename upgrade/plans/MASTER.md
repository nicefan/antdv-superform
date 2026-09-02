# UI 适配器升级总计划

状态：活动
当前状态：P002 已完成，等待明确指令启动 P003
基线分支：`next-dev`

## 全局目标

在保持现有表单、详情、表格、弹窗和上传业务能力的前提下，使 SuperForm Core 不再依赖具体 UI 框架，并以 AntDV Adapter 保持现有用户行为。

## 全局非目标

- 不在单一阶段重写整个组件系统。
- 不在 Adapter 能力就绪前删除 `compat/antdv.ts`。
- 不顺手修复与当前阶段无关的问题。
- 不以首期完整支持第二 UI 框架为目标。
- 不在未记录迁移方案时删除旧公共 API。

## 进展记录规则

完成一个阶段内任务后，在该阶段末尾的“进展记录”中追加一条简短记录，同时按 `upgrade/README.md` 的职责划分同步更新当前状态、验证、ADR 或迁移文档。

记录只保留以下信息：

- 完成的能力和被替代的旧实现。
- 是否产生设计、架构或兼容性影响。
- 相关验证结论，以及未执行验证的原因。
- 仍存在的临时状态、风险和下一项任务。
- 阶段产生 UI 行为时，对应 Dev 人工验证页面及入口。

统一格式：

```md
### 进展记录

#### YYYY-MM-DD：任务名称

- 完成：本次交付的能力。
- 设计影响：新决策或职责变化；没有则写“无”。
- 兼容性：用户可见变化和兼容方式；没有则写“无用户可见变化”。
- 验证：已执行项目及结果；未执行项目和原因。
- 后续：临时状态、剩余风险和下一项任务。
```

阶段工作简单时直接保留在本文件；只有阶段跨度较大、涉及多个模块或需要多会话协作时，才拆分到 `plans/active/`，不为每个小任务创建独立文件。

## 阶段切换规则

- 完成当前阶段后，不自动实施下一阶段；下一阶段保持“待开始”，直到用户明确要求开始或继续该阶段。
- 阶段完成后新增或调整需求，必须先完成影响分析并取得确认。
- 影响已完成阶段的，在原阶段任务下新增回补子任务，并记录对既有验收和验证的影响。
- 必须先于下一阶段处理的，在下一阶段任务下新增前置子任务，但仍需明确执行指令。
- 属于更后阶段的，只更新对应阶段的任务、依赖或验收条件，不提前编码。

## 阶段依赖

```text
P000 文档基线
  ↓
P001 Adapter 基础
  ↓
P002 字段组件 ──→ P005 自动导入
  ↓                  ↓
P003 容器布局 ──→ P004 公共类型
  ↓                  ↓
P006 Upload/Modal/服务
  ↓
P007 Table
  ↓
P008 compat 清理
  ↓
P009 第二 UI 框架 PoC
  ↓
P010 发布与迁移
```

实际推进时允许在依赖满足后调整 P004/P005 的先后，但必须先更新本计划和 `CURRENT.md`。

---

## P000 工程文档基线

状态：已完成

### 目标

建立不依赖聊天历史的升级工程事实来源。

### 任务

- [x] 建立独立的 `upgrade/` 目录，不占用文档站 `docs/`。
- [x] 记录目标架构、当前依赖矩阵和 Adapter 草案。
- [x] 记录已接受的初始 ADR。
- [x] 建立总计划、当前状态、验证和迁移记录。
- [x] 在 `AGENTS.md` 增加升级工程阅读入口与完成协议。

### 验收条件

- [x] 新会话只读取仓库文档即可知道当前阶段和下一步。
- [x] 现有业务代码未修改。

### 进展记录

#### 2026-09-01：建立升级工程文档基线

- 完成：建立架构、设计、决策、计划、状态、验证和迁移文档，并在 `AGENTS.md` 增加读取入口。
- 设计影响：确定 Core、UIAdapter、自动导入的职责边界，以及 compat 作为迁移桥梁的策略。
- 兼容性：无用户可见变化。
- 验证：完成文档文件清单与 `git diff --check` 检查；未运行测试、lint 或 build，因为未修改业务代码。
- 后续：进入 P001，定义最小 UIAdapter 契约和内置 AntDV Adapter 实现。

---

## P001 UIAdapter 基础接口

状态：已完成
依赖：P000

### 目标

建立可安装的最小 Adapter 契约和 AntDV 实现，为后续逐组件迁移提供稳定入口。

### 非目标

- 不迁移 Upload、Table、Modal 的完整实现。
- 不删除字段包装组件。
- 不调整公开 Schema Props 类型。

### 任务

- [x] 盘点 `plugin.ts`、`components/index.ts`、`globalProps` 与 `compat/antdv.ts` 的职责重叠。
- [x] 定义最小 `UIAdapter`、字段适配、默认值与组件能力类型。
- [x] 创建 AntDV Adapter，并先通过 compat 提供现有组件。
- [x] 明确 Adapter 必须显式安装、初始化后锁定和局部覆盖策略。
- [x] 明确用户 `components`、旧底层组件覆盖和 Adapter components 的兼容边界。
- [x] 将现有 `ComponentModelConfig` 能力纳入 Adapter，保持自定义组件 model 配置兼容。
- [x] 将默认值合并顺序写入设计文档并补测试。
- [x] 更新公共导出，但不提前暴露未稳定的复杂能力。
- [x] 建立独立 Dev 改造验证入口并添加 P001 测试页面。

### 验收条件

- [x] 显式配置 AntDV Adapter 时，现有 AntDV 行为保持一致。
- [x] Core 可以通过 Adapter 契约取得字段组件和默认值。
- [x] 用户自定义 Schema 组件注册仍可工作。
- [x] P001 新增的 Core 文件不直接导入 AntDV。

### 回补子任务：Adapter 初始化后不可切换

- [x] 安装 SuperForm 时要求调用方显式传入 `adapter`，不再隐式使用 AntDV Adapter。
- [x] Adapter 只允许初始化一次；重复使用同一实例可保持幂等，传入不同实例时明确报错。
- [x] 移除公开的 Adapter 切换能力，并为未初始化访问提供明确错误。
- [x] 更新安装示例、ADR、迁移记录和生命周期测试。

### 进展记录

#### 2026-09-01：完成 UIAdapter 基础接口

- 完成：新增最小 UIAdapter/FieldAdapter 契约、内置 AntDV Adapter 实现、字段组件解析入口和安装配置 `adapter`，并将既有 model 协议纳入 Adapter 类型；建立 `/upgrade-dev/index.html` 并添加 P001 人工验证页。
- 设计影响：Adapter 使用应用级全局实例；Adapter 默认值先于用户 `defaultProps` 合并。
- 兼容性：旧组件注册和底层组件覆盖保持可用。
- 验证：Adapter 与组件注册相关测试 2 个文件、6 项通过；`vue-tsc --noEmit` 通过；P001 页面已加入 Dev 入口；未执行 build，因为当前未进入提交阶段。
- 后续：进入 P002，先固定字段兼容行为并完成最终分类，再迁移纯转发字段。

#### 2026-09-01：回补 Adapter 初始化生命周期

- 完成：安装配置改为必须显式传入 Adapter；首次初始化后锁定实例，同一实例允许重复安装，不同实例会明确报错；移除公开切换入口，并为初始化前访问增加错误提示。
- 设计影响：Core 不再隐式选择 AntDV；Adapter 生命周期从可覆盖全局状态收紧为初始化时确定的不可变依赖。
- 兼容性：省略 `adapter` 的安装代码必须迁移；不保留运行时切换兼容。
- 验证：Adapter 生命周期及 P002 相关回归测试通过，类型检查通过；安装示例、ADR、迁移记录和 P001 Dev 页面说明已更新。
- 后续：P001 回补完成，P002 仍保持完成；等待明确指令启动 P003。

---

## P002 表单字段组件清理

状态：已完成
依赖：P001

### 目标

删除没有 SuperForm 语义价值的 UI 包装，把有价值的字段逻辑改为 Core 处理器 + Adapter 渲染。

### 非目标

- 不改 Upload。
- 不改 Table。
- 不改 Form/FormItem 和栅格容器。
- 不进行公共 Schema 类型总清理。

### 任务

- [x] 为字段建立最终分类，并用行为测试固定现有兼容语义。
- [x] 删除 `InputNumber`、`Textarea`、`TimePicker` 的纯 UI 包装。
- [x] UI Schema 类型统一使用实际组件名，不保留 `Textarea`、`DateRange`、`TimeRange`、`Radio`、`Checkbox` 别名。
- [x] `TimeRangePicker` 改为 Adapter 直接解析，并保持通用范围模型能力。
- [x] 建立显式字段处理器管线，并将四类 Picker 绑定到通用 `picker` 处理器。
- [x] 把日期、时间和占位符等 UI 默认值迁入 AntDV Adapter。
- [x] 复用可组合 options 处理能力，覆盖同步、异步、Ref、字典和远程搜索。
- [x] 将 `AutoComplete`、`Select`、`RadioGroup`、`CheckboxGroup`、`TreeSelect` 改为处理器 + Adapter。
- [x] 以 Switch 作为 model/props 转换样板，保持真/假值和标签同步行为。
- [x] 将 Input 的搜索 loading、按钮和 slot 语义与 AntDV 渲染拆开。
- [x] 迁移 `DatePicker`、`DateRangePicker` 的 `disabledDate(effectData)` 到 picker 处理器。
- [x] 确认 `TagInput`、`TagSelect` 的 Core 行为和 UI 原语边界。

### 进展记录

#### 2026-09-01：统一真实组件名并建立 picker 处理器

- 完成：删除 UI 别名与 Picker 专属包装，Schema 改用 `TextArea`、`DateRangePicker`、`TimeRangePicker`、`RadioGroup`、`CheckboxGroup`；四类 Picker 通过 Adapter 显式绑定通用 picker 处理器。
- 设计影响：UI 增强由 `processors` 显式声明，Core 不再通过组件名称后缀猜测 `endField` 行为。
- 兼容性：不保留旧 UI 别名；`Radio`、`Checkbox` 仍表示真实单控件，原分组增强迁移到 `RadioGroup`、`CheckboxGroup`。
- 验证：相关测试 4 个文件、18 项通过；`vue-tsc --noEmit` 通过；新增 P002 Dev 验证页面；未执行 build。
- 后续：继续迁移 options、Select、Switch、RadioGroup、CheckboxGroup、TreeSelect 等增强逻辑。

#### 2026-09-01：完成字段处理器与 Adapter 渲染迁移

- 完成：Input、AutoComplete、Select、RadioGroup、CheckboxGroup、TreeSelect、Switch 的通用逻辑已迁入 Core 处理器，UI 组件、默认属性、model 映射及 Input 特殊渲染归入 AntDV Adapter；删除对应字段包装组件。
- 设计影响：普通 UI 字段不再进入 Core 注册表；增强字段由 Adapter 显式声明处理器。`TagInput`、`TagSelect` 因具有项目自有交互和值转换语义，继续作为 Core 内置复合字段，底层 UI 原语在后续阶段解耦。
- 兼容性：除本阶段已记录的真实组件名调整外，无新增用户可见不兼容变化。
- 验证：字段处理器、Switch、Adapter、字段兼容、表单模型和组件注册相关测试通过；`vue-tsc --noEmit` 通过；P002 Dev 页面已补齐处理器交互；未执行 build。
- 后续：进入 P003，迁移 Form/FormItem、栅格、容器和图标能力。

### 验收条件

- [x] `InputNumber`、`TextArea`、`TimePicker`、`TimeRangePicker` 不再拥有 Core renderer。
- [x] Select、Switch 和范围字段的现有行为测试通过。
- [x] 字段 Core 处理器不导入 AntDV 组件或类型。
- [x] 普通 UI 字段可以由自动导入或 Adapter 映射解析。

---

## P003 容器、布局与图标解耦

状态：待开始
依赖：P002

### 目标

拆分 Form/FormItem、Row/Col、Card、Tabs、Collapse、Descriptions、ButtonGroup 等容器的 Core 结构与 UI 渲染协议。

### 非目标

- 不迁移 Upload 和 Table 领域能力。
- 不改变现有 Schema 布局语义。

### 任务

- [ ] 定义 Form、FormItem、栅格、空间、容器和图标 capability。
- [ ] 将 `Collections.ts` 中 Row/Col/FormItem 的直接渲染迁入 Adapter 边界。
- [ ] 保持 `span`、`subSpan`、`block`、`breakAfter`、`gutter` 等布局语义。
- [ ] 迁移 Group、Card、Tabs、Collapse、Descriptions、List 系列的 UI 依赖。
- [ ] 为按钮图标定义语义名或渲染能力，避免 Core 导入 AntDV 图标。
- [ ] 明确 `SuperList` 是 Core 内部组件还是 AntDV Adapter 的兼容实现。

### 验收条件

- [ ] Core 容器不直接渲染 AntDV 容器和栅格组件。
- [ ] 现有表单布局、详情布局和按钮行为保持一致。
- [ ] 内部组件与 Adapter 组件的归属有明确设计记录。

---

## P004 公共 Schema 类型解耦

状态：待开始
依赖：P001，建议在 P002/P003 稳定后执行

### 目标

使公开 Schema 类型表达 SuperForm 稳定契约，不再等价于 AntDV Props 类型集合。

### 非目标

- 不承诺一次移除所有 UI 专属 `attrs`。
- 不在没有迁移层时破坏现有 TypeScript 用户代码。

### 任务

- [ ] 按 Form、Field、Layout、Modal、Table、Upload 分类当前 AntDV 类型泄漏。
- [ ] 定义框架无关的稳定 Props 子集。
- [ ] 设计 UI 专属扩展属性的类型扩展机制。
- [ ] 为旧 AntDV Props 暴露提供兼容别名或过渡类型。
- [ ] 更新 `exaTypes.d.ts`、安装配置和生成的组件类型声明。
- [ ] 记录每项不兼容类型变化和迁移示例。

### 验收条件

- [ ] Core 公共类型不直接 import AntDV 类型。
- [ ] AntDV 用户仍能获得适配器专属属性的类型提示。
- [ ] 迁移记录覆盖所有用户可见的类型变化。

---

## P005 Schema 解析与自动导入

状态：待开始
依赖：P001、P002

### 目标

实现 ADR-0002 的组件解析顺序，使普通 UI 组件不再进入 Core 注册表。

### 任务

- [ ] 明确定义 `coreTypes`、`enhancedTypes` 和保留类型。
- [ ] 移除或收缩 `allItems` 的混合职责。
- [ ] 为组件来源区分 `core`、`enhanced`、`auto`、`custom`、`legacy`。
- [ ] unplugin 扫描时排除 Core 与增强类型，仅解析普通组件。
- [ ] 调整虚拟模块注册方式，避免把自动导入组件误判为增强组件。
- [ ] 保持动态 Schema 的显式 `types` 配置能力。
- [ ] 更新生成的 d.ts 和对应测试。

### 验收条件

- [ ] 解析优先级与 ADR-0002 一致。
- [ ] 自动导入组件只接收标准组件属性，不被注入 `option/model/effectData`。
- [ ] legacy 与 `Ext` 前缀兼容行为有明确测试和移除计划。

---

## P006 Upload、Modal 与服务能力

状态：待开始
依赖：P001、P003

### 目标

保留 Upload 和弹窗领域能力，同时移除对 AntDV Upload、Modal、message 和图标协议的直接依赖。

### 非目标

- 不因解耦简化或删除上传模式。
- 不改 Table 主体；Table 弹窗接口只建立可复用能力。

### 任务

- [ ] 把 Upload 的值/fileList 转换、校验、任务队列、提交等待和删除流程整理为 Core Controller。
- [ ] 定义 Upload 组件协议、忽略标记、预览、下载和图标能力。
- [ ] 定义 message、confirm、info 的最小服务契约。
- [ ] 迁移 Form 错误提示、按钮确认、Table 编辑消息到统一服务入口。
- [ ] 迁移 `superModal` 的实例、上下文和生命周期协议。
- [ ] 补齐 auto/submit/custom/base64/text、单文件与预览行为测试。

### 验收条件

- [ ] Upload Core 不导入 AntDV Upload、Modal、message 或图标。
- [ ] 所有既有上传模式和提交等待行为保持一致。
- [ ] 弹窗服务返回值和更新/销毁能力由 Adapter 契约表达。

---

## P007 Table Adapter

状态：待开始
依赖：P003、P006

### 目标

分离 Table 的查询、分页、选择、展开、编辑领域逻辑与 AntDV Table 协议。

### 非目标

- 不改变已有 request/query/reload/goPage 语义。
- 不顺手重构与 UI 适配无关的查询流程。

### 任务

- [ ] 定义 Table、分页、选择、展开、列渲染和编辑 capability。
- [ ] 迁移 `rowSelection.selectedRowKeys`、expanded keys 和更新事件映射。
- [ ] 消除嵌套 Ref 需要在 Core 适配 AntDV 的特殊逻辑。
- [ ] 迁移列类型、分页类型和弹窗编辑的 UI 类型依赖。
- [ ] 保持 AbortController、请求编号、分页和 CRUD 刷新约束。
- [ ] 补充过期响应、选择、展开、分页和编辑回归测试。

### 验收条件

- [ ] Table Core 不直接 import AntDV 组件或类型。
- [ ] 公开 query/reload/goPage Promise 与分页语义不变。
- [ ] AntDV Adapter 下现有表格行为保持一致。

---

## P008 compat 与旧接口清理

状态：待开始
依赖：P002 至 P007

### 目标

清理已被 Adapter 覆盖的 compat 导出和过渡接口，确认 Core 的 UI 依赖为零。

### 任务

- [ ] 扫描 `src/` 中 `compat/antdv`、`compat/icons` 和 UI 包导入。
- [ ] 为 Core 增加架构保护测试，禁止直接导入具体 UI 框架。
- [ ] 删除无调用的 compat 导出、包装组件和重复默认值。
- [ ] 评估 `configureComponents`、`registerFormComponents`、`Ext` 前缀等兼容 API。
- [ ] 对保留的旧接口标注兼容期限；对移除项补迁移记录。

### 验收条件

- [ ] Core 目录不含具体 UI 框架运行时和类型导入。
- [ ] compat 只保留有明确兼容原因的最小表面，或已完全移除。
- [ ] 架构保护测试能阻止依赖回流。

---

## P009 第二 UI 框架 PoC

状态：待开始
依赖：P008

### 目标

用最小第二 UI 实现验证 Adapter 抽象，而不是仅把 AntDV API 换了命名空间。

### 范围

至少覆盖：基础 Form/FormItem、Input、Select、Switch、DatePicker、布局容器和一个简单 Table。Upload 与完整 Table 编辑可不纳入 PoC。

### 任务

- [ ] 选择 PoC UI 框架并记录选择理由。
- [ ] 在不修改 Core 的前提下实现最小 Adapter。
- [ ] 记录所有被迫模拟 AntDV 的接口，回看 Adapter 抽象。
- [ ] 仅对确认是通用能力的缺口调整契约。

### 验收条件

- [ ] 同一份基础 Schema 可切换两个 Adapter 运行。
- [ ] 切换 UI 框架不需要修改 Core 代码。
- [ ] PoC 结论和必要的架构修订已记录。

---

## P010 发布与迁移

状态：待开始
依赖：P009

### 目标

形成可发布的大版本、完整迁移指南和最终验证记录。

### 任务

- [ ] 汇总 `BREAKING-CHANGES.md`，按用户场景整理迁移步骤。
- [ ] 更新 README、AI_GUIDE 和文档站的公开用法。
- [ ] 标明旧 API 的兼容期和计划移除版本。
- [ ] 运行完整 test、typecheck 和 build。
- [ ] 检查发布产物、exports、peerDependencies 和 d.ts。
- [ ] 完成真实消费项目的升级演练。

### 验收条件

- [ ] 新旧用法、影响、迁移方式和兼容策略均有文档。
- [ ] 完整验证通过，构建产物不包含意外 UI 依赖。
- [ ] `CURRENT.md` 标记工程完成，活动计划归档。
