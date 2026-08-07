# SuperDetail

SuperDetail 用同一份字段 schema 展示只读详情。同步与异步 options 会沿用表单相同的归一化语义。

```ts
const [register, detail] = useDetail({
  type: 'Descriptions',
  subItems: [
    { field: 'name', label: '姓名' },
    { field: 'status', label: '状态', options: { 1: '启用', 0: '停用' } },
  ],
}, record)
```

使用 `detail.setData(record)` 更新展示数据。
