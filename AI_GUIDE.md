# SuperForm AI 使用指南

适用：官方产品包 1.0，Vue 3.5+；AntDV Next 1.5+ / Element Plus 2.14.5+。用于生成业务代码，不涉及库内部实现。

## L0 必读：生成边界

- 先复用项目已有的安装器、接口类型、字典、权限和字段封装；不在页面重复初始化，不猜接口字段或主键。
- 公共 API 从项目选定的 `superform-antdv` 或 `superform-element-plus` 根入口导入。公开子路径仅按用途使用 `/components`、`/unplugin`；不导入源码或 `dist/*`。下文示例使用 AntDV 产品包。
- 应用挂载前调用一次 `initialize()`；全局行为用 `configure()`，UI 默认属性用 `defaultProps` / `setDefaultProps()`。
- Adapter 字段通过 Vite 插件或 `initialize({ components })` 提供；业务字段通过 `registerComponent(s)` 注册。字段名称取当前 Adapter 或项目注册名，不猜别名。
- `attrs` 放所选 UI 框架的属性；`field/rules/params/searchForm/rowEditor` 等业务配置放 Schema 对应层级。
- 只配置需求涉及的能力。省略空对象、空数组、`undefined` 和未改变的默认值；项目覆盖优先于下文库默认值。

## 按需读取

完成 L0 后，只读取本次任务对应的 L1 小节；L2 用于诊断。不必通读示例。

