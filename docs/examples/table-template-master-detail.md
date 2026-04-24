# SuperTable 模板：列表 + 详情

## 场景说明

适合不强调编辑，而强调查看明细的业务：

- 搜索区
- 列表
- 详情弹窗

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
  },
  searchForm: {
    subItems: ['name'],
    buttons: ['search', 'reset'],
  },
  descriptionsProps: {
    column: 2,
  },
  rowButtons: ['detail'],
  columns: [
    { type: 'Input', field: 'name', label: '名称' },
    { type: 'Select', field: 'status', label: '状态', options: ['启用', '停用'] },
  ],
})
```

## 关键点

- `detail` 是内置动作
- `descriptionsProps` 用于控制详情展示布局
- 如果实现了 `apis.info`，详情会优先读取接口返回结果
