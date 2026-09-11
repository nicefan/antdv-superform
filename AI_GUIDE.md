# antdv-superform AI 使用指南

> Vue 3.3+、Ant Design Vue 3.2+、TypeScript

本文只描述业务代码需要使用的现行公开 API。按层阅读：先执行第一层，再按任务查阅第二层；第三层仅在涉及对应能力时参考。

## 第一层：生成代码必须遵守

1. 只从 `antdv-superform` 包根或消费项目已有封装导入。
2. 先检查项目是否已统一配置字典、权限、上传、默认按钮、组件替换和扩展字段，不在页面重复配置。
3. 字段、主键、接口签名和响应结构必须来自业务类型或现有调用，不根据中文标签猜测。
4. `attrs` 只承载底层 Ant Design Vue 属性；库级行为放在 schema 对应层级。
5. 自定义字段必须先用 `registerComponent` 注册，不虚构字段类型。
6. 表格 CRUD 以 `columns` 为字段语义源，优先保证搜索、展示、新增、编辑和详情一致。
7. 简单渲染可用函数；出现较深的 `h()` 或 `slots` 嵌套时，改用具名 Vue slot 和字符串引用。
8. 不生成空配置、重复默认值或未提出的功能；完成后运行消费项目的 TypeScript 检查。

可用诊断：

```bash
npx antdv-superform init-ai
npx antdv-superform diagnose-schema schema.json --type form|table|detail
```

动态 schema 使用包根导出的 `diagnoseSchema(schema, type)`；安装时可启用 `schemaDiagnostics: import.meta.env.DEV`。

## 第二层：核心场景

### 1. Schema 通用规则

```ts
{
  type: 'Input',
  field: 'profile.name',
  label: '姓名',
  initialValue: '',
  required: true,
  dynamicAttrs: ({ current }) => ({ maxlength: current.shortName ? 20 : 50 }),
  hidden: ({ current }) => !current.enabled,
  exclude: ['description'],
  span: 12,
}
```

- `field` 支持点路径；`initialValue` 初始化字段；`value: externalRef` 与外部 Ref 双向绑定。
- `attrs` 是底层属性；`dynamicAttrs`、`hidden`、`disabled`、`required` 支持动态计算。
- `span` 使用 24 栅格；`subSpan` 是子项默认跨度；`block` 独立成块；`breakAfter` 后换行。
- 事件写在字段顶层，如 `onChange(effectData, value)`，也可使用 `on.change`。
- `computed(value, effectData)` 持续计算并回写字段，避免循环更新；`onUpdate` 在存储值变化时触发。

`exclude` 表示从场景排除，而不是字段用途列表：

| 需求 | 配置 |
| --- | --- |
| 仅编辑 | `exclude: ['table', 'description']` |
| 只在表格和详情展示 | `exclude: ['form']` |
| 表格展示、详情隐藏 | `exclude: ['description']` |

合法值只有 `table`、`form`、`description`。优先用它控制复用范围，不为少量差异复制字段配置。

`effectData`：表单通常提供 `formData`、`current`、`parent`、`value`、`field`、`index`、`isView`；表格还可能提供 `record`、`text`、`column`、选择状态和 `tableRef`。只读取当前场景确定存在的值。

默认表单一行 3 项（`subSpan: 8`）、`gutter: 16`；输入和选择自动生成占位符；日期默认 `YYYY-MM-DD`，时间默认 `HH:mm:ss`；选项只读时默认按 Tag 展示；表格默认立即查询并分页；查询表单默认带搜索和重置。满足需求时不要重复生成。

不要生成空的 `attrs`、`rules`、`options`、`rowProps`、`params`，也不要生成 `initialValue: undefined`、`hidden: false`、`disabled: false`。

#### 校验

简单必填使用 `required: true`。多种校验共用提示时使用一个 `rules` 对象，需要不同提示时使用数组。内置扩展类型：`email`、`integer`、`number`、`idcard`、`phone`、`mobile`、`twoDecimal`、`word`。

```ts
rules: [
  { required: true, message: '请输入手机号' },
  { type: 'mobile', message: '手机号格式不正确' },
  { validator: ({ current }, value) => value === current.backupMobile ? new Error('手机号不能相同') : true },
]
```

校验器返回 `false`、`Error` 或 rejected Promise 时失败。`required` 与非空 `rules` 同时存在时，在 `rules` 中明确写必填规则。

#### 只读展示和 slot

- `viewRender` 自定义表格或详情展示，可传函数或根组件 slot 名。
- `InputSlot` 用 `render({ props, ...effectData })` 自定义输入；`InfoSlot` 自定义非输入内容。
- 字段 `slots` 的值可以是函数或根组件 slot 名。
- `HTML` 只展示可信内容，库不会清洗。

```vue
<SuperTable @register="register">
  <template #status="{ record }"><a-switch :checked="record.status === 1" /></template>
</SuperTable>
```

```ts
{ type: 'Select', field: 'status', label: '状态', dictName: 'status', viewRender: 'status' }
```

### 2. SuperForm

