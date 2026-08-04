# antdv-superform AI 使用指南

> 适用版本：`antdv-superform@0.6.16`  
> 技术栈：Vue 3.3+、Ant Design Vue 3.2+、TypeScript

本文只提供使用 `antdv-superform` 编写业务代码时需要遵守的公开 API 和配置规则，不描述组件库内部实现。

安装依赖后，可在消费项目根目录执行 `npx antdv-superform init-ai`。命令会检测并安全更新项目已有的 `AGENTS.md`、`CLAUDE.md`、`GEMINI.md`、Copilot 或 Cursor 指令入口，不覆盖原有约束；没有检测到入口时不会创建文件，而是输出供用户手动添加的提示词。

生成可序列化的 schema 后，使用 `npx antdv-superform diagnose-schema <schema.json> --type form|table|detail` 诊断；包含函数或 Ref 的动态 schema 使用包根导出的 `diagnoseSchema(schema, type)`。安装时配置 `schemaDiagnostics: import.meta.env.DEV`，可在组件接收 schema 时把诊断结果输出到开发控制台。

## 1. 生成代码前必须遵守

1. 只从包根入口导入公共 API：

   ```ts
   import { SuperForm, useForm, SuperTable, useTable } from 'antdv-superform'
   ```

   不要从 `antdv-superform/lib/...` 或包内源码路径导入。

2. 先检查消费项目是否有本地安装器或二次封装。若项目已经统一配置字典、权限、上传、默认按钮、组件替换或扩展字段，应沿用该封装，不要在页面重复安装或复制默认配置。

3. 新代码只使用本文列出的现行 API。不要根据旧页面继续扩散已废弃字段。

4. 表格的后端字段、主键和接口参数必须来自业务项目的接口类型或现有调用，不要根据中文标签猜测。

5. `attrs` 传给底层 Ant Design Vue 组件；表单布局、表格业务行为等库级配置应放在 schema 对应层级，不要把所有配置都塞进 `attrs`。

6. 自定义字段类型必须先通过 `registerComponent` 注册。不要虚构 `InputPassword`、`RadioGroup`、`CheckboxGroup`、`Rate` 等当前注册表中不存在的类型。

## 2. 公共导出

包根入口公开以下运行时 API：

| 分类 | API | 用途 |
| --- | --- | --- |
| 表单 | `SuperForm`、`useForm`、`defineForm` | 配置式表单、表单动作、schema 类型收窄 |
| 表格 | `SuperTable`、`useTable`、`defineTable` | 查询表格、CRUD、选择、动态列 |
| 详情 | `SuperDetail`、`useDetail`、`defineDetail` | 只读详情 |
| 弹窗 | `createModal`、`useModal`、`useModalForm` | 命令式弹窗和弹窗表单 |
| 按钮 | `SuperButtons`、`useButtons` | 独立按钮组 |
| 插件 | 默认导出 `superForm` | 全局安装、默认值、组件替换、扩展字段注册 |
| 诊断 | `diagnoseSchema` | 返回 schema 的错误、警告和冗余配置建议 |

常用公开类型包括：

```ts
import type {
  UniOption,
  ExtColumnsItem,
  ExtFormOption,
  ExtDescriptionsOption,
  RootTableOption,
  ButtonItem,
  ExtButtons,
} from 'antdv-superform'
```

## 3. 应用级安装

最小安装：

```ts
import { createApp } from 'vue'
import superForm from 'antdv-superform'
import App from './App.vue'

const app = createApp(App)
app.use(superForm)
app.mount('#app')
```

常用全局能力：

```ts
app.use(superForm, {
  schemaDiagnostics: import.meta.env.DEV,
  dictApi: (name) => fetchDictionary(name),
  customIcon: (name) => renderProjectIcon(name),
  buttonRoles: () => permissionStore.currentRoles,
  defaultButtons: {
    add: { label: '新增' },
    edit: { label: '编辑' },
  },
  tagViewer: { 0: 'default', 1: 'green' },
  tableApiSetting: {
    currentField: 'pageNum',
    sizeField: 'pageSize',
    resultTransform: (result) => result.data,
  },
  defaultProps: {
    Form: { layout: 'horizontal' },
    Table: { size: 'small', bordered: true },
    Modal: { centered: true },
    Upload: { maxSize: 20 },
    rowButtons: { labelMode: 'icon' },
  },
})
```

