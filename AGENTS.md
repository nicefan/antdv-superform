# 本项目协作约束

- 以正确性、完整性和可维护性为优先；需求相关时可以进行必要重构、补充类型和完善测试，不以改动行数最少为目标。
- 发现当前需求之外的问题、风险或改进建议时，先告知用户；未经确认不要顺手修改。
- 日常修改只运行与本次变更相关的测试和 lint；`build` 仅在用户确认提交、准备提交时执行。
- 不主动提交。提交前先汇总变更并询问用户是否提交。
- Git 提交信息使用中文。
- 提交时暂存所有改动文件，分析理解用户已有改动并记录重要信息。
- `lib/` 是构建产物，不执行 lint；仅在提交前构建时更新。

## 表单内部实现

- `buildModelsMap(items, data)` 保持原有职责：按 schema 补齐并绑定传入对象，返回 `modelsMap` 和 `rules`，不额外提取初始模型。
- `Form.vue` 先用内部空对象 `modelData` 调用 `buildModelsMap`，再克隆此时的数据作为 schema 标准初始对象。
- 标准初始对象生成后，再监听 `props.dataSource` / `option.dataSource`，将动态对象切换为当前 `modelData`；两种入口都允许传入对象或 Ref，监听时对选中的数据源整体 `unref`。模型 watcher 会按 schema 补齐动态对象缺失的字段。
- `resetFields` 按已建立的目标模型遍历；`setFieldsValue` 只更新目标模型已有且本次传入的字段。
- `useForm` 只接收 schema。外部对象通过 schema 的 `dataSource` 绑定，不恢复 `useForm(schema, record)` 或内部 `setData`。

## 表格内部实现

- `request` 是所有读取请求的统一入口，负责合并分页、搜索、动态和临时参数，并维护 `loading`。
- 公开的 `query`、`reload` 使用 300ms 尾部节流并合并窗口内的调用；`goPage` 取消待执行调度后立即请求。
- `query` 回到第一页；`reload` 保留当前分页；`goPage` 更新分页后请求。
- `query`、`reload`、`SuperTable` 初始化及内部响应式参数同步共用 300ms 尾部节流，只处理该窗口最后一次触发。
- `query`、`reload` 只负责触发调度，不承诺返回可等待的请求 Promise；`goPage` 仍返回实际请求 Promise。
- 新请求通过 `AbortController` 取消旧请求，并使用递增请求编号保证只有最后一次响应可以更新表格。
- `apis.query` 的运行时第二参数是 `{ signal }`。请求实现未消费 `signal` 时，仍必须依靠请求编号丢弃过期响应。
- `SuperTable` 向内部 `Table` 传递 `reload`，不重复传递 `apis`；内部 `Table` 的保存、更新、删除接口直接读取 `option.apis`。
- 不恢复 `query(true)`。CRUD 完成后的刷新统一调用传入的 `reload`。
- 新查询进入等待期时立即取消进行中的请求并使旧请求编号失效；组件卸载时同时取消进行中的查询和等待期调度。

## 测试位置

- 单元测试统一放在根目录 `tests/`，不要与 `src/` 混放。

## 其他内部实现

- `InputList` 的普通非紧凑对象行将 `rowButtons` 交给生成的 `Group`；紧凑模式和原始值列表使用独立按钮模型。单个独立容器不会额外生成外层 `Group`。
- Select 远程搜索在 `showSearch` 开启、`options` 为函数且未显式配置 `onSearch` 时，以约 600ms 节流调用 `options(effectData, keyword)`。
- 原始值 options 数组强制使用元素本身作为 label 和 value；配置 `valueToNumber` 时改用数字下标作为兼容 value。不要把 `labelAsValue: false` 解释为关闭此规则。
- options 支持扁平的对象数组、原始值数组、`{ value: label }` 对象、Ref、函数和标准字典结果，当前不支持 Select 分组选项或 `fieldNames.options`。
- Select 消费 `fieldNames.label/value` 后将选项归一化为标准 `label/value` 再传给底层组件；表单和详情的同步、异步 options 应保持一致的归一化语义。`dictApi` 按公开契约返回标准 `{ label, value }[]`。
- `TimeRange` 使用 Ant Design Vue 的 `TimeRangePicker`，默认 `valueFormat` 为 `HH:mm:ss`；带 `endField` 的范围控件按开始、结束两个模型字段拆分。
- 表格弹窗编辑时先等待可选的 `apis.info`，再按当前行、接口结果、`resetData` 的顺序合并到表单数据源；未配置 `info` 时不得报错。
- `searchForm.subItems` 使用列字段名时，会复制同名 column 配置，移除 `span`、`disabled`、`hidden`，并设置为可编辑查询字段。
