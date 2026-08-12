# 数组与表格

List、ListGroup、InputList 和 Table 都用 `field` 绑定数组，用 `columns` 描述每个元素。它们共享字段校验、只读映射和按钮体系，但布局、空数组行为和编辑能力不同。

## 选型对比

| 类型      | 最适合                             | 数据形态             | 空数组行为   |
| --------- | ---------------------------------- | -------------------- | ------------ |
| InputList | 字段少，一项能在一行完成           | 对象数组或原始值数组 | 至少保留一项 |
| ListGroup | 一项需要多行、标题或分组           | 对象数组             | 至少保留一项 |
| List      | 内容较多，需要列表外观和工具栏     | 对象数组             | 允许为空     |
| Table     | 字段多、列结构明确、选择或编辑复杂 | 对象数组             | 允许为空     |

```ts
initialValue: () => [];
```

数组初始值建议使用函数，避免多个表单实例共享引用。

## 公共数据规则

- `columns` 中的 `field` 相对于当前行对象。
- 行回调提供 `current`、`record`、`index`。
- 需要随行提交的主键也应以 Hidden 列声明。
- `viewRender`、options/dict、`tagViewer` 和 `exclude` 在只读场景继续生效。
- 内置新增默认插入 `{}`，不会生成业务主键；默认值通过列 `initialValue` 或新增动作 `resetData` 提供。

## InputList

InputList 将每个数组元素排成紧凑输入行，适合联系人、价格明细等短结构。

```ts
{
  type: 'InputList',
  field: 'contacts',
  label: '联系人',
  title: '联系人列表',
  subSpan: 12,
  gutter: 8,
  attrs: { labelIndex: true },
  rowButtons: { actions: ['delete', 'add'] },
  columns: [
    { type: 'Hidden', field: 'id' },
    { type: 'Input', field: 'name', label: '姓名', required: true },
    { type: 'Input', field: 'mobile', label: '手机号' },
  ],
}
```

| 属性                 | 类型                          | 默认值       | 说明                     |
| -------------------- | ----------------------------- | ------------ | ------------------------ |
| `field`              | string                        | 必填         | 数组字段，继承自表单项   |
| `columns`            | array                         | 必填         | 行内字段                 |
| `title`              | string/function               | —            | 列表标题                 |
| `attrs.labelIndex`   | boolean                       | `false`      | 标签后追加行序号         |
| `rowButtons`         | boolean/array/object          | 内置增删按钮 | 行操作按钮；`false` 关闭 |
| `subSpan`            | number/string                 | `'auto'`     | 行内字段默认栅格         |
| `gutter`             | number                        | `16`         | 行内栅格间距             |
| `rowProps`           | object                        | `{}`         | 行内 Row 属性            |
| `rules` / `required` | object/array/boolean/function | —            | 数组字段校验配置         |

### 原始值数组

唯一列的 `field` 精确为 `$index` 时直接绑定元素：

```ts
{
  type: 'InputList',
  field: 'emails',
  columns: [
    {
      type: 'Input',
      field: '$index',
      label: '邮箱',
      rules: { type: 'email' },
    },
  ],
}

// ['a@example.com', 'b@example.com']
```

对象数组不要使用 `$index`。InputList 至少保留一行不等于这一行必填，是否允许空值由列规则控制。

## ListGroup

ListGroup 把每项渲染成独立 Group，适合地址、合同分段等多行结构。

```ts
{
  type: 'ListGroup',
  field: 'addresses',
  title: ({ index }) => `地址 ${index + 1}`,
  subSpan: 12,
  attrs: {
    labelIndex: true,
    rowKey: 'addressId',
  },
  contentAttrs: { class: 'address-group' },
  rowButtons: { actions: ['delete', 'add'] },
  columns: [
    { type: 'Hidden', field: 'addressId' },
    { type: 'Input', field: 'city', label: '城市' },
    { type: 'Input', field: 'detail', label: '详细地址', span: 24 },
  ],
}
```

除 `field`、`columns`、`attrs.labelIndex`（`labelIndex`）、`attrs.rowKey`、`rowButtons` 外，它还继承 Group 的 `title`、`buttons`、`component`、`ignoreTableTitle`、`contentAttrs`、布局和 `descriptionsProps`。

`rowKey` 用于保持行身份，应选择稳定业务字段。ListGroup 空数组会补成 `[{}]`；需要校验每一项时，把规则配置在对应列字段上。

## List

List 使用 Ant Design Vue List 外观，允许空数组，适合内容块和顶部操作。

```ts
{
  type: 'List',
  field: 'members',
  title: '成员',
  attrs: {
    bordered: true,
    size: 'small',
    rowKey: 'id',
  },
  buttons: { actions: ['add', 'refresh'] },
  rowButtons: { actions: ['edit', 'delete'] },
  subSpan: 12,
  columns: [],
  descriptionsProps: { mode: 'form' },
}
```

| 属性                | 类型            | 默认值 | 说明                                   |
| ------------------- | --------------- | ------ | -------------------------------------- |
| `field`             | string          | 必填   | 数组字段                               |
| `title`             | string/function | —      | 列表标题                               |
| `attrs`             | object          | `{}`   | ListProps；可通过 `rowKey` 指定行主键  |
| `buttons`           | array/object    | —      | 顶部 `add` / `refresh`，无默认动作列表 |
| `rowButtons`        | array/object    | —      | 每项 `delete` / `edit`，无默认动作列表 |
| `columns`           | array           | 必填   | 每项字段                               |
| `subSpan`           | number/string   | `8`    | 每项内部默认栅格                       |
| `gutter`            | number          | `16`   | 每项内部栅格间距                       |
| `rowProps`          | object          | `{}`   | 每项内部 Row 属性                      |
| `descriptionsProps` | object          | —      | 只读项布局                             |

