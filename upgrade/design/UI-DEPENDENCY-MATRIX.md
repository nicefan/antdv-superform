# 当前 UI 依赖清单与能力矩阵

> 升级已完成，本文保留为历史记录。最终架构统一见 [架构总览](../ARCHITECTURE.md)，后续改造进入 [独立任务](../../tasks/README.md)，人工确认完成后再同步正式文档。

更新时间：2026-09-01
基线分支：`next-dev`
基线提交：`48f7a07`

## 总览

当前运行时依赖已经集中到 `src/compat/antdv.ts` 和 `src/compat/icons.ts`，但 Core 仍通过这些兼容文件依赖 AntDV 的组件、服务、事件协议、实例 API 和公开类型。真正的解耦目标不是替换 import 路径，而是拆除以下五类耦合。

| 类别 | 当前表现 | 主要位置 | 风险 |
| --- | --- | --- | --- |
| 组件 | 组件统一从 `compat/antdv` 取得，但由 Core 直接渲染 | `src/components/**`、`src/superTable/**`、`src/superModal/**` | 中 |
| 图标 | 图标已集中导出，但使用位置仍属于核心实现 | `src/compat/icons.ts`、按钮、上传、查询表单 | 中 |
| 服务 | 直接调用 `message`、`Modal.info/confirm` | Form、Upload、Table 编辑、按钮动作 | 高 |
| 协议 | 默认 AntDV 的 model、事件、实例和嵌套配置结构 | Switch、Form、Table、Upload、Modal | 高 |
| 类型 | 公开 Schema 大量继承 AntDV Props | `src/exaTypes.d.ts`、`src/plugin.ts` | 高 |

## 字段组件初步分类

此表是后续阶段的工作基线；进入具体阶段时仍需阅读实现和测试确认，不得只按表格机械删除文件。

| Schema 类型 | 当前增强价值 | 目标归属 | 主要改造 |
| --- | --- | --- | --- |
| `Text`、`HTML`、`Hidden`、`InfoSlot`、`InputSlot`、`Buttons` | SuperForm 语义 | Core | 保持内置，不进入 UI 自动导入 |
| `InputNumber` | 仅宽度、类型、占位符默认值 | 普通 UI 组件 | 删除包装；默认值由适配器处理或由用户属性决定 |
| `TextArea` | 仅宽度、清除和占位符默认值 | 普通 UI 组件 | 删除旧 `Textarea` 包装；直接解析 AntDV `TextArea` |
| `TimePicker` | 当前无核心增强 | 普通 UI 组件 | 删除包装；`valueFormat` 放入 AntDV 适配器默认值 |
| `TimeRangePicker` | 范围拆分属于通用模型能力 | UI 组件 + picker 处理器 | 使用真实组件名；显式绑定 picker 后处理 `endField` |
| `Input` | 占位符、搜索按钮、异步 loading 和 slot 处理 | Core Enhancer | 输出标准搜索输入状态；由适配器选择 Input/InputSearch 和按钮协议 |
| `AutoComplete` | options 归一化与异步选项 | Core Enhancer | 复用 options enhancer；UI 属性映射交给适配器 |
| `Select` | options、远程搜索、labelField 同步 | Core Enhancer | 保持现有约定；输出标准 options/search/change 状态 |
| `Switch` | 真/假值、标签、默认值和 labelField 同步 | Core Enhancer | Core 输出标准值语义；适配器映射 `checked` 等 AntDV 属性 |
| `RadioGroup`、`CheckboxGroup` | options 和 labelField 同步 | Core Enhancer | 使用真实组件名；Core 处理选项与标签，适配器处理分组和事件参数 |
| `TreeSelect` | 异步树数据和 labelField 同步 | Core Enhancer | Core 处理树数据，适配器转换事件和组件属性 |
| `DatePicker`、`DateRangePicker` | `disabledDate` 需要 `effectData` | UI 组件 + picker 处理器 | picker 包装业务回调；格式默认值归适配器 |
| `Upload` | 上传、预览、校验、提交等待等大量领域能力 | Core Controller | 分离上传状态机与 AntDV Upload/Modal/message 协议 |
| `TagInput`、`TagSelect` | 项目自有交互和值转换能力 | Core 内置复合字段 | P002 确认继续保留；当前仍使用 Adapter 兼容层提供的 Tag/Input 等原语，后续随 UI capability 解耦 |

## 容器和服务矩阵

| 模块 | Core 需要保留 | 适配器需要承接 | 对应阶段 |
| --- | --- | --- | --- |
| Form/FormItem | 模型、规则、提交、重置、错误编排 | 组件、实例方法、错误展示、表单项属性 | P003 |
| Row/Col/Space | Schema 布局语义 | 栅格组件与属性映射 | P003 |
| Card/Tabs/Collapse/Descriptions | 容器结构与子项 | UI 容器组件、slot 和事件协议 | P003 |
| Modal | 弹窗生命周期和表单协作 | 命令式/声明式弹窗能力 | P006 |
| message | 错误或反馈语义 | 具体消息服务 | P006 |
| Upload | 文件领域状态和动作 | UI Upload、预览弹窗、图标、忽略标记 | P006 |
| Table | 查询、分页、选择、编辑、列业务 | Table 组件、选择/展开/分页协议 | P007 |
| icons | 图标的业务语义 | 具体图标组件 | P003/P006/P007 |

## 公共类型耦合

`src/exaTypes.d.ts` 当前直接引入 `FormProps`、`SelectProps`、`TableProps`、`TableColumnType`、`PaginationProps`、`ModalFuncProps`、`RowProps`、`ColProps`、`UploadProps` 等 AntDV 类型，并通过 `attrs`、列、分页和弹窗配置暴露给用户。

P004 必须区分：

- SuperForm 自己保证的稳定字段。
- 适配器可映射的通用字段。
- 只能通过框架扩展口透传的 UI 专属字段。

在此之前，不批量改名或收窄现有公开类型。

## 当前关键兼容行为

以下行为已有项目约束或测试，迁移时必须保持：

- Select 远程搜索约 600ms 尾部节流，并保持现有 options 归一化语义。
- Switch 保持 options、`valueToNumber`、`firstIsChecked`、默认值和标签同步行为。
- `TimeRangePicker` 默认 `HH:mm:ss`，带 `endField` 时拆分开始和结束模型字段。
- Table 的读取请求、取消过期请求、分页和 CRUD 刷新语义保持不变。
- Upload 的上传模式、校验、预览、删除和提交等待能力不能因 UI 解耦而丢失。
