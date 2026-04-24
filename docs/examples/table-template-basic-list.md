# SuperTable 模板：基础列表

## 场景说明

适合只有查询和展示能力的基础列表页：

- 搜索区
- 表格
- 分页
- 无新增/编辑动作

## 最小 Schema

```ts
import { defineTable } from 'antdv-superform'

export const tableSchema = defineTable({
  attrs: {
    rowKey: 'id',
  },
  apis: {
    query: async (params) => api.queryList(params),
  },
  searchForm: {
    subItems: ['name', 'status'],
    buttons: ['search', 'reset'],
  },
  columns: [
    { type: 'Input', field: 'name', label: '名称' },
    { type: 'Select', field: 'status', label: '状态', options: ['启用', '停用'] },
  ],
})
```

## 关键点

- 只实现 `apis.query`
- `columns` 专注展示与查看态格式
- 适合作为所有列表页的起点模板
