# 表格查询协议

`SuperTable` 的查询能力主要由 `apis.query` 驱动。

## 输入参数

`apis.query` 最终会收到合并后的查询参数，来源包括：

- 当前分页参数
- 搜索表单参数
- `option.params`
- `table.query(param)` 的显式传参

如果配置了 `beforeQuery`，会先对合并后的参数做一次加工。

## 推荐返回值

### 返回数组

```ts
[
  { id: '1', title: 'A' },
  { id: '2', title: 'B' },
]
```

适合不分页的数据源。

### 返回分页对象

```ts
{
  current: 1,
  size: 10,
  total: 100,
  records: [
    { id: '1', title: 'A' }
  ]
}
```

适合标准分页场景。

## 全局适配

如果你的后端字段不是这套命名，可以通过插件级 `tableApiSetting` 做统一转换。

```ts
app.use(superform, {
  tableApiSetting: {
    currentField: 'pageNum',
    sizeField: 'pageSize',
    resultTransform(result) {
      return {
        current: result.pageNum,
        size: result.pageSize,
        total: result.total,
        records: result.list,
      }
    },
  },
})
```
