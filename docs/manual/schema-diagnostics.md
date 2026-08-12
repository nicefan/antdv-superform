# Schema 诊断

诊断工具检查可静态识别的错误、废弃 API 和冗余默认值。它不会执行接口或业务回调，因此应与 TypeScript、测试和源码审核配合。

## CLI：可序列化 Schema

```bash
npx antdv-superform diagnose-schema schema.json --type form
npx antdv-superform diagnose-schema table.json --type table --json
cat schema.json | npx antdv-superform diagnose-schema - --type detail
```

`--type` 支持 `form`、`table`、`detail`；省略时按是否存在 columns 自动判断。`--json` 适合 CI。存在 error 时退出码非零，warning 和 suggestion 不会单独导致失败。

## 运行时 API：动态 Schema

函数、Ref、VNode 或组件引用无法写入 JSON，应在代码中调用：

```ts
import { diagnoseSchema } from 'antdv-superform'

const diagnostics = diagnoseSchema(schema, 'table')
const errors = diagnostics.filter((item) => item.level === 'error')
```

返回结构：

```ts
type SchemaDiagnostic = {
  level: 'error' | 'warning' | 'suggestion'
  code: string
  path: string
  message: string
}
```

`path` 精确指向如 `schema.columns[2].attrs.placeholder` 的位置。

## 开发期自动诊断

```ts
app.use(SuperFormPlugin, {
  schemaDiagnostics: import.meta.env.DEV,
})
```

SuperForm、SuperTable、SuperDetail 接收 Schema 时把结果分组输出到控制台。生产环境通常关闭，避免无关日志。

## 诊断内容

### error

| code                             | 检查                      |
| -------------------------------- | ------------------------- |
| `invalid-schema`                 | 根值不是对象              |
| `invalid-schema-type`            | kind 非 form/table/detail |
| `unknown-type`                   | 非内置且不以 Ext 开头     |
| `invalid-exclude`                | exclude 类型或值错误      |
| `invalid-visible-in`             | visibleIn 值错误          |
| `invalid-unauthorized`           | unauthorized 值错误       |
| `invalid-item` / `invalid-items` | 节点或节点列表结构错误    |
| `missing-columns`                | 表格缺少 columns          |
| `missing-sub-items`              | 表单/详情缺少 subItems    |

### warning

| code              | 检查                          |
| ----------------- | ----------------------------- |
| `deprecated-api`  | 使用废弃属性                  |
| `missing-type`    | 非表格字段未声明 type         |
| `missing-options` | 选择字段没有 options/dictName |
| `duplicate-field` | 同级 field 重复               |

### suggestion

| code                | 检查                                       |
| ------------------- | ------------------------------------------ |
| `redundant-default` | 重复 placeholder、格式、布局等内置默认     |
| `empty-config`      | 空 attrs、rowProps、rules、options、params |

```ts
// 会提示冗余默认值
{
  type: 'Input',
  field: 'name',
  label: '姓名',
  attrs: { placeholder: '请输入姓名' },
}

// 精简后
{ type: 'Input', field: 'name', label: '姓名' }
```

## 能力边界

诊断不能确认：

- 后端字段与接口签名是否真实。
- `rowKey` 是否在每条业务记录中唯一。
- Ext\* 是否已经注册及其专属 props。
- 回调在运行时是否读取了不存在的上下文。
- 权限标识和字典名是否有效。
- 类型已声明但运行时尚未消费的兼容属性。

因此最终仍需运行消费项目 TypeScript 检查和相关交互测试。
