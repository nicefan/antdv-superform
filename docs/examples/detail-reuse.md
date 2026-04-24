# 表单与详情复用

## 场景说明

适合一个实体同时存在：

- 编辑页
- 详情页
- 预览弹窗

并且字段结构高度一致的场景。

## 最小 Schema

```ts
import { defineForm } from 'antdv-superform'

export const schema = defineForm({
  subItems: [
    { type: 'Input', field: 'name', label: '姓名' },
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
      type: 'Upload',
      field: 'avatar',
      label: '头像',
      descriptionsProps: {
        noInput: true,
      },
    },
  ],
})
```

## 关键点

- 编辑页用 `useForm(schema)`
- 详情页用 `useDetail(schema)`
- 一份 schema 即可同时覆盖编辑态和查看态
- 差异通过 `viewRender`、`descriptionsProps`、`exclude` 收敛

## 最小调用方式

```ts
const [formRegister] = useForm(schema)

const [detailRegister, detail] = useDetail(schema)
detail.setData(record)
```