说明：

- `dictApi(name)` 必须返回 `Promise<{ label, value }[]>` 或兼容选项数组。
- `buttonRoles()` 返回当前权限字符串数组。
- `tableApiSetting.resultTransform` 应返回数组，或 `{ current, size, total, records }`。
- `components` 可替换库使用的底层组件，例如 `Table`、`Modal`。
- `superForm.registerComponent('ModalSelect', Comp)` 注册后的 schema 类型是 `ExtModalSelect`，不是 `ModalSelect`。
- `superForm.setDefaultProps()` 可在安装后继续合并全局默认属性。

## 4. Schema 基础规则

字段和容器共享这些常用属性：

```ts
{
  type: 'Input',
  field: 'profile.name',
  label: '姓名',
  initialValue: '',
  dynamicAttrs: ({ current }) => ({ maxlength: current.shortName ? 20 : 50 }),
  hidden: ({ current }) => !current.enabled,
  disabled: ({ current }) => current.locked,
  required: ({ current }) => current.mode === 'strict',
  exclude: ['description'],
  span: 12,
}
```

规则：

- `field` 支持点路径，例如 `profile.name`。
- `initialValue` 用于初始化 `field` 对应的表单字段；`value: externalRef` 可让控件与外部 `Ref` 双向绑定。
- `field` 和外部 Ref `value` 可以同时配置，此时表单字段与外部 Ref 会互相同步。
- `attrs` 是底层组件属性。
- `dynamicAttrs(effectData)` 用于响应式计算底层属性。
- `hidden`、`disabled`、`required` 支持布尔值或函数。
- `exclude` 的合法场景是 `table`、`form`、`description`。
- `span` 使用 Ant Design 24 栅格；`subSpan` 是容器对子项的默认跨度。
- `block: true` 让当前节点脱离前后栅格组并独立成块；`breakAfter: true` 从当前节点后换行。
- 普通事件写在字段顶层，例如 `onChange(effectData, value)`；也可使用 `on: { change(...) {} }`。
- `computed(value, effectData)` 会持续计算并回写当前字段。它不是只读展示计算，避免造成循环更新。
- `onUpdate(effectData)` 在字段实际存储值变化时触发。

`effectData` 随上下文变化。表单字段通常包含 `formData`、`current`、`parent`、`value`、`field`、`index`、`isView`；表格列或行按钮还可能包含 `record`、`text`、`column`、`selectedRows`、`selectedRowKeys`、`tableRef`。回调只读取当前场景确实提供的字段。

### 常用默认配置：满足需求时不要重复生成

以下是库的内置默认值。生成代码前应先检查消费项目是否通过安装配置、`setDefaultProps()` 或二次封装覆盖了它们；没有覆盖且默认行为满足需求时，省略对应配置。

