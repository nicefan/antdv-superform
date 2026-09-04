# UI 适配器升级总计划

状态：活动
当前状态：P002/P003 及审查回补、P004 公共 Schema 类型解耦已完成；P005 待开始
基线分支：`next-dev`

## 全局目标

在保持主要表单、详情、表格、弹窗和上传业务能力的前提下，使 SuperForm Core 不再依赖具体 UI 框架。升级以逻辑清晰、实现简单和长期可维护为优先；没有明确业务价值的历史能力、透传规则和 UI 兼容行为允许删除，并记录为不兼容变化。

## 全局非目标

- 不在单一阶段重写整个组件系统。
- 不在 Adapter 能力就绪前删除 `compat/antdv.ts`。
- 不顺手修复与当前阶段无关的问题。
- 不以首期完整支持第二 UI 框架为目标。
- 移除旧公共 API 时必须记录直接迁移方式，不为此增加过渡接口。

## 精简原则

- 先判断历史能力是否仍有业务价值，再决定删除或适配；不为保留旧行为而默认增加 capability、转换层或 `*Props` 配置。
- 单根且语义透明的 Core 包装允许未声明 attrs 自然落到根 UI 组件；只有多根、跨层扩散、受控状态冲突或确需协议转换时才显式接管。
- Core 只保留稳定业务语义。UI 专属属性、样式和原始事件若无必要直接删除；确需保留时采用最小 Adapter 契约。
- 不把同一份 attrs、slots 或事件重复传给布局、容器和内容组件，也不为每个内部节点建立独立透传入口。
- 删除用户可见能力或规则时同步更新迁移记录和验证用例，不以兼容旧测试为唯一目标。

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
P002 字段组件 ─┬─→ P005 解析/自动导入/Element Plus
  ↓            └─→ P003 容器布局 ─┬─→ P004 公共类型
                              └─→ P006 Upload/Modal/服务
                                      ↓
                                  P007 Table/最终解耦
P004 + P005 + P006 + P007
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

### 审查回补任务（2026-09-03）

- [x] 审计 Select、RadioGroup、CheckboxGroup、TreeSelect 的增强规则，先删除无明确业务价值的历史事件兼容和属性透传。
- [x] 对确认保留的标签同步等业务语义，仅定义最小标准事件输入；UI 事件参数由 Field Adapter 做一次归一化，Core 不解释原始 UI 事件。
- [x] 删除 `optionType` 等无通用价值的 UI 专属属性；只有仍被确认需要的能力才补 Adapter 转换。
- [x] 增加不依赖 AntDV 事件结构的最小 Field Adapter 契约测试。
- [x] 外部 options/search 回调的并发、取消和异常由调用方负责，本阶段不改变其执行语义。

#### 2026-09-03：完成字段精简回补

- 完成：保留有公开用途的 `labelField`，处理器统一输出 `onValueChange`；AntDV Adapter 负责 Select、RadioGroup、CheckboxGroup、TreeSelect 的原始 change 参数转换；删除 RadioGroup 自动注入 `name` 和由 `buttonStyle` 推断 `optionType` 的规则。
- 设计影响：Core 不再解释字段 UI 事件；未增加独立事件 capability，继续复用 Field Adapter 的属性转换入口。
- 兼容性：按钮型 RadioGroup 需显式配置 `attrs.optionType`，依赖 DOM `name` 时需显式配置 `attrs.name`；已更新迁移记录和示例。
- 验证：字段处理器、Adapter 和图标相关测试 3 个文件、23 项通过；类型检查通过；相关 ESLint 0 错误，保留示例文件既有警告。
- 后续：开始 P003 复合组件属性、样式和事件精简。

---

## P003 容器、布局与图标解耦

状态：已完成（审查回补待处理）
依赖：P002

### 目标

拆分 Form/FormItem、Row/Col、Card、Tabs、Collapse、Descriptions、ButtonGroup 等容器的 Core 结构与 UI 渲染协议。

### 非目标

- 不迁移 Upload 和 Table 领域能力。
- 不改变现有 Schema 布局语义。

### 任务