```ts
const [register, form] = useForm({
  subSpan: 12,
  subItems: [
    { type: 'Hidden', field: 'id' },
    { type: 'Input', field: 'name', label: '名称', required: true },
    { type: 'Select', field: 'status', label: '状态', dictName: 'status' },
  ],
})
```

模板使用 `<SuperForm @register="register" />`，也可直接传 `schema` 和 `data-source`。

```ts
form.submit()
form.resetFields(data?)
form.setFieldsValue(partial)
form.getData()
await form.getForm()
form.dataSource
```

- `submit()` 校验并等待 Upload 等子任务，返回深拷贝数据；`onSubmit` 返回 `false` 或 `{ errMessage }` 可阻止提交。
- `dataSource` 是绑定对象，库会按 schema 补齐字段；仅在需要外部双向绑定时传入。
- `resetFields(record)` 整体回填；`setFieldsValue(partial)` 只更新已建立且传入的字段。
- 需要提交或回显的主键、上下文字段声明为 `Hidden`。
- `ignoreRules: true` 只用于搜索等无需校验的表单。

### 3. SuperTable

#### CRUD 一致性

1. `columns` 定义字段、字典、格式化和只读渲染。
2. `searchForm.subItems` 优先引用同名字段字符串；查询行为不同才写完整项。
3. 弹窗编辑与列接近时省略 `rowEditor.form.subItems`，自动复用排除 `form` 后的列。
4. 详情使用内置 `detail` 和 `apis.info`，自动复用排除 `description` 后的列。
5. 编辑表单在字段数量、布局、容器或联动上差异较大时，使用 `rowEditor.form` 独立配置，但仍走内置 CRUD，不另建 modal。

```ts
const [register, table] = useTable({
  attrs: { rowKey: 'userId', rowSelection: {} },
  apis: {
    query: api.page,
    info: api.detail,
    save: api.add,
    update: api.edit,
    delete: (keys, rows) => api.remove(keys),
  },
  searchForm: { subItems: ['name', 'status'] },
  rowEditor: { editMode: 'modal', addMode: 'modal' },
  buttons: { actions: ['add', 'delete'] },
  rowButtons: { actions: ['detail', 'edit', 'delete'] },
  columns: [
    { type: 'Input', field: 'name', label: '姓名', required: true },
    { type: 'Select', field: 'status', label: '状态', dictName: 'status' },
    { field: 'createdAt', label: '创建时间', exclude: ['form'] },
  ],
})
```

推荐顺序：顶层属性 → `attrs` → `apis` → `params` → 查询转换/事件 → `searchForm` → `rowEditor` → 按钮 → `tabs` → `columnProps` → `columns`。

#### 查询

参数覆盖顺序：分页 → `searchForm` → 动态 `params` → `query(param)` 临时参数。

- `immediate: false` 禁止首次查询；`params` 支持普通对象和 reactive/ref/computed，变化后回到第一页查询。
- `beforeQuery` 转换请求参数；响应应为数组或 `{ current, size, total, records }`，其他结构用 `afterQuery` 或全局 `resultTransform` 转换。
- `searchOnChange: true` 随控件变化查询；否则使用默认按钮。`limit` 折叠字段，`teleport` 指定挂载位置。
- `query`、`reload` 使用约 300ms 尾部节流，同一窗口只执行最后一次调用；两者用于触发调度，不提供稳定的可等待 Promise。

```ts
table.query(params?)       // 回到第一页
table.reload()             // 保留当前分页
await table.goPage(page)   // 立即请求
table.getQueryParams()     // 不含分页和上次临时参数
table.resetSearchForm(data?)
```

#### 编辑与动作

| 方式 | 配置 | 用途 |
| --- | --- | --- |
| 单列编辑 | 列 `editable: true` | 单字段即时修改 |
| 全表编辑 | 表格 `editable: true` | 整表校验、整体保存 |
| 行内编辑 | `rowEditor.editMode: 'inline'` | 单行校验和提交 |
| 弹窗编辑 | `rowEditor.editMode: 'modal'` | 字段或交互较多 |

- `rowEditor.onSave` 返回 `false` 可阻止保存；`onCancel` 在取消前执行。
- `apis.info(rowKeyValue, row)`；`save(data)`；`update(data)`；`delete(keys, rows)`。
- 保存、更新和删除成功后自动刷新；业务表应配置稳定且唯一的 `attrs.rowKey`。
- 本地数据使用 `dataSource`、`useTable(option, dataRef)` 或 `table.setData(rows)`。

常用动作：`add`、`edit`、`delete`、`detail`、`validate`、`getData`、`setData`、`setSelectedRows`、`setExpandedRowKeys`、`expandAll`。

#### 独立编辑表单复用 SuperTable slot

`rowEditor.form.subItems` 的 `render`、`viewRender` 和字段 `slots` 可引用当前表格的具名 slot：

```vue
<SuperTable @register="register">
  <template #accountEditor="{ props, current }">
    <AccountEditor v-bind="props" :department-id="current.departmentId" />
  </template>
</SuperTable>
```

