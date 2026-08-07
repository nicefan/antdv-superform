# 组合函数

| API | 返回值 | 用途 |
| --- | --- | --- |
| `useForm(schema)` | `[register, actions]` | 创建表单 |
| `useTable(option, data?)` | `[register, actions]` | 创建表格 |
| `useDetail(option, data?)` | `[register, actions]` | 创建详情 |
| `useButtons(option)` | `[render]` | 创建按钮组 |
| `useModal(content?, config?)` | modal actions | 创建编程式弹窗 |
| `useModalForm(form, config?)` | modal + form actions | 创建弹窗表单 |

类型辅助函数 `defineForm`、`defineTable`、`defineDetail` 不改变运行时对象。
