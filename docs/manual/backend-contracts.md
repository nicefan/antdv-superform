# 接口与数据适配

组件库不绑定 HTTP 客户端，但会以固定签名调用查询、详情、保存、更新、删除、字典和上传接口。推荐在 API 适配层统一转换，不要让每个页面重复理解后端响应。

<span id="表格接口接入"></span>

## 查询请求与返回值 {#表格查询}

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

| 分页响应字段 | 说明 |
| --- | --- |
| `records` | 本页记录数组；空页返回 `[]` |
| `total` | 满足查询条件的总记录数，用于分页展示及末页失效时修正页码 |
| `current` | 返回数据所属页码；缺省时使用本次请求页码 |
| `size` | 返回数据所属每页条数；缺省时使用本次请求条数 |

UI 分页配置使用 `attrs.pagination.pageSize`，默认请求和响应使用 `size`。接口字段不同可通过 `attrs.pageTransform` 和 `attrs.resultTransform` 转换。

### 三种适配位置

```ts
// 1. 当前表格 attrs
const tableOption = {
  attrs: {
    pageTransform: ({ current, size }) => ({ pageNum: current, pageSize: size }),
    resultTransform: (response) => ({
      current: response.data.pageNum,
      size: response.data.pageSize,
      total: response.data.totalCount,
      records: response.data.list,
    }),
  },
}

// 2. 全局 SuperTable 默认属性
superform.configure({
  defaultProps: {
    SuperTable: {
      pageTransform: ({ current, size }) => ({ pageNum: current, pageSize: size }),
      resultTransform: (response) => response.data,
    },
  },
})

// 3. API 层直接返回标准结构
async function pageUsers(params, options) {
  const result = await http.get('/users', { params, ...options })
  return normalizePage(result)
}
```

同一后端规范使用全局默认值或 API 层转换，单接口差异在当前表格 `attrs` 中覆盖。响应先经过 `attrs.resultTransform` 统一结构，再交给根级 `afterQuery` 处理业务，最后进行分页处理及数据回写。未配置结果转换器时直接将接口结果传给 `afterQuery`；`afterQuery` 返回 `void` 时沿用收到的结果。

新请求会中止前一次请求，务必把 `signal` 传给 fetch/Axios，并在统一错误提示中忽略 AbortError。

## 查询参数合并顺序 {#查询参数优先级}

参数合并顺序、`beforeQuery` 与临时参数边界见[SuperTable：查询参数与转换](/manual/super-table#查询参数与转换)。列筛选排序通过 `attrs.filterSortTransform` 转成接口条件，默认关闭；分页转换独立使用 `attrs.pageTransform`。

导出时使用 `getQueryParams()`，取得当前搜索、tabs、动态参数和保存的筛选排序转换结果的副本。它不包含分页、单次查询的临时参数及 `beforeQuery` 加工，无需重新执行转换器；导出专属参数由业务补充。可运行示例见[筛选排序与接口转换](/examples?example=table-query-transform)。

## CRUD 接口适配 {#tableapis-crud}

接口签名见 [SuperTable：apis 完整契约](/manual/super-table#apis-完整契约)。业务适配示例：

```ts
apis: {
  info: (id) => api.getUser(id),
  save: (data) => api.createUser(data),
  update: (data) => api.updateUser(data.id, data),
  delete: (keys) => api.deleteUsers(keys),
}
```

编辑数据合并顺序和成功后的刷新行为见[SuperTable：apis 完整契约](/manual/super-table#apis-完整契约)。

<span id="字典与文件服务"></span>

## dictApi：返回格式 {#字典接口}

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

## 文件接口适配 {#upload-接口}

上传、删除与下载的参数及返回约定见 [Upload：apis 契约](/manual/fields/upload#apis-契约)。HTTP 接入示例：

```ts
upload: (data, { onUploadProgress }) =>
  http.post('/files', data, { onUploadProgress }),
delete: (file) => http.delete(`/files/${file.fileId}`),
download: (file) => http.get(`/files/${file.fileId}`, { responseType: 'blob' }),
```

后端字段通过 `infoNames` 映射。完整值形态见[文件上传](/manual/fields/upload)。

<span id="异常处理"></span>

## 请求与提交错误处理 {#错误约定}

- 查询错误由业务请求层决定提示，取消请求通常不提示。
- Modal 的 `onOk` 或 CRUD Promise reject 时保持弹窗打开。
- Upload 错误会阻止表单提交并保留失败文件状态。
- `schema.onSubmit` 可返回 `false` 或 `{ errMessage }` 拦截提交。
- 后端鉴权永远不能只依赖前端按钮权限。

建议所有接口适配器都具有明确 TypeScript 输入/输出，尤其不要根据 Schema 的中文 label 猜后端字段。