| 场景 | 内置默认行为 | 通常不需要生成 |
| --- | --- | --- |
| 表单栅格 | 子项 `span` 默认 `8`，即一行 3 项；`gutter` 默认 `16` | `subSpan: 8`、逐项 `span: 8`、`gutter: 16` |
| 容器布局 | 未设置 `span` 的容器默认独占一块 | 仅为独占一行而生成 `block: true` |
| 输入占位符 | `Input`、`InputNumber`、`Textarea`、`AutoComplete` 默认“请输入 + label” | 与默认文案相同的 `attrs.placeholder` |
| 选择占位符 | `Select`、`TreeSelect` 默认“请选择 + label” | 与默认文案相同的 `attrs.placeholder` |
| 表单校验 | `FormItem.validateFirst` 默认 `true` | `formItemProps: { validateFirst: true }` |
| 输入组合 | `InputGroup` 默认使用紧凑布局 | `attrs: { compact: true }` |
| 日期时间值 | `DatePicker`、`DateRange` 默认 `YYYY-MM-DD`；`TimePicker`、`TimeRange` 默认 `HH:mm:ss` | 相同的 `attrs.valueFormat` |
| 选项只读展示 | 配置 `options` 后默认按 Tag 展示，并使用内置颜色组 | `tagViewer: true` |
| 表格首次查询 | `immediate` 默认 `true` | `immediate: true` |
| 表格分页 | 默认不分页；启用分页后 `current` 默认 `1`、`pageSize` 默认 `10` | 无分页时的 `pagination: false`；标准分页时重复写页码和每页数量 |
| 查询表单按钮 | 未启用 `searchOnChange` 时默认生成 `search`、`reset` | `buttons: { actions: ['search', 'reset'] }` |

生成时还应遵循：

- 不生成没有实际内容的 `attrs: {}`、`rules: []`、`options: []`、`rowProps: {}` 或 `params: {}`。
- 不生成 `initialValue: undefined`，也不要为未提出的功能预置 `hidden: false`、`disabled: false`等开关。
- 仅在覆盖默认占位符、格式、布局或行为时输出对应属性。
- 表单 `buttons` 没有默认动作；只有页面确实需要表单按钮时才配置。查询表单的默认搜索、重置按钮不需要重复声明。

### 当前内置类型

表单字段：

```text
Input, Textarea, InputNumber, AutoComplete, Select, TreeSelect,
DatePicker, DateRange, TimePicker, TimeRange, Switch, Radio, Checkbox,
Upload, TagInput, TagSelect, Text, HTML, Hidden, InputSlot, InfoSlot
```

容器：

```text
Form, Group, Fragment, Card, List, ListGroup, Tabs, Collapse,
Descriptions, Table, InputGroup, InputList
```

`Fragment` 为 `0.6.16` 新增。消费项目仍锁定 `0.6.15` 时不要生成它。

表格列允许省略 `type`，此时它是只读文本列；需要出现在编辑表单中的列必须指定有效字段类型。

### 数组对象编辑组件选型

表单字段需要编辑对象数组时，可根据每项的字段数量和布局复杂度选择 `InputList`、`List`、`ListGroup` 或 `Table`：

- 字段较少，并且一项内容可以在一行内排下：优先使用 `InputList`。
- 一项内容需要多行展示：使用 `List` 或 `ListGroup`。
- 字段更多、列结构更明确，或需要更复杂的行级展示与操作：使用 `Table`。

### 校验

简单必填直接使用字段顶层的 `required: true`，不要写成 `rules: { required: true }`：

```ts
{
  type: 'Input',
  label: '姓名',
  field: 'name',
  required: true,
}
```

同一字段的多种校验可以合并在一个 `rules` 对象中。若这些校验需要分别显示不同的提示语，再使用规则数组：

```ts
// 多种校验共用一个规则对象
{
  type: 'Input',
  label: '手机号',
  field: 'mobile',
  rules: { required: true, type: 'mobile' },
}

// 不同校验需要不同提示语时拆成数组
{
  type: 'Input',
  label: '手机号',
  field: 'mobile',
  rules: [
    { required: true, message: '请输入手机号' },
    { type: 'mobile', message: '请输入正确的手机号' },
    {
      validator: ({ current }, value) =>
        value === current.backupMobile ? new Error('手机号不能相同') : true,
    },
  ],
}
```

内置扩展校验类型包括 `email`、`integer`、`number`、`idcard`、`phone`、`mobile`、`twoDecimal`、`word`。自定义校验器返回 `false`、`Error` 或 rejected Promise 时校验失败。

### 只读展示与插槽

- 普通字段使用 `viewRender(effectData)` 自定义表格或详情展示。
- `viewRender` 可以是函数，也可以是根组件插槽名。
- `InputSlot` 使用 `render({ props, ...effectData })` 自定义输入控件。
- `InfoSlot` 使用 `render({ props, ...effectData })` 自定义非输入内容。
- `HTML` 直接使用 `innerHTML`，只能展示可信内容；库不会清洗 HTML。

