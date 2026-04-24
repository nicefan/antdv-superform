# useTable

`useTable` 用于注册 `SuperTable` 并取得表格实例。

## 签名

```ts
useTable(option: RootTableOption | (() => RootTableOption | Promise<RootTableOption>), data?: any[] | Ref<any[]>)
```

## 返回值

```ts
const [register, table] = useTable(schema)
```

常用实例方法：

- `table.getTable()`
- `table.redoHeight()`
- `table.setData(data)`
- `table.getData()`
- `table.goPage(page)`
- `table.setColumns(columns)`
- `table.reload()`
- `table.query(params?)`
- `table.onLoaded(callback)`
- `table.resetSearchForm(params?)`
- `table.getQueryParams()`
- `table.selectedRowKeys`
- `table.selectedRows`
- `table.setSelectedRows(rows)`
- `table.expandedRowKeys`
- `table.setExpandedRowKeys(keys)`
- `table.expandAll()`
- `table.add(param?)`
- `table.edit(param?)`
- `table.delete()`
- `table.detail(param?)`
- `table.validate()`

## 表格内置业务动作

`table.add()`、`table.edit()`、`table.delete()`、`table.detail()` 对应的就是表格内部内置动作。

它们和按钮系统中的同名动作是同一套能力，只是一个从实例侧调用，一个从按钮配置侧调用。

### `add(param?)`

常见参数：

- `resetData`
- `meta`

例如：

```ts
table.add({
  resetData: {
    status: 1,
  },
})
```

### `edit(param?)`

常见参数：

- `meta`
- `resetData`

如果当前没有传 `record`，通常要求已选中一条记录。

### `detail(param?)`

用于打开详情查看，优先使用当前行或当前选中行。

## 最小示例

```ts
const [register, table] = useTable(schema)

table.reload()
table.query({ title: '关键字' })
table.goPage(2)
```

## 与按钮系统的关系

下面两种写法本质上是同一套动作系统：

```ts
table.add({ resetData: { status: 1 } })
```

```ts
{
  name: 'add',
  onClick: (effectData, action) =>
    action({
      resetData: { status: 1 },
    }),
}
```

第二种写法适合在表格按钮中先做额外处理，再调用内置动作。

## 说明

- 当 `option.dataSource` 是 `Ref` 时，表格内部会同步写回
- `query()` 会重置到第一页后查询
- `reload()` 更接近“按当前条件刷新”
- `validate()` 主要用于 `editable` 模式下的整表校验