- [x] 定义 Form、FormItem、栅格、空间、容器和图标 capability。
- [x] 将 `Collections.ts` 中 Row/Col/FormItem 的直接渲染迁入 Adapter 边界。
- [x] 保持 `span`、`subSpan`、`block`、`breakAfter`、`gutter` 等布局语义。
- [x] 迁移 Group、Card、Tabs、Collapse、Descriptions、List 系列的 UI 依赖。
- [x] 为按钮图标定义语义名或渲染能力，避免 Core 导入 AntDV 图标。
- [x] 明确 `SuperList` 是 Core 内部组件还是 AntDV Adapter 的兼容实现。

### 验收条件

- [x] Core 容器不直接渲染 AntDV 容器和栅格组件。
- [x] 现有表单布局、详情布局和按钮行为保持一致。
- [x] 内部组件与 Adapter 组件的归属有明确设计记录。

### 进展记录

#### 2026-09-02：完成容器、布局与图标解耦

- 完成：新增 Form、Layout、Container、Action、Presentation 和 Icon capability，迁移 Form/FormItem、栅格、空间、Card、Tabs、Collapse、Descriptions、List、ButtonGroup 及 Core 复合 Tag 字段的 UI 原语。
- 设计影响：受控容器使用 `value/onUpdate:value` 标准状态；`SuperList` 和现有 Descriptions 表格/表单渲染明确作为 AntDV Adapter 兼容实现。
- 兼容性：无用户可见变化。
- 验证：相关测试 7 个文件、35 项通过；类型检查通过；范围内 ESLint 0 错误，保留 17 个既有警告；未执行 build，因当前未进入提交阶段。
- 后续：Upload、Modal/message、Table 和公共类型仍保留对 AntDV 协议的依赖，由 P004、P006 和 P007 继续处理。

#### 2026-09-03：代码审查回补任务

- [x] 盘点 ButtonGroup、TagInput、TagSelect 当前支持的属性、样式、事件和 slot，形成“保留/删除”清单；优先删除仅为旧 UI 透传服务的规则，并将不兼容项写入迁移记录。
- [x] 收缩 Action/Presentation capability：Core 生成最小业务视图模型，Adapter 负责最终渲染；不为 Button、Menu、Dropdown、Tooltip、Tag、CheckableTag 的每个内部节点分别建立复杂转换边界。
- [x] 将 AntDV Descriptions 兼容实现移入 Adapter 私有目录，消除 `adapter -> Descriptions -> adapter` 循环依赖。
- [x] 空图标不要求 Adapter 提供 Icon capability，并补充无图标场景测试。
- [x] 保留 Card、Tabs、Form 等单根透明包装的自然 attrs fallthrough；清理 Collections、Group 等非透明组件中 attrs 向 Row、section 和内容节点的重复扩散，不新增成套 `rowProps/sectionProps/contentProps` API。
- [x] TagInput、TagSelect 不再把通用 `$attrs` 复制到每个 Tag；保留组件自身声明的业务属性，删除无明确用途的内部节点透传，不为每个子节点新增独立 props 入口。
- [x] 清理 ButtonGroup、Collapse、Descriptions、List、TagSelect、labelNode 中残留的 AntDV class/protocol；Core 自有样式改用最少的 `sup-*` 语义 class，AntDV 私有结构随兼容实现进入 Adapter。
- [x] 删除无业务作用的内联视觉样式和冗余事件拦截，例如无链接语义的 `<a>`、根级重复 `click.stop`；布局所必需的动态样式保留。
- [x] ButtonGroup 不再解析单个 UI 原语，统一交给 Action Adapter 按实际分支渲染，简单按钮不再要求 Core 感知 Dropdown、Menu 和 Divider。
- [x] 合并 Field/Container 重复的 model 属性与事件映射逻辑，保持同一转换规则。
- [x] 合并 Layout 组件选择与 `compactSpace` 回退逻辑；不提取只使用一次或仅减少少量行数的 helper。
- [x] 经确认不增加假 Adapter 契约测试；改由 P005 的最小 Element Plus Adapter 和独立 dev 环境进行真实集成验证。

#### 2026-09-03：完成首轮复合组件精简