```vue
<SuperTable @register="register">
  <template #status="{ record }">
    <a-switch :checked="record.status === 1" />
  </template>
</SuperTable>
```

```ts
{
  type: 'Select',
  field: 'status',
  label: '状态',
  options: statusOptions,
  viewRender: 'status',
}
```

## 5. SuperForm

推荐注册模式：

```vue
<template>
  <SuperForm @register="register" />
</template>

<script setup lang="ts">
import { SuperForm, useForm } from 'antdv-superform'

const [register, form] = useForm({
  subSpan: 12,
  attrs: { layout: 'horizontal' },
  buttons: { actions: ['submit', 'reset'] },
  subItems: [
    { type: 'Hidden', field: 'id' },
    { type: 'Input', label: '名称', field: 'name', required: true },
    {
      type: 'Select',
      label: '状态',
      field: 'status',
      options: [
        { label: '启用', value: 1 },
        { label: '停用', value: 0 },
      ],
    },
  ],
})

async function save() {
  const data = await form.submit()
  await api.save(data)
}
</script>
```

也可直接传 schema：

```vue
<SuperForm :schema="schema" :data-source="record" />
```

`useForm` 返回的稳定动作：

```ts
form.submit()
form.resetFields(data?)
form.setFieldsValue(partial)
form.getData()
await form.getForm()
form.dataSource
```

注意：

- `submit()` 先校验和等待 Upload 等子组件提交任务，再返回深拷贝数据。
- schema 的 `onSubmit(data)` 返回 `false` 或 `{ errMessage }` 可阻止提交。
- `dataSource` 是表单绑定的数据模型。初始化时库会按 schema 补齐字段并直接修改该对象；除非需要与外部对象双向绑定，不要指定或动态替换它。
- `resetFields()` 恢复 schema 中定义的初始值；传入 `data` 时按已建立的数据模型字段回填。数组值整体复制，需要随表单提交或回显的主键、上下文字段应声明为 `Hidden`。
- `setFieldsValue(partial)` 用于局部赋值，只更新 schema 已建立且传入的字段；整体回填一条记录使用 `resetFields(record)`。
- `ignoreRules: true` 会关闭校验并隐藏必填标识，适合搜索表单，不适合编辑表单。
- 按钮 `placement: 'inline'` 为 `0.6.16` 新增。

## 6. 选项、字典和值映射

`Select`、`Radio`、`Checkbox`、`Switch` 等选项型字段支持：

- `{ label, value }[]`
- 原始值数组
- `{ [value]: label }` 对象
- `ref`
- 返回数组或 Promise 的函数
- `dictName`，前提是安装时配置了 `dictApi`

推荐始终使用对象数组：

```ts
options: [
  { label: '管理员', value: 'admin' },
  { label: '普通用户', value: 'user' },
]
```

原始值数组强制使用元素本身作为 label 和 value。配置 `valueToNumber: true` 时，为兼容旧用法，改用数字下标作为 value。原始值数组含义不如对象数组明确，一般不要生成；当前也不支持 Select 分组选项。

常用转换：

- `labelField: 'statusName'`：同时把选中项 label 保存到另一个字段。
- `valueToNumber: true`：将选项 value 转为 number。
- `labelAsValue: true`：将选项 label 作为字段值。
- `stringifyValue: true`：将控件结果转换为字符串后写回模型；多选值表现为逗号分隔字符串。该转换不支持转义，值本身不能含逗号。
- `tagViewer: false`：只读模式不渲染 Tag。

远程搜索：

```ts
{
  type: 'Select',
  field: 'userId',
  label: '用户',
  attrs: { showSearch: true, filterOption: false },
  options: (_effectData, keyword) => api.searchUsers(keyword),
}
```