| 任务 / 检索词 | 定位 |
| --- | --- |
| 安装、导入、自动注册、全局配置 | [安装与导出](#setup) |
| field、联动、effectData、布局、rules、插槽 | [Schema](#schema) |
| 表单、提交、回填、重置 | [SuperForm / useForm](#form) |
| options、字典、远程搜索、日期范围 | [选项与值映射](#options) |
| 查询、分页、CRUD、选择、行编辑 | [SuperTable / useTable](#table) |
| actions、图标、权限 | [按钮](#buttons) |
| 详情、动态配置 | [SuperDetail / useDetail](#detail) |
| 弹窗、确认提交 | [弹窗](#modal) |
| 上传、导入文件 | [Upload](#upload) |
| 自定义控件、model 协议 | [扩展字段](#custom) |
| 旧 API、诊断命令 | [L2](#lookup) |

## L1 按场景使用

<a id="setup"></a>

### 安装与导出

```ts
import superForm from 'superform-antdv'
superForm.initialize()
superForm.configure({ /* 项目全局配置 */ })
```

Vite 使用对应产品的 `/unplugin` 默认导出，配置 `{ dirs: ['src'], entry: 'src/main.ts', dts: 'src/superform-components.d.ts' }`。不用插件时手动传 `components`；全量组件表为 `/components` 的 `fieldComponents`。

| 用途 | 根入口 API |
| --- | --- |
| 表单 | `SuperForm, useForm, defineForm` |
| 表格 | `SuperTable, useTable, defineTable` |
| 详情 | `SuperDetail, useDetail, defineDetail` |
| 弹窗 | `createModal, useModal, useModalForm` |
| 按钮 | `SuperButtons, useButtons` |
| 诊断 | `diagnoseSchema` |
| 常用类型 | `UniOption, ExtFormOption, RootTableOption, ExtColumnsItem, ExtDescriptionsOption, ButtonItem, ExtButtons` |

`configure()` 常用项：`dictApi(name)` 返回标准 `{ label, value }[]`（可异步）；`buttonRoles()` 返回权限字符串数组；`defaultButtons` 配置动作；`tagViewer` 配置只读颜色；`tableApiSetting` 映射请求与响应字段；`defaultProps` 按组件名配置 UI 默认属性。

<a id="schema"></a>

### Schema：字段、联动、校验、展示

| 配置 | 语义 |
| --- | --- |
| `field: 'profile.name'` | 支持点路径；`initialValue` 提供初始值 |
| `value: externalRef` | 外部 Ref 双向绑定，可与 field 同时使用 |
| `dynamicAttrs(effectData)` | 动态 UI 属性 |
| `hidden/disabled/required` | 布尔值或上下文函数 |
| `exclude` | `('table' \| 'form' \| 'description')[]` |
| `span/subSpan` | 当前节点 / 子项默认跨度，24 栅格 |
| `block/breakAfter` | 独立成块 / 当前节点后换行 |
| `onChange(effectData, value)` | 字段顶层事件；也可用 `on: { change(...) {} }` |
| `computed(value, effectData)` | 持续计算并写回当前字段，避免循环更新 |
| `onUpdate(effectData)` | 实际存储值变化后触发 |

上下文按场景取值：字段常用 `formData/current/parent/value/field/index/isView`；表格列常用 `record/text/column`；工具栏常用 `selectedRows/selectedRowKeys/tableRef`。不要假定所有回调都有这些字段。

默认值满足需求时省略：字段 span=8、gutter=16；无 span 的容器独占一块；InputGroup 紧凑布局；输入/选择控件按 label 生成占位符；FormItem.validateFirst=true；有 options 时只读按 Tag 展示。表单按钮无默认动作，按需配置。

字段名称：
- AntDV 常用：`Input, TextArea, InputNumber, InputOTP, InputPassword, InputSearch, Select, TreeSelect, DatePicker, DateRangePicker, TimePicker, TimeRangePicker, RadioGroup, CheckboxGroup, Switch, Upload`。
- Element Plus 使用去掉 El 的实际名称，如 `InputOtp, SelectV2, DatePicker`；不要照搬 AntDV 专属字段或 attrs。
- Core：`TagInput, TagSelect, Text, HTML, Hidden, InputSlot, InfoSlot`；容器：`Group, Fragment, Card, Tabs, Collapse, Descriptions, List, ListGroup, InputList, InputGroup, Table`。
- 对象数组单行编辑用 InputList，多行布局用 List/ListGroup，按列编辑用 Table。表格列省略 type 表示只读文本；编辑字段需有效 type。

校验：
- 简单必填用顶层 `required`；其他约束用 `rules` 对象，不同提示拆成规则数组。
- 扩展类型：`email/integer/number/idcard/phone/mobile/twoDecimal/word`。
- `validator(effectData, value)` 返回 false、Error 或 rejected Promise 表示失败。
- InputList 中单个无 field 的 InputGroup 绑定整行，组级 validator 第二参数为行对象；子字段规则仍有效。

展示：
- `viewRender(effectData)` 或根插槽名：表格/详情只读内容。
- `InputSlot.render({ props, ...effectData })`：自定义输入；InfoSlot：非输入内容。
- `HTML` 使用 innerHTML，不清洗内容，仅传可信 HTML。

<a id="form"></a>

### SuperForm / useForm：提交与回填

```ts
import { SuperForm, useForm } from 'superform-antdv'

const [register, form] = useForm({
  buttons: { actions: ['submit', 'reset'] },
  subItems: [
    { type: 'Hidden', field: 'id' },
    { type: 'Input', field: 'name', label: '名称', required: true },
  ],
})
// 模板：<SuperForm @register="register" />
async function save() {
  const data = await form.submit()
  await api.save(data)
}
```

声明式入口：`<SuperForm :schema="schema" :data-source="record" />`。

| 方法 / 配置 | 约束 |
| --- | --- |
| `submit()` | 校验并等待上传等提交任务，返回深拷贝数据 |
| Schema `onSubmit(data)` | false 或 `{ errMessage }` 阻止提交 |
| `resetFields(data?)` | 无参恢复初始值；传记录按已有模型字段回填，数组整体复制 |
| `setFieldsValue(partial)` | 只更新已建立且本次传入的字段 |
| `getData(), dataSource, getForm()` | 读取数据 / 数据源 / 异步获取实例 |
| Schema `dataSource` | 绑定对象或 Ref，库会补齐并修改其字段；useForm 仅接收 schema |
| `ignoreRules` | 搜索场景使用；隐藏必填标识并禁用自动校验触发，不等于跳过 submit 的显式校验 |

提交或回显需要保留的 id、上下文字段应声明为 Hidden。

<a id="options"></a>

### options、字典与值映射

优先使用 `{ label, value }[]`。也支持原始值数组、`{ value: label }`、Ref、返回数组/Promise 的函数；`dictName` 依赖全局 dictApi。当前不支持 Select 分组选项。

| 配置 | 语义 |
| --- | --- |
| 原始值数组 | 元素本身作为 label/value；valueToNumber 时改用下标作 value |
| `fieldNames.label/value` | 指定对象选项的取值字段 |
| `labelField` | 将选中 label 同步到另一字段 |
| `valueToNumber` | 选项 value 转数字 |
| `labelAsValue` | label 作为字段值 |
| `stringifyValue` | 多值以逗号连接，不支持值中包含逗号 |
| `tagViewer: false` | 关闭只读 Tag |

Select 远程搜索：`attrs: { showSearch: true, filterOption: false }` 配合 `options: (effectData, keyword) => api.search(keyword)`；显式 onSearch 接管搜索事件。

AntDV 日期/时间范围用 `field` 与 `endField` 保存起止值；有 endField 时优先拆分，否则可用 stringifyValue 保存逗号字符串。日期默认 YYYY-MM-DD，时间默认 HH:mm:ss；其他 Adapter 以自身字段协议为准。

<a id="table"></a>

### SuperTable / useTable：查询、分页、CRUD

```ts
import { SuperTable, useTable } from 'superform-antdv'

const [register, table] = useTable({
  attrs: { rowKey: 'id' },
  apis: { query: api.page },
  searchForm: { subItems: ['name'] },
  columns: [{ type: 'Input', field: 'name', label: '名称' }],
})
// 模板：<SuperTable @register="register" />
await table.query()
```

查询契约：
- 默认启用分页（current=1、pageSize=10），关闭用 `pagination: false`；`immediate: false` 放 Schema 顶层以关闭首次查询。
- 请求覆盖顺序：分页 → searchForm → params → query 临时参数。默认分页请求字段为 current/size，全局 tableApiSetting 可改名。
- params 支持响应式值，变化后自动回第一页查询。与搜索字段 value 共用 Ref 时，不再额外手动查询。
- beforeQuery 转换参数；afterQuery 或全局 resultTransform 将响应转为数组或 `{ current, size, total, records }`。
- `apis.query(params, { signal })` 可接收取消信号；过期响应不会覆盖最新数据。
- searchForm.subItems 可引用列字段名；不同查询配置写完整项。searchOnChange=true 自动查询，否则默认 search/reset 按钮；limit 折叠搜索项，teleport 指定目标。

| 动作 | 语义 |
| --- | --- |
| `query(params?), reload(), goPage(page)` | 回第一页 / 保留页码 / 跳页；等待注册，返回请求 Promise |
| `getQueryParams()` | 仅搜索参数 + 动态 params，无分页与上次临时参数 |
| `resetSearchForm(data?), setColumns(cols)` | 重置查询 / 更新列 |
| `setData(rows), getData(), dataSource` | 本地数据；也可 useTable(option, dataRef) |
| `setSelectedRows(rows), setExpandedRowKeys(keys), expandAll()` | 选择与展开 |
| `add({ resetData }), edit({ record }), detail({ record }), delete()` | 宿主 CRUD 动作 |
| `validate()` | 编辑表格校验 |

稳定主键放 attrs.rowKey（默认 id）；选择用 attrs.rowSelection={}，不用 true。已有明确动作时不使用 asyncCall。

| 编辑方式 | 配置 |
| --- | --- |
| 单列 | 列 editable=true，在字段事件中保存 |
| 全表 | 表格 editable=true，validate 后 getData 整体保存 |
| 行内 | rowEditor.editMode='inline' |
| 弹窗 | rowEditor.editMode='modal'；新增方式用 rowEditor.addMode |

rowEditor.form.subItems 可独立配置编辑字段；onSave(context) 返回 false 阻止保存，onCancel 在取消关闭前触发。
接口签名：info(key, row)、save(data)、update(data)、delete(keys, rows)。保存、更新、删除成功后刷新查询。

<a id="buttons"></a>

### 按钮：actions、icon、权限

动作名：`add/delete/edit/detail/submit/search/reset`。字符串动作依赖宿主提供同名方法；导入、导出等业务动作自行写 onClick，不假定 apis.export 自动执行。

```ts
buttons: {
  actions: ['add', {
    name: 'export', label: '导出',
    onClick: ({ selectedRows }) => api.export(selectedRows),
  }],
}
```

- 覆盖内置动作可用 `onClick(context, action)` 调用原动作，例如 `action({ resetData })`；自定义动作没有该能力。
- icon 为 `() => VNodeChild`，例如 `() => h(UserIcon)`，h 从 Vue 导入。内置动作有默认图标；icon:undefined 移除。
- labelMode：icon/label/both；limit 折叠多余按钮；confirmText 提供确认。
- roleName 配合全局 buttonRoles；unauthorized：hide/disable；visibleIn：form/detail/both。
- 合并顺序：内置默认 → 全局 defaultButtons → 宿主方法 → 当前 actions 对象。

<a id="detail"></a>

### SuperDetail / useDetail：更新数据与配置

声明式：`<SuperDetail :schema="schema" :data-source="record" />`。
注册式：`const [register, detail] = useDetail(schema, initialData)`，绑定 @register，调用 `detail.setData(record)`。

useDetail 的 schema 可为对象或返回对象/Promise 的函数。组件支持整体替换 schema 或通过组件实例 setOption 更新字段；useDetail 返回动作仅提供 setData。dataSource 优先于 Schema 数据源；仅换配置时保留数据。字段可省略 type，通过 options、labelField、endField、tagViewer、viewRender 控制只读展示。

<a id="modal"></a>

### 弹窗：useModalForm / useModal

```ts
const modal = useModalForm(
  { subItems: [{ type: 'Input', field: 'name', required: true }] },
  { title: '编辑', onOk: (data) => api.save(data) },
)
modal.openModal({ data: record })
```

onOk resolve 后关闭，reject/抛错保留；openModal 的 data 先写入表单。
动作：closeModal()、setModal(props)、formActions.resetFields()。
自定义内容：`useModal(() => h(CustomPanel), props)`。在浏览器的 Vue setup 中使用，不在 SSR 服务端执行。

<a id="upload"></a>

### Upload：上传与文件导入

增强配置放 attrs；上传 API 来自 `attrs.apis.upload` 或 `defaultProps.Upload.apis.upload`。

| uploadMode | 行为 |
| --- | --- |
| auto / submit | 选中即上传 / 提交时等待上传 |
| custom | 不上传，保留 originFileObj 供业务处理 |
| base64 / text | 读取为 base64 / 文本 |

文件导入用 `attrs: { uploadMode: 'custom', isSingle: true, accept: '.xlsx' }`，提交时读取 file.originFileObj。
isSingle 返回单个文件；valueKey 仅保存对应属性；vModelFields.fileList 同步完整列表；infoNames 映射 uid/name/url；maxSize/minSize 单位 MB；hideOnMax 达到数量后隐藏入口；repeatable 默认 false。

<a id="custom"></a>

### 扩展字段：注册与 model

`superForm.registerComponents({ UserPicker })` 后使用 `type: 'UserPicker'`。
组件接收 value/onUpdate:value、attrs 和状态属性；labelField 对应 labelValue/onUpdate:labelValue，其他双向绑定用 vModelFields。组件不接收内部 option/model/effectData。
非默认 model 协议注册为 `{ component, model }`；类型声明可由 Vite 插件补充。

<a id="lookup"></a>

## L2 诊断

诊断入口（按项目授权执行）：
- `diagnoseSchema(schema, 'form' | 'table' | 'detail')`：支持函数与 Ref 的运行时 Schema。
- `npx superform diagnose-schema <schema.json> --type form|table|detail`：可序列化配置。
- `configure({ schemaDiagnostics: import.meta.env.DEV })`：开发时自动诊断。
- CLI 需将独立 superform 包安装为开发依赖；`npx superform init-ai` 更新已有 AI 指令入口，没有入口时输出手动添加提示。

提交生成结果前，按本次场景核对：导入与注册、接口签名、Schema 层级、回填字段、值形态及权限。需要的检查遵循项目约定，不把未执行检查描述为通过。

