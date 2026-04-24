# 基础表单

## 场景说明

适合最常见的新增/编辑页面：

- 垂直布局表单
- 基础输入字段
- 提交与重置按钮

## 最小 Schema

```ts
import { defineForm } from 'antdv-superform'

export const userFormSchema = defineForm({
  attrs: {
    layout: 'vertical',
  },
  buttons: ['submit', 'reset'],
  subItems: [
    {
      type: 'Input',
      field: 'name',
      label: '姓名',
      rules: { required: true },
    },
    {
      type: 'Select',
      field: 'status',
      label: '状态',
      options: [
        { label: '启用', value: 1 },
        { label: '停用', value: 0 },
      ],
    },
    {
      type: 'DateRange',
      field: 'startDate',
      keepField: 'endDate',
      label: '有效期',
    },
  ],
})
```

## 关键点

- 使用 `defineForm` 收敛表单 schema
- `buttons` 直接声明提交和重置动作
- `DateRange + keepField` 适合拆分开始/结束日期字段
- 所有字段都只使用当前 API，不包含兼容层写法