```ts
rowEditor: {
  editMode: 'modal',
  addMode: 'modal',
  form: {
    subItems: [
      { type: 'Hidden', field: 'id' },
      { type: 'Input', field: 'name', label: '姓名', required: true },
      { type: 'InputSlot', field: 'account', label: '账号', render: 'accountEditor' },
    ],
  },
}
```

### 4. 按钮、详情与独立弹窗

按钮名：`add`、`delete`、`edit`、`detail`、`submit`、`search`、`reset`。字符串动作只有在组件提供对应方法时才生效。`confirmText` 执行前确认；`hidden`/`disabled` 支持函数；`limit` 收入“更多”；`roleName` 配合 `buttonRoles()`；`unauthorized` 使用 `hide` 或 `disable`。

表格 CRUD 优先使用内置详情和编辑弹窗。独立业务才使用：

```ts
const modal = useModalForm(
  { subItems: [{ type: 'Input', field: 'name', label: '姓名', required: true }] },
  { width: 600, onOk: (data) => api.save(data) },
)
modal.openModal({ data: record })
```

`onOk` resolve 后关闭，抛错或 reject 时保留。任意内容弹窗使用 `useModal(() => h(CustomPanel), props)`。弹窗 API 依赖 DOM，只在浏览器和 Vue setup 生命周期中使用。

## 第三层：能力速查

### 1. 字段、容器与数组编辑

字段：`Input`、`Textarea`、`InputNumber`、`AutoComplete`、`Select`、`TreeSelect`、`DatePicker`、`DateRange`、`TimePicker`、`TimeRange`、`Switch`、`Radio`、`Checkbox`、`Upload`、`TagInput`、`TagSelect`、`Text`、`HTML`、`Hidden`、`InputSlot`、`InfoSlot`。

容器：`Form`、`Group`、`Fragment`、`Card`、`List`、`ListGroup`、`Tabs`、`Collapse`、`Descriptions`、`Table`、`InputGroup`、`InputList`。

对象数组一行少量字段用 `InputList`，多行布局用 `List`/`ListGroup`，明确列结构或复杂行操作用 `Table`。 `InputList`/`ListGroup`会固定保留一行。


### 2. 选项和值

选项支持对象数组、原始值数组、键值对象、Ref、同步/异步函数和 `dictName`，推荐 `{ label, value }[]`。当前不支持 Select 分组选项。

- `labelField` 同步 label；`valueToNumber` 转数字；`labelAsValue` 以 label 为值。
- `stringifyValue` 转字符串，多选以逗号连接且值不能含逗号；`tagViewer: false` 关闭只读 Tag。
- 远程搜索使用 `attrs: { showSearch: true, filterOption: false }` 和 `options(effectData, keyword)`。
- `DateRange`/`TimeRange` 用 `endField` 分别保存开始、结束，否则可用 `stringifyValue` 保存到单字段。

### 3. Upload

模式：`auto` 立即上传；`submit` 提交时上传；`custom` 保留原始文件；`base64`/`text` 读取内容。

- `auto`/`submit` 需要 `attrs.apis.upload` 或全局接口。
- `isSingle` 控制单文件；`valueKey` 只保存指定属性；`vModelFields` 可同步完整列表。
- `infoNames` 映射 `uid`、`name`、`url`；`maxSize`/`minSize` 单位为 MB；`hideOnMax` 达上限后隐藏入口。

### 4. 安装、扩展与导出

安装配置包括 `dictApi`、`buttonRoles`、`tableApiSetting`、`defaultProps`、`components`。注册扩展组件：

```ts
app.use(superForm, { dictApi, buttonRoles, defaultProps })
superForm.registerComponent('ModalSelect', ModalSelect)
```

注册名 `ModalSelect` 在 schema 中使用 `ExtModalSelect`。扩展组件接收 `option`、`effectData`、合并属性、value 双向绑定、`isView`、`disabled`，以及 `labelField`、`vModelFields` 声明的绑定。

公共 API：`SuperForm/useForm/defineForm`、`SuperTable/useTable/defineTable`、`SuperDetail/useDetail/defineDetail`、`createModal/useModal/useModalForm`、`SuperButtons/useButtons`、默认导出 `superForm`、`diagnoseSchema`。

常用类型：`UniOption`、`ExtColumnsItem`、`ExtFormOption`、`ExtDescriptionsOption`、`RootTableOption`、`ButtonItem`、`ExtButtons`。

## 生成完成后的自检

1. import 来自包根或项目封装；字段类型已内置或注册。
2. 字段、主键和接口签名来自业务定义。
3. CRUD、搜索、编辑和详情优先复用 `columns`，`exclude` 正确。
4. 表格设置稳定 `rowKey`，查询配置层级正确。
5. 需要提交或回显的隐藏字段已纳入 schema。
6. 回调只读取当前上下文提供的数据；复杂渲染使用具名 slot。
7. Upload 模式、字段值和接口一致。
8. 没有空配置、重复默认值或无关预留功能。
9. TypeScript 检查通过。
