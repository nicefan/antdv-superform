# Schema 基础

字段配置通常由以下属性组成：

```ts
{
  type: 'Input',
  field: 'name',
  label: '名称',
  initialValue: '',
  required: true,
  attrs: { placeholder: '请输入名称' }
}
```

| 属性 | 说明 |
| --- | --- |
| `type` | 内置或已注册的字段类型 |
| `field` | 模型字段，支持点路径 |
| `label` | 表单标签或表格标题 |
| `initialValue` | schema 标准初始值 |
| `required` / `rules` | 必填与其他校验规则 |
| `attrs` | 传给底层组件的属性 |
| `hidden` / `disabled` | 静态或动态状态 |
| `dynamicAttrs` / `computed` | 根据上下文计算配置或值 |

使用 `defineForm`、`defineTable`、`defineDetail` 只会增强类型，不改变运行时数据。
