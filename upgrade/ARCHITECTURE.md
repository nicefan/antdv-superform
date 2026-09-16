# SuperForm UI Adapter 升级架构总览

状态：升级工程已完成并归档
整理日期：2026-09-16
范围：P001–P007、P010；原 P008/P009 已合并到对应能力阶段。

本文将本次升级的最终架构、关键决策和维护边界集中到一个文件，作为后续维护的架构阅读入口。旧设计、ADR、计划和验证记录保留用于追溯，不再作为活动任务清单。

2026-09-16 用户明确确认现有改动与任务完成，并要求回补升级归档。T001–T004 及 InputGroup 修复已纳入当前基线，见[完成归档](./status/ACCEPTED-2026-09-16.md)。后续阶段记录见 [tasks/README.md](../tasks/README.md)，正式文档按用户明确要求同步。

## 1. 总体分层与依赖方向

```text
Schema
  ↓
Core：模型、状态、规则、选项、联动、表单/表格/上传业务流程
  ↓
Core 处理器：输出框架无关的增强字段状态
  ↓
UIAdapter：实际组件、属性、model、事件、slot、实例与服务协议
  ↓
UI Framework：AntDV Next / Element Plus / 第三方实现
```

- Core 只依赖 Vue 和框架无关工具，不直接导入具体 UI 框架、图标库、UI 类型或私有样式。
- Adapter 依赖 Core 契约和具体 UI 框架；Core 不反向引用官方 Adapter 实现。
- Core 保留稳定业务语义，Adapter 负责 UI 协议转换，不为兼容旧 UI 透传建立大量细粒度接口。
- 自动导入负责发现并注册实际组件，不负责解释模型、options 或增强语义。
- 已删除全部 `src/compat`；不恢复过渡桥梁、旧组件覆盖规则或隐式兼容路径。

## 2. 包、入口与初始化

| 包 | 职责 | 主要入口 |
| --- | --- | --- |
| `superform` | 独立 Core、Adapter 契约、SDK、通用自动导入能力 | 根入口、`/sdk`、`/unplugin/vite` |
| `superform-antdv` | 内置 Core 的 AntDV Next 官方产品 | 根入口、`/components`、`/unplugin` |
| `superform-element-plus` | 内置 Core 的 Element Plus 官方产品 | 根入口、`/components`、`/unplugin` |

仓库采用 pnpm monorepo，三个包独立构建、发布。官方产品构建时打入 Core，业务只安装一个产品包以及 Vue、对应 UI 框架，无需另外安装或导入 Core。Vue 与 UI 框架保持 external。同一应用不能混用两个官方产品包的 Core 实例。

官方包导入不会绑定 Adapter。应用在渲染前显式调用产品实例的 `initialize()`；首次调用创建并锁定 Adapter，重复无参调用幂等，初始化后不得切换 Adapter 或追加字段组件。不通过 Vue `app.use()` 初始化。

第三方 Adapter 使用独立 `superform` 的 SDK 和 `defineUIAdapter`，通过 Core 实例的 `useAdapter(adapter)` 显式绑定。Core 根入口不聚合具体 Adapter。

`configure()` 只配置全局行为与默认属性；`registerComponent(s)` 只登记项目自己的 Schema 组件。全局配置按应用初始化配置使用，不引入重复初始化时的隐式重置。

## 3. 组件来源与解析

组件来源分为 Core 固定组件、Adapter 字段、项目显式组件和自动导入组件。Core 固定语义优先；命中 Adapter 已声明字段后使用该字段协议，不能退回项目组件协议。项目组件不能覆盖 Core 或 Adapter 的保留名称。

| 来源 | 实际组件如何提供 | 示例 |
| --- | --- | --- |
| Core 固定容器、特殊类型和复合字段 | Core 实现领域逻辑，底层 UI 经 capability 渲染 | Form、Group、Tabs、Hidden、TagInput、InputList |
| Adapter 固定 UI 原语 | Adapter 直接引入，存入 `components` | FormItem、布局、Button、Tag、Modal 等 |
| Adapter 普通字段及增强字段 | 声明字段协议；运行时组件由自动导入或初始化参数提供 | Input、Select、Switch、Picker、Rate 等 |
| 项目组件 | `registerComponent(s)` 或自动导入 | UserPicker 等业务组件 |

Adapter 工厂的 `components` 参数及官方产品的 `initialize({ components })` 提供的是已声明字段的实际组件，不是任意底层覆盖入口。手动字段组件始终优先于自动导入，与登记先后无关；缺失组件时明确报错。

两个官方产品从 `/components` 导出 `fieldComponents` 全量字段表；产品根入口不引用该表，以免普通导入关联全部输入组件。

Schema 普通字段使用对应 UI 库的组件名，不建立跨框架组件名或 Props 翻译层。Element Plus 采用去掉 `El` 前缀的字段名，由 resolver 映射实际 `El*` 导出。切换 Adapter 不保证整份 Schema 无需修改，普通字段的 attrs、事件及 model 按目标框架编写。

