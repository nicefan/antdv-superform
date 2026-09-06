# 当前项目状态

更新时间：2026-09-06

## 当前阶段

P006、P007 已完成基础验证；P010 待确认开始。

## 已完成

- Schema 组件自动导入能力已经存在。
- 已完成 UI 组件、服务、协议和公开类型的初步依赖审计。
- 已确认 Schema 类型只保留 Core 内置语义和 Core 增强语义，普通 UI 组件走自动导入。
- 已确认 UI 组件映射、model/事件转换和 UI 默认值归 Adapter。
- 已建立 `upgrade/` 工程文档体系和总计划。
- 已建立最小 `UIAdapter`、`FieldAdapter` 和内置 AntDV Adapter 实现。
- 独立 Core 与第三方 Adapter 组合时必须调用 `useAdapter`；官方产品包导入无初始化副作用，应用启动时显式调用 `initialize`。
- 已明确默认值按“Adapter 默认值 → 用户 `defaultProps`”合并；项目组件与 Adapter 底层组件职责已经分离。
- `defineUIAdapter` 与 Adapter 类型契约从包根公开导出，具体 Adapter 使用独立子路径。
- 已建立独立 `/upgrade-dev/index.html` 改造验证入口和 P001 Adapter 测试页面；后续产生 UI 行为的阶段需持续添加页面。
- UI Schema 已统一使用真实组件名，不保留 `Textarea`、`DateRange`、`TimeRange` 等非真实名称。
- 已建立显式字段处理器管线，四类 Picker 通过 Adapter 的 `processors: ['picker']` 进入通用包装；`endField` 不再依赖名称后缀判断。
- Input、AutoComplete、Select、RadioGroup、CheckboxGroup、TreeSelect、Switch 的通用行为已迁入 Core 处理器，具体组件、model 映射、默认属性和特殊渲染归 AntDV Adapter。
- 普通 UI 字段及增强字段均已退出 Core 字段注册表；对应旧包装组件已删除。
- options 处理覆盖同步、异步、Ref、字典、原始值、`fieldNames`、标签同步和约 600ms 远程搜索。
- `TagInput`、`TagSelect` 保留为 Core 内置复合字段，底层 Input、Tag、CheckableTag 和 Tooltip 已通过 Adapter capability 解析。
- 已补齐 P002 Dev 验证页面，覆盖真实组件名、范围拆分、options、Switch、TreeSelect 和 Input 搜索渲染。
- 已定义 Form、Layout、Container、Action、Presentation 和 Icon capability，相关受控容器统一使用 `value/onUpdate:value` 状态。
- Form/FormItem、Row/Col/Space、Group、Card、Tabs、Collapse、Descriptions、List 和 ButtonGroup 已迁入 Adapter 渲染边界。
- 按钮、列表和搜索表单的通用图标已改用语义名；`SuperList` 明确归为 AntDV Adapter 兼容实现。
- 已补齐 P003 Dev 验证页面，覆盖表单栅格、Card、Tabs、Collapse、Descriptions 和按钮图标。
- 字段处理器已统一输出标准 `onValueChange`，AntDV 原始 change 参数只在 Adapter 中转换；RadioGroup 不再自动注入 `name` 或推断 `optionType`。
- Field/Container 已共用 model 映射逻辑，Layout 已共用组件选择和回退逻辑；空图标不再要求 Icon capability。
- 已完成首轮复合组件精简：TagInput/TagSelect 不再向内部 Tag 广播 attrs，ButtonGroup 不再生成 AntDV 颜色 class，Collections/Group 不再跨布局层扩散 attrs。
- Action/Presentation 已改为粗粒度语义渲染入口，按钮树、下拉 slot、事件拦截和 Tag 的 UI 事件映射均收回 AntDV Adapter。
- Descriptions 表格/表单兼容实现已移入 AntDV Adapter 私有目录，不再反向依赖公共 Adapter 入口。
- Collapse、List 和按钮分隔线已移除 Core 中残留的 AntDV 私有 class；轻量 List 兼容实现已移入 AntDV Adapter 私有目录。
- 声明构建已恢复：公共导出使用可命名类型，unplugin 子路径指向独立汇总声明，发布声明不再包含 dev/example 扩展或指向未发布 `src/` 的代理入口。
- 已完成公共 Schema 类型分类和扩展机制设计；构建插件按产品范围收缩为仅支持 Vite。
- 已确认 compat 只作为未迁移能力的内部施工依赖，旧类型、注册和解析规则不保留过渡期。
- 原 P008 compat 清理已分别并入 P004–P007；原 P009 验证已并入 P005 Element Plus Adapter 和 P007 简单 Table。
- Form、FormItem、Row、Col 和 Space 已抽取 Core 稳定 Props；AntDV 容器与布局属性由 Adapter 类型目录扩展。
- 普通 UI 字段已改为根据 `UIFormComponentProps` 生成 Schema 类型，AntDV Adapter 预声明支持组件与增强配置，不产生全量运行时导入。
- Descriptions、Tabs 已改用显式容器类型，Button、Tooltip、Dropdown 的 UI Props 已归入 Adapter Action 类型目录。
- Modal、Table、Upload 已抽取 Core 稳定 Props，完整 UI Props 由 AntDV Adapter 类型目录补充；公共 Schema 不再直接导入 AntDV 类型。
- 安装配置已移除未被消费的 `locale`；包根 Adapter 运行时只导出 `defineUIAdapter`，具体 Adapter 使用独立构建子路径。
- Schema 类型已按 Core、增强、项目显式组件和自动导入组件分源解析，旧注册函数、底层组件覆盖和 `Ext` 前缀兼容已移除。
- Vite 自动导入会排除 Core 与增强类型，支持动态 `types`、非默认 model、Adapter 增强名称和多虚拟模块隔离。
- 已在 `packages/superform-element-plus` 建立 Element Plus 最小 Adapter，并提供独立 Schema 与 dev 入口，覆盖 P005 要求的字段、容器、按钮和复合 Tag 能力。
- AntDV 与 Element Plus Adapter 分别通过 `superform-antdv`、`superform-element-plus` 独立构建和发布，Core 不再聚合具体实现。
- Element Plus dev 验证已拆为 `upgrade-dev/element-plus` 独立 package，不再复用根 Vite 插件配置或根 TypeScript 工程。
- 已回补 Adapter 字段边界：固定 UI 原语由 Adapter 直接引入；Input、Select、Rate 等字段只声明支持，实际组件由自动导入或 Adapter 工厂 `components` 注册。
- AntDV 与 Element Plus 均从包根导出 `fieldComponents` 全量字段表，不再提供 `/full` 入口；Element Plus Schema 字段统一移除 `El` 前缀。
- 根包已更名为 `superform`，官方实现拆为 `superform-antdv` 与 `superform-element-plus`，三者位于同一 pnpm monorepo 并独立构建、独立发布。
- 官方产品包内置 Core，业务无需额外安装 Core 或调用 `useAdapter()`，但必须在渲染前调用产品实例 `initialize()`；不依赖 Vue `app.use()`。
- `configure` 只处理全局行为与默认属性，`registerComponent(s)` 只处理项目自定义 Schema 组件；Adapter 的 `components` 只提供已声明字段的运行时组件。
- 自动导入 resolver 已分别移入官方 Adapter 的 `/unplugin`；Core 插件只保留扫描、生成和通用 resolver 能力。
- 两个 example 已成为 workspace 独立 package，分别通过公开包名验证 AntDV 源码联调和 Element Plus 发布产物消费。
- P006 已建立 Service、Modal、Upload 和 Preview capability，两个官方 Adapter 已提供实现。
- Upload 文件映射、校验、上传任务、提交等待和延迟删除已整理为 Core Controller。
- Form、按钮、Table 行内编辑、superModal、Upload 和图片预览已退出 AntDV 服务、Modal、Upload、Image 与图标直接协议。
- Table、分页、选择、展开、筛选和自动高度 DOM 协议已迁入 Table capability，Element Plus example 已加入简单表格。
- Core 已删除全部 compat 和具体 UI 样式；AntDV 专属样式迁入 `superform-antdv`。
- 两个官方产品包构建时打入 Core 并重新导出 Core API；examples 只依赖并导入各自产品包。

