# Table 数组容器 {#table}

本页描述表单模型中的数组表格。独立查询页面使用 [SuperTable](/manual/super-table)。

## 绑定数组数据 {#table-数组容器}

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

## 列 ExtColumnsItem

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

## attrs、选择与展开

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

## 序号与按钮

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

## 四种编辑方式

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
    console.log('保存上下文', context)
    // 返回 false 可阻止内置保存；字段校验放在 form/columns 的 rules 中。
  },
  onCancel(context) {
    console.log('取消行编辑', context.record)
  },
}
```

`editMode` 和 `addMode` 可独立选择。`form` 省略或未提供 `subItems` 时复用 columns；显式 `subItems` 适合编辑字段与列表列不同。`onSave` 返回 `false` 阻止内置保存；`onCancel` 在取消前执行，返回 false 可阻止取消。弹窗 onSave 从 context.source 读取提交草稿；行内回调保留行操作上下文。

## modalProps 与 descriptionsProps

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

## tabs 表格标签

`tabs` 接受 TabsHeader 或 `false`，用于在表格顶部以选项切换过滤值。它包含 `field`、`initialValue`、`bordered`、`options`、`activeKey`、`slots`、`customTab`，其中 dictName、labelAsValue 属于 options 配置包；详例见[SuperTable：tabs 标签筛选](/manual/super-table#tabs-标签筛选)。

## CRUD 接口

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


[Table 编辑示例](/examples?example=table-local)

## 行标识与跨页选择

为可编辑或可选择的表格配置稳定、唯一的 `attrs.rowKey`。需要跨远程页保留选择时，显式配置 `preserveSelectedRowKeys`。
