# SuperForm UI Adapter 架构总览

维护日期：2026-09-23。本文描述当前源码架构；升级过程见[归档](./status/ACCEPTED-2026-09-16.md)，当前工作与验证结果见[任务记录](../tasks/README.md)。

## 1. 分层与入口

Schema → Core 模型、联动、校验、查询与编辑流程 → UI Adapter 属性、渲染和服务 → UI 框架。

Core 不引用具体 UI 框架、图标包或组件 CSS。`superform` 提供独立 Core 和 `/sdk`、`/unplugin/vite`；`superform-antdv`、`superform-element-plus` 是内置 Core 的产品包。业务选择一个产品，不混用两个产品的 Core 实例。

产品导入没有初始化副作用。首次 `initialize({ components, overrides })` 固定 Adapter；重复无参 initialize 幂等。`configure` 设置全局配置，`registerComponent(s)` 注册项目字段。

## 2. 字段来源与注册

Core 固定节点优先，随后为 Adapter 已声明字段、项目字段和自动导入项目组件。Adapter 字段不能被项目注册覆盖。`supportedFields` 声明名称；字段实际组件由自动导入、手动初始化或 `/components` 全量入口提供，产品根入口不引入全量字段表。

`fieldSources` 表示同源组件关系；手动注册优先于自动注册，原始名优先，同源字段可共享手动组件。解析时分别缓存原始组件与字段配置，独立适配组件通过 `useUIComponent` 读取原始组件，避免递归。

Element Plus 名称目录将原生字段映射到 El 导出；TextArea、InputPassword、InputSearch 复用 ElInput，DateRangePicker、TimeRangePicker 复用对应 Picker。扩展名称不意味着跨 UI 原生 Props 完全相同。

## 3. 统一声明与渲染

固定 UI 在 `uiComponents` 集中声明 `component` / `render`、`defaults`、`adaptProps`、`service`、`schemaDefaults`。`defineUIAdapter` 创建时归一化为内部 `UIRenderers` 和服务表；Core 通过 `getUIRender` / `getUIService` 消费。

字段与固定 UI 的声明 render 均接收 `{ type, attrs, state, slots }`；字段额外包含 `option/model/effectData/binding`。结构组件的业务信息保存在 state，原生属性放在 attrs；属性适配不重复分散到多层节点。

字段 `createFieldPropsAdapter` 合成 model 与原生监听器；`defineFieldAdapters` 在声明时固化 model 协议，扩展 render 不再合成一次事件。默认值、用户属性、专项选项逐层合成，fixedProps 最后覆盖，锁定多行、密码或范围模式。用户 attrs 可覆盖 defaults。

`overrides.uiComponents` 按项替换声明，`overrides.render` 覆盖对应渲染；同时指定时显式 render 优先。服务与默认值随组件声明归一化，不做任意递归深合并。Group 优先级为 Schema component → override → UI 包声明 → Core 默认 Group。

## 4. 状态处理与模型

处理器只输出专项 state 与可选 bindModel，不返回 UI Props。

- options 使用 `options.source/dictName/fieldNames/valueToNumber/labelAsValue`；source 可为数组、对象、Ref、函数，函数只接收 effectData。source 优先于 dictName，不因空值回退字典。
- options 的 children 递归归一化，标签查找递归访问子节点。仅配置 labelField 时可以读取原生 options/fieldNames 查标签，不覆盖原生选项。
- tree 处理显式 treeData（含 Ref/异步来源）；两套 TreeSelect 的标签由其适配组件同步。
- switch 输出 checked/unchecked 的业务值与标签，由 UI 包转换为原生属性。
- picker/range 提供提示状态；范围拆分、stringifyValue 和 labelField 写回由模型绑定负责。endField 优先于范围字符串模式。
- Input/Select 不自动接管远程搜索或异步 loading。InputSearch 在 UI 包提供搜索入口，状态由业务控制。

普通字段默认 value/onUpdate:value；checked、modelValue、targetKeys 由 Adapter 映射。TagInput/TagSelect 保留 Core 增删与序列化语义。

## 5. 容器、表单与上传

Group/Card/Tabs/Collapse/Descriptions 消费 Core 的内容、显隐、激活与插槽状态；UI 包实现实际组件和事件。列表增删、按模型身份同步路径由 Core 负责。InputList 对象行按身份复用模型，普通值数组按槽位维护；移动只更新已有字段路径，不为操作按钮建立字段路径。

Form 建立模型及初始数据，再绑定外部 dataSource；resetFields 按已有模型回填并清除校验，setFieldsValue 只更新已建立且本次传入的字段。

公开表单动作包含 submit、validate、validateField(path)、clearValidate、resetFields、setFieldsValue、getNativeInstance。getForm 返回统一动作实例。Adapter 的表单 service 归一化字段错误为 FormValidationError（fields.path/messages、cause），其它错误原样传播。InputGroup 通过提供的 validateField 校验当前路径。

提交顺序为校验 → 注册提交任务 → onSubmit → submit 事件 → 返回数据副本。上传控制器管理值映射、文件校验、上传与删除任务；字段卸载注销对应提交任务，不承诺撤销已发出的网络请求。

## 6. Table 与查询

query 回第一页，reload 保留页码，goPage 切页；公开动作等待实例注册并返回 Promise。内部响应式调度采用 300ms 尾部节流；新查询取消旧请求并以编号丢弃过期响应。apis.query 的第二参数为 `{ signal }`。

Table 整表模型绑定源记录，按对象身份复用并更新路径；行内草稿按稳定 rowKey 定位，数据重排或同键替换不使用旧下标保存。保存校验、回调和接口成功后退出编辑；失败保留草稿，等待期间防止重复保存与取消。目标移除时拒绝保存，草稿可取消。

行内新增锚点失效拒绝保存；弹窗新增锚点失效 warning 后末尾追加。弹窗表单以 resetFields 初始化，支持延迟注册和 destroyOnClose 后回填；取消不修改来源数据。弹窗模式下表格保持展示态。

选择按稳定行键同步当前记录，清除无效选择；跨远程页保留选择由 preserveSelectedRowKeys 显式控制。数据缩减时回退有效页。稳定行键应由业务提供且保持唯一。

## 7. 详情、类型与工具

SuperDetail 响应 schema 替换，dataSource 优先于 Schema 数据源，仅换配置时保留数据。表单预览只复用字段与布局，避免把 Form 原生 attrs/buttons 当作详情配置。

UI 类型通过 SuperFormTypeRegistry 按来源登记，项目字段独立扩展。UI 字段 attrs 使用 Partial；组件同名属性优先于 HTMLAttributes，避免范围 placeholder 被收窄。声明不会触发运行时全量导入。

自动导入仅支持 Vite。插件扫描静态 Schema，动态类型通过 types 补充；目录同时驱动原始导出、字段注册与同源关系。Core 与两个产品分别构建到 dist，REPL 中间产物在 .repl-dist。

两套 example 均源码联调，各一个入口、共用功能页，承载演示和人工验证。自动测试保留模型、数据转换、异步查询、注册、诊断、CLI 文件保护与产物声明；界面操作不扩展为重复的防御用例。发布声明验证需对应当前源码的构建产物。

设计理由见 [ADR-0008](./decisions/ADR-0008-统一渲染与同源字段扩展.md)。本文不代表任何未执行的交互或发布验收已通过。