List 允许删除最后一项。`rowKey` 缺失时默认读取 `id`，再回退内部 key；业务数据应显式设置稳定字段。

## Table 数组容器

Table 是绑定模型数组的 Schema 容器，负责列、选择、展开、编辑、行操作和 CRUD。嵌在 SuperForm 时 `field` 必填：

```ts
{
  type: 'Table',
  field: 'items',
  title: '订单明细',
  attrs: { rowKey: 'itemId', pagination: false },
  columns: [],
}
```

页面级 [SuperTable](/manual/super-table) 复用这套主体能力，但自己持有独立数据源并省略 `field`。

### 列 ExtColumnsItem

```ts
{
  type: 'InputNumber',
  field: 'amount',
  label: '金额',
  editable: ({ record }) => !record.locked,
  viewRender: ({ text }) => `¥${text ?? 0}`,
  columnProps: {
    width: 140,
    align: 'right',
    fixed: 'right',
  },
}
```

列拥有普通字段全部配置，并增加 `columnProps`。未声明 `type` 时是只读文本列；需要进入编辑表单必须指定字段类型。使用 `exclude` 控制字段参与表格、表单和详情的场景。

表格级 `columnProps` 是公共默认，列级同名属性覆盖：

```ts
{
  columnProps: { ellipsis: true },
  columns: [
    { field: 'name', label: '名称' },
    { field: 'remark', label: '备注', columnProps: { ellipsis: false } },
  ],
}
```

### attrs、选择与展开

```ts
attrs: {
  rowKey: 'itemId',
  rowSelection: {},
  defaultExpandLevel: 'all',
  childrenColumnName: 'children',
  bordered: true,
  pagination: false,
}
```

`rowSelection` 传 `{}` 开启选择，传 `false` 或省略关闭。`defaultExpandLevel` 为数字或 `'all'`。其他 attrs 继承 Ant Design Vue TableProps。

### 序号与按钮

```ts
{
  indexColumn: { title: '#', width: 64 },
  buttons: { actions: ['add', 'delete'] },
  rowButtons: {
    actions: ['detail', 'edit', 'delete', 'add'],
    columnProps: { title: '操作', width: 180 },
  },
}
```

- `indexColumn: true` 使用默认序号列，也可传 TableColumnProps。
- `buttons: false` 关闭顶部工具栏；对象/数组配置动作。
- `rowButtons: false` 关闭操作列；`columnProps` 只配置操作列。

### 四种编辑方式

| 方式     | 配置                           | 适合场景           |
| -------- | ------------------------------ | ------------------ |
| 单列编辑 | 列 `editable: true`            | Switch 等即时字段  |
| 整表编辑 | Table `editable: true`         | 多行多列整体保存   |
| 行内编辑 | `rowEditor.editMode: 'inline'` | 少量字段、单行确认 |
| 弹窗编辑 | `rowEditor.editMode: 'modal'`  | 字段多、复杂联动   |

```ts
rowEditor: {
  editMode: 'modal',
  addMode: 'inline',
  form: {
    subSpan: 12,
    subItems: [
      { type: 'Hidden', field: 'itemId' },
      { type: 'Input', field: 'name', label: '名称' },
    ],
  },
  modalProps: { width: 760, maskClosable: false },
  onSave(context) {
    if (!context.record.name) return false
  },
  onCancel(context) {
    console.log('取消行编辑', context.record)
  },
}
```

`editMode` 和 `addMode` 可独立选择。`form` 省略或未提供 `subItems` 时复用 columns；显式 `subItems` 适合编辑字段与列表列不同。`onSave` 返回 `false` 阻止内置保存；`onCancel` 在取消前执行。

### modalProps 与 descriptionsProps

```ts
{
  rowEditor: {
    modalProps: { width: 800 },
  },
  // 表格级编辑弹窗的公共属性
  modalProps: { centered: true },
  // 详情布局以及详情弹窗
  descriptionsProps: {
    mode: 'table',
    modalProps: { width: 900 },
  },
}
```

新代码优先把编辑弹窗属性放在 `rowEditor.modalProps`。

### tabs 表格标签

`tabs` 接受 TabsHeader 或 `false`，用于在表格顶部以选项切换过滤值。它包含 `field`、`initialValue`、`bordered`、`options`、`dictName`、`labelAsValue`、`activeKey`、`slots`、`customTab`；详例见[SuperTable：tabs 标签筛选](/manual/super-table#tabs-标签筛选)。

### CRUD 接口

```ts
apis: {
  info: (id, row) => api.info(id),
  save: (data) => api.create(data),
  update: (data) => api.update(data),
  delete: (keys, rows) => api.remove(keys),
}
```

弹窗编辑先等待可选 `info`，再按当前行 → 接口结果 → `resetData` 合并。嵌入普通表单且无接口时，新增、更新、删除直接操作绑定数组；在 SuperTable 中成功后调用页面 `reload()`。

`apis.query` 属于 SuperTable 页面请求入口；Table 容器本身不主动查询。`apis.export` 没有运行时内置行为。

## 相关示例

[数组编辑示例](/examples?example=collections)比较列表容器；[Table 容器示例](/examples?example=table-local)展示列、选择与编辑。进一步可查看[销售订单](/examples?example=business-order)中的行金额联动，以及[合同登记](/examples?example=business-contract)中的付款计划。
