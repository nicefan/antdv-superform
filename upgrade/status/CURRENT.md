# 当前项目状态

更新时间：2026-09-03

## 当前阶段

P001 Adapter 生命周期回补及 P002/P003 主任务均已完成。P002 字段精简、P003 首轮复合组件精简及 Action/Presentation 能力收缩已经完成；P004 尚未获得明确实施指令。

## 已完成

- 当前代码已把 AntDV 运行时导入集中到 `src/compat/antdv.ts`，图标集中到 `src/compat/icons.ts`。
- Schema 组件自动导入能力已经存在。
- 已完成 UI 组件、服务、协议和公开类型的初步依赖审计。
- 已确认 Schema 类型只保留 Core 内置语义和 Core 增强语义，普通 UI 组件走自动导入。
- 已确认 UI 组件映射、model/事件转换和 UI 默认值归 Adapter。
- 已建立 `upgrade/` 工程文档体系和 P000-P010 总计划。
- 已建立最小 `UIAdapter`、`FieldAdapter` 和内置 AntDV Adapter 实现。
- 安装 SuperForm 时必须显式传入应用级 Adapter；首次初始化后锁定，不允许切换为其他实例。
- 已明确默认值按“Adapter 默认值 → 用户 `defaultProps`”合并，并保持旧组件注册入口兼容。
- Adapter、字段解析入口和相关类型已从包根公开导出。
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

## 下一步

继续 P003 精简回补：清理 Collapse/List 等剩余 AntDV 私有协议，再补 Tabs 及复合组件的最小非 AntDV 契约测试。完成后解决声明构建阻塞，再等待用户明确要求开始 P004。

## 当前临时状态

- `compat/antdv.ts` 和 `compat/icons.ts` 仍为 Adapter 及未迁移复杂能力提供迁移桥梁。
- `components/index.ts` 的容器、Core 复合字段和兼容注册职责仍在同一入口，P005 将继续收缩解析职责。
- `globalProps` 仍包含 FormItem、Table 等 AntDV 默认值；字段和容器的实际组件渲染已迁入 Adapter。
- Adapter 默认值已经成为 `globalProps` 的初始来源，默认值类型解耦留待 P004。
- `exaTypes.d.ts` 仍直接暴露大量 AntDV Props 类型。
- Table、Upload、Modal、message 和预览 Image 仍直接使用 AntDV 协议，分别留待 P006/P007。
- `globalConfig` 按应用初始化配置使用，不增加重复安装时的重置语义。
- 外部 options/search 回调的并发、取消和异常处理仍由调用方负责，不纳入本轮回补。
- 当前声明打包仍存在已记录的不可命名类型问题，需作为 P004 启动前置处理。
- 本轮回补以逻辑清晰和实现简单为优先，允许删除升级前缺少明确业务价值的能力或规则，不通过增加大量细粒度边界维持表面兼容。

## 重要约束

- 不在 P002 修改 Upload、Table 或公共 Schema 类型。
- 保持根目录 `AGENTS.md` 中已经确认的 Form、Table、Select、TimeRangePicker 等行为约束。
- Upload 领域图标仍直接使用 compat，由 P006 随上传协议一并迁移。

## 后续阶段待确认问题

- 旧 `components` 底层覆盖能力的废弃时间。
- UI 专属 Props 类型通过模块扩展、泛型还是独立 Adapter 类型导出。
- Form、Table、Upload 等复杂能力采用统一 `services` 还是独立 capability。