远程搜索使用函数形式的 `options(effectData, keyword)`；需要自行控制搜索事件时配置 `onSearch`。

`DateRange` 和 `TimeRange` 可把范围拆到两个字段：

```ts
{
  type: 'DateRange',
  label: '创建时间',
  field: 'startTime',
  endField: 'endTime',
}
```

`field` 保存开始值，`endField` 保存结束值；`DateRange` 默认格式为 `YYYY-MM-DD`，`TimePicker` 和 `TimeRange` 默认格式为 `HH:mm:ss`。不配置 `endField` 时，可设置 `stringifyValue: true`，将范围作为逗号分隔字符串保存到 `field`。`endField` 与 `stringifyValue` 同时配置时优先拆分到两个字段。

## 7. SuperTable

推荐模式：

```vue
<template>
  <SuperTable @register="register" />
</template>

<script setup lang="ts">
import { SuperTable, useTable } from 'antdv-superform'

const [register, table] = useTable({
  isContainer: true,
  pagination: { pageSize: 20 },
  apis: {
    query: api.page,
    info: api.detail,
    save: api.add,
    update: api.edit,
    delete: (keys, rows) => api.remove(keys),
  },
  attrs: {
    rowKey: 'userId',
    rowSelection: {},
  },
  params: {
    departmentId: selectedDepartmentId,
  },
  searchForm: {
    subSpan: 'auto',
    subItems: ['name', 'status'],
  },
  columns: [
    { type: 'Input', label: '姓名', field: 'name', required: true },
    { type: 'Select', label: '状态', field: 'status', dictName: 'status' },
  ],
  rowEditor: {
    editMode: 'modal',
    addMode: 'modal',
    form: { subSpan: 12 },
    modalProps: { width: 800 },
  },
  buttons: { actions: ['add', 'delete'] },
  rowButtons: {
    actions: ['detail', 'edit', 'delete'],
    columnProps: { width: 140 },
  },
})
</script>
```

### 查询契约

请求参数按以下顺序合并，后者覆盖前者：

```text
分页参数 → searchForm 参数 → params 动态参数 → query(param) 临时参数
```

- 默认分页参数是 `{ current, size }`，可通过全局 `tableApiSetting` 改名。
- `pagination` 默认是 `false`；需要分页时必须显式配置。
- `immediate` 必须放在表格 schema 顶层。`immediate: false` 禁止首次自动查询。
- `params` 支持普通对象、reactive/ref/computed 组合；变化后会自动从第一页查询。
- `beforeQuery(params)` 可返回新的请求参数。
- `afterQuery(result)` 可返回新的响应结果。
- 查询响应可以是数组，或 `{ current, size, total, records }`。
- 其他后端响应结构必须在 `afterQuery` 或全局 `resultTransform` 中转换。

查询表单控件可以通过 `value` 与 `params` 共用同一个 Ref。控件变化会更新 `params`，从而立即触发表格查询，无需配置 `searchForm.searchOnChange`：

```ts
const status = ref()

const [register, table] = useTable({
  params: { status },
  searchForm: {
    subItems: [
      {
        type: 'Select',
        field: 'status',
        label: '状态',
        value: status,
        options: [
          { label: '启用', value: 1 },
          { label: '停用', value: 0 },
        ],
      },
    ],
  },
})
```

```ts
afterQuery: (result) => ({
  current: result.pageNum,
  size: result.pageSize,
  total: result.totalCount,
  records: result.list,
})
```

`searchForm.subItems` 可以引用同名列字段；查询字段与编辑字段配置不同时，应写完整查询项。列字段未指定type时，默认是`Input`。

`searchForm.searchOnChange: true` 会监听搜索数据并自动查询；否则默认生成 `search`、`reset` 按钮。`limit` 用于折叠超出数量的搜索项，`teleport` 可把搜索表单传送到指定选择器。

### 表格动作

`useTable` 常用动作：