## 4. 字段处理器与默认值

增强由 Adapter 的 `processors` 显式指定，不根据组件名称、后缀或 UI Props 猜测。普通 UI 字段不建立无业务价值的 Core renderer。

- `picker` 处理范围拆分、`endField` 等语义；名称包含 Range 不会自动启用。
- options、标签同步、原始值转换、Switch 等通用逻辑由 Core 处理；UI 专属事件参数由 Adapter 归一化后交给 Core。
- 内部字段类型使用独立 `fieldType`，不与原生 Input 的 `type="number"` 属性混用。
- 普通输入默认使用 `value/onUpdate:value`；`checked`、`modelValue` 等差异由 Adapter 映射。
- 默认值按 Adapter 默认值在前、用户 `defaultProps` 在后合并；UI 默认属性不应重新散落到 Core。
- `TagInput`、`TagSelect` 保留独立增删、选项和序列化语义，其底层 Input、Tag、Tooltip 等经 Adapter 解析。

## 5. Capability 职责

| 能力 | Core 保留的职责 | Adapter 负责的协议 |
| --- | --- | --- |
| Form | 模型、规则、提交编排 | Form/FormItem、validate、validateField、clearValidate |
| Layout | 栅格与空间语义 | row、col、space、可选 compactSpace；缺失时回退 space |
| Container | 子项结构、显隐和受控状态 | Tabs、Collapse、Card 等实际组件、model 与 slot |
| Action | 动作、权限、确认、loading、折叠与显示模式 | group/tooltip 粗粒度渲染，Button、Dropdown、Menu、Divider 及事件转换 |
| Presentation | Tag 与可选标签语义 | tag/checkableTag 渲染及 UI 事件转换 |
| Icon | 内部交互语义名及图标配置调用 | 内部语义名到渲染函数的映射 |
| Service | 消息与确认的业务触发 | 消息、命令式确认和可更新信息框 |
| Modal | 弹窗生命周期与动作编排 | visible/onUpdate:visible、实际弹窗与 UI 上下文恢复 |
| Upload | 文件映射、校验、任务队列、提交等待、延迟删除 | 实际上传组件、忽略标记、事件映射、默认触发内容 |
| Preview | 图片列表、当前索引、可见状态 | 图片预览组件与受控状态转换 |
| Table | 查询、编辑、选择等业务状态及自动高度编排 | 表格、列、分页、选择、展开、筛选和 DOM 选择器协议 |

容器统一输出 `value/onUpdate:value`，Modal 使用 `visible/onUpdate:visible`，再由 Adapter 转为 UI 实际协议。AntDV 的 List 和 Descriptions 兼容实现放在 Adapter 私有目录，不反向依赖公共 Adapter 入口。

单根、语义透明包装允许自然 attrs fallthrough；多根、跨层扩散、受控状态冲突时才显式接管。不把同一份 attrs、slots 或事件重复传到多个内部层级。

业务图标统一为 `() => VNodeChild`，直接作为 icon slot，非 slot 场景调用函数取得节点。不支持字符串注册表或直接传组件对象；不保留 getIconNode/renderUIIcon 包装层。Core 的 builtInIcons 提供 Vue SVG 渲染函数，SDK 导出供 Adapter 复用；七个默认按钮动作内置图标。Icon capability 只保留 semantic 映射。项目不直接依赖图标库，UI 框架自身仍可能传递依赖图标包。

## 6. 公共类型与构建插件

公共 Schema 将 Core 稳定语义、Adapter UI Props 和项目组件 Props 分离，`UniOption` 由类型映射形成可辨识联合。公共类型不直接引用 AntDV Props，也不提供旧 Props 兼容别名。

Adapter 通过 `SuperFormTypeRegistry` 的字段、增强、容器、Action、Modal、Table、Upload 类型目录扩展 UI 属性；项目通过自定义组件类型扩展登记自身 Props。多个 Adapter 的同名字段按来源登记并汇总为联合类型，避免全局接口冲突。

Schema 的 UI `attrs` 使用 Partial，保留属性和值类型提示，允许动态属性、默认值和处理器补齐原生必填 Props。类型声明可以覆盖全部支持字段，但不得触发运行时全量导入。

自动导入仅支持 Vite。Core 插件负责扫描、生成和通用 resolver，官方 resolver 放在各产品的 `/unplugin`。插件跳过无需导入的 Core 类型，导入实际使用的 Adapter 字段，并将业务组件与字段组件分别登记。动态 Schema 通过插件 `types` 补充无法静态发现的类型；保留非默认 model、多虚拟模块隔离和手动组件优先规则。

## 7. 领域行为约束

### 表单