- 完成：删除 TagInput/TagSelect 向内部 Tag 复制任意 attrs、Tag 字段的 `valueToString` 旧别名、ButtonItem `color -> ant-btn-*` 规则、ButtonGroup 根级重复事件拦截，以及 Collections/Group 的跨层 attrs 扩散；内联视觉样式改为 Core 语义 class。
- 设计影响：透明单根组件继续使用 Vue 自然 fallthrough；非透明复合组件不新增子节点 props 边界，只保留自身声明的业务能力。
- 兼容性：相关内部节点透传、Tag `valueToString` 和按钮 `color` 不再支持，已更新迁移记录和示例。
- 验证：相关测试 6 个文件、35 项通过；类型检查通过；范围内 ESLint 0 错误；未执行 build。
- 后续：继续收缩 Action/Presentation capability，并处理 Descriptions 归属和剩余 AntDV 私有协议。

#### 2026-09-03：完成 Action/Presentation 能力收缩

- 完成：Action 改为 `group/tooltip` 粗粒度渲染协议，Presentation 改为 `tag/checkableTag` 语义渲染协议；ButtonGroup、TagInput、TagSelect、labelNode 和详情 Tag 展示不再解析 AntDV 原语。
- 设计影响：按钮树、下拉 slot、事件拦截及 Tag 的 checked/closable 事件映射统一留在 AntDV Adapter；Core 只组织业务状态与回调。
- 兼容性：移除此前短期公开的 Action/Presentation 组件解析 API；折叠菜单项不再套用按钮 Tooltip 和任意按钮 attrs，已同步迁移记录。
- 验证：Adapter 相关测试覆盖 AntDV 协议映射和最小非 AntDV 粗粒度渲染实现；未执行 build。
- 后续：处理 Descriptions 归属和剩余 AntDV 私有协议，再补 Tabs 及复合组件的最小非 AntDV 渲染测试。

#### 2026-09-03：完成 Descriptions 兼容实现归位

- 完成：将 Descriptions 表格/表单兼容实现移至 `src/adapter/antdv/`，内部布局直接使用 AntDV Adapter 的可覆盖 Row/Col，不再反向调用公共 Adapter。
- 设计影响：Core 的 DetailLayout 只通过 Container capability 请求 Descriptions；AntDV class、表格结构和布局实现均留在 Adapter 私有范围。
- 兼容性：渲染行为和 Schema 协议不变。
- 验证：Adapter 测试 14 项通过；类型检查通过；相关 ESLint 0 错误、0 警告；提交前 build 的 JavaScript 转换完成，声明汇总仍被已记录问题阻塞。
- 后续：清理 Collapse/List 等剩余 AntDV 私有协议，再补 Tabs 及复合组件的最小非 AntDV 渲染测试。

#### 2026-09-03：完成容器私有样式与 List 归位

- 完成：Collapse 标题改用已有 `sup-titlebar/sup-title` 语义样式；List 内容、操作区和按钮分隔线统一使用 `sup-*` class，并删除已经失效的 AntDV List 样式。
- 设计影响：`SuperList/SuperListItem` 移入 AntDV Adapter 私有目录，不再污染公共基础组件注册表；Core List 只通过 Container capability 使用兼容实现。
- 兼容性：依赖 `.ant-list-item-meta`、`.ant-list-item-action`、`.ant-descriptions-header` 或 `.buttons-divider` 修改内部节点样式的代码需要迁移到新的语义 class。
- 验证：相关测试 3 个文件、24 项通过；类型检查通过；相关 ESLint 与差异格式检查通过；提交前 build 的 JavaScript 转换完成，声明汇总仍被已记录问题阻塞。
- 后续：补 Tabs、ButtonGroup、TagInput、TagSelect 的最小非 AntDV Adapter 渲染测试，再处理声明构建阻塞。

---

## P004 公共 Schema 类型解耦

状态：已完成
依赖：P001，建议在 P002/P003 稳定后执行

### 目标

使公开 Schema 类型表达 SuperForm 稳定契约，不再等价于 AntDV Props 类型集合。

### 非目标

- 不承诺一次移除所有 UI 专属 `attrs`。
- 不为所有旧 UI 属性建立兼容类型或迁移层；确认删除的能力只记录替代方式或移除说明。

### 任务