```ts
table.reload()                 // 保留当前页和查询条件刷新
table.query(params?)           // 临时参数查询，并回到第一页
table.resetSearchForm(data?)
table.getQueryParams()
table.setColumns(columns)
table.setData(rows)
table.getData()
table.goPage(page)
table.setSelectedRows(rows)
table.setExpandedRowKeys(keys)
table.expandAll()
table.add({ resetData })
table.edit({ record })
table.delete()
table.detail({ record })
table.validate()
```

`getQueryParams()` 只返回当前 `searchForm` 参数与动态 `params` 的合并结果，不包含分页参数，也不会记住上一次 `query(param)` 的临时参数。导出接口需要分页信息时应由业务代码显式补充。

`reload()` 保留当前页和查询条件，`query(params?)` 会回到第一页，`goPage()` 切换分页；三者都会直接发起请求并返回对应 Promise。

表格查询遵循“最后一次生效”。`apis.query` 的第二个参数提供 `{ signal }`，使用 fetch 或 Axios 时应传递该信号，并在业务错误提示中忽略 `AbortError`。

`asyncCall` 是底层逃生口。存在上述明确动作时不要生成 `asyncCall('...')`。

### rowKey、选择和本地数据

- 默认行主键是 `id`。业务表应通过 `attrs.rowKey` 显式设置稳定主键，临时生成的主键不会写入业务数据。
- 行选择使用 `attrs.rowSelection: {}` 或完整 Ant Design Vue rowSelection 对象；关闭时使用 `false` 或省略。
- 没有 `apis.query` 时，可用 `dataSource`、`useTable(option, dataRef)` 或 `table.setData(rows)` 管理本地数据。

### 编辑方式选择

| 编辑方式 | 配置入口 | 适用场景 |
| --- | --- | --- |
| 单列编辑 | 列配置 `editable: true` | 适合 `Switch` 开关等单个字段的即时操作 |
| 全表编辑 | 表格配置 `editable: true` | 适合编辑多行、多列，完成整表校验后整体保存 |
| 行内编辑 | `rowEditor.editMode: 'inline'` | 适合少量内容的单行编辑、单行校验或单行提交保存 |
| 弹窗编辑 | `rowEditor.editMode: 'modal'` | 适合存在交互逻辑，或需要编辑、校验较多未在表格展示的数据 |

- 单列编辑直接修改当前记录，通常在字段的 `onChange` 中调用接口保存。
- 全表编辑使用 `table.validate()` 完成整表校验，再通过 `table.getData()` 获取数据并整体保存。
- 行内编辑通过当前行的保存、取消按钮控制提交；`rowEditor.onSave(context)` 返回 `false` 可阻止内置保存。
- 弹窗编辑可用 `rowEditor.form.subItems` 配置独立于表格列的编辑字段，并在表单中处理联动与校验。

### 内置 CRUD

- `apis.info` 调用形式为 `info(rowKeyValue, row)`。
- `apis.save` 接收新增表单数据。
- `apis.update` 接收编辑后的完整表单数据。
- `apis.delete` 调用形式为 `delete(keys, rows)`。
- save/update/delete 成功后会刷新查询。
- modal 编辑优先使用 `rowEditor.editMode: 'modal'`。
- inline 编辑使用 `rowEditor.editMode: 'inline'`。
- `rowEditor.onSave(context)` 返回 `false` 可阻止内置保存。
- `rowEditor.onCancel(context)` 在取消关闭前执行。
- `rowEditor.form.subItems` 可单独指定编辑表单字段；省略时复用 columns。

## 8. 按钮

内置名称：

```text
add, delete, edit, detail, submit, search, reset
```

字符串按钮只有在当前组件提供对应方法时才有动作。例如表格要使用内置 `add/edit`，必须配置相应 `rowEditor`；否则应提供自定义 `onClick`。

```ts
buttons: {
  align: 'left',
  limit: 4,
  actions: [
    'add',
    'delete',
    {
      name: 'export',
      label: '导出',
      roleName: 'export',
      attrs: { loading: true },
      onClick: () => api.export(table.getQueryParams()),
    },
  ],
}
```