## 下一步

等待确认进入 P010，执行完整构建、发布声明检查、迁移指南收敛和真实消费验证。

## 当前临时状态

- `src/compat` 已完全移除。
- `components/index.ts` 仍汇总 Core 容器和复合字段，但项目组件与自动导入组件已经使用独立注册表，不再承担 Adapter 底层覆盖职责。
- 自动导入组件同时可为 Adapter 字段提供运行时实现；Adapter 字段未注册时会明确报错，且不会退回项目组件协议。
- `globalProps` 仍包含 FormItem、Table 等 AntDV 默认值；字段和容器的实际组件渲染已迁入 Adapter。
- Adapter 默认值已经成为 `globalProps` 的初始来源；复杂能力的运行时默认值随 P006/P007 capability 迁移。
- `exaTypes.d.ts` 已清除对 AntDV Props 的直接引用；Adapter 类型目录只产生类型依赖，不触发运行时导入。
- `globalConfig` 按应用初始化配置使用，不增加重复安装时的重置语义。
- 外部 options/search 回调的并发、取消和异常处理仍由调用方负责，不纳入本轮回补。
- Form、Field、Layout、Container、Action、Modal、Table 和 Upload 已完成公共类型分层，生成声明验证通过。
- 本轮回补以逻辑清晰和实现简单为优先，允许删除升级前缺少明确业务价值的能力或规则，不通过增加大量细粒度边界维持表面兼容。

## 重要约束

- 不在 P002 修改 Upload、Table 或公共 Schema 类型。
- 保持根目录 `AGENTS.md` 中已经确认的 Form、Table、Select、TimeRangePicker 等行为约束。

## 后续阶段待确认问题

- Form、Table、Upload 等复杂能力采用统一 `services` 还是独立 capability。
