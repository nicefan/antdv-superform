# SuperTable 模板：弹窗 CRUD

## 场景说明

适合中后台最常见的 CRUD 页面：

- 搜索区
- 列表页
- 新增/编辑弹窗
- 行级操作

## 最小 Schema

```ts
import { defineTable } from 'antdv-superform'

export const tableSchema = defineTable({
  attrs: {
    rowKey: 'id',
  },
  apis: {
    query: api.queryList,
    info: api.getInfo,
    save: api.create,
    update: api.update,
    delete: api.remove,
  },
  searchForm: {
    subItems: ['name', 'status'],
    buttons: ['search', 'reset'],
  },
  rowEditor: {
    addMode: 'modal',
    editMode: 'modal',
    form: {
      attrs: { layout: 'vertical' },
      subSpan: 12,
    },
  },
  buttons: ['add'],
  rowButtons: ['edit', 'delete', 'detail'],
  columns: [
    { type: 'Input', field: 'name', label: '名称', rules: { required: true } },
    { type: 'Select', field: 'status', label: '状态', options: ['启用', '停用'] },
  ],
})
```

## 关键点

- `columns` 会自动转换成弹窗表单 `subItems`
- `rowEditor.form` 主要用于补充表单容器配置
- `apis.info` 适合在编辑/详情前拉取单条完整数据
