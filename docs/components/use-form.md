# useForm

`useForm` 用来注册 `SuperForm` 并取得可调用的实例方法。

## 签名

```ts
useForm(option: ExtFormOption | (() => ExtFormOption | Promise<ExtFormOption>), data?: Obj)
```

## 返回值

```ts
const [register, form] = useForm(schema)
```

- `register`: 绑定到 `SuperForm` 的 `@register`
- `form.dataSource`: 当前表单数据的计算属性
- `form.getForm()`: 异步获取内部表单实例
- `form.getData()`: 读取当前数据源
- `form.submit()`: 触发表单提交
- `form.resetFields(data?)`: 重置字段，可选传入重置后的值
- `form.setFieldsValue(data)`: 批量赋值
- `form.asyncCall(key, param?)`: 直接调用内部实例方法

## 最小示例

```ts
const [register, form] = useForm(schema)

form.setFieldsValue({
  name: '张三',
})

await form.submit()
```

## 说明

- `option` 可以是对象、同步函数或异步函数
- 如果传入第二个参数 `data`，内部会在注册后同步给表单