覆盖真实内置动作时，第二个参数是原动作：

```ts
{
  name: 'add',
  onClick: (context, action) => action({ resetData: { status: 1 } }),
}
```

不要对 `export`、`import`、`download` 等自定义名字调用第二个 `action`；库没有提供这些内置动作。

其他规则：

- `confirmText` 在执行动作前弹出确认框。
- `hidden(context)`、`disabled(context)` 支持响应式判断。
- `labelMode` 支持 `icon`、`label`、`both`。
- `limit` 把超出按钮放入“更多”。
- `roleName` 配合全局 `buttonRoles()` 过滤权限。
- `visibleIn` 使用 `form`、`detail` 或 `both` 控制按钮可见场景。
- 无权限默认隐藏；设置 `unauthorized: 'disable'` 时改为禁用，使用 `unauthorized: 'hide'` 时隐藏。
- 行按钮上下文包含 `record`、`index` 等列渲染信息。
- 工具栏按钮上下文包含 `selectedRows`、`selectedRowKeys`、`tableRef`。

`apis.export` 虽然仍出现在类型声明中，但当前运行时没有消费它。导出必须写成自定义按钮并显式调用接口。

## 9. SuperDetail

```vue
<SuperDetail :schema="detailSchema" :data-source="record" />
```

```ts
import { defineDetail } from 'antdv-superform'

const detailSchema = defineDetail({
  mode: 'table',
  subSpan: 12,
  attrs: { bordered: true },
  subItems: [
    { field: 'name', label: '名称' },
    { field: 'status', label: '状态', dictName: 'status' },
  ],
})
```

需要命令式更新时：

```ts
const [register, detail] = useDetail(detailSchema, initialData)
detail.setData(record)
```

详情会复用字段的 `labelField`、`endField`、options/dict、`tagViewer`、`viewRender` 和扩展组件只读展示逻辑。用 `exclude: ['description']` 排除字段。

## 10. 弹窗

### 弹窗表单

```ts
const modal = useModalForm(
  {
    title: '编辑用户',
    subSpan: 24,
    subItems: [
      { type: 'Hidden', field: 'id' },
      { type: 'Input', label: '姓名', field: 'name', required: true },
    ],
  },
  {
    width: 600,
    maskClosable: false,
    onOk: (data) => api.save(data),
  }
)

modal.openModal({ data: record })
modal.closeModal()
modal.setModal({ title: '修改用户' })
modal.formActions.resetFields()
```

`onOk` 成功 resolve 后关闭；抛错或 reject 时保留弹窗。`openModal({ data })` 会先把数据写入表单。

### 自定义内容弹窗

```ts
const modal = useModal(
  () => h(CustomPanel),
  { title: '预览', width: 900 }
)

await modal.openModal()
```

`useModal`/`createModal` 直接使用 DOM，只能在浏览器环境和 Vue setup 生命周期中使用，不要在 SSR 服务端执行。

## 11. Upload

支持的 `uploadMode`：

| 模式 | 行为 |
| --- | --- |
| `auto` | 选中文件后立即调用 `apis.upload` |
| `submit` | 表单提交时统一上传等待中的文件 |
| `custom` | 不调用上传 API，由业务读取原始文件 |
| `base64` | 读取成 base64 |
| `text` | 读取成文本 |

导入文件推荐：

```ts
const importModal = useModalForm(
  {
    subItems: [
      {
        type: 'Upload',
        label: '导入文件',
        field: 'file',
        required: true,
        attrs: {
          accept: '.xlsx',
          isSingle: true,
          uploadMode: 'custom',
        },
      },
    ],
  },
  {
    onOk: ({ file }) => {
      const data = new FormData()
      data.append('file', file.originFileObj)
      return api.import(data)
    },
  }
)
```

关键属性：

