# 选项和值

Select、Radio、Checkbox、Switch 等支持：

- 标准 `{ label, value }[]`
- 原始值数组
- `{ value: label }` 对象字典
- Ref
- 同步或异步函数
- `dictName`

原始值数组会以元素本身作为 label 与 value。配置 `valueToNumber` 时使用数字下标作为兼容 value。

```ts
{
  type: 'Select',
  field: 'role',
  label: '角色',
  options: [
    { label: '管理员', value: 'admin' },
    { label: '成员', value: 'member' }
  ]
}
```

`fieldNames.label/value` 会先被消费并归一化为标准字段。当前不支持 Select 分组选项或 `fieldNames.options`。
