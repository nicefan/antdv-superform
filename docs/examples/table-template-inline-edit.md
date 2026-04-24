# SuperTable 模板：行内编辑

## 场景说明

适合操作密集、字段较少的维护型列表：

- 直接在行内编辑
- 不打开弹窗
- 强调快速修改

## 最小 Schema

```ts
import { defineTable } from 'antdv-superform'

export const tableSchema = defineTable({
  attrs: {
    rowKey: 'id',
  },
  apis: {
    query: api.queryList,
    save: api.create,
    update: api.update,
    delete: api.remove,
  },
  rowEditor: {
    addMode: 'inline',
    editMode: 'inline',
  },
  buttons: ['add'],
  rowButtons: ['edit', 'delete'],
  columns: [
    { type: 'Input', field: 'name', label: '名称', editable: true },
    { type: 'Switch', field: 'status', label: '状态', editable: true },
  ],
})
```

## 关键点

- `rowEditor.editMode: 'inline'` 控制编辑动作在行内完成
- `rowEditor.addMode: 'inline'` 控制新增动作在行内完成
- 字段级 `editable: true` 表示该列在编辑行中可编辑
- 行内编辑更适合字段少、规则简单的列表
- 行内模式下应尽量避免复杂联动和大体量表单逻辑
