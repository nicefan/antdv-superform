# 表单动作

| 动作 | 说明 |
| --- | --- |
| `submit()` | 校验并提交，返回 Promise |
| `resetFields(record?)` | 重置或回显完整记录 |
| `setFieldsValue(partial)` | 更新目标模型中已有字段 |
| `getData()` | 返回当前模型 |
| `getForm()` | 异步取得内部表单引用 |
| `asyncCall(key, param?)` | 调用内部公开动作 |

`dataSource` 是只读 computed，指向当前绑定模型。