`buildModelsMap(items, data)` 按 Schema 补齐并绑定传入对象，只返回 modelsMap 和 rules。Form 先用内部空 modelData 构建模型，再克隆出 Schema 标准初始对象；随后监听 props.dataSource 或 option.dataSource，对选中的对象整体 unref，支持动态替换并补齐缺失字段。

`resetFields` 遍历已建立的目标模型；`setFieldsValue` 只更新目标中已有且本次传入的字段。`useForm` 只接收 Schema，外部对象经 Schema dataSource 绑定，不恢复第二个 record 参数或内部 setData。

紧凑 InputGroup 通过 Collections 的默认插槽将字段节点直接交给 compactSpace，保持逐项首尾上下文和自动宽度。无 field 的列表模板分组保留规则，绑定行后再使用实际路径；行按钮模型只包含 parent/index，不注册校验路径。

Form 在 exaProvider 提供 validateField(path)，内部复用 formRef 并调用 Adapter 局部校验；挂载前、ignoreRules 或空路径直接返回。InputGroup 深度监听组数据，在视图更新后校验当前路径，校验失败由 FormItem 展示。AntDV Next 使用 validateFields([path])，Element Plus 使用 validateField(path.join('.'))，不调用框架内部 context。

### 表格

`request` 是读取请求的统一入口，合并分页、搜索、动态和临时参数并维护 loading。`query/reload/goPage` 直接请求并返回 Promise：query 回到第一页，reload 保留分页，goPage 更新分页后请求。

`throttleRequest` 仅用于初始化与内部响应式参数同步，采用 300ms 尾部节流，只处理窗口内最后一次触发。新请求取消旧 AbortController，并用递增编号阻止过期响应更新状态；`apis.query` 第二参数为 `{ signal }`，即使接口不消费 signal 也依靠编号丢弃旧响应。

SuperTable 向内部 Table 传 reload，CRUD 从 option.apis 读取接口并在成功后调用 reload，不恢复 query(true)。卸载取消进行中的查询；等待期节流任务暂不取消，修改需确认。

弹窗编辑先等待可选 apis.info，再按当前行、接口结果、resetData 顺序合并；未配置 info 不报错。搜索项引用列名时复制对应列配置，移除 span、disabled、hidden，并设置为可编辑查询字段。

useTable 的异步方法等待实例注册，透传参数、结果和异常；query/reload/goPage 保持公开直接请求语义。Table 删除在源数组按引用或 rowKey 查找，未命中不删除；0 是有效 rowKey。TableEdit 直接绑定源记录，以对象身份复用模型，移动时同步整棵模型树路径。cloneModelsFlat 返回平铺 modelsMap 和共用字段对象的 rootModels，分别用于列查找和路径更新。

### 详情与列表

SuperDetail 监听 schema 整体替换，无 subItems 时清空模型。数据源统一使用 unref(props.dataSource ?? option.dataSource)；setOption 采用相同选择规则，无新数据源时保留现有数据。

InputList 对象行按身份缓存；普通数组按槽位复用，内部增删同步行缓存，无稳定标识时采用现有匹配逻辑。行模型移动只更新已有 propChain，不为无路径按钮补建路径。详情数据与编辑模型均保留原有绑定职责。

### 选项与上传

options 支持扁平对象数组、原始值数组、键值对象、Ref、函数和标准字典结果；不支持 Select 分组选项或 fieldNames.options。原始值本身作为 label/value，valueToNumber 使用数字下标作为兼容 value。fieldNames.label/value 消费后归一化为标准 label/value，表单和详情保持一致。

Select 在 showSearch 开启、options 为函数且无显式 onSearch 时，以约 600ms 节流调用 options(effectData, keyword)。外部回调的并发、取消和异常由调用方负责。dictApi 按公开契约返回标准选项。

上传 auto/submit/custom/base64/text、单文件、预览等既有模式保留；文件任务、提交等待与删除逻辑属于 Core Controller，不随 UI 实现分叉。

## 8. 构建、验证与维护入口

源码主要位于 `src/`；官方实现位于 `packages/superform-antdv` 和 `packages/superform-element-plus`。两个 example 是独立 workspace package，分别承担 AntDV 源码联调及 Element Plus 发布产物消费验证。

三个包发布产物统一输出到 `dist/`，文档 REPL 中间产物使用 `.repl-dist/`，与发布目录分离。产品入口导入自身 CSS；原生 Node ESM 不负责处理 CSS，SSR 需交给构建器。

单元测试统一放在 `tests/`。历史验证覆盖核心业务、Adapter、类型、自动导入、架构依赖、发布声明与真实消费项目；具体执行时间和结果留在归档验证记录，不能视为后续代码已通过验证。

2026-09-16 按用户确认将当前代码与任务完成归档，同步正式文档；本次未新增测试，也未运行测试、类型检查、安装或构建。完成状态不等于验证通过。后续阶段记录需求、变更及建议验证范围，正式文档按明确要求同步。