- `isSingle`：单文件，字段值为单个对象或 `valueKey` 对应值。
- `valueKey`：只保存文件对象的一个属性。
- `vModelFields: { fileList: 'files' }`：把完整文件列表同步到另一个字段。
- `infoNames`：把后端文件属性映射到 `uid`、`name`、`url`。
- `maxSize`、`minSize` 的单位是 MB。
- `hideOnMax`：达到最大数量时隐藏上传入口。
- `repeatable`：是否允许同名文件，默认不允许。

`auto`/`submit` 模式必须提供 `attrs.apis.upload` 或全局 `defaultProps.Upload.apis.upload`。`custom` 模式会保留 `originFileObj`。

## 12. 扩展字段

```ts
import superForm from 'antdv-superform'
import ModalSelect from './ModalSelect.vue'

superForm.registerComponent('ModalSelect', ModalSelect)
```

使用：

```ts
{
  type: 'ExtModalSelect',
  field: 'lawIds',
  labelField: 'lawNames',
  label: '法律依据',
  vModelFields: {
    selectedItems: 'lawItems',
  },
  attrs: {
    multiple: true,
  },
}
```

扩展组件会收到：

- `option`
- `effectData`
- `value` / `onUpdate:value`
- 合并后的 `attrs`
- `isView`、`disabled`
- `labelField` 对应的 `labelValue` / `onUpdate:labelValue`
- `vModelFields` 声明的其他双向绑定

业务项目定义的 `ExtModalSelect`、`ExtLinkUnit` 等不是 npm 包内置类型。只有消费项目完成注册后才能使用。

## 13. 不要生成的旧 API

| 不要使用 | 现行写法 |
| --- | --- |
| `hideInTable` | `exclude: ['table']` |
| `hideInForm` | `exclude: ['form']` |
| `hideInDescription` | `exclude: ['description']` |
| 表格根级 `editMode` / `addMode` | `rowEditor.editMode` / `rowEditor.addMode` |
| `editForm` | `rowEditor.form` |
| 表格 `edit` | `editable`，或按场景使用 `rowEditor` |
| `searchSchema` | `searchForm` |
| TreeSelect `data` | `treeData`；当前版本优先使用返回数据的函数 |
| `validOn` | `visibleIn` |
| `invalidDisabled: true` | `unauthorized: 'disable'` |
| `roleMode: 'hidden' \| 'disable'` | `unauthorized: 'hide' \| 'disable'` |
| `form.setData(data)` | `form.resetFields(data)` |
| `table.request(params)` | `table.query(params)` 或 `table.reload()` |
| `labelBgColor` / `borderColor` | 使用项目主题或样式变量 |
| 安装配置 `tagColors` | `tagViewer` |
| `valueToLabel` | `labelAsValue` |
| `valueToString` | `stringifyValue` |
| `blocked` | `block` |
| `wrapping` | `breakAfter` |
| 按钮配置 `forSlot` | `targetSlot` |
| `registComponent` | `registerComponent` |
| DateRange `keepField` | `endField` |

以下内容也不要假定存在：

- `apis.export` 的自动导出行为
- `InputPassword`、`RadioGroup`、`CheckboxGroup`、`Rate` 内置字段
- `rowSelection: true` 的正式类型支持；使用 `{}`
- 未注册的任意 `Ext*` 组件

## 14. 生成完成后的自检

1. 所有 import 都来自包根入口或消费项目已有封装。
2. 字段类型在内置列表中，或已确认存在对应 `registerComponent`。
3. 表格显式设置了稳定 `attrs.rowKey`。
4. 分页需求明确配置了 `pagination`。
5. `immediate`、`params`、`searchForm` 位于表格 schema 正确层级。
6. 新代码没有使用第 13 节中的旧 API。
7. 新增、编辑、删除接口签名符合第 7 节契约。
8. 自定义导入/导出按钮没有假设不存在的内置 action。
9. 需要随表单提交的 id 和上下文字段已声明为 `Hidden`。
10. Upload 模式、字段值形态和后端接口一致。
11. 动态回调只读取当前上下文确实提供的数据。
12. 运行消费项目的 TypeScript 检查；不要仅凭 schema 能渲染就认为 API 正确。
