# 表格 CRUD

## 场景说明

适合标准后台列表页：

- 顶部搜索表单
- 中间数据表格
- 行级编辑、删除、详情
- 新增/编辑使用弹窗表单

## 最小 Schema

```ts
import { defineTable } from 'antdv-superform'

export const tableSchema = defineTable({
  attrs: {
    rowKey: 'id',
  },
  apis: {
    query: async (params) => api.queryList(params),
    save: async (data) => api.create(data),
    update: async (data) => api.update(data),
    delete: async (ids) => api.remove(ids),
  },
  searchForm: {
    subItems: [
      'title',
      {
        type: 'Select',
        field: 'status',
        label: '状态',
        options: [
          { label: '启用', value: 1 },
          { label: '停用', value: 0 },
        ],
      },
    ],
    buttons: ['search', 'reset'],
  },
  rowEditor: {
    editMode: 'modal',
    addMode: 'modal',
    form: {
      attrs: { layout: 'vertical' },
      subSpan: 24,
    },
  },
  columns: [
    { type: 'Input', field: 'title', label: '标题', rules: { required: true } },
    { type: 'Switch', field: 'status', label: '状态' },
  ],
  rowButtons: ['edit', 'delete', 'detail'],
})
```

## 关键点

- `searchForm` 用于顶部搜索区
- `rowEditor` 控制新增/编辑模式
- `modal` 模式下，`columns` 会自动转换为弹窗表单 `subItems`
- `apis.save` / `apis.update` / `apis.delete` 会被内置动作自动调用

## 对象式动作

当需要在执行内置动作前做额外处理时，可写成对象式动作：

```ts
rowButtons: {
  actions: [
    {
      name: 'add',
      onClick: (effectData, action) =>
        action({
          resetData: {
            status: 1,
          },
        }),
    },
  ],
}
```

这里：

- `effectData` 是当前表格上下文
- `action` 是内置操作方法
- `resetData` 会在新增/编辑表单打开前合并到数据源中
