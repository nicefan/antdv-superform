# useDetail

`useDetail` 用于注册 `SuperDetail`，并提供最基本的数据设置能力。

## 签名

```ts
useDetail(
  option: ExtDescriptionsOption | ExtFormOption | (() => ExtDescriptionsOption | ExtFormOption | Promise<...>),
  data?: Obj
)
```

## 返回值

```ts
const [register, detail] = useDetail(schema)
```

- `register`: 绑定到 `SuperDetail`
- `detail.setData(data)`: 设置详情数据

## 说明

- 如果第二个参数 `data` 是响应式对象，注册完成后会自动同步
- 常见做法是直接复用表单 schema，再通过查看态能力控制显示结果
