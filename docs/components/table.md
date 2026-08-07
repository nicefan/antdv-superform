# SuperTable

SuperTable 统一查询表单、分页、数据读取、选择、展开和 CRUD。

## 请求模型

`request` 是所有读取请求的入口，负责合并分页、搜索、动态参数和临时参数，并维护 loading。

- `query(params?)` 回到第一页。
- `reload()` 保留当前页与条件。
- `goPage(page)` 更新分页后请求。
- 内部响应式参数同步使用 300ms 尾部节流。
- 新请求会通过 AbortController 取消旧请求，并只允许最后一次响应更新表格。

`apis.query` 的第二个运行时参数为 `{ signal }`。即使请求未消费 signal，请求编号仍会丢弃过期响应。

## 查询响应

可以直接返回数组，或返回：

```ts
{ current, size, total, records }
```

其他结构通过 `afterQuery` 或全局 `tableApiSetting.resultTransform` 转换。
