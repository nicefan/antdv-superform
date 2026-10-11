# SuperForm AI 使用指南

适用：官方产品包 1.0，Vue 3.5+；AntDV Next 1.5+ / Element Plus 2.14.5+。用于生成业务代码，不涉及库内部实现。

## L0 必读：生成边界

- 先复用项目已有的安装器、接口类型、字典、权限和字段封装；不在页面重复初始化，不猜接口字段或主键。
- 公共 API 从项目选定的 `superform-antdv` 或 `superform-element-plus` 根入口导入。公开子路径仅按用途使用 `/components`、`/unplugin`；不导入源码或 `dist/*`。下文示例使用 AntDV 产品包。
- 应用挂载前调用一次 `initialize()`；全局行为用 `configure()`，UI 默认属性用 `defaultProps` / `setDefaultProps()`。
- Adapter 字段通过 Vite 插件或 `initialize({ components })` 提供；业务字段通过 `registerComponent(s)` 注册。字段名称取当前 Adapter 或项目注册名，不猜别名。
- `attrs` 放所选 UI 框架的属性；SuperTable 的分页及查询转换器也放在 `attrs`。`field/rules/params/searchForm/rowEditor` 等业务配置放 Schema 对应层级。
- 只配置需求涉及的能力。省略空对象、空数组、`undefined` 和未改变的默认值；项目覆盖优先于下文库默认值。

## 按需读取

完成 L0 后，只读取本次任务对应的 L1 小节；L2 用于诊断。不必通读示例。

