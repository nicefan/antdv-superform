# 表格动作

| 动作 | 说明 |
| --- | --- |
| `query(params?)` | 回到第一页并查询 |
| `reload()` | 保留分页与条件刷新 |
| `goPage(page)` | 跳转指定页并请求 |
| `resetSearchForm(data?)` | 重置查询表单并请求 |
| `getQueryParams()` | 获取当前查询参数 |
| `setData(rows)` / `getData()` | 设置或读取当前数据 |
| `setColumns(columns)` | 替换列配置 |
| `add` / `edit` / `delete` / `detail` | CRUD 与详情操作 |
| `validate()` | editable 模式校验 |

`query`、`reload` 和 `goPage` 都直接返回对应请求 Promise，不经过公开节流。
