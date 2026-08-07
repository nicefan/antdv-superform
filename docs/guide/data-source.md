# 数据源与模型

表单先按 schema 建立标准初始对象，再绑定 `dataSource`。数据源可以是对象或 Ref；模型 watcher 会为动态对象补齐缺失字段。

```ts
const record = ref({ id: 1, name: '张三' })

const [register, form] = useForm({
  dataSource: record,
  subItems: [
    { type: 'Hidden', field: 'id' },
    { type: 'Input', field: 'name', label: '姓名' },
    { type: 'Switch', field: 'enabled', label: '启用' },
  ],
})
```

## 更新与重置

- `resetFields(record?)`：按目标模型遍历，恢复初始值或整条记录。
- `setFieldsValue(partial)`：只更新模型已有且本次传入的字段。
- `getData()`：读取当前绑定对象。
- `submit()`：校验并返回数据，同时执行 schema 的提交逻辑。