- [x] 启动 P004 前解决当前声明打包失败，并验证 Adapter 新增公开类型可以生成稳定的 d.ts。
- [x] 按 Form、Field、Layout、Modal、Table、Upload 分类当前 AntDV 类型泄漏。
- [x] 提取 Form、FormItem、Row、Col 和 Space 的第一批框架无关稳定 Props。
- [x] 完成 Container 和 Action 的稳定 Props 及 Adapter 类型扩展。
- [x] 完成 Modal、Table 和 Upload 的稳定 Props。
- [x] 设计 UI 专属扩展属性的类型扩展机制。
- [x] 删除 Form、Field 和 Layout 公共 Schema 对旧 AntDV Props 的直接继承和兼容别名。
- [x] 删除剩余公共 Schema 对旧 AntDV Props 的直接继承。
- [x] 更新 `exaTypes.d.ts`、安装配置和生成的组件类型声明。
- [x] 记录每项不兼容类型变化和迁移示例。
- [x] 审查包根导出的 `renderUI*`、`resolveUI*` 等底层运行时函数，只保留 `defineUIAdapter`、`antdvAdapter` 和 Adapter 类型契约。

#### 2026-09-03：启动 P004 并收缩构建插件

- 完成：新增公共 Schema 类型设计，明确 Core 固定容器/增强语义、UI 真实组件名、Adapter 类型目录和 Vite 按需导入的边界。
- 完成：按产品范围只保留 Vite 插件，移除 Rollup、Webpack 插件源码、构建入口和 package exports。
- 设计影响：普通输入默认使用 `value/onUpdate:value`，只有非默认 model 或存在转换时才声明字段协议；类型完整支持不等于运行时完整导入。
- 兼容性：`antdv-superform/unplugin/rollup` 和 `antdv-superform/unplugin/webpack` 不再提供，已同步迁移记录。
- 后续：提取第一批 Form、Field、Layout 稳定 Props，并建立 AntDV UI 类型扩展入口。

#### 2026-09-03：完成 Form、Field 与 Layout 类型分层

- 完成：新增表单与布局稳定 Props；普通 UI 字段改由 `UIFormComponentProps` 生成类型，AntDV Adapter 在私有类型目录中预先声明实际组件 Props 和 Core 增强关系。
- 设计影响：新增 `UIContainerComponentProps`、`UIFormComponentProps` 和 `UIFormComponentOptionExtensions`；类型目录不产生运行时组件导入。
- 兼容性：AntDV Schema 仍有完整字段、表单和布局 Props 提示；不再导出 `ExtInputOption` 和 `ExtTreeOption` 兼容别名，改用 `OptionType['Input']` 和 `OptionType['TreeSelect']`。
- 验证：类型 fixture 通过；相关字段与 Vite 插件测试 2 个文件、11 项通过。
- 后续：继续拆分 Container、Action 类型及安装配置，再处理 Modal、Table 和 Upload。

#### 2026-09-04：收缩 Container、Action 与公开运行时边界

- 完成：Descriptions、Tabs 改用明确容器契约，Button、Tooltip、Dropdown 改由 `UIActionComponentProps` 提供 Adapter Props；安装配置移除未消费的 AntDV `locale` 类型与运行时注入。
- 设计影响：包根只保留 `defineUIAdapter`、`antdvAdapter` 及 Adapter 类型契约；渲染、解析、映射和实例访问函数收为 Core 内部 API。
- 兼容性：Descriptions 不再支持 `labelBgColor/borderColor`，Tabs 根节不再暴露实际未消费的 `attrs/forceRender`；安装时的 `locale` 与包根底层 Adapter 工具函数不再提供。
- 验证：Adapter 与字段回归 2 个文件、22 项通过；类型检查、变更文件 ESLint、完整构建和发布声明测试通过。
- 后续：拆分 Modal、Table 和 Upload 公共类型，完成 P004 声明解耦。

#### 2026-09-04：完成 Modal、Table 与 Upload 公共类型分层

- 完成：抽取三类复杂能力的 Core 稳定 Props，并由 AntDV Adapter 类型目录补充完整 UI Props；`exaTypes.d.ts` 不再直接导入 AntDV 类型。
- 设计影响：本轮只拆分公开类型，不提前修改 P006/P007 的弹窗、上传和表格运行时协议。
- 兼容性：表格动作 `meta` 改回普通业务对象；自定义 Adapter 需声明 Modal、Table、Column、Pagination 和 Upload 的属性映射。
- 验证：类型 fixture、类型检查、完整构建和发布声明测试通过。

### 验收条件

