# 后端接口约定

组件库不绑定 HTTP 客户端，但会以固定签名调用查询、详情、保存、更新、删除、字典和上传接口。推荐在 API 适配层统一转换，不要让每个页面重复理解后端响应。

## 表格查询

```ts
apis: {
  query(params, { signal }) {
    return http.get('/users', { params, signal })
  },
}
```

默认分页参数为 `current`、`size`，响应支持：

```ts
// 不分页
[{ id: 1, name: '张三' }]

// 分页
{
  current: 1,
  size: 20,
  total: 120,
  records: [],
}
```

### 三种适配位置

```ts
// 1. 当前表格 afterQuery
afterQuery: (result) => ({
  current: result.pageNum,
  size: result.pageSize,
  total: result.totalCount,
  records: result.list,
})

// 2. 全局 tableApiSetting
tableApiSetting: {
  currentField: 'pageNum',
  sizeField: 'pageSize',
  resultTransform: (result) => result.data,
}

// 3. API 层直接返回标准结构
async function pageUsers(params, options) {
  const result = await http.get('/users', { params, ...options })
  return normalizePage(result)
}
```

同一后端规范优先全局或 API 层；只有单接口特殊时使用 `beforeQuery` / `afterQuery`。

新请求会中止旧请求，务必把 `signal` 传给 fetch/Axios，并在统一错误提示中忽略 AbortError。

## 查询参数优先级

```text
分页 → searchForm → params → query(tempParams)
```

`beforeQuery` 在合并后执行。`query(tempParams)` 不会永久保存临时参数；导出需要当前条件时读取 `getQueryParams()` 并自行补分页或导出专属参数。

## TableApis CRUD

| 属性     | 类型     | 默认值 | 调用形式             | 期望行为         |
| -------- | -------- | ------ | -------------------- | ---------------- |
| `info`   | function | —      | `(rowKeyValue, row)` | 返回完整编辑记录 |
| `save`   | function | —      | `(newData)`          | 新增并 resolve   |
| `update` | function | —      | `(updatedData)`      | 更新并 resolve   |
| `delete` | function | —      | `(keys, rows)`       | 删除一条或多条   |

```ts
apis: {
  info: (id) => api.getUser(id),
  save: (data) => api.createUser(data),
  update: (data) => api.updateUser(data.id, data),
  delete: (keys) => api.deleteUsers(keys),
}
```

弹窗编辑按“当前行 → info 结果 → `add/edit({ resetData })`”合并；save/update/delete 成功后 SuperTable 使用 `reload()` 保留条件刷新。

## 字典接口

```ts
dictApi(name): Promise<Array<{ label: unknown; value: string | number }>>
```

```ts
dictApi: async (name) => {
  const result = await api.dictionary(name);
  return result.map((item) => ({
    label: item.displayName,
    value: item.code,
    disabled: item.disabled,
  }));
};
```

全局字典返回标准 label/value；字段的 `fieldNames` 只适配局部 options。缓存、重试、租户参数和错误兜底在业务 dictApi 中实现。

## Upload 接口

```ts
upload(formData, { onUploadProgress }): Promise<FileInfo>
delete(file): Promise<unknown>
download(file): Promise<BlobPart>
```

```ts
upload: (data, { onUploadProgress }) =>
  http.post('/files', data, { onUploadProgress }),
delete: (file) => http.delete(`/files/${file.fileId}`),
download: (file) => http.get(`/files/${file.fileId}`, { responseType: 'blob' }),
```

后端字段通过 `infoNames` 映射。完整值形态见[文件上传](/manual/fields/upload)。

## 错误约定

- 查询错误由业务请求层决定提示，取消请求通常不提示。
- Modal 的 `onOk` 或 CRUD Promise reject 时保持弹窗打开。
- Upload 错误会阻止表单提交并保留失败文件状态。
- `schema.onSubmit` 可返回 `false` 或 `{ errMessage }` 拦截提交。
- 后端鉴权永远不能只依赖前端按钮权限。

建议所有接口适配器都具有明确 TypeScript 输入/输出，尤其不要根据 Schema 的中文 label 猜后端字段。
