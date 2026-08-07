# SuperForm

SuperForm 根据 schema 生成表单、模型和校验规则。

## 使用方式

```vue
<SuperForm @register="register" />
```

也可以直接传入：

```vue
<SuperForm :schema="schema" :data-source="record" />
```

## 组合函数

```ts
const [register, form] = useForm(schema)
```

`form` 提供 `submit`、`resetFields`、`setFieldsValue`、`getData`、`getForm` 和 `asyncCall`。详见[表单动作](/api/form-actions)。

## 注意事项

- `useForm` 只接收 schema，不接收第二个 record 参数。
- 外部对象使用 schema 的 `dataSource`。
- `resetFields` 用于整条数据回显；`setFieldsValue` 用于局部赋值。
