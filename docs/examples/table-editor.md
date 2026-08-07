# 表格弹窗编辑

```ts
const [register] = useTable({
  apis: {
    query: (params, { signal }) => api.list(params, { signal }),
    info: (id) => api.detail(id),
    save: (data) => api.create(data),
    update: (data) => api.update(data),
    delete: (keys) => api.remove(keys),
  },
  rowEditor: {
    addMode: 'modal',
    editMode: 'modal',
    form: { subSpan: 12 },
  },
  buttons: { actions: ['add', 'delete'] },
  rowButtons: { actions: ['detail', 'edit', 'delete'] },
  columns,
})
```

编辑时先等待可选的 `apis.info`，再按当前行、接口结果、`resetData` 合并数据。CRUD 完成后的刷新统一调用 `reload()`。