| 任务 / 检索词 | 定位 |
| --- | --- |
| 安装、导入、自动注册、全局配置 | [安装与导出](#setup) |
| field、联动、effectData、布局、rules、插槽 | [Schema](#schema) |
| 表单、提交、回填、重置 | [SuperForm / useForm](#form) |
| options、字典、远程搜索、日期范围 | [选项与值映射](#options) |
| 查询、分页、筛选排序、接口转换、导出条件、CRUD、行编辑 | [SuperTable / useTable](#table) |
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
| 表格配置与事件类型 | `SuperTableDefaultProps, UITableSorter, UITableParams, UITableChange` |

`configure()` 常用项：`dictApi(name)` 返回标准 `{ label, value }[]`（可异步）；`buttonRoles()` 返回权限字符串数组；`defaultButtons` 配置动作；`tagViewer` 配置只读颜色；`defaultProps` 按组件名配置默认属性。

`defaultProps.SuperTable` 使用与 `RootTableOption['attrs']` 一致的扁平属性，不嵌套 `attrs`；分页、查询转换器、高度及 tableTools 默认值放在这里，查询接口、搜索与编辑配置、beforeQuery/afterQuery 由单表提供。属性按全局 SuperTable 默认值 → Schema.attrs → 组件传入属性覆盖。`defaultProps.Table` 是共享表格主体的基础默认值，原生属性可被 SuperTable 默认值和局部配置覆盖；它的 pagination 不控制 SuperTable 分页。

<a id="schema"></a>

### Schema：字段、联动、校验、展示

| 配置 | 语义 |
| --- | --- |
| `field: 'profile.name'` | 支持点路径；`initialValue` 提供初始值 |
| `value: externalRef` | 外部 Ref 双向绑定，可与 field 同时使用 |
| `modelModifiers` | `['trim', 'number']` 只转换主 value 的组件写回；具名对象按 value/labelValue/vModelFields 键名配置，不支持 lazy |
| `dynamicAttrs(effectData)` | 动态 UI 属性 |
| `hidden/disabled/required` | 布尔值或上下文函数 |
| `exclude` | `('table' \| 'form' \| 'description')[]` |
| `span/subSpan` | 当前节点 / 子项默认跨度，24 栅格 |
| `block/breakAfter` | 独立成块 / 当前节点后换行 |
| `onChange(effectData, value)` | 字段顶层事件；也可用 `on: { change(...) {} }` |
| `computed(value, effectData)` | 持续计算并写回当前字段，避免循环更新 |
| `onUpdate(effectData)` | 实际存储值变化后触发 |

上下文按场景取值：字段常用 `formData/current/parent/value/field/index/isView`；表格列常用 `record/text/column`；工具栏常用 `selectedRows/selectedRowKeys/tableRef`。不要假定所有回调都有这些字段。

`modelModifiers` 在 Core 写回模型前按声明顺序执行，数组值逐项转换；`number` 使用 parseFloat，不能转换时保留原值。配置放在字段顶层，两套 UI 的主键都用 value；不要写在 attrs 或改成 modelValueModifiers。外部赋值、回填、重置及 computed 不主动转换；范围拆分与 stringifyValue 序列化在修饰符之后执行。产品根入口导出 ModelModifier、ModelModifiers 类型。

默认值满足需求时省略：字段 span=8、gutter=16；无 span 的容器独占一块；InputGroup 紧凑布局；输入/选择控件按 label 生成占位符；FormItem.validateFirst=true；有 options 时只读按 Tag 展示。表单按钮无默认动作，按需配置。

字段名称：
- AntDV 常用：`Input, TextArea, InputNumber, InputOTP, InputPassword, InputSearch, Select, TreeSelect, DatePicker, DateRangePicker, TimePicker, TimeRangePicker, RadioGroup, CheckboxGroup, Switch, Upload`。
- Element Plus 使用去掉 El 的实际名称，如 `InputOtp, SelectV2, DatePicker`；不要照搬 AntDV 专属字段或 attrs。
- Core：`TagInput, TagSelect, Text, HTML, Hidden, InputSlot, InfoSlot`；容器：`Group, Fragment, Card, Tabs, Collapse, Descriptions, CardList, TabList, CollapseList, GroupList, InputList, InputGroup, Table`。
- 对象数组紧凑编辑用 InputList；持续保留至少一行的分组编辑用 GroupList；允许空数组并需要卡片/页签/折叠展示时分别用 CardList/TabList/CollapseList；按列编辑用 Table。表格列省略 type 表示只读文本；编辑字段需有效 type。

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
| `validate(), validateField(path), clearValidate()` | 统一校验动作；字段失败为 FormValidationError，fields 包含 path/messages，cause 保留原始错误 |
| `getNativeInstance()` | 获取当前 UI 原生实例 |
| `getData(), dataSource, getForm()` | 读取数据 / 数据源 / 异步获取实例 |
| Schema `dataSource` | 绑定对象或 Ref，库会补齐并修改其字段；useForm 仅接收 schema |
| `ignoreRules` | 搜索场景使用；隐藏必填标识并禁用自动校验触发，不等于跳过 submit 的显式校验 |

提交或回显需要保留的 id、上下文字段应声明为 Hidden。

<a id="options"></a>

### options、字典与值映射

顶层 `options` 是配置包，不直接写数组、Ref、函数或 `dictName`。数据放在 `options.source`，全局字典写 `options.dictName`；两者同时配置时以 source 为准并输出警告。

```ts
options: {
  source: [
    { label: '启用', value: 1 },
    { label: '停用', value: 0 },
  ],
}

options: { dictName: 'status' }
```

| 配置 | 语义 |
| --- | --- |
| `options.source` | 原始值数组、对象数组、对象字典、Ref，或只接收 effectData 的函数/Promise |
| `options.dictName` | 使用全局 `dictApi(name)` |
| `options.fieldNames.label/value/children` | 指定对象选项字段并支持递归 children |
| `options.valueToNumber` | 归一化 value 为 number；原始数组使用数字下标 |
| `options.labelAsValue` | label 作为字段值 |
| `labelField` | 将选中 label 同步到另一字段 |
| `stringifyValue` | 多值以逗号连接，不支持值中包含逗号 |
| `tagViewer: false` | 关闭只读 Tag |

Select / SelectV2 不提供自动远程搜索处理。关键词事件、过滤和 loading 使用当前 UI 的原生 `attrs.onSearch` / `remoteMethod` 等配置；`options.source` 只接收 effectData，可读取业务自己维护的响应式关键词。

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

- 分页只配置在 `attrs.pagination`，默认 current=1、pageSize=10，`false` 关闭分页及分页请求字段；`immediate: false` 放 Schema 顶层以关闭首次查询。
- 分页对象按 `defaultProps.SuperTable.pagination → Schema.attrs.pagination → 组件传入 pagination` 逐层合并，局部仅传回调时保留页大小；高优先级 false 关闭，之后的显式对象可重新开启。
- 请求覆盖顺序：分页转换结果 → searchForm → tabs → 动态 params → 已保存的筛选排序条件 → query 临时参数 → beforeQuery。各条件来源独立替换，清空或删除不残留旧字段。
- `attrs.pageTransform({ current, size })` 转换请求分页字段；未配置时使用标准 current/size，false 覆盖全局转换器并恢复标准字段。UI 分页仍使用 current/pageSize。
- params 支持响应式值，变化后自动回第一页查询。与搜索字段 value 共用 Ref 时，不再额外手动查询。自动查询使用约 300ms 尾部节流，显式 query/reload/goPage 立即执行并取消待执行的自动查询。
- 根级 beforeQuery 加工请求参数，不返回值时沿用传入参数。响应顺序为 `apis.query → attrs.resultTransform → 根级 afterQuery → 分页处理与数据回写`；resultTransform 将响应转成数组或 `{ current, size, total, records }`，afterQuery 处理单表业务，返回 void 时沿用转换结果。
- 分页和远程筛选排序由统一 onTableChange 驱动查询；pagination.onChange(current, pageSize) / onShowSizeChange(current, pageSize) 只通知业务，不再手动调用 query/reload。每页条数变更回第一页，末页失效时补查最后一页。
- `apis.query(params, { signal })` 可接收取消信号；取消及过期响应不会覆盖最新数据。远程翻页等待响应时旧记录保留原索引，新数据回写后同步换号；失败及取消不提前改号，本地分页即时更新。
- searchForm.subItems 可引用列字段名；不同查询配置写完整项。searchOnChange=true 自动查询，否则默认 search/reset 按钮；limit 折叠搜索项，teleport 指定目标。

筛选排序与事件：

- `attrs.filterSortTransform` 只支持 false 或函数，默认关闭，不自动传递列条件或因此发起远程查询；未配置时继承全局默认，局部 false 显式关闭。
- 函数接收远程状态副本 `UITableParams`：filters 为 `Record<string, unknown[]>`，sorters 为 `{ field, order: 'asc' | 'desc' }[]`；嵌套字段使用点分路径，空筛选和取消排序移除对应项。
- 转换结果固定保存，查询与 getQueryParams 共用；翻页、刷新和 getter 不重复转换相同状态。返回 void 时保存本次输入副本。有效远程条件变化后回第一页查询。
- AntDV 远程列用 columnProps.sorter=true，筛选不提供 onFilter；Element Plus 远程排序用 sortable='custom'，筛选不提供 filterMethod。本地比较或筛选函数由原生 UI 执行，其条件不进入后续远程请求；AntDV 保留多列排序，Element Plus 保留单列排序。
- 根 Schema 回调为 `onTableChange(effectData, change)`，attrs 及全局默认回调为 `onTableChange(change)`。UITableChange 携带 action（filter/sort/paginate）、完整 filters/sorters、标准分页 current/pageSize/total；remote 标记远程处理，remoteParams 仅包含远程状态。回调内不额外发起查询，原生事件保留各 UI 的签名。

接口需要映射时才配置转换器；下例放在单表 attrs 中，应用级默认值使用 `defaultProps.SuperTable` 的同名扁平属性：

```ts
attrs: {
  pagination: { pageSize: 20 },
  filterSortTransform: ({ filters, sorters }) => ({ where: filters, orderBy: sorters }),
  pageTransform: ({ current, size }) => ({ pageNum: current, pageSize: size }),
  resultTransform: (response) => ({
    current: response.data.pageNum,
    size: response.data.pageSize,
    total: response.data.totalCount,
    records: response.data.list,
  }),
}
```

| 动作 | 语义 |
| --- | --- |
| `query(params?), reload(), goPage(page)` | 回第一页 / 保留页码 / 跳页；等待注册，返回请求 Promise |
| `getQueryParams()` | 当前搜索、tabs、动态 params 及保存的筛选排序条件的合并副本；不含分页、本次临时参数或 beforeQuery 加工 |
| `resetSearchForm(data?), setColumns(cols)` | 重置查询 / 更新列 |
| `setData(rows), getData(), dataSource` | 本地数据；也可 useTable(option, dataRef) |
| `setSelectedRows(rows), setExpandedRowKeys(keys), expandAll()` | 选择与展开 |
| `add({ resetData }), edit({ record }), detail({ record }), delete()` | 宿主 CRUD 动作 |
| `validate()` | 编辑表格校验 |

稳定主键放 attrs.rowKey（默认 id）；选择用 attrs.rowSelection={}，不用 true。已有明确动作时不使用 asyncCall。

导出当前条件直接使用 `api.export(table.getQueryParams())`，不要重新执行转换器或 beforeQuery；修改 getter 返回副本不影响后续查询。SuperTable 的 effectData.queryParams 与该 getter 的条件一致。

工具栏在根 Schema 配置 tableTools: ['refresh', 'density', 'columnSetting']，未配置、false 或空数组关闭；应用默认值为 defaultProps.SuperTable.tableTools，根级优先于 attrs 和组件传入属性。refresh 复用 reload 并保留当前页，density 在两套 UI 映射原生 size，columnSetting 支持顶层列显隐、拖拽排序、左右固定和重置。它与 buttons/extra/tabs 共存，列偏好不反写 Schema；setColumns 保留仍存在的列偏好，追加新增列，实例卸载后不保留。类型 UITableToolName/UITableDensity/UITableToolbarColumn/UITableToolbarProps 从产品根入口导入。详见[工具栏手册](https://nicefan.github.io/antdv-superform/manual/super-table#tabletools)。

高度配置可写在 Schema 根级或 attrs，根级优先，应用级默认值写在 defaultProps.SuperTable：maxHeight 为数字时限制内容滚动区域高度（不含表头和分页），为 'viewport' / 'parent' 时按对应剩余空间计算。未配置时自然布局，无默认高度模式；fixedHeight: true 配合 maxHeight 保留固定高度，heightOffset 仅对 'viewport' / 'parent' 额外扣减。固定高度和偏移单独配置不启用高度约束。

| 编辑方式 | 配置 |
| --- | --- |
| 单列 | 列 editable=true，在字段事件中保存 |
| 全表 | 表格 editable=true，validate 后 getData 整体保存 |
| 行内 | rowEditor.editMode='inline' |
| 弹窗 | rowEditor.editMode='modal'；新增方式用 rowEditor.addMode |

行内编辑默认支持多行，各行可独立保存或取消，rowKey 须稳定唯一；rowEditor.singleEdit: true 限制单行并在实际查询请求前清理编辑状态，本地翻页保留草稿。保存仅校验当前行全部规则（含未展示或只读字段），成功后独立刷新，刷新失败不改变保存结果。

rowEditor.form.subItems 可独立配置编辑字段；onSave(context) 返回 false 阻止保存，onCancel 在取消关闭前触发。
接口签名：info(key, row)、save(data)、update(data)、delete(keys, rows)。保存、更新、删除成功后刷新查询。

<a id="buttons"></a>

### 按钮：actions、icon、权限

动作名：`add/delete/edit/detail/submit/search/reset/save/cancel/expand`。字符串动作依赖宿主提供同名方法；导入、导出等业务动作自行写 onClick，不假定 apis.export 自动执行。

```ts
buttons: {
  actions: ['add', {
    name: 'export', label: '导出',
    onClick: ({ selectedRows }) => api.export(selectedRows),
  }],
}
```

- 覆盖内置动作可用 `onClick(context, action)` 调用原动作，例如 `action({ resetData })`；自定义动作没有该能力。
- icon 接受 VNode、组件或渲染函数，例如 `() => h(UserIcon)`，h 从 Vue 导入。内置动作有默认图标；icon:undefined 移除。
- labelMode：icon/label/both；limit 折叠多余按钮；confirmText 提供确认。
- roleName 配合全局 buttonRoles；unauthorized：hide/disable；visibleIn：form/detail/both。
- 合并顺序：全局 defaultButtons 设置默认动作，当前 actions 对象覆盖对应配置；公共 buttonProps 设置按钮外观，局部 attrs 优先。
- dropdown 为一级同步菜单（数组、键值对象、Ref 或上下文函数），选中值从 context.value 读取，onClick 第二参数仍为可选宿主动作。组禁用时所有按钮均不可执行，动作执行期间不重复触发。

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

onOk resolve 后关闭，reject/抛错保留；openModal 的 data 先写入表单。onSubmitError(error: unknown) 通知确认链路中的校验、提交任务及业务 onOk 异常，可由本次打开参数覆盖；字段校验为 FormValidationError，其他异常原样保留。通知失败不替换原错误，直接 formActions.submit() 不经过该通知入口。
动作：closeModal()、setModal(props)、formActions.resetFields()。
自定义内容：`useModal(() => h(CustomPanel), props)`。在浏览器的 Vue setup 中使用，不在 SSR 服务端执行。

<a id="upload"></a>

### Upload：上传与文件导入

beforeSelect(File) 支持异步选入校验，beforeRemove 控制删除；showList/removable/downloadable/previewable 控制列表和操作，isImage 判定图片，onChange 接收 { file, fileList }。提交等待异步选入、上传及 base64/text 读取，上传或读取失败保留错误并阻止提交。

增强配置放 attrs；上传 API 来自 `attrs.apis.upload` 或 `defaultProps.Upload.apis.upload`。

| uploadMode | 行为 |
| --- | --- |
| auto / submit | 选中即上传 / 提交时等待上传 |
| custom | 不上传，保留 file（原始 File）供业务处理 |
| base64 / text | 读取为 base64 / 文本 |

文件导入用 `attrs: { uploadMode: 'custom', isSingle: true, accept: '.xlsx' }`，提交时读取 file.file。
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


## 输入扩展与编辑约束

Element Plus 支持 TextArea、InputPassword、InputSearch，三者与 Input 共用 ElInput 注册源；名称目录驱动自动导入。TextArea 固定 textarea，InputPassword 固定 password 且默认 showPassword。InputSearch 支持 enterButton、loading 和 onSearch；loading 由业务控制，普通 Input 不隐式切换搜索模式。原生 attrs/slots 仍按对应 UI 使用。

详情 Schema 只复用表单 subItems 与布局，不把 Form 原生 attrs/buttons 直接传给 SuperDetail。Table 行内草稿按稳定行键定位；保存失败保留草稿，保存期间禁用重复保存与取消。行内新增锚点失效拒绝保存；弹窗新增锚点失效 warning 后末尾追加。弹窗回填使用 resetFields，取消不更新表格。

Adapter 的固定 UI 在 uiComponents 声明组件、默认值和 service；自定义 render 接收 { type, attrs, state, slots }，字段另有 option/model/effectData/binding。不要重复合成字段更新事件。
