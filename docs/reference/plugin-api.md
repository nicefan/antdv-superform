# 插件与全局配置

默认导出是插件对象，可通过 `app.use()` 注册。

```ts
import superform from 'antdv-superform'

app.use(superform, {
  defaultButtons: {
    add: {
      label: '新增',
      attrs: { type: 'primary' },
    },
  },
})
```

## 插件能力

插件对象除了 `install` 之外，还额外暴露：

- `registComponent(name, component)`: 注册扩展组件
- `setDefaultProps(props)`: 动态追加默认属性

## 全局配置项

- `locale`
- `components`
- `defaultProps`
- `dictApi`
- `customIcon`
- `buttonRoles`
- `defaultButtons`
- `tagViewer`
- `tableApiSetting`

## `tableApiSetting`

用于统一适配查询接口字段名与结果格式：

- `currentField`
- `sizeField`
- `resultTransform(result)`

当后端分页字段不是 `current` / `size` / `records` 时，优先在这里做统一转换。
