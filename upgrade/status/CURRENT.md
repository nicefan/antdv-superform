# 当前项目状态

更新时间：2026-09-01

## 当前阶段

P001 Adapter 生命周期回补和 P002 均已完成并通过相关验证。P003 为下一个待启动阶段，尚未获得明确实施指令。

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
- `TagInput`、`TagSelect` 已确认保留为 Core 内置复合字段，其 UI 原语依赖留待后续 capability 解耦。
- 已补齐 P002 Dev 验证页面，覆盖真实组件名、范围拆分、options、Switch、TreeSelect 和 Input 搜索渲染。

## 下一步

等待用户明确要求开始 P003。在此之前只处理已确认的回补任务、升级工程状态维护或后续阶段计划调整，不实施 P003 代码。

P003 获得启动指令后的首个实现任务：

1. 定义 Form、FormItem、栅格、空间、容器和图标 capability。
2. 迁移 `Collections.ts` 中 FormItem、Row、Col 的直接 AntDV 渲染。
3. 固定现有布局行为后，再迁移 Group、Card、Tabs、Collapse、Descriptions 等容器。

## 当前临时状态

- `compat/antdv.ts` 和 `compat/icons.ts` 仍是 Core 实际依赖边界，属于迁移桥梁。
- `components/index.ts` 的容器、Core 复合字段和兼容注册职责仍在同一入口，P005 将继续收缩解析职责。
- `globalProps` 仍包含 FormItem、Table 等 AntDV 默认值；字段默认值已迁入 Adapter。
- Adapter 默认值已经成为 `globalProps` 的初始来源，未迁移容器仍通过 `globalProps` 消费。
- `exaTypes.d.ts` 仍直接暴露大量 AntDV Props 类型。
- Form、Table、Upload、Modal、布局和图标仍直接使用 AntDV 协议。

## 重要约束

- 不在 P002 修改 Upload、Table 或公共 Schema 类型。
- 保持根目录 `AGENTS.md` 中已经确认的 Form、Table、Select、TimeRangePicker 等行为约束。
- `TagInput`、`TagSelect` 仍直接使用 compat 提供的 UI 原语，这是已记录的后续解耦项。

## 后续阶段待确认问题

- 容器和复杂字段的标准状态是否全部统一为 `value/onUpdateValue`，需结合后续 capability 继续确认。
- 旧 `components` 底层覆盖能力的废弃时间。
- UI 专属 Props 类型通过模块扩展、泛型还是独立 Adapter 类型导出。
- Form、Table、Upload 等复杂能力采用统一 `services` 还是独立 capability。