- [x] Core 公共类型不直接 import AntDV 类型。
- [x] AntDV 用户仍能获得适配器专属属性的类型提示。
- [x] 迁移记录覆盖所有用户可见的类型变化。

---

## P005 Schema 解析与自动导入

状态：待开始
依赖：P001、P002

### 目标

实现 ADR-0002 的组件解析顺序，使普通 UI 组件不再进入 Core 注册表。

### 任务

- [ ] 明确定义 `coreTypes`、`enhancedTypes` 和保留类型。
- [ ] 移除或收缩 `allItems` 的混合职责。
- [ ] 为组件来源区分 `core`、`enhanced`、`auto` 和 `custom`，不保留 `legacy` 分支。
- [ ] unplugin 扫描时排除 Core 与增强类型，仅解析普通组件。
- [ ] 调整虚拟模块注册方式，避免把自动导入组件误判为增强组件。
- [ ] 保持动态 Schema 的显式 `types` 配置能力。
- [ ] 直接移除 `configureComponents`、`registerFormComponents`、`registerComponent` 和 `Ext` 前缀等旧注册、解析规则。
- [ ] 建立 Core UI 依赖架构保护测试，以当前未迁移的 Upload、Modal 和 Table 为显式暂时范围。
- [ ] 更新生成的 d.ts 和对应测试。
- [ ] 建立最小 Element Plus Adapter 和独立 dev 环境，覆盖 Form、布局、Input、Switch、Select、Tabs、ButtonGroup、TagInput 和 TagSelect，并验证类型声明与按需导入。
- [ ] 为删除的旧注册和解析规则补充迁移记录。

### 验收条件

- [ ] 解析优先级与 ADR-0002 一致。
- [ ] 自动导入组件只接收标准组件属性，不被注入 `option/model/effectData`。
- [ ] legacy 与 `Ext` 前缀解析已移除，无新旧双路径。
- [ ] 同一份基础 Schema 可在不修改 Core 的前提下切换 AntDV 与 Element Plus Adapter。

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
- [ ] 删除 Upload、Modal、message 和图标已被 Adapter 覆盖的 compat 导出、包装和重复默认值。
- [ ] 补齐 auto/submit/custom/base64/text、单文件与预览行为测试。
- [ ] 记录本阶段直接移除的 UI 专属接口及迁移方式。

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
- [ ] 为最小 Element Plus Adapter 补充简单 Table 能力，记录必须模拟 AntDV 的契约并仅修正真正通用的抽象缺口。
- [ ] 扫描 `src/` 中具体 UI 包、`compat/antdv` 和 `compat/icons` 导入，删除剩余 compat 文件及无调用导出。
- [ ] 收紧架构保护测试，禁止 Core 回流具体 UI 框架的运行时和类型依赖。
- [ ] 补充过期响应、选择、展开、分页和编辑回归测试。
- [ ] 记录 Table 及最终 compat 删除项的迁移方式。

### 验收条件

- [ ] Table Core 不直接 import AntDV 组件或类型。
- [ ] 公开 query/reload/goPage Promise 与分页语义不变。
- [ ] AntDV Adapter 下现有表格行为保持一致。
- [ ] Core 目录不含具体 UI 框架运行时和类型导入，compat 已完全移除。
- [ ] 架构保护测试能阻止具体 UI 依赖回流。
- [ ] Element Plus 下的简单 Table 不需要修改 Core 代码。

---

## P010 发布与迁移

状态：待开始
依赖：P004、P005、P006、P007

### 目标

形成可发布的大版本、完整迁移指南和最终验证记录。

### 任务

- [ ] 汇总 `BREAKING-CHANGES.md`，按用户场景整理迁移步骤。
- [ ] 更新 README、AI_GUIDE 和文档站的公开用法。
- [ ] 确认所有删除的旧 API 均有直接迁移方式，不遗留过渡入口。
- [ ] 运行完整 test、typecheck 和 build。
- [ ] 检查发布产物、exports、peerDependencies 和 d.ts。
- [ ] 完成真实消费项目的升级演练。

### 验收条件

- [ ] 新用法、旧能力移除影响和直接迁移方式均有文档。
- [ ] 完整验证通过，构建产物不包含意外 UI 依赖。
- [ ] `CURRENT.md` 标记工程完成，活动计划归档。
